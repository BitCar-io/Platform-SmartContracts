pragma solidity >=0.5.0;

import "./IPlatformToken.sol";


contract PlatformToken is IPlatformToken {

    function() external {
        revert("Fallback triggered");
    }

    //// Constants ////
    string public name;
    string public symbol;
    uint256 private totalTokens;
    uint256 public constant decimals = 8;
    string public constant version = "1.0";
    string public constant provenance = "1.0";

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    mapping (address => uint256) public balances; // (ERC20)

    // A mapping from an account owner to a map from approved spender to their allowances.
    // (see ERC20 for details about allowances).
    mapping (address => mapping (address => uint256)) public allowed; // (ERC20)


    //// Public functions ////
    constructor(string memory _name, string memory _symbol, uint256 _totalTokens) public {
        name = _name;
        symbol = _symbol;
        totalTokens = _totalTokens * (10 ** decimals);
        
        // Upon creation, all tokens belong to the deployer.
        balances[msg.sender] = totalTokens;
    }

    // See ERC20
    function totalSupply() public view returns (uint256) {
        return totalTokens;
    }

    // See ERC20
    // WARNING: If you call this with the address of a contract, the contract will receive the
    // funds, but will have no idea where they came from. Furthermore, if the contract is
    // not aware of POWR, the tokens will remain locked away in the contract forever.
    // It is always recommended to call instead compareAndApprove() (or approve()) and have the
    // receiving contract withdraw the money using transferFrom().
    function transfer(address _to, uint256 _value) public returns (bool) {
        if (balances[msg.sender] >= _value) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            emit Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }

    // See ERC20
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value) {
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            balances[_to] += _value;
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
    function approve(address _spender, uint256 _value) public returns (bool) {
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
    function compareAndApprove(address _spender, uint256 _currentValue, uint256 _newValue) public returns(bool) {
        if (allowed[msg.sender][_spender] != _currentValue) {
            return false;
        }
        return approve(_spender, _newValue);
    }

    // See ERC20
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
