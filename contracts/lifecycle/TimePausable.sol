pragma solidity >=0.5.0;

import "./Pausable.sol";
import "../vendor/SafeMath.sol";


/**
 * @title TimePausable
 * @notice Base contract which allows children to implement a time based stop mechanism.
 */
contract TimePausable is Pausable {

    using SafeMath for uint256;

    // The birthdate of the contract one is activated
    uint256 public birth = ~uint256(0);
    // Expiration time
    uint256 public expiration;
    // Disables Time Validation mechanisms
    bool public disabled = false;
    // TRUE if contract has been activated 
    bool public activated = false;

    /**
     * @notice Validates if the contract is activated or not
     */
    modifier onlyIfActivated() {
        require(activated, "Contract is set to be activated in the future.");
        _;
    }

    /**
     * @notice Validates if the delta has expired
     */
    modifier onlyIfDeltaHasExpired() {
        require(hasDeltaExpired(), "Delta hasn't expired yet");
        _;
    }

    /**
     * @notice If used, will prevent a function to be called when 
     * the expiration time (in seconds) is over.
     */
    modifier whileExpires() {
        require(!hasExpired() || disabled, "Execution capability already expired.");
        _;
    }

    /**
     * @notice If used, will prevent a function to be called before expiration time
     */
    modifier whileAlreadyExpired() {
        require(hasExpired() || disabled, "Execution capability has NOT expired.");
        _;
    }

    /**
     * @param _expiration Time in seconds that a function will be allowed to be 
     * called if the whileExpires modifier is used.
     * @param _config From Groups contract. References to AccessControl contracts.
     */
    constructor(uint256 _expiration, address _config) public Pausable(_config) {
        expiration = _expiration;
    }

    /**
     * @notice Returns TRUE or FALSE if the expiration time (in seconds) is over.
     */
    function hasExpired() public view onlyIfActivated returns (bool) {
        return ((block.timestamp.sub(birth)) > expiration);
    }

    /**
     * @notice If the time validation mechanism was disabled, this enables it again.
     */
    function enableTimeValidation() public onlyIfActivated onlySudoOrOwner {
        disabled = false;
    }

    /**
     * @notice Disables the time validation mechanism.
     */
    function disableTimeValidation() public onlyIfActivated onlySudoOrOwner {
        disabled = true;
    }

    /**
     * @notice Returns TRUE if the delta has already expired compared to the current timestamp
     */
    function hasDeltaExpired() public view returns (bool) {
        return (birth <= block.timestamp);
    }

    /**
     * @notice Activates the contract
     * @param _delta The amount of time in seconds before the protected functions can be executed
     */
    function activate(uint256 _delta) public onlyImmediateOwnerOrWhitelisted {
        if (activated == false) {
            birth = block.timestamp + _delta;
            activated = true;
        }
    }
}
