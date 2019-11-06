pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../whitelist/AssetWhitelist.sol";

import "../platform/interfaces/IAssetWhitelist.sol";


contract AssetWhitelistFactory is AbstractFactory {

    /// @notice Constructor
    /// @param _config The Registry address
    constructor(address _config) 
            public 
            AbstractFactory(_config) {
    }

    /// @notice Deploys a new AssetWhitelist
    function create(address _assetAddress, address _claimerAddress) public returns (IAssetWhitelist) {
        AssetWhitelist assetWhitelist = new AssetWhitelist(address(config), _assetAddress, _claimerAddress);
        addresses.push(address(assetWhitelist));
        emit ContractCreated(msg.sender, address(assetWhitelist));
        return IAssetWhitelist(assetWhitelist);
    }
}
