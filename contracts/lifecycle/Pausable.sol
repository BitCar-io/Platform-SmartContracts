pragma solidity >=0.5.0;

import "../governance/Groups.sol";
import "../libs/ownership/Ownable.sol";


/**
 * @title Pausable
 * @notice Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is Groups, Ownable {

    event Pause();
    event Resume();

    bool public paused = false;

    /**
     * @notice Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    /**
     * @notice Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(paused, "Contract is NOT paused");
        _;
    }

    /**
     * @param _config From Groups contract. References to AccessControl contracts.
     */
    constructor(address _config) public Groups(_config) {
    }

    /**
     * @notice called by the owner to pause, triggers stopped state.
     */
    function pause() public onlySudoOrOwner whenNotPaused {
        paused = true;
        emit Pause();
    }

    /**
     * @notice called by the owner to unpause, returns to normal state.
     */
    function resume() public onlySudoOrOwner whenPaused {
        paused = false;
        emit Resume();
    }
}
