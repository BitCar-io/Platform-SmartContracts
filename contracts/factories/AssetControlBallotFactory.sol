pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../platform/AssetControlBallot.sol";

import "../platform/interfaces/IAssetControlBallot.sol";


contract AssetControlBallotFactory is AbstractFactory {

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
    function create(address _assetAddress, address _assetTokenAddress, uint256 _minSoldTokensPercentage, uint256 _defaultMinVotePercentage, uint256 _defaultVoteRunningPeriod) public returns (IAssetControlBallot) {
        AssetControlBallot assetControlBallot = new AssetControlBallot(address(config), _assetAddress, _assetTokenAddress, _minSoldTokensPercentage, _defaultMinVotePercentage, _defaultVoteRunningPeriod);
        addresses.push(address(assetControlBallot));
        emit ContractCreated(msg.sender, address(assetControlBallot));
        return IAssetControlBallot(assetControlBallot);
    }
}