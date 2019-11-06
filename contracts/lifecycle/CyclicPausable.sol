pragma solidity >=0.5.0;

import "./TimePausable.sol";


/// @title CyclicPausable
/// @notice Base contract which allows a child object to implement a cyclic time based start/stop mechanism.
///
///                         |-------CYCLE 1--------|-------CYCLE 2--------|-------CYCLE 3--------|  . . .
///                         |                      |                      |                      |
///                            UPPER WAVE             UPPER WAVE             UPPER WAVE           
///                         /-------^-------\      /-------^-------\      /-------^-------\      /
/// |=== . . . =|===========|===============|======|===============|======|===============|======|= . . . ====> TIME (in seconds)
/// ^           ^           ^               \------/               \------/               \------/
/// 0           |-- DELTA --|              LOWER WAVE             LOWER WAVE             LOWER WAVE
///                         | 
///                       BIRTH
contract CyclicPausable is TimePausable {

    uint256 public upperWave;
    uint256 public lowerWave;
    uint8 public maxCycles;

    /// @notice While block.timestamp falls within the UpperWave, execution will be allowed.
    modifier whileIsInUpperWave() {
        require((isInUpperWave() && isWithinLifespan()) || disabled, "Execution only allowed in UpperWave.");
        _;
    }

    /// @notice While block.timestamp falls within the LowerWave, execution will be allowed.
    modifier whileIsInLowerWave() {
        require((!isInUpperWave() && isWithinLifespan()) || disabled, "Execution only allowed in LowerWave.");
        _;
    }

    /// @notice Validates if the current cycle is NOT the lastone
    modifier isNotLastCycle() {
        require((getCycle() < maxCycles) || (maxCycles == 0) || disabled, "It is the last cycle.");
        _;
    }

    /// @notice Validates if the contract is within the lifespan
    modifier withinLifespan() {
        require(isWithinLifespan() || disabled, "Already expired.");
        _;
    }

    /// @param _upperWave The period (in seconds) for the UpperWave
    /// @param _lowerWave The period (in seconds) for the LowerWave
    /// @param _maxCycles The maximum number of cycles. maxCycles = 0 for infinite number of cycles
    /// @param _config From Groups contract. References to AccessControl contracts.
    constructor(
        uint256 _upperWave, 
        uint256 _lowerWave, 
        uint8 _maxCycles, 
        address _config) 
            public 
            TimePausable(
                _upperWave.add(_lowerWave), 
                _config) 
                {
        upperWave = _upperWave;
        lowerWave = _lowerWave;
        maxCycles = _maxCycles;
    }

    /// @notice Calculates the element R needed for the majority of calculations
    function getR() private view returns (uint256) {
        uint256 currTime = block.timestamp;
        return currTime.sub(((currTime.sub(birth)).div(expiration)).mul(expiration));
    }

    /// @notice Returns TRUE if block.timestamp falls within the UpperWave, FALSE otherwise.
    function isInUpperWave() public view onlyIfActivated onlyIfDeltaHasExpired returns (bool) {
        uint256 r = getR();
        return ((birth <= r) && (r < (birth.add(upperWave)))) ? (true) : (false);
    }

    /// @notice Depending on the TimeStamp, returns the corresponding cycle number.
    function getCycle() public view onlyIfActivated onlyIfDeltaHasExpired returns (uint256) {
        return (block.timestamp.sub(birth)).div(expiration).add(1);
    }

    /// @notice Returns FALSE if the current cycle is greater than maxCycles, in other words, expired. TRUE otherwise.
    /// Returns always TRUE if maxCycles is 0
    function isWithinLifespan() public view onlyIfActivated onlyIfDeltaHasExpired returns (bool) {
        return (getCycle() <= maxCycles || maxCycles == 0);
    }

    /// @notice Gets the progress for the current cycle as %
    function getCycleProgress() public view onlyIfActivated onlyIfDeltaHasExpired returns (uint256) {
        return getR().sub(birth).mul(100).div(expiration);
    }
}
