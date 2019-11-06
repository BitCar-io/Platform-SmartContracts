pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../platform/BEE.sol";

import "../platform/interfaces/IBEE.sol";


contract BEEFactory is AbstractFactory {

    /// @notice Constructor
    /// @param _config The Registry address
    constructor(address _config) 
            public 
            AbstractFactory(_config) {
    }

    /// @notice Deploys a new FeeManager
    function create(address _assetTokenAddress, uint256 _totalFee) public returns (IBEE) {
        BEE bee = new BEE(address(config), _assetTokenAddress, _totalFee);
        addresses.push(address(bee));
        emit ContractCreated(msg.sender, address(bee));
        return IBEE(bee);
    }
}
