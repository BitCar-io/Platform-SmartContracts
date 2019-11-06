pragma solidity >=0.5.0;

import "../governance/Groups.sol";


contract Whitelist is Groups {

    mapping(address => mapping(uint256 => bool)) whitelists;

    constructor(address _registry) Groups(_registry) public {
    }

    /**
     * @notice Add an address to the whitelist
     * @param _address Address to be added
     * @param _country Country to be added, countries are numbers
     */
    function add(address _address, uint256 _country) public onlyAdmins {
        whitelists[_address][_country] = true;
    }

    /**
     * @notice Remove an address to the whitelist
     * @param _address Address to be added
     * @param _country Country to be added, countries are numbers
     */
    function remove(address _address, uint256 _country) public onlyAdmins {
        whitelists[_address][_country] = false;
    }

    /**
     * @notice Check if an address is whitelisted for the given countries array
     * @param _address Address to be added
     * @param _countries Array with countries to be checked
     */
    function isWhitelisted(address _address, uint256[] memory _countries) public view returns (bool) {
        for (uint256 i = 0; i < _countries.length; i++) {
            if (whitelists[_address][_countries[i]]) {
                return true;
            }
        }

        return false;
    }
}