pragma solidity >=0.5.0;

import "./Registry.sol";
import "../token/Platform/IPlatformToken.sol";
import "../token/Asset/IAssetToken.sol";

import "../vendor/SafeMath.sol";

import "./interfaces/IFee.sol";

import "./interfaces/IBEE.sol";


contract BEE is IFee, IBEE {
    Registry config;
    IPlatformToken platformToken;
    IAssetToken assetToken;

    using SafeMath for uint256;

    /// MODIFIERS ///
    /**
     * @notice Are claims enabled for the associated asset token
     */
    modifier assetClaimsEnabled() {
        require(assetToken.canClaim(), "Claims are disabled for this Asset Token");
        _;
    }

    /**
     * @notice Checks if an user can still claim tokens
     */
    modifier canSenderClaim() {
        require(assetToken.balanceOf(msg.sender) > claimers[msg.sender], "User already claimed all asset tokens");
        _;
    }

    /// EVENTS ///
    /**
     * @notice Event that logs successful claims
     */
    event Claimed(address _address, uint256 _amountPlatformTokens, uint256 _amountAssetTokens);

    // Total cost
    uint256 totalFee;

    uint256 ratio = 0; // BCT -> CT ratio

    /**
     * @notice Stores successful claims
     */
    mapping(address => uint256) claimers;

    constructor(address _config, address _assetTokenAddress, uint256 _totalFee) public {
        require(_config != address(0), "Invalid registry address");
        require(_assetTokenAddress != address(0), "Invalid asset token address");
        
        config = Registry(_config);
        platformToken = IPlatformToken(config.getAddress("PlatformToken"));
        assetToken = IAssetToken(_assetTokenAddress);

        totalFee = _totalFee;
    }

    // TODO: Check security around this method
    function getRatio() public returns (uint256) {
        if (ratio > 0) {
            return ratio;
        }

        uint256 assetTokensSold = assetToken.totalSupply().sub(assetToken.balanceOf(assetToken.getOwner())); // totalSupply - unsoldTokens
        uint256 escrowFullBalance = getPlatformTokenBalance().mul(100); // More resolution

        ratio = escrowFullBalance.div(assetTokensSold);

        return ratio;
    }

    function assetTokensToPlatformTokens(uint256 _amount) public returns (uint256) {
        require(getRatio() > 0, "Ratio needs to be bigger than 0");
        return (_amount.mul(getRatio())).div(100); // Get rid of resolution
    }

    function claimEth() public {
    }

    /**
     * @notice Amount of car tokens to claim and receive bitcar tokens in return
     */
    function claimPlatformTokens() public assetClaimsEnabled canSenderClaim {
        require(assetToken.balanceOf(msg.sender) > 0, "Sender does not have any tokens");

        // Asset token user balance
        uint256 userAssetBalance = assetToken.balanceOf(msg.sender);
        uint256 platformTokens = assetTokensToPlatformTokens(userAssetBalance);

        require(platformToken.transfer(msg.sender, platformTokens), "Could not transfer tokens to user");

        claimers[msg.sender].add(userAssetBalance);

        emit Claimed(msg.sender, platformTokens, userAssetBalance);
    }

    function claimAssetTokens() public {
    }

    function getPlatformTokenBalance() public view returns (uint256) {
        return platformToken.balanceOf(address(this));
    }

    function getAssetTokenBalance() public view returns (uint256) {
        return assetToken.balanceOf(address(this));
    }
}