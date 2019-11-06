pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../token/Asset/AssetToken.sol";

import "../token/Asset/IAssetToken.sol";


contract AssetTokenFactory is AbstractFactory {

    /// @notice Constructor
    /// @param _config The Registry address
    constructor(address _config) public AbstractFactory(_config) {
    }

    /// @notice Deploys a new AssetToken
    function create(
        address _owner,
        string memory _name, 
        string memory _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) 
            {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
}
