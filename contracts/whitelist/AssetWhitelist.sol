pragma solidity >=0.5.0;

import "../platform/Registry.sol";
import "./Whitelist.sol";

import "../governance/Groups.sol";

import "../platform/interfaces/IAssetWhitelist.sol";


contract AssetWhitelist is Groups, IAssetWhitelist {
    
    Registry internal registry;
    Whitelist internal whitelist;
    
    uint256[] internal allowedCountries;
    
    // Flags
    bool internal enabled;
    bool internal initialPurchases;
    bool internal p2pTransfers;
    bool internal claimerTransfers;

    address internal assetAddress;
    address internal claimerAddress;

    constructor(address _registry, address _assetAddress, address _claimerAddress) Groups(_registry) public {
        require(_registry != address(0), "Invalid registry address");
        require(_assetAddress != address(0), "Invalid asset address");
        require(_claimerAddress != address(0), "Invalid claimer address");
        
        registry = Registry(_registry);

        whitelist = Whitelist(registry.getAddress("Whitelist"));

        assetAddress = _assetAddress;
        claimerAddress = _claimerAddress;
    }
    
    /**
     * @notice Adds a new country to the AssetWhitelist
     * @dev TODO: Optimize method without using iteration
     * @param _country Country to be added, country is a number
     */
    function addCountry(uint256 _country) public onlyAdmins {
        for (uint256 i = 0; i < allowedCountries.length; i++) {
            require(allowedCountries[i] != _country, "Country already exists");
        }

        allowedCountries.push(_country);
    }
    
    /**
     * @notice Removes a country from the AssetWhitelist
     * @dev TODO: Optimize method without using iteration
     * @param _country Country to be added, country is a number
     */
    function removeCountry(uint256 _country) public onlyAdmins {
        for (uint256 i = 0; i < allowedCountries.length; i++) {
            if (allowedCountries[i] == _country) {
                allowedCountries[i] = allowedCountries[allowedCountries.length-1];
                allowedCountries.pop();
                break;
            }
        }
    }
    
    /**
     * @notice Check if a transaction between two addresses is allowed
     * @dev TODO: - Simplify/Clean.
     /            - If P2P is enabled claimer will have issues
     * @param _from Transfer from address
     * @param _to Transfer to address
     * @return If transaction is allowed or not
     */
    function allowTransaction(address _from, address _to) public view returns (bool) {
        if (!enabled) {
            return true;
        }

        // Initial purchase
        if (initialPurchases && _from == assetAddress) {
            require(whitelist.isWhitelisted(_to, allowedCountries), "Initial purchases check is enabled and user is not whitelisted");
            return true; 
        }

        // Claimer purchase
        if (claimerTransfers && _from == claimerAddress) {
            require(whitelist.isWhitelisted(_to, allowedCountries), "Claimer transfer check is enabled and user is not whitelisted");
            return true;   
        }

        // P2P transfers
        if (p2pTransfers) {
            require(
                whitelist.isWhitelisted(_to, allowedCountries) && 
                whitelist.isWhitelisted(_from, allowedCountries), "P2P transfer check is enabled and from or to is not whitelisted");
            return true;
        }

        return true;
    }
    
    
    
    // SETTERS
    function setEnabled(bool _enabled) public onlyAdmins {
        enabled = _enabled;
    }

    function setInitialPurchases(bool _initialPurchases) public onlyAdmins {
        initialPurchases = _initialPurchases;
    }

    function setP2PTransfers(bool _p2pTransfers) public onlyAdmins {
        p2pTransfers = _p2pTransfers;
    }

    function setClaimerTransfers(bool _claimerTransfers) public onlyAdmins {
        claimerTransfers = _claimerTransfers;
    }

    // GETTERS
    function getEnabled() public view returns (bool) { return enabled; }
    function getInitialPurchases() public view returns (bool) { return initialPurchases; }
    function getP2PTransfers() public view returns (bool) { return p2pTransfers; }
    function getClaimerTransfers() public view returns (bool) { return claimerTransfers; }
    function getCountries() public view returns (uint256[] memory) { return allowedCountries; }
    
}