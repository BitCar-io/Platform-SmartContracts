pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../platform/FeeManager.sol";

import "../platform/interfaces/IFeeManager.sol";


contract FeeManagerFactory is AbstractFactory {

    /**
     * @notice Constructor
     * @param _config The Registry address
     */
    constructor(address _config) 
            public 
            AbstractFactory(_config) {
    }

    /**
     * @notice Deploys a new FeeManager
     */
    function create(address _asset) public returns (IFeeManager) {
        FeeManager feeManager = new FeeManager(address(config), _asset);
        addresses.push(address(feeManager));
        emit ContractCreated(msg.sender, address(feeManager));
        return IFeeManager(feeManager);
    }
}
