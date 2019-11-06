pragma solidity >=0.5.0;

import "../platform/Registry.sol";
import "../token/Asset/IAssetToken.sol";
import "../lifecycle/CyclicPausable.sol";
import "../vendor/SafeMath.sol";

import "../platform/interfaces/IAssetWhitelist.sol";
import "../platform/interfaces/IAssetControlBallot.sol";

import "../platform/interfaces/IRankTracker.sol";


contract BaseAssetTokenTest is IAssetToken, CyclicPausable {

    using SafeMath for uint256;

    function() external {
        //if ether is sent to this address, send it back.
        revert("Fallback triggered");
    }

    IAssetWhitelist assetWhitelist;
    IAssetControlBallot assetControlBallot;
    IRankTracker rankTracker;

    //// Constants ////
    string public name;
    string public symbol;
    uint256 private totalTokens;
    uint256 public constant decimals = 8;
    string public constant version = "1.0";
    string public constant provenance = "1.0";

    address owner;

    mapping (address => uint256) public balances; // (ERC20)

    // A mapping from an account owner to a map from approved spender to their allowances.
    // (see ERC20 for details about allowances).
    mapping (address => mapping (address => uint256)) public allowed; // (ERC20)

    /**
     * @dev Are claims enabled for this token
     */
    bool public claimsEnabled = false;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    /**
     * @notice Checks if whitelist is set and if so, if both the sender and receiver are whitelisted
     */
    modifier whitelistAllowed(address _from, address _to) {
        require(isWhitelistAllowed(_from, _to), "One of the addresses is not whitelisted");
        _;
    }

    //// Public functions ////
    /**
     * @dev TOOD: Check security around "owner"
     * @param _owner The owner of the contract (Will have initial total supply)
     * @param _name The name given to the token
     * @param _symbol The symbol given to the token
     * @param _totalTokens The total amount of tokens issued
     * @param _minOwnershipPercentage The minimum quorum
     * @param _tradingPeriod The period (in seconds) that trading will be allowed
     * @param _votingPeriod The period (in seconds) that voting will be allowed
     * @param _maxCycles Number of maximum cycles allow for the asset (see waves: CyclicPausable.sol)
     * @param _config From Groups contract. References to AccessControl contracts.
     */
    constructor(
        address _owner,
        string memory _name, 
        string memory _symbol, 
        uint256 _totalTokens, 
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod, 
        uint8 _maxCycles,
        address _config) 
            public 
            CyclicPausable(
                _tradingPeriod, 
                _votingPeriod, 
                _maxCycles, 
                _config) {

        require(_minOwnershipPercentage <= 100, "Minimum Ownership needs to be smaller than 100");
        require(_tradingPeriod != 0, "Trading period cannot be 0");
        require(_votingPeriod != 0, "Voting period cannot be 0");
        require(_config != address(0), "Invalid registry address");

        name = _name;
        symbol = _symbol;
        totalTokens = _totalTokens; //* (10 ** decimals);

        // Upon creation, all tokens belong to the deployer.
        balances[_owner] = totalTokens;
        owner = _owner;

        // Commented for test purposes
        // Registry registry = Registry(_config);

        // Commented for test purposes
        // rankTracker = IRankTracker(registry.getAddress("RankTracker"));
    }

    // See ERC20
    function totalSupply() public view returns (uint256) {
        return totalTokens;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    // See ERC20
    // WARNING: If you call this with the address of a contract, the contract will receive the
    // funds, but will have no idea where they came from. Furthermore, if the contract is
    // not aware of POWR, the tokens will remain locked away in the contract forever.
    // It is always recommended to call instead compareAndApprove() (or approve()) and have the
    // receiving contract withdraw the money using transferFrom().
    function transfer(address _to, uint256 _value) 
            public 
            whenNotPaused 
            whileIsInUpperWave 
            withinLifespan 
            whitelistAllowed(msg.sender, _to)
            returns (bool) 
            {
        // Commented for test purposes
        // require(assetControlBallot.canPerformTransfers(msg.sender), "Transfers are locked due to user having open votes");
        // Commented for test purposes
        // require(rankTracker.validateGlobalLimits(msg.sender, _to, _value), "Amount is to big or user has exceeded the global limit for the current rank");

        if (balances[msg.sender] >= _value) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;

            // Commented for test purposes 
            // assetControlBallot.adjustUserVote(msg.sender, _to, _value);

            emit Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }

    // See ERC20
    function transferFrom(address _from, address _to, uint256 _value) 
            public 
            whenNotPaused 
            whileIsInUpperWave 
            withinLifespan
            // Commented for test purposes
            // whitelistAllowed(_from, _to)
            returns (bool) 
            {
        // Commented for test purposes
        // require(assetControlBallot.canPerformTransfers(_from), "Transfers are locked due to user having open votes");
        // Commented for test purposes
        // require(rankTracker.validateGlobalLimits(_from, _to, _value), "User has exceeded the global limit for its rank");

        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value) {
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            balances[_to] += _value;
            
            // Commented for test purposes
            // assetControlBallot.adjustUserVote(msg.sender, _to, _value);

            emit Transfer(_from, _to, _value);
            return true;
        }
        return false;
    }

    // See ERC20
    function balanceOf(address _owner) public view returns (uint256) {
        return balances[_owner];
    }

    // See ERC20
    // NOTE: this method is vulnerable and is placed here only to follow the ERC20 standard.
    // Before using, please take a look at the better compareAndApprove below.
    function approve(address _spender, uint256 _value) 
            public 
            whenNotPaused 
            whileIsInUpperWave 
            withinLifespan
            whitelistAllowed(msg.sender, _spender)
            returns (bool) 
            {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // A vulernability of the approve method in the ERC20 standard was identified by
    // Mikhail Vladimirov and Dmitry Khovratovich here:
    // https://docs.google.com/document/d/1YLPtQxZu1UAvO9cZ1O2RPXBbT0mooh4DYKjA_jp-RLM
    // It's better to use this method which is not susceptible to over-withdrawing by the approvee.
    /// @param _spender The address to approve
    /// @param _currentValue The previous value approved, which can be retrieved with allowance(msg.sender, _spender)
    /// @param _newValue The new value to approve, this will replace the _currentValue
    /// @return bool Whether the approval was a success (see ERC20's `approve`)
    function compareAndApprove(
        address _spender, 
        uint256 _currentValue, 
        uint256 _newValue) 
        public 
        whenNotPaused 
        whileIsInUpperWave 
        withinLifespan
        returns(bool) 
        {
        if (allowed[msg.sender][_spender] != _currentValue) {
            return false;
        }
        return approve(_spender, _newValue);
    }

    // See ERC20
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

    /**
     * @notice Returns if claims are enabled
     */
    function canClaim() public view returns (bool) {
        return claimsEnabled;
    }

    /**
     * @notice Sets the whitelist for this asset token
     * @param _assetWhitelistAddress The address of the newly created whitelist
     */
    function setAssetWhitelist(address _assetWhitelistAddress) public onlyOwner {
        require(_assetWhitelistAddress != address(0), "AssetWhitelist address needs to be valid");
        require(address(assetWhitelist) == address(0), "AssetWhitelist is already set");
        assetWhitelist = IAssetWhitelist(_assetWhitelistAddress);
    }

    /**
     * @notice Sets the asset control ballot for this asset token
     * @param _assetControlBallotAddress The address of the newly created control ballot
     */
    function setAssetControlBallot(address _assetControlBallotAddress) public onlyOwner {
        require(_assetControlBallotAddress != address(0), "AssetControlBallot address needs to be valid");
        require(address(assetControlBallot) == address(0), "AssetControlBallot is already set");
        assetControlBallot = IAssetControlBallot(_assetControlBallotAddress);
    }

    /**
     * @notice Checks if an from and to are whitelisted in case of whitelists being enabled
     * @dev A method is required in order for the claimer to be able to check for whitelisted addresses
     *      TODO: Find better name
     * @param _from From address to be checked
     * @param _to To address to be checked
     * @return true if whitelists are enabled and both addresses are in the whitelist, false otherwise
     */
    function isWhitelistAllowed(address _from, address _to) public view returns (bool) {
        if (address(assetWhitelist) == address(0) || assetWhitelist.allowTransaction(_from, _to)) {
            return true;
        }

        return false;
    }
}
