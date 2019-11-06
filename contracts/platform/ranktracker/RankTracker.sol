pragma solidity >=0.5.0;

import "../../governance/Groups.sol";
import "../../vendor/SafeMath.sol";

import "../kyc/IKycProcessTracker.sol";


contract RankTracker is Groups {

    using SafeMath for uint256;

    IKycProcessTracker kycProcessTracker;

    /**
     * @notice User hot wallet mapped to the global platform usage
     * "Usage" meaning asset token "consumption"
     */
    mapping(address => uint256) userGlobalUsage;

    /**
     * @notice User current rank
     */
    mapping(address => uint256) userRanks;

    /**
     * @notice Global limits per rank
     */
    mapping(uint256 => uint256) rankGlobalLimits;

    constructor(address _registry) Groups(_registry) public {
        require(_registry != address(0), "Invalid registry address");

        Registry registry = Registry(_registry);

        kycProcessTracker = IKycProcessTracker(registry.getAddress("KycProcessTracker"));
    }

    /**
     * @notice Retrieve global limit for a given rank
     * @param _rank the rank to retrieve global limit for
     * @return Limit in x*10^8 (e.g. $1000 = 1000x10^8)
     */
    function getGlobalLimit(uint256 _rank) external view returns (uint256) {
        return rankGlobalLimits[_rank];
    }

    /**
     * @notice Retrieve global usage for a given user (takes into account hot and cold wallet)
     * @param _user the user to retrieve global usage for
     * @return Global usage in x*10^8 (e.g. $1000 = 1000x10^8)
     */
    function getUserGlobalUsage(address _user) external view returns (uint256) {
        (address hotWallet, address coldWallet) = kycProcessTracker.getWallets(_user);

        if (hotWallet == address(0)) {
            return 0;
        }

        return userGlobalUsage[hotWallet];
    }

    /**
     * @notice Gets the rank for a given user
     * @param _user Index of the rank
     * @return User rank
     */
    function getUserRank(address _user) public view returns (uint256) {
        (address hotWallet, address coldWallet) = kycProcessTracker.getWallets(_user);

        if (hotWallet == address(0)) {
            return 0;
        }

        return userRanks[hotWallet];
    }

    /**
     * @notice Creates a new rank or changes an existing rank (takes into account hot and cold wallet)
     * @dev TODO: Check if rank exists?
     * @param _user Address of the user
     * @param _rank Rank assigned to the user
     */
    function setUserRank(address _user, uint256 _rank) public onlyAdmins {
        (address hotWallet, address coldWallet) = kycProcessTracker.getWallets(_user);
        
        if (hotWallet == address(0)) {
            return;
        }

        userRanks[hotWallet] = _rank;
    }

    /**
     * @notice Set global limit
     * @param _rank Rank assigned to the user
     * @param _limit Limit amount in asset tokens
     */
    function setGlobalLimit(uint256 _rank, uint256 _limit) public onlyAdmins {
        require(_limit > 0, "Limit needs to be bigger than 0");

        rankGlobalLimits[_rank] = _limit;
    }

     /**
     * @notice Validates a user and its rank against the global limits
     * @dev TODO: Validation only happens if the user is KYC'd, should it
     * happen for all the traders/transfers on the platform?
     * @param _from Sender of the transaction
     * @param _to Receiver of the transaction
     * @param _amount Amount being transacted
     */
    function validateGlobalLimits(address _from, address _to, uint256 _amount) external onlyAssets returns (bool) {
        (address hotWallet, address coldWallet) = kycProcessTracker.getWallets(_to);

        // If the user is transferring between hot and cold wallet limits are non applicable
        if (
            (_from == hotWallet && _to == coldWallet) ||
            (_to == hotWallet && _from == coldWallet)
            ) {
                return true;
        }

        if (hotWallet != address(0)) {
            address user = hotWallet;
            uint256 userRank = getUserRank(user);

            if (isTrader(user)) {

                if (userGlobalUsage[user].add(_amount) > rankGlobalLimits[userRank]) {
                    return false;
                }

                userGlobalUsage[user] = userGlobalUsage[user].add(_amount);
            }
        }

        return true;
    }
}
