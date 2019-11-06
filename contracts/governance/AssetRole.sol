pragma solidity >=0.5.0;

import "../libs/rbac/RBACData.sol";
import "./AccessControl.sol";
import "../libs/ownership/Ownable.sol";


/// @title AssetRole
contract AssetRole is Ownable, AccessControl {

    /// @notice Constructor needs instance of RBACData 
    /// @param _config Reference to the RBACData contract
    constructor(address _config) public AccessControl(AccessControl.ASSET_ROLE, _config) {
    }

    /// @notice Adds address to Assets Group
    /// @param _addr address
    function addAddressToAssetsGroup(address _addr) public onlyWhitelisted {
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
