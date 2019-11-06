pragma solidity >=0.5.0;

import "./AbstractFactory.sol";
import "../platform/Claimer.sol";

import "../platform/interfaces/IClaimer.sol";


contract ClaimerFactory is AbstractFactory {

    /**
     * @notice Constructor
     * @param _config The Registry address
     */
    constructor(address _config) 
            public 
            AbstractFactory(_config) {
    }

    /**
     * @notice Deploys a new Car
     */
    function create(address _assetTokenAddress) public returns (IClaimer) {
        Claimer claimer = new Claimer(address(config), _assetTokenAddress);
        addresses.push(address(claimer));
        emit ContractCreated(msg.sender, address(claimer));
        return IClaimer(claimer);
    }
}
