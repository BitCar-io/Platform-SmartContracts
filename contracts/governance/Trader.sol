pragma solidity >=0.5.0;

import "../libs/rbac/RBACData.sol";
import "./AccessControl.sol";


/// @title Trader
/// @notice The Trader contract has a Traders Group of addresses.
contract Trader is AccessControl {

    /// @notice Constructor needs instance of RBACData 
    /// @param _config Reference to the RBACData contract
    constructor(address _config) public AccessControl(AccessControl.TRADER_ROLE, _config) {
    }

    /// @notice Adds address to Traders Group
    /// @param _addr address
    function addAddressToTradersGroup(address _addr) public onlyAdmins {
        addAddressToGroup(_addr);
        verifyUser(_addr);
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
