pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../platform/Asset.sol";


contract AssetFactory is AbstractFactory {

    /// @notice Constructor
    /// @param _config The Registry address
    constructor(address _config) 
            public 
            AbstractFactory(_config) {
    }

    /// @notice Deploys a new Asset
    function create() 
        public 
        onlyAgents  
        returns (Asset) 
        {
        Asset asset = new Asset(address(config), msg.sender);
        assetAccCtrl.registerComponent(address(asset));

        addresses.push(address(asset));
        emit ContractCreated(msg.sender, address(asset));
        return asset;
    }
}
