pragma solidity >=0.5.0;


/// @title Guards agains rentrancy attacks.
/// @notice If you mark a function `nonReentrant`, you should also mark it `external`.
contract ReentrancyLock {

    bool private rentrancyLock = false;

    /// @dev Prevents a contract from calling itself, directly or indirectly.
    /// @notice If you mark a function `nonReentrant`, you should also mark it `external`. 
    modifier nonReentrant() {
        require(!rentrancyLock, "Re-entrancy not allowed");
        rentrancyLock = true;
        _;
        rentrancyLock = false;
    }
}
