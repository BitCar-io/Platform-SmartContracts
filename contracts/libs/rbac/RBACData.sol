pragma solidity >=0.5.0;

import "./Roles.sol";
import "../ownership/Ownable.sol";


/// @title RBACData (Role-Based Access Control Data)
/// @notice Stores and provides setters and getters for roles and addresses.
/// Supports unlimited numbers of roles and addresses.
contract RBACData is Ownable {

    using Roles for Roles.Role;                                 // Data structure that hold the roles information of the platform
    mapping (string => Roles.Role) private roles;               // Roles Strings descriptions  to -> addresses 
    mapping (string => uint256) private roleMembersCount;       // Role members Count.
    mapping (string => uint256) private verifiedMembersCount;   // Verified Users members Count per role.

    event RoleAdded(address indexed _operator, string _role);
    event RoleRemoved(address indexed _operator, string _role);
    event UserVerified(address indexed _operator, string _role);
    event UserUnverified(address indexed _operator, string _role);

    /// @notice reverts if addr does not have role
    /// @param _operator address
    /// @param _role the name of the role
    /// reverts
    function checkRole(address _operator, string memory _role) public onlyImmediateOwnerOrWhitelisted view {
        roles[_role].check(_operator);
    }

    /// @notice determine if addr has role
    /// @param _operator address
    /// @param _role the name of the role
    /// @return bool
    function hasRole(address _operator, string memory _role) public onlyImmediateOwnerOrWhitelisted view returns (bool) {
        return roles[_role].has(_operator);
    }

    /// @notice add a role to an address
    /// @param _operator address
    /// @param _role the name of the role
    function addRole(address _operator, string memory _role) public onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role) == false) {
            roles[_role].add(_operator);
            roleMembersCount[_role]++;
            emit RoleAdded(_operator, _role);
        }
    }

    /// @notice remove a role from an address
    /// @param _operator address
    /// @param _role the name of the role
    function removeRole(address _operator, string memory _role) public onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role)) {
            roles[_role].remove(_operator);
            roleMembersCount[_role]--;
            emit RoleRemoved(_operator, _role);
        }
    }

    /// @notice Returns the count of role members
    /// @return Returns the count of role members
    function getRoleMembersCount(string memory _role) public view returns (uint256) {
        return roleMembersCount[_role];
    }

    /// @notice determine if addr is verified
    /// @param _operator address
    /// @param _role the name of the role
    /// @return bool
    function isVerifiedUser(address _operator, string memory _role) public onlyImmediateOwnerOrWhitelisted view returns (bool) {
        return roles[_role].verified(_operator);
    }

    /// @notice Sets to TRUE the verified flag for the addr (_operator)
    /// @param _operator address
    /// @param _role the name of the role
    function verifyUser(address _operator, string memory _role) public onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role) == true) {
            roles[_role].verify(_operator);
            verifiedMembersCount[_role]++;
            emit UserVerified(_operator, _role);
        }
    }

    /// @notice Sets to FALSE the verified flag for the addr (_operator)
    /// @param _operator address
    /// @param _role the name of the role
    function unVerifyUser(address _operator, string memory _role) public onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role) == true) {
            roles[_role].unverify(_operator);
            verifiedMembersCount[_role]--;
            emit UserUnverified(_operator, _role);
        }
    }
}
