pragma solidity >=0.5.0;

import "../Registry.sol";
import "../../governance/Groups.sol";
import "../../vendor/SafeMath.sol";

import "../interfaces/IAssetRankTracker.sol";
import "../kyc/IKycProcessTracker.sol";
import "./RankTracker.sol";


contract AssetRankTracker is IAssetRankTracker, Groups {
    
    using SafeMath for uint256;

    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    Registry config;
    RankTracker rankTracker;

    IKycProcessTracker kycProcessTracker;


    /**
     * @param period Period delta in seconds
     * @param periodLimit Global amount limit per period
     * @param periodUserLimit User amount limit per period
     * @param periodUsage Amount used in the current period
     * @param lastUpdate Last update in seconds
     */
    struct AssetLimits {
        uint256 period;
        uint256 periodLimit;
        uint256 periodUserLimit;

        uint256 periodUsage;

        uint256 lastUpdate;
    }

    mapping(uint256 => AssetLimits) public limits;



    /**
     * @param periodUsage Amount used in current period for the user
     * @param lastUpdate Last update in seconds
     */
    struct UserLimits {
        uint256 periodUsage;
        uint256 lastUpdate;
    }

    mapping(address => UserLimits) public userLimits;


    constructor(address _registry, address _owner) Groups(_registry) public {
        require(_registry != address(0), "Invalid registry address");
        require(_owner != address(0), "Invalid owner address");
        
        config = Registry(_registry);
        owner = _owner;

        rankTracker = RankTracker(config.getAddress("RankTracker"));
        kycProcessTracker = IKycProcessTracker(config.getAddress("KycProcessTracker"));
    }

    /**
     * @notice Gets the current period usage and all limits for a given Rank
     * @param _rank The rank index
     * @return period: the period configured
     * periodLimit: the global limit specified for this rank
     * periodUsage: the number of tokens already purchased within this period (0 returned if a reset is pending)
     * lastUpdate: the last time an update occurred to the usage (0 returned if reset and has not yet been updated)
     */
    function getRankLimits(uint256 _rank) external view
        returns (
            uint256 period,
            uint256 periodLimit,
            uint256 periodUserLimit,
            uint256 periodUsage,
            uint256 lastUpdate)
    {
        if (block.timestamp.sub(limits[_rank].lastUpdate) >= limits[_rank].period) {
            return (limits[_rank].period, limits[_rank].periodLimit, limits[_rank].periodUserLimit, 0, 0);
        }

        return (limits[_rank].period, limits[_rank].periodLimit, limits[_rank].periodUserLimit,
            limits[_rank].periodUsage, limits[_rank].lastUpdate);
    }

    /**
     * @notice Gets the current period usage and limits for a given user based upon their current Rank
     * @param _user Address of the user
     * @return rank: the current rank of the user
     * period: the period configured
     * periodUserLimit: the user limit specified for thier current rank
     * periodUsage: the number of tokens already purchased within this period (0 returned if a reset is pending)
     * lastUpdate: the last time an update occurred to the usage (0 returned if reset and has not yet been updated)
     */
    function getUserRankLimits(address _user) external view
        returns (
            uint256 rank,
            uint256 period,
            uint256 periodUserLimit,
            uint256 periodUsage,
            uint256 lastUpdate)
    {
        (address hotWallet, address coldWallet) = kycProcessTracker.getWallets(_user);

        if (hotWallet == address(0)) {
            return (0, 0, 0, 0, 0);
        }

        uint256 userRank = rankTracker.getUserRank(hotWallet);

        if (block.timestamp.sub(userLimits[hotWallet].lastUpdate) >= limits[userRank].period) {
            return (userRank, limits[userRank].period, limits[userRank].periodUserLimit, 0, 0);
        }

        return (userRank, limits[userRank].period, limits[userRank].periodUserLimit,
            userLimits[hotWallet].periodUsage, userLimits[hotWallet].lastUpdate);
    }

    /**
     * @notice Creates a new rank or changes an existing rank
     * @param _rank Index of the rank
     * @param _period Period duration in seconds
     * @param _periodLimit Period amount limit
     * @param _periodUserLimit Period user amount limit
     */
    function setRank(
        uint256 _rank, 
        uint256 _period, 
        uint256 _periodLimit, 
        uint256 _periodUserLimit) 
        public 
        onlyAdmins 
        {
        require(_period > 0 && _periodLimit > 0 && _periodUserLimit > 0, "Invalid parameters");

        limits[_rank].period = _period;
        limits[_rank].periodLimit = _periodLimit;
        limits[_rank].periodUserLimit = _periodUserLimit;
        limits[_rank].lastUpdate = block.timestamp;
    }
    
    /**
     * @notice Validates the current period limits
     * @param _user Address of the user
     * @param _amount Amount of the purchase
     * @return True if period does not exceed the limits
     */
    function validatePeriod(address _user, uint256 _amount) internal returns (bool) {
        uint256 userRank = rankTracker.getUserRank(_user);
        
        if (block.timestamp.sub(limits[userRank].lastUpdate) >= limits[userRank].period) {
            limits[userRank].periodUsage = 0;
            limits[userRank].lastUpdate = block.timestamp;
        }
        
        if (limits[userRank].periodUsage.add(_amount) <= limits[userRank].periodLimit) {
            limits[userRank].periodUsage = limits[userRank].periodUsage.add(_amount);
            return true;
        }
        
        return false;
    }
    
    /**
     * @notice Validates the user limits
     * @param _user Address of the user
     * @param _amount Amount of the purchase
     * @return True if user does not exceed the limits
     */
    function validateUser(address _user, uint256 _amount) internal returns (bool) {
        (address hotWallet, address coldWallet) = kycProcessTracker.getWallets(_user);
        
        if (hotWallet == address(0)) {
            return false;
        }

        uint256 userRank = rankTracker.getUserRank(hotWallet);
        
        if (block.timestamp.sub(userLimits[hotWallet].lastUpdate) >= limits[userRank].period) {
            userLimits[hotWallet].periodUsage = 0;
            userLimits[hotWallet].lastUpdate = block.timestamp;
        }
        
                
        if (userLimits[hotWallet].periodUsage.add(_amount) <= limits[userRank].periodUserLimit) {
            userLimits[hotWallet].periodUsage = userLimits[hotWallet].periodUsage.add(_amount);
            return true;
        }
        
        return false;
    }
    
    /**
     * @notice Validates both the current period and user limits
     * @dev TODO: validateUser should be more verbose.
     *            eg: If user does not have a hotWallet the error thrown would be "..limit exceeded.."
     * @param _user Address of the user
     * @param _amount Amount of the purchase
     */
    function validate(address _user, uint256 _amount) public onlyOwner returns (bool) {
        require(validatePeriod(_user, _amount), "Period limit has been exceeded");
        require(validateUser(_user, _amount), "User period limit has been exceeded");

        return true;
    }
}
