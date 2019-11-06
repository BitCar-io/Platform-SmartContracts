pragma solidity >=0.5.0;

import "../platform/Registry.sol";

import "../token/Platform/IPlatformToken.sol";

import "../token/Asset/IAssetToken.sol";

import "./interfaces/IFee.sol";


contract Fee is IFee {
    Registry config;

    IPlatformToken platformToken;
    IAssetToken assetToken;

    // Find better name
    address payable claimerAddress;

    modifier onlyClaimer() {
        require(msg.sender == claimerAddress, "Only the claimer can perform this action");
        _;
    }

    /**
     * @notice Constructor
     * @param _config The Registry address
     * @param _claimerAddress The Registry address
     * @param _assetTokenAddress The Registry address
     */
    constructor(address _config, address payable _claimerAddress, address _assetTokenAddress) public {
        require(_config != address(0), "Invalid registry address");
        require(_claimerAddress != address(0), "Invalid claimer address");
        require(_assetTokenAddress != address(0), "Invalid asset token address");
        
        config = Registry(_config);

        claimerAddress = _claimerAddress;

        platformToken = IPlatformToken(config.getAddress("PlatformToken"));
        assetToken = IAssetToken(_assetTokenAddress);
    }

    function claimEth() public onlyClaimer {
        claimerAddress.transfer(address(this).balance);
    }

    function claimPlatformTokens() public onlyClaimer {
        require(platformToken.transfer(msg.sender, platformToken.balanceOf(address(this))), "Unable transfer Platform tokens to the claimer");
    }

    function claimAssetTokens() public onlyClaimer {
        require(assetToken.transfer(msg.sender, assetToken.balanceOf(address(this))), "Unable transfer Asset tokens to the claimer");
    }

    function getPlatformTokenBalance() public view returns (uint256) {
        return platformToken.balanceOf(address(this));
    }

    function getAssetTokenBalance() public view returns (uint256) {
        return assetToken.balanceOf(address(this));
    }
}