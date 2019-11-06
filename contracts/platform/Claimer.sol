pragma solidity >=0.5.0;

import "../platform/Registry.sol";
import "./Ticker.sol";
import "../token/Platform/IPlatformToken.sol";
import "../token/Asset/IAssetToken.sol";

import "../vendor/SafeMath.sol";

import "./interfaces/IFee.sol";

import "./interfaces/IClaimer.sol";


contract Claimer is IFee, IClaimer {

    /// DEPENDENCIES ///
    Registry config;
    Ticker ticker;
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

    /**
     * @notice Event that logs successful claimer funding
     */
    event Funded(address _address, uint256 _amountPlatformTokens);

    /// VARIABLES ///
    /**
     * @notice True if this claimer is fully funded with platform tokens to covert the total supply of asset tokens
     */
    bool isClaimerFunded = false;

    /**
     * @notice Platform token price at the time claims were enabled
     */
    uint256 fundedTicker;

    /**
     * @notice Stores successful claims
     */
    mapping(address => uint256) claimers;

    /**
     * @notice Constructor
     * @param _config Storage config address
     * @param _assetTokenAddress Address of the asset this claimer will be associated with
     */
    constructor(address _config, address _assetTokenAddress) public {
        require(_config != address(0), "Invalid registry address");
        require(_assetTokenAddress != address(0), "Invalid asset token address");

        config = Registry(_config);
        ticker = Ticker(config.getAddress("Ticker"));
        platformToken = IPlatformToken(config.getAddress("PlatformToken"));
        assetToken = IAssetToken(_assetTokenAddress);
    }

    /**
     * @notice Checks if enough bitcar tokens are held under the claimer for this particular CarToken
     * @return true if claimer has enough platform tokens, false otherwise
     */
    function hasEnoughPlatformTokens() internal view returns (bool) {
        if (platformToken.balanceOf(address(this)) == 0) {
            return false;
        }

        uint256 claimerBalance = platformToken.balanceOf(address(this)); // Claimer Platform token balance
        uint256 claimerBalanceUSD = ticker.unitsToUSD(claimerBalance); // Claimer Platform token balance in USD
        uint256 assetTokenSupply = assetToken.totalSupply(); // Asset total supply

        if (claimerBalanceUSD >= assetTokenSupply) {
            return true;
        }

        return false;
    }
    
    /**
     * @notice Converts asset tokens to platform tokens based on the funded ticker
     * @dev TODO: Deal with decimals
     * @param _amount The amount of asset tokens
     * @return Converted amount
     */
    function assetTokensToPlatformTokens(uint256 _amount) public view returns (uint256) {
        return (_amount.mul((10 ** 8))).div(fundedTicker);
    }
    
    /**
     * @notice Called by the agent to notify that this claimer was fully funded
     * @dev TODO: Only asset agent can call this function? Check ticker price? ( > 0 )
     */
    function claimerFunded() public assetClaimsEnabled {
        require(hasEnoughPlatformTokens(), "Claimer does not have enough platform tokens to allow claims");

        fundedTicker = ticker.getUSD();
        isClaimerFunded = true;
    }

    function claimEth() public {
    }

    function claim() public {
    }

    /**
     * @notice Amount of car tokens to claim and receive bitcar tokens in return
     */
    function claimPlatformTokens() public assetClaimsEnabled canSenderClaim {
        require(assetToken.balanceOf(msg.sender) > 0, "Sender does not have enough balance");
        require(isClaimerFunded, "This claimer is not fully funded");
        require(assetToken.isWhitelistAllowed(address(this), msg.sender), "User is not whitelisted");

        // Asset token user balance
        uint256 userAssetBalance = assetToken.balanceOf(msg.sender);
        uint256 convertedPlatformTokens = assetTokensToPlatformTokens(userAssetBalance);

        require(platformToken.transfer(msg.sender, convertedPlatformTokens), "Unable to perform token transfer");

        claimers[msg.sender].add(userAssetBalance);

        emit Claimed(msg.sender, convertedPlatformTokens, userAssetBalance);
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