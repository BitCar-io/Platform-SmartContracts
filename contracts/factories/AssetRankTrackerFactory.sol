pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../platform/ranktracker/AssetRankTracker.sol";

import "../platform/interfaces/IAssetRankTracker.sol";


contract AssetRankTrackerFactory is AbstractFactory {

    /**
     * @notice Constructor
     * @param _config The Registry address
     */
    constructor(address _config) 
            public 
            AbstractFactory(_config) {
    }

    /**
     * @notice Deploys a new Asset
     */
    function create(address _owner) public returns (IAssetRankTracker) {
        AssetRankTracker assetRankTracker = new AssetRankTracker(address(config), _owner);
        addresses.push(address(assetRankTracker));
        emit ContractCreated(msg.sender, address(assetRankTracker));
        return IAssetRankTracker(assetRankTracker);
    }
}