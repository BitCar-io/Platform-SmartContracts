pragma solidity >=0.5.0;


/// @title Ownable
/// @notice The Ownable contract has an owner address, and provides basic authorization control
/// functions, this simplifies the implementation of "user permissions".
contract Ownable {

    address payable private immediateOwner;         // The address of the wallet that creates the Contract
    mapping (address => bool) private whitelist;    // Set of addresses that are Whitelisted to call this contract's functions

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event AddressRegistered(address indexed _addr);
    event AddressUnregistered(address indexed _addr);

    /// @dev Throws if called by any account other than the owner.
    modifier onlyImmediateOwner() {
        require(msg.sender == immediateOwner, "msg.sender is not the Owner.");
        _;
    }

    /// @dev Throws if msg.sender is not an Authorized Component
    modifier onlyWhitelisted() {
        require(whitelist[msg.sender], "Only a Whitelisted addr can execute the function");
        _;
    }

    /// @dev Throws if msg.sender is not The Owner or an Authorized Component
    modifier onlyImmediateOwnerOrWhitelisted() {
        bool isImmediateOwner = (immediateOwner == msg.sender);
        bool isWhitelisted = whitelist[msg.sender];
        require(isImmediateOwner || isWhitelisted, "Only the Immediate Owner of the platform or a Whitelisted addr can execute the function.");
        _;
    }

    /// @dev The Ownable constructor sets the original `owner` of the contract to the sender
    /// account.
    constructor() public {
        immediateOwner = msg.sender;
    }

    /// @dev Returns the address of The Owner.
    function getImmediateOwnerAddress() public view returns (address payable) {
        return immediateOwner;
    }

    /// @dev Allows the current owner to transfer control of the contract to a newOwner.
    /// @param _newOwner The address to transfer ownership to.
    function transferOwnership(address payable _newOwner) public onlyImmediateOwner {
        _transferOwnership(_newOwner);
    }

    /// @dev Transfers control of the contract to a newOwner.
    /// @param _newOwner The address to transfer ownership to.
    function _transferOwnership(address payable _newOwner) private {
        require(_newOwner != address(0), "New Owner must be a valid address");
        emit OwnershipTransferred(immediateOwner, _newOwner);
        immediateOwner = _newOwner;
    }

    /// @dev Grants a component the ability to access this contract's functions.
    /// @param _addr The address to be whitelisted
    function registerComponent(address _addr) public onlyImmediateOwnerOrWhitelisted {
        require(_addr != address(0), "address cannot be 0");
        whitelist[_addr] = true;
        emit AddressRegistered(_addr);
    }

    /// @dev Removes the component's ability to access this contract's functions.
    /// @param _addr The address to be dewhitelisted
    function deregisterComponent(address _addr) public onlyImmediateOwnerOrWhitelisted {
        require(_addr != address(0), "address cannot be 0");
        whitelist[_addr] = false;
        emit AddressUnregistered(_addr);
    }
}
