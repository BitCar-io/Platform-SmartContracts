pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../platform/Fee.sol";

import "../platform/interfaces/IFee.sol";


contract FeeFactory is AbstractFactory {

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
    function create(address payable _claimer, address _token) public returns (IFee) {
        Fee fee = new Fee(address(config), _claimer, _token);
        addresses.push(address(fee));
        emit ContractCreated(msg.sender, address(fee));
        return IFee(fee);
    }
}
