pragma solidity >=0.5.0;


/// @title Roles
/// @author Francisco Giordano (@frangio). OpenZeppellin
/// @dev Library for managing addresses assigned to a Role.
/// See RBAC.sol for example usage.
library Roles {

    struct Role {
        mapping (address => bool) bearer;
        mapping (address => bool) verified_bearer;
    }

    /// @dev give an address access to this role
    function add(Role storage role, address _addr) internal {
        role.bearer[_addr] = true;
    }

    /// @dev remove an address' access to this role
    function remove(Role storage role, address _addr) internal {
        role.bearer[_addr] = false;
        role.verified_bearer[_addr] = false;
    }

    /// @dev check if an address has this role. reverts.
    function check(Role storage role, address _addr) internal view {
        require(has(role, _addr), "This address doesn't correspond with the role specified.");
    }

    /// @dev check if an address has this role
    /// @return bool
    function has(Role storage role, address _addr) internal view returns (bool) {
        return role.bearer[_addr];
    }

    /// @dev Changes the verfified flag to TRUE for the addr
    function verify(Role storage role, address _addr) internal {
        role.verified_bearer[_addr] = true;
    }

    /// @dev Changes the verfified flag to FALSE for the addr
    function unverify(Role storage role, address _addr) internal {
        role.verified_bearer[_addr] = false;
    }

    /// @dev check if an address is verified
    /// @return bool
    function verified(Role storage role, address _addr) internal view returns (bool) {
        return role.verified_bearer[_addr];
    }
}
