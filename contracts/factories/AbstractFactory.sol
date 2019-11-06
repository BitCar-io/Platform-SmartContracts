pragma solidity >=0.5.0;

import "../platform/Registry.sol";
import "../governance/Groups.sol";


contract AbstractFactory is Groups {

    address[] internal addresses;
    Registry internal config;

    event ContractCreated(address indexed createdBy, address indexed contractAddress);

    /// @notice Constructor
    /// @param _config The Registry address
    constructor(address _config) public Groups(_config) {
        require(_config != address(0), "_config address cannot be 0");
        config = Registry(_config);
    }

    /// @notice Gets an address for a given index
    /// @param _index Address index
    /// @return Addresses address
    function get(uint256 _index) public view returns (address) {
        return addresses[_index];
    }

    /// @notice Gets the size of the addresses array
    /// @return Array size
    function size() public view returns (uint256) {
        return addresses.length;
    }
}
