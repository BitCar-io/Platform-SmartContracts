pragma solidity >=0.5.0;


contract Registry {
    address owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this function");
        _;
    }
    
    mapping(string => address) addressRegistry;

    constructor() public {
        owner = msg.sender;
    }

    /**
     * @notice Gets an address stored in the registry for a given key
     * @param _key Key/Name of the address
     * @return Contract address
     */
    function getAddress(string calldata _key) external view returns (address) {
        require(addressRegistry[_key] != address(0), _key);
        return addressRegistry[_key];
    }
    
    /**
     * @notice Sets an address stored in the registry for a given key
     * @dev TODO: Validate key size
     * @param _key Key/Name of the address
     * @param _address Address of the contract
     */
    function setAddress(string memory _key, address _address) public onlyOwner {
        require(_address != address(0), "Provided address is not a valid address");
        require(bytes(_key).length != 0, "Provided key is not valid");

        addressRegistry[_key] = _address;
    }
}