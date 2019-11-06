pragma solidity >=0.5.0;

import "../libs/rbac/RBACData.sol";
import "../platform/Registry.sol";
import "../libs/Wallet.sol";


/// @title AccessControl
/// @notice Contract that encapsules the basic functionality that allows 
/// users permissions management
contract AccessControl is Wallet {

    string public constant SUDO_ROLE = "SUDO";                  // Super User DO
    string public constant ADMIN_ROLE = "ADMIN";                // Administrators
    string public constant AGENT_ROLE = "AGENT";                // Bitcar Agents
    string public constant TRADER_ROLE = "TRADER";              // Bitcar Traders
    string public constant ASSET_ROLE = "ASSET";                // Bitcar Traders
    RBACData private rbacData;                                  // The reference to the RBACData contract previously created 
    string private role;                                        // The role specified in the constructor

    /// @notice Throws if msg.sender is not from the Group
    modifier onlyRole() {
        checkRole(msg.sender);
        _;
    }

    /// @notice Throws if called by any account other than the owner.
    modifier onlyOwner() {
        bool isOwner = (msg.sender == getOwnerAddress());
        require(isOwner, "msg.sender is not the Owner.");
        _;
    }

    /// @notice Throws if msg.sender is not from the Sudo Group
    modifier onlySudo() {
        require(isRole(msg.sender, AccessControl.SUDO_ROLE), "Only a Sudo Member can execute this function.");
        _;
    }

    /// @notice Throws if msg.sender is not from the Sudo Group or The Owner
    modifier onlySudoOrOwner() {
        bool isOwner = (msg.sender == getOwnerAddress());
        bool isSudo = isRole(msg.sender, AccessControl.SUDO_ROLE);
        require(isOwner || isSudo, "Only a Sudo Member or Owner can execute this function.");
        _;
    }

    /// @notice Throws if msg.sender is not from the Admin Group
    modifier onlyAdmins() {
        bool isAdmin = isRole(msg.sender, AccessControl.ADMIN_ROLE);
        bool isVerifiedAdmin = rbacData.isVerifiedUser(msg.sender, AccessControl.ADMIN_ROLE);
        require(isAdmin && isVerifiedAdmin, "Only a Admin Member can execute this function.");
        _;
    }

    /// @notice Role and RBACData are needed
    /// @param _role The role as String
    /// @param _config Reference to the RBACData contract
    constructor(
            string memory _role, 
            address _config) 
            public {
        role = _role;
        require(_config != address(0), "_config address cannot be 0");
        rbacData = RBACData(Registry(_config).getAddress("RBACData"));
    }

    /// @notice reverts if addr does not have role
    /// @param _operator address
    /// Reverts if the _addr DOES NOT belongs to the groups
    function checkRole(address _operator) public view {
        rbacData.checkRole(_operator, role);
    }

    /// @notice Determines if the given address belongs to this group.
    /// @param _addr address
    /// @param _role the role in particular that needs to be validated
    /// @return TRUE if the _addr belongs to the group, otherwise FALSE
    function isRole(address _addr, string memory _role) internal view returns (bool) {
        return rbacData.hasRole(_addr, _role);
    }

    /// @notice Determines if the given address belongs to this group.
    /// @param _addr address
    /// @return TRUE if the _addr belongs to the group, otherwise FALSE
    function isRole(address _addr) public view returns (bool) {
        return rbacData.hasRole(_addr, role);
    }

    /// @notice Adds address to Group.
    /// @param _addr address
    function addAddressToGroup(address _addr) internal {
        rbacData.addRole(_addr, role);
    }

    /// @notice Removes address from Group.
    /// @param _addr address
    function removeAddressFromGroup(address _addr) internal {
        rbacData.removeRole(_addr, role);
    }

    /// @notice determine if addr is verified
    /// @param _addr address
    function isVerifiedUser(address _addr) public view returns (bool) {
        return rbacData.isVerifiedUser(_addr, role);
    }

    /// @notice Sets to TRUE the verified flag for the addr (_operator)
    /// @param _addr address
    function verifyUser(address _addr) internal {
        rbacData.verifyUser(_addr, role);
    }

    /// @notice Sets to FALSE the verified flag for the addr (_operator)
    /// @param _addr address
    function unVerifyUser(address _addr) internal {
        rbacData.unVerifyUser(_addr, role);
    }

    /// @notice Returns the number of members of the Group.
    /// @return the number of members of the Group
    function getRoleMembersCount() public view returns (uint256) {
        return rbacData.getRoleMembersCount(role);
    }

    /// @notice Returns the address of The Owner.
    /// @return The address of the Owner
    function getOwnerAddress() public view returns (address payable) {
        return rbacData.getImmediateOwnerAddress();
    }
}
