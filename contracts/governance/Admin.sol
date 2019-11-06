pragma solidity >=0.5.0;

import "../libs/rbac/RBACData.sol";
import "./AccessControl.sol";


/// @title Admin
/// @notice The Admin contract has a Admin Group of addresses, 
/// and provides basic authorization control functions.
/// This simplifies the implementation of "user permissions".
contract Admin is AccessControl {

    /// @notice Constructor needs instance of RBACData 
    /// @param _config Reference to the RBACData contract
    constructor(address _config) public AccessControl(AccessControl.ADMIN_ROLE, _config) {
    }

    /// @notice Adds address to Admin Group
    /// @param _addr address
    function addAddressToAdminGroup(address _addr) public onlySudoOrOwner {
        addAddressToGroup(_addr);
    }

    /// @notice Changes the verified flag of the User
    /// @param _addr address
    /// @param _verified true / false
    function verify(address _addr, bool _verified) public onlySudoOrOwner {
        if (_verified) {
            verifyUser(_addr);
        } else {
            unVerifyUser(_addr);
        }
    }
}
