pragma solidity >=0.5.0;

import "../libs/rbac/RBACData.sol";
import "./AccessControl.sol";

 
/// @title Agent
/// @notice The Agent contract has a Agents Group of addresses, 
/// and provides basic authorization control functions.
/// This simplifies the implementation of "user permissions".
contract Agent is AccessControl {

    /// @notice Constructor needs instance of RBACData 
    /// @param _config Reference to the RBACData contract
    constructor(address _config) public AccessControl(AccessControl.AGENT_ROLE, _config) {
    }

    /// @notice Adds address to Agents Group
    /// @param _addr address
    function addAddressToAgentsGroup(address _addr) public onlyAdmins {
        addAddressToGroup(_addr);
    }

    /// @notice Changes the verified flag of the User
    /// @param _addr address
    /// @param _verified true / false
    function verify(address _addr, bool _verified) public onlyAdmins {
        if (_verified) {
            verifyUser(_addr);
        } else {
            unVerifyUser(_addr);
        }
    }
}
