pragma solidity >=0.5.0;

import "../libs/rbac/RBACData.sol";
import "./AccessControl.sol";


/// @title Sudo
/// @notice The Sudo contract has a SUDO Group of addresses
contract Sudo is AccessControl {

    /// @notice Constructor needs instance of RBACData 
    /// @param _config Reference to the RBACData contract
    constructor(address _config) public AccessControl(AccessControl.SUDO_ROLE, _config) {
    }

    /// @notice Adds address to Sudo Group
    /// @param _addr address
    function addAddressToSudoGroup(address _addr) public onlySudoOrOwner {
        addAddressToGroup(_addr);
        verifyUser(_addr);
    }

    /// @notice Removes address from Sudo Group
    /// @param _addr address
    function removeAddressFromSudoGroup(address _addr) public onlySudoOrOwner {
        unVerifyUser(_addr);
        removeAddressFromGroup(_addr);
    }
}
