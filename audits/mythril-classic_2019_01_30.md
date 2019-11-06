# Analysis results for AbstractFactory.sol

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: AbstractFactory
- Function name: `get(uint256)`
- PC address: 195
- Estimated Gas Usage: 586 - 681

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: AbstractFactory.sol:31

### Code

```
addresses[_index]
```

# Analysis results for AccessControl.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AccessControl
- Function name: `fallback`
- PC address: 929
- Estimated Gas Usage: 998 - 1376

### Description

This binary add operation can result in integer overflow.
In file: AccessControl.sol:171

### Code

```
rbacData.getRoleMembersCount(role)
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: AccessControl
- Function name: `getOwnerAddress()`
- PC address: 1085
- Estimated Gas Usage: 1388 - 2094

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: AccessControl.sol:171

### Code

```
rbacData.getRoleMembersCount(role)
```

# Analysis results for Admin.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Admin
- Function name: `fallback`
- PC address: 1044
- Estimated Gas Usage: 998 - 1376

### Description

This binary add operation can result in integer overflow.
In file: Admin.sol:61

## External call
- SWC ID: 107
- Type: Informational
- Contract: Admin
- Function name: `getOwnerAddress()`
- PC address: 1200
- Estimated Gas Usage: 1388 - 2094

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Admin.sol:61

# Analysis results for Agent.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Agent
- Function name: `fallback`
- PC address: 1044
- Estimated Gas Usage: 998 - 1376

### Description

This binary add operation can result in integer overflow.
In file: Agent.sol:60

## External call
- SWC ID: 107
- Type: Informational
- Contract: Agent
- Function name: `getOwnerAddress()`
- PC address: 1200
- Estimated Gas Usage: 1388 - 2094

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Agent.sol:60

# Analysis results for Asset.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Asset
- Function name: `dataHash()`
- PC address: 1989
- Estimated Gas Usage: 603 - 1121

### Description

This binary add operation can result in integer overflow.
In file: Asset.sol:51

### Code

```
string public dataHash
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: Asset
- Function name: `isAgent(address)`
- PC address: 2194
- Estimated Gas Usage: 1508 - 3299

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Asset.sol:116

### Code

```
le times
     * @param _n
```

# Analysis results for AssetBallot.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: AssetBallot
- Function name: `fallback`
- PC address: 2430
- Estimated Gas Usage: 1425 - 2791

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: AssetBallot.sol:73

### Code

```
lot.sellAssetCount = 0;
    
```

# Analysis results for AssetFactory.sol

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: AssetFactory
- Function name: `get(uint256)`
- PC address: 224
- Estimated Gas Usage: 586 - 681

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: AssetFactory.sol:28

### Code

```
.push(address(ass
```

# Analysis results for AssetRank.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: AssetRank
- Function name: `isVerifiedAgent(address)`
- PC address: 608
- Estimated Gas Usage: 1487 - 2948

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: AssetRank.sol:2

### Code

```
Because i
```

# Analysis result for AssetRankFactory

No issues found.
# Analysis results for AssetRankParameters.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: AssetRankParameters
- Function name: `isAgent(address)`
- PC address: 1143
- Estimated Gas Usage: 1508 - 3299

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: AssetRankParameters.sol:88

### Code

```
is classified
     * @par
```

# Analysis results for AssetToken.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetToken
- Function name: `name()`
- PC address: 2570
- Estimated Gas Usage: 612 - 800

### Description

This binary add operation can result in integer overflow.
In file: AssetToken.sol:18

### Code

```
eAssetVote(address
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: AssetToken
- Function name: `resume()`
- PC address: 5527
- Estimated Gas Usage: 1441 - 2807

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: AssetToken.sol:69

### Code

```
     assetBallot.minOwnership
```

# Analysis results for AssetTokenFactory.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 119
- Estimated Gas Usage: 136 - 324

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 124
- Estimated Gas Usage: 148 - 336

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 131
- Estimated Gas Usage: 173 - 361

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 133
- Estimated Gas Usage: 179 - 367

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 165
- Estimated Gas Usage: 269 - 977

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 191
- Estimated Gas Usage: 338 - 3443

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 196
- Estimated Gas Usage: 353 - 3458

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 203
- Estimated Gas Usage: 378 - 3483

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 205
- Estimated Gas Usage: 384 - 3489

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 224
- Estimated Gas Usage: 440 - 3735

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 233
- Estimated Gas Usage: 464 - 3759

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:22

### Code

```
function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 431
- Estimated Gas Usage: 1168 - 10249

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 438
- Estimated Gas Usage: 1186 - 10362

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 445
- Estimated Gas Usage: 1204 - 10475

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 452
- Estimated Gas Usage: 1222 - 10588

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 463
- Estimated Gas Usage: 1249 - 10710

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 471
- Estimated Gas Usage: 1267 - 10823

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 480
- Estimated Gas Usage: 1285 - 10936

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 488
- Estimated Gas Usage: 1309 - 11148

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 498
- Estimated Gas Usage: 1336 - 11363

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 504
- Estimated Gas Usage: 1348 - 11375

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:34

### Code

```
new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config))
```

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: AssetTokenFactory
- Function name: `get(uint256)`
- PC address: 1030
- Estimated Gas Usage: 608 - 703

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: AssetTokenFactory.sol:34

### Code

```
      AssetToken 
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: AssetTokenFactory
- Function name: `fallback`
- PC address: 1072
- Estimated Gas Usage: 1110 - 9766

### Description

This binary add operation can result in integer overflow.
In file: AssetTokenFactory.sol:8

### Code

```
contract AssetTokenFactory is AbstractFactory {

    /**
     * @notice Constructor
     * @param _config The Registry address
     */
    constructor(address _config) 
            public 
            AbstractFactory(_config) {
    }

    /**
     * @notice Deploys a new AssetToken
     */
    function create(
        address _owner,
        string _name, 
        string _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public 
            returns (IAssetToken) {

        AssetToken assetToken = new AssetToken(
            _owner, 
            _name, 
            _symbol, 
            _totalSupply, 
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles, 
            address(config));

        // Whitelists the _owner address
        assetToken.registerComponent(_owner);

        addresses.push(address(assetToken));
        emit ContractCreated(msg.sender, address(assetToken));
        return IAssetToken(assetToken);
    }
}
```

# Analysis results for AssetWhitelist.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: AssetWhitelist
- Function name: `isAgent(address)`
- PC address: 1038
- Estimated Gas Usage: 1476 - 2937

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: AssetWhitelist.sol:101

### Code

```
ins public {
        init
```

# Analysis results for AssetWhitelistFactory.sol

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: AssetWhitelistFactory
- Function name: `get(uint256)`
- PC address: 537
- Estimated Gas Usage: 608 - 703

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: AssetWhitelistFactory.sol:25

### Code

```
address(assetWhit
```

# Analysis results for BaseAssetToken.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: BaseAssetToken
- Function name: `name()`
- PC address: 2506
- Estimated Gas Usage: 612 - 800

### Description

This binary add operation can result in integer overflow.
In file: BaseAssetToken.sol:21

### Code

```
string public name
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: BaseAssetToken
- Function name: `resume()`
- PC address: 5463
- Estimated Gas Usage: 1441 - 2807

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: BaseAssetToken.sol:76

### Code

```
fig) 
            public 
 
```

# Analysis results for BEE.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: BEE
- Function name: `fallback`
- PC address: 347
- Estimated Gas Usage: 1437 - 3463

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: BEE.sol:3

### Code

```
y.sol";
import 
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: BEE
- Function name: `getAssetTokenBalance()`
- PC address: 1727
- Estimated Gas Usage: 1461 - 2922

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: BEE.sol:3

### Code

```
y.sol";
import 
```

# Analysis results for BEEFactory.sol

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: BEEFactory
- Function name: `get(uint256)`
- PC address: 533
- Estimated Gas Usage: 608 - 703

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: BEEFactory.sol:29

# Analysis results for Claimer.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: Claimer
- Function name: `fallback`
- PC address: 399
- Estimated Gas Usage: 1437 - 3463

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Claimer.sol:3

### Code

```
rm/Registry.sol"
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: Claimer
- Function name: `getAssetTokenBalance()`
- PC address: 1963
- Estimated Gas Usage: 1461 - 2922

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Claimer.sol:3

### Code

```
rm/Registry.sol"
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Claimer
- Function name: `assetTokensToPlatformTokens(uint256)`
- PC address: 3300
- Estimated Gas Usage: 641 - 1066

### Description

This binary multiply operation can result in integer overflow.
In file: Claimer.sol:24

### Code

```
ciated asset token
     */
    modifier assetClaimsEnabled() {
        require(assetToken.canClaim(), "Claims are disabled for this Asset Token");
        _;
    }

    /**
     * @notice Checks if an user can still claim tokens
     */
    modifier canSenderClaim() {
      
```

# Analysis results for ClaimerFactory.sol

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: ClaimerFactory
- Function name: `get(uint256)`
- PC address: 262
- Estimated Gas Usage: 586 - 681

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: ClaimerFactory.sol:29

# Analysis results for CyclicPausable.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: CyclicPausable
- Function name: `fallback`
- PC address: 2232
- Estimated Gas Usage: 1425 - 2791

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: CyclicPausable.sol:66

### Code

```
cles, 
        address _conf
```

# Analysis results for DocsTracker.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: DocsTracker
- Function name: `fallback`
- PC address: 805
- Estimated Gas Usage: 745 - 1880

### Description

This binary add operation can result in integer overflow.
In file: DocsTracker.sol:104

### Code

```
repo[_addr].doc[_hash].digest
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: DocsTracker
- Function name: `fallback`
- PC address: 809
- Estimated Gas Usage: 1154 - 2289

### Description

This binary add operation can result in integer overflow.
In file: DocsTracker.sol:105

### Code

```
repo[_addr].doc[_hash].idx
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: DocsTracker
- Function name: `fallback`
- PC address: 814
- Estimated Gas Usage: 1563 - 2698

### Description

This binary add operation can result in integer overflow.
In file: DocsTracker.sol:106

### Code

```
repo[_addr].doc[_hash].v
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: DocsTracker
- Function name: `fallback`
- PC address: 819
- Estimated Gas Usage: 1972 - 3107

### Description

This binary add operation can result in integer overflow.
In file: DocsTracker.sol:107

### Code

```
repo[_addr].doc[_hash].r
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: DocsTracker
- Function name: `fallback`
- PC address: 825
- Estimated Gas Usage: 2384 - 3519

### Description

This binary add operation can result in integer overflow.
In file: DocsTracker.sol:108

### Code

```
repo[_addr].doc[_hash].s
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: DocsTracker
- Function name: `getDocCount(address)`
- PC address: 2113
- Estimated Gas Usage: 299 - 1244

### Description

This binary add operation can result in integer overflow.
In file: DocsTracker.sol:147

### Code

```
repo[_addr].count
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: DocsTracker
- Function name: `submitDocumentDigestAndSignature(uint8,bytes32,uint8,bytes32,bytes32)`
- PC address: 4008
- Estimated Gas Usage: 469 - 1650

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: DocsTracker.sol:22

### Code

```
re
        uint8 v; 
        
```

# Analysis results for ECVerify.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: ECVerify
- Function name: `getAddrFromSignatureWithPrefix(bytes32,uint8,bytes32,bytes32)`
- PC address: 547
- Estimated Gas Usage: 354 - 1436

### Description

This binary add operation can result in integer overflow.
In file: ECVerify.sol:11

### Code

```
ital signature
     * @param 
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: ECVerify
- Function name: `getAddrFromSignatureWithPrefix(bytes32,uint8,bytes32,bytes32)`
- PC address: 614
- Estimated Gas Usage: 551 - 2387

### Description

This binary add operation can result in integer overflow.
In file: ECVerify.sol:9

### Code

```
created the 
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: ECVerify
- Function name: `getAddrFromSignature(bytes32,uint8,bytes32,bytes32)`
- PC address: 849
- Estimated Gas Usage: 404 - 1255

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: ECVerify.sol:23

### Code

```
ecrecover(_docHash, _v, _r, _s)
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: ECVerify
- Function name: `getAddrFromSignature(bytes32,uint8,bytes32,bytes32)`
- PC address: 875
- Estimated Gas Usage: 4143 - 39087

### Description

This binary add operation can result in integer overflow.
In file: ECVerify.sol:23

### Code

```
ecrecover(_docHash, _v, _r, _s)
```

# Analysis results for Entity.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: Entity
- Function name: `isVerifiedAgent(address)`
- PC address: 698
- Estimated Gas Usage: 1474 - 2605

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Entity.sol:64

# Analysis results for Fee.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: Fee
- Function name: `getAssetTokenBalance()`
- PC address: 810
- Estimated Gas Usage: 1436 - 2897

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Fee.sol:59

### Code

```
assetToken.balanceOf(address(this))
```

# Analysis results for FeeFactory.sol

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: FeeFactory
- Function name: `get(uint256)`
- PC address: 537
- Estimated Gas Usage: 608 - 703

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: FeeFactory.sol:29

# Analysis results for FeeManager.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 135
- Estimated Gas Usage: 168 - 686

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:134

### Code

```
function getAddress(string _feeName) public view returns(address) {
        return fees[_feeName].fee;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 140
- Estimated Gas Usage: 180 - 698

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:134

### Code

```
function getAddress(string _feeName) public view returns(address) {
        return fees[_feeName].fee;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 147
- Estimated Gas Usage: 205 - 723

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:134

### Code

```
function getAddress(string _feeName) public view returns(address) {
        return fees[_feeName].fee;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 149
- Estimated Gas Usage: 211 - 729

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:134

### Code

```
function getAddress(string _feeName) public view returns(address) {
        return fees[_feeName].fee;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 169
- Estimated Gas Usage: 261 - 969

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:134

### Code

```
function getAddress(string _feeName) public view returns(address) {
        return fees[_feeName].fee;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 252
- Estimated Gas Usage: 190 - 708

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:143

### Code

```
function getAmount(string _feeName) public view returns(uint256) {
        return fees[_feeName].amount;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 257
- Estimated Gas Usage: 202 - 720

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:143

### Code

```
function getAmount(string _feeName) public view returns(uint256) {
        return fees[_feeName].amount;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 264
- Estimated Gas Usage: 227 - 745

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:143

### Code

```
function getAmount(string _feeName) public view returns(uint256) {
        return fees[_feeName].amount;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 266
- Estimated Gas Usage: 233 - 751

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:143

### Code

```
function getAmount(string _feeName) public view returns(uint256) {
        return fees[_feeName].amount;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 286
- Estimated Gas Usage: 283 - 991

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:143

### Code

```
function getAmount(string _feeName) public view returns(uint256) {
        return fees[_feeName].amount;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 292
- Estimated Gas Usage: 301 - 1009

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:143

### Code

```
function getAmount(string _feeName) public view returns(uint256) {
        return fees[_feeName].amount;
    }
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: FeeManager
- Function name: `fallback`
- PC address: 621
- Estimated Gas Usage: 1913 - 3234

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: FeeManager.sol:1

### Code

```
olidity ^
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 1836
- Estimated Gas Usage: 433 - 3819

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:6

### Code

```
sol";

imp
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 1842
- Estimated Gas Usage: 448 - 3834

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:5

### Code

```
aimerFactory
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAddress(string)`
- PC address: 1865
- Estimated Gas Usage: 450 - 4164

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:15

### Code

```
ccessCont
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 1926
- Estimated Gas Usage: 393 - 3591

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:144

### Code

```
fees[_feeName]
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 1949
- Estimated Gas Usage: 455 - 3841

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:6

### Code

```
sol";

imp
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 1957
- Estimated Gas Usage: 476 - 3862

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:3

### Code

```
../platform/Registry.sol";

import "../factories/ClaimerFactory.sol";
import "./interfaces/IClaimer.sol";

import "../factories/BEEFactory.sol";
im
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 1978
- Estimated Gas Usage: 472 - 4186

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:15

### Code

```
ccessCont
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: FeeManager
- Function name: `getAmount(string)`
- PC address: 2008
- Estimated Gas Usage: 582 - 4627

### Description

This binary add operation can result in integer overflow.
In file: FeeManager.sol:144

### Code

```
fees[_feeName].amount
```

# Analysis results for FeeManagerFactory.sol

## Exception state
- SWC ID: 110
- Type: Informational
- Contract: FeeManagerFactory
- Function name: `get(uint256)`
- PC address: 262
- Estimated Gas Usage: 586 - 681

### Description

A reachable exception (opcode 0xfe) has been detected. This can be caused by type errors, division by zero, out-of-bounds array access, or assert violations. Note that explicit `assert()` should only be used to check invariants. Use `require()` for regular input checking.
In file: FeeManagerFactory.sol:29

# Analysis results for GenericPortfolio.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: GenericPortfolio
- Function name: `getType()`
- PC address: 1494
- Estimated Gas Usage: 593 - 781

### Description

This binary add operation can result in integer overflow.
In file: GenericPortfolio.sol:52

## External call
- SWC ID: 107
- Type: Informational
- Contract: GenericPortfolio
- Function name: `isAgent(address)`
- PC address: 1705
- Estimated Gas Usage: 1495 - 2956

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: GenericPortfolio.sol:52

## External call
- SWC ID: 107
- Type: Informational
- Contract: GenericPortfolio
- Function name: `fallback`
- PC address: 2056
- Estimated Gas Usage: 1425 - 2791

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: GenericPortfolio.sol:52

# Analysis results for Groups.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: Groups
- Function name: `isVerifiedAgent(address)`
- PC address: 518
- Estimated Gas Usage: 1474 - 2605

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Groups.sol:79

### Code

```
agentAccCtrl.isRole(_addr)
```

# Analysis results for IndexedEntities.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 174
- Estimated Gas Usage: 136 - 324

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:94

### Code

```
function getCount(address _owner, string _type) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(uint256) {
        return items[_owner][_type].count;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 179
- Estimated Gas Usage: 148 - 336

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:94

### Code

```
function getCount(address _owner, string _type) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(uint256) {
        return items[_owner][_type].count;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 186
- Estimated Gas Usage: 173 - 361

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:94

### Code

```
function getCount(address _owner, string _type) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(uint256) {
        return items[_owner][_type].count;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 188
- Estimated Gas Usage: 179 - 367

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:94

### Code

```
function getCount(address _owner, string _type) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(uint256) {
        return items[_owner][_type].count;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 220
- Estimated Gas Usage: 269 - 977

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:94

### Code

```
function getCount(address _owner, string _type) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(uint256) {
        return items[_owner][_type].count;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 295
- Estimated Gas Usage: 158 - 346

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:64

### Code

```
function addItem(address _owner, string _type, address _item) 
            public
            onlyImmediateOwnerOrWhitelisted {
        require(items[_owner][_type].availability[_item] == false, "The item has already been Added");
        items[_owner][_type].registry[items[_owner][_type].count] = _item;
        emit ItemAdded(_owner, _type, _item, items[_owner][_type].count);
        items[_owner][_type].availability[_item] = true;
        items[_owner][_type].count = items[_owner][_type].count + 1;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 300
- Estimated Gas Usage: 170 - 358

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:64

### Code

```
function addItem(address _owner, string _type, address _item) 
            public
            onlyImmediateOwnerOrWhitelisted {
        require(items[_owner][_type].availability[_item] == false, "The item has already been Added");
        items[_owner][_type].registry[items[_owner][_type].count] = _item;
        emit ItemAdded(_owner, _type, _item, items[_owner][_type].count);
        items[_owner][_type].availability[_item] = true;
        items[_owner][_type].count = items[_owner][_type].count + 1;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 307
- Estimated Gas Usage: 195 - 383

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:64

### Code

```
function addItem(address _owner, string _type, address _item) 
            public
            onlyImmediateOwnerOrWhitelisted {
        require(items[_owner][_type].availability[_item] == false, "The item has already been Added");
        items[_owner][_type].registry[items[_owner][_type].count] = _item;
        emit ItemAdded(_owner, _type, _item, items[_owner][_type].count);
        items[_owner][_type].availability[_item] = true;
        items[_owner][_type].count = items[_owner][_type].count + 1;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 309
- Estimated Gas Usage: 201 - 389

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:64

### Code

```
function addItem(address _owner, string _type, address _item) 
            public
            onlyImmediateOwnerOrWhitelisted {
        require(items[_owner][_type].availability[_item] == false, "The item has already been Added");
        items[_owner][_type].registry[items[_owner][_type].count] = _item;
        emit ItemAdded(_owner, _type, _item, items[_owner][_type].count);
        items[_owner][_type].availability[_item] = true;
        items[_owner][_type].count = items[_owner][_type].count + 1;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 341
- Estimated Gas Usage: 285 - 993

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:64

### Code

```
function addItem(address _owner, string _type, address _item) 
            public
            onlyImmediateOwnerOrWhitelisted {
        require(items[_owner][_type].availability[_item] == false, "The item has already been Added");
        items[_owner][_type].registry[items[_owner][_type].count] = _item;
        emit ItemAdded(_owner, _type, _item, items[_owner][_type].count);
        items[_owner][_type].availability[_item] = true;
        items[_owner][_type].count = items[_owner][_type].count + 1;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 347
- Estimated Gas Usage: 303 - 1011

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:64

### Code

```
function addItem(address _owner, string _type, address _item) 
            public
            onlyImmediateOwnerOrWhitelisted {
        require(items[_owner][_type].availability[_item] == false, "The item has already been Added");
        items[_owner][_type].registry[items[_owner][_type].count] = _item;
        emit ItemAdded(_owner, _type, _item, items[_owner][_type].count);
        items[_owner][_type].availability[_item] = true;
        items[_owner][_type].count = items[_owner][_type].count + 1;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `hasItem(address,string,address)`
- PC address: 460
- Estimated Gas Usage: 202 - 390

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:108

### Code

```
function hasItem(address _owner, string _type, address _item) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(bool) {
        return items[_owner][_type].availability[_item];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `hasItem(address,string,address)`
- PC address: 465
- Estimated Gas Usage: 214 - 402

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:108

### Code

```
function hasItem(address _owner, string _type, address _item) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(bool) {
        return items[_owner][_type].availability[_item];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `hasItem(address,string,address)`
- PC address: 472
- Estimated Gas Usage: 239 - 427

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:108

### Code

```
function hasItem(address _owner, string _type, address _item) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(bool) {
        return items[_owner][_type].availability[_item];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `hasItem(address,string,address)`
- PC address: 474
- Estimated Gas Usage: 245 - 433

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:108

### Code

```
function hasItem(address _owner, string _type, address _item) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(bool) {
        return items[_owner][_type].availability[_item];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `hasItem(address,string,address)`
- PC address: 506
- Estimated Gas Usage: 329 - 1037

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:108

### Code

```
function hasItem(address _owner, string _type, address _item) 
            public 
            view 
            onlyImmediateOwnerOrWhitelisted
            returns(bool) {
        return items[_owner][_type].availability[_item];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 848
- Estimated Gas Usage: 1373 - 5518

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:33

### Code

```

     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 868
- Estimated Gas Usage: 1417 - 8242

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:33

### Code

```

     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 888
- Estimated Gas Usage: 1461 - 10966

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:33

### Code

```

     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `fallback`
- PC address: 908
- Estimated Gas Usage: 1505 - 13690

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:33

### Code

```

     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 1165
- Estimated Gas Usage: 1471 - 8626

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:33

### Code

```

     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 1185
- Estimated Gas Usage: 1515 - 11350

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:33

### Code

```

     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: IndexedEntities
- Function name: `addItem(address,string,address)`
- PC address: 1205
- Estimated Gas Usage: 1559 - 14074

### Description

This binary add operation can result in integer overflow.
In file: IndexedEntities.sol:33

### Code

```

     *         |
     *         |    . . .
     *         |
     *         \-> _typeN -> registry -------> 0    ---> _item0
     
```

# Analysis result for Multisignature

No issues found.
# Analysis result for Ownable

No issues found.
# Analysis results for Pausable.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: Pausable
- Function name: `isAdmin(address)`
- PC address: 1101
- Estimated Gas Usage: 1495 - 2956

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Pausable.sol:63

## External call
- SWC ID: 107
- Type: Informational
- Contract: Pausable
- Function name: `fallback`
- PC address: 1452
- Estimated Gas Usage: 1425 - 2791

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Pausable.sol:63

# Analysis results for PlatformToken.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: PlatformToken
- Function name: `fallback`
- PC address: 807
- Estimated Gas Usage: 568 - 756

### Description

This binary add operation can result in integer overflow.
In file: PlatformToken.sol:13

### Code

```
string public name
```

# Analysis results for Portfolio.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Portfolio
- Function name: `getType()`
- PC address: 1347
- Estimated Gas Usage: 593 - 781

### Description

This binary add operation can result in integer overflow.
In file: Portfolio.sol:68

### Code

```
return addressType
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: Portfolio
- Function name: `isAgent(address)`
- PC address: 1558
- Estimated Gas Usage: 1495 - 2956

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Portfolio.sol:71

## External call
- SWC ID: 107
- Type: Informational
- Contract: Portfolio
- Function name: `fallback`
- PC address: 1909
- Estimated Gas Usage: 1425 - 2791

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Portfolio.sol:71

# Analysis result for Priced

No issues found.
# Analysis results for Ranking.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 165
- Estimated Gas Usage: 155 - 343

### Description

This binary add operation can result in integer overflow.
In file: Ranking.sol:38

### Code

```
function setRankInputs(uint256[] _newInput) public {
        createAssetRankInstance();
        assetRank.setRankInputs(_newInput);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 169
- Estimated Gas Usage: 167 - 355

### Description

This binary multiply operation can result in integer overflow.
In file: Ranking.sol:38

### Code

```
function setRankInputs(uint256[] _newInput) public {
        createAssetRankInstance();
        assetRank.setRankInputs(_newInput);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 172
- Estimated Gas Usage: 178 - 366

### Description

This binary add operation can result in integer overflow.
In file: Ranking.sol:38

### Code

```
function setRankInputs(uint256[] _newInput) public {
        createAssetRankInstance();
        assetRank.setRankInputs(_newInput);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 174
- Estimated Gas Usage: 184 - 372

### Description

This binary add operation can result in integer overflow.
In file: Ranking.sol:38

### Code

```
function setRankInputs(uint256[] _newInput) public {
        createAssetRankInstance();
        assetRank.setRankInputs(_newInput);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 194
- Estimated Gas Usage: 234 - 612

### Description

This binary add operation can result in integer overflow.
In file: Ranking.sol:38

### Code

```
function setRankInputs(uint256[] _newInput) public {
        createAssetRankInstance();
        assetRank.setRankInputs(_newInput);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 707
- Estimated Gas Usage: 1230 - 4525

### Description

This binary add operation can result in integer overflow.
In file: Ranking.sol:29

### Code

```
config.getAddress("AssetRankFactory")
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 745
- Estimated Gas Usage: 1245 - 4635

### Description

This binary add operation can result in integer overflow.
In file: Ranking.sol:29

### Code

```
config.getAddress("AssetRankFactory")
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Ranking
- Function name: `setRankInputs(uint256[])`
- PC address: 771
- Estimated Gas Usage: 1306 - 5214

### Description

This binary add operation can result in integer overflow.
In file: Ranking.sol:29

### Code

```
config.getAddress("AssetRankFactory")
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: Ranking
- Function name: `fallback`
- PC address: 800
- Estimated Gas Usage: 1924 - 3245

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Ranking.sol:29

### Code

```
config.getAddress("AssetRankFactory")
```

# Analysis results for RBACData.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 218
- Estimated Gas Usage: 136 - 324

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:29

### Code

```
function checkRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view {
        roles[_role].check(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 223
- Estimated Gas Usage: 148 - 336

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:29

### Code

```
function checkRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view {
        roles[_role].check(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 230
- Estimated Gas Usage: 173 - 361

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:29

### Code

```
function checkRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view {
        roles[_role].check(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 232
- Estimated Gas Usage: 179 - 367

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:29

### Code

```
function checkRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view {
        roles[_role].check(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 264
- Estimated Gas Usage: 269 - 977

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:29

### Code

```
function checkRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view {
        roles[_role].check(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 323
- Estimated Gas Usage: 158 - 346

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:70

### Code

```
function removeRole(address _operator, string _role)
            public 
            onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role)) {
            roles[_role].remove(_operator);
            roleMembersCount[_role]--;
            emit RoleRemoved(_operator, _role);
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 328
- Estimated Gas Usage: 170 - 358

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:70

### Code

```
function removeRole(address _operator, string _role)
            public 
            onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role)) {
            roles[_role].remove(_operator);
            roleMembersCount[_role]--;
            emit RoleRemoved(_operator, _role);
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 335
- Estimated Gas Usage: 195 - 383

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:70

### Code

```
function removeRole(address _operator, string _role)
            public 
            onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role)) {
            roles[_role].remove(_operator);
            roleMembersCount[_role]--;
            emit RoleRemoved(_operator, _role);
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 337
- Estimated Gas Usage: 201 - 389

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:70

### Code

```
function removeRole(address _operator, string _role)
            public 
            onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role)) {
            roles[_role].remove(_operator);
            roleMembersCount[_role]--;
            emit RoleRemoved(_operator, _role);
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 369
- Estimated Gas Usage: 285 - 993

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:70

### Code

```
function removeRole(address _operator, string _role)
            public 
            onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role)) {
            roles[_role].remove(_operator);
            roleMembersCount[_role]--;
            emit RoleRemoved(_operator, _role);
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 375
- Estimated Gas Usage: 303 - 1011

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:70

### Code

```
function removeRole(address _operator, string _role)
            public 
            onlyImmediateOwnerOrWhitelisted {
        if (hasRole(_operator, _role)) {
            roles[_role].remove(_operator);
            roleMembersCount[_role]--;
            emit RoleRemoved(_operator, _role);
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `hasRole(address,string)`
- PC address: 426
- Estimated Gas Usage: 180 - 368

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:42

### Code

```
function hasRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view
            returns (bool) {
        return roles[_role].has(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `hasRole(address,string)`
- PC address: 431
- Estimated Gas Usage: 192 - 380

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:42

### Code

```
function hasRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view
            returns (bool) {
        return roles[_role].has(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `hasRole(address,string)`
- PC address: 438
- Estimated Gas Usage: 217 - 405

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:42

### Code

```
function hasRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view
            returns (bool) {
        return roles[_role].has(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `hasRole(address,string)`
- PC address: 440
- Estimated Gas Usage: 223 - 411

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:42

### Code

```
function hasRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view
            returns (bool) {
        return roles[_role].has(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `hasRole(address,string)`
- PC address: 472
- Estimated Gas Usage: 307 - 1015

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:42

### Code

```
function hasRole(address _operator, string _role)
            public
            onlyImmediateOwnerOrWhitelisted
            view
            returns (bool) {
        return roles[_role].has(_operator);
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `getRoleMembersCount(string)`
- PC address: 596
- Estimated Gas Usage: 221 - 409

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:84

### Code

```
function getRoleMembersCount(string _role)
            public 
            view
            returns (uint256) {
        return roleMembersCount[_role];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `getRoleMembersCount(string)`
- PC address: 601
- Estimated Gas Usage: 233 - 421

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:84

### Code

```
function getRoleMembersCount(string _role)
            public 
            view
            returns (uint256) {
        return roleMembersCount[_role];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `getRoleMembersCount(string)`
- PC address: 608
- Estimated Gas Usage: 258 - 446

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:84

### Code

```
function getRoleMembersCount(string _role)
            public 
            view
            returns (uint256) {
        return roleMembersCount[_role];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `getRoleMembersCount(string)`
- PC address: 610
- Estimated Gas Usage: 264 - 452

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:84

### Code

```
function getRoleMembersCount(string _role)
            public 
            view
            returns (uint256) {
        return roleMembersCount[_role];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `getRoleMembersCount(string)`
- PC address: 630
- Estimated Gas Usage: 314 - 692

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:84

### Code

```
function getRoleMembersCount(string _role)
            public 
            view
            returns (uint256) {
        return roleMembersCount[_role];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `getRoleMembersCount(string)`
- PC address: 636
- Estimated Gas Usage: 332 - 710

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:84

### Code

```
function getRoleMembersCount(string _role)
            public 
            view
            returns (uint256) {
        return roleMembersCount[_role];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 1269
- Estimated Gas Usage: 1382 - 5527

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:37

### Code

```
f addr has role
     * @param _operator address
     * @param _role the name of the role
     * @return bool
     */
    function
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 1289
- Estimated Gas Usage: 1426 - 8251

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:37

### Code

```
f addr has role
     * @param _operator address
     * @param _role the name of the role
     * @return bool
     */
    function
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 1309
- Estimated Gas Usage: 1470 - 10975

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:37

### Code

```
f addr has role
     * @param _operator address
     * @param _role the name of the role
     * @return bool
     */
    function
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `fallback`
- PC address: 1329
- Estimated Gas Usage: 1514 - 13699

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:37

### Code

```
f addr has role
     * @param _operator address
     * @param _role the name of the role
     * @return bool
     */
    function
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 1555
- Estimated Gas Usage: 1439 - 8264

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:37

### Code

```
f addr has role
     * @param _operator address
     * @param _role the name of the role
     * @return bool
     */
    function
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 1575
- Estimated Gas Usage: 1483 - 10988

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:37

### Code

```
f addr has role
     * @param _operator address
     * @param _role the name of the role
     * @return bool
     */
    function
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: RBACData
- Function name: `removeRole(address,string)`
- PC address: 1595
- Estimated Gas Usage: 1527 - 13712

### Description

This binary add operation can result in integer overflow.
In file: RBACData.sol:37

### Code

```
f addr has role
     * @param _operator address
     * @param _role the name of the role
     * @return bool
     */
    function
```

# Analysis results for Registry.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 106
- Estimated Gas Usage: 133 - 321

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:34

### Code

```
function setAddress(string _key, address _address) public onlyOwner {
        require(_address != 0, "Provided address is not a valid address");
        require(bytes(_key).length != 0, "Provided key is not valid");

        addressRegistry[_key] = _address;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 111
- Estimated Gas Usage: 145 - 333

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:34

### Code

```
function setAddress(string _key, address _address) public onlyOwner {
        require(_address != 0, "Provided address is not a valid address");
        require(bytes(_key).length != 0, "Provided key is not valid");

        addressRegistry[_key] = _address;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 118
- Estimated Gas Usage: 170 - 358

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:34

### Code

```
function setAddress(string _key, address _address) public onlyOwner {
        require(_address != 0, "Provided address is not a valid address");
        require(bytes(_key).length != 0, "Provided key is not valid");

        addressRegistry[_key] = _address;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 120
- Estimated Gas Usage: 176 - 364

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:34

### Code

```
function setAddress(string _key, address _address) public onlyOwner {
        require(_address != 0, "Provided address is not a valid address");
        require(bytes(_key).length != 0, "Provided key is not valid");

        addressRegistry[_key] = _address;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 140
- Estimated Gas Usage: 232 - 610

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:34

### Code

```
function setAddress(string _key, address _address) public onlyOwner {
        require(_address != 0, "Provided address is not a valid address");
        require(bytes(_key).length != 0, "Provided key is not valid");

        addressRegistry[_key] = _address;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `getAddress(string)`
- PC address: 206
- Estimated Gas Usage: 146 - 241

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:22

### Code

```
function getAddress(string _key) external view returns (address) {
        require(addressRegistry[_key] != 0, _key);

        return addressRegistry[_key];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `getAddress(string)`
- PC address: 208
- Estimated Gas Usage: 152 - 247

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:22

### Code

```
function getAddress(string _key) external view returns (address) {
        require(addressRegistry[_key] != 0, _key);

        return addressRegistry[_key];
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 289
- Estimated Gas Usage: 853 - 4808

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:7

### Code

```
require(msg.sender == owner, "Only the owner can perform this function")
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 327
- Estimated Gas Usage: 868 - 4918

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:7

### Code

```
require(msg.sender == owner, "Only the owner can perform this function")
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `fallback`
- PC address: 365
- Estimated Gas Usage: 883 - 5028

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:7

### Code

```
require(msg.sender == owner, "Only the owner can perform this function")
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `getAddress(string)`
- PC address: 763
- Estimated Gas Usage: 214 - 2706

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:23

### Code

```
addressRegistry[_key]
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `getAddress(string)`
- PC address: 778
- Estimated Gas Usage: 251 - 2931

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:23

### Code

```
addressRegistry[_key]
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `getAddress(string)`
- PC address: 831
- Estimated Gas Usage: 813 - 4484

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:23

### Code

```
require(addressRegistry[_key] != 0, _key)
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `getAddress(string)`
- PC address: 840
- Estimated Gas Usage: 837 - 4603

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:23

### Code

```
require(addressRegistry[_key] != 0, _key)
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Registry
- Function name: `getAddress(string)`
- PC address: 851
- Estimated Gas Usage: 866 - 7029

### Description

This binary add operation can result in integer overflow.
In file: Registry.sol:23

### Code

```
require(addressRegistry[_key] != 0, _key)
```

# Analysis result for Roles

No issues found.
# Analysis result for SafeMath

No issues found.
# Analysis results for Sudo.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Sudo
- Function name: `fallback`
- PC address: 1084
- Estimated Gas Usage: 998 - 1376

### Description

This binary add operation can result in integer overflow.
In file: Sudo.sol:66

## External call
- SWC ID: 107
- Type: Informational
- Contract: Sudo
- Function name: `getOwnerAddress()`
- PC address: 1240
- Estimated Gas Usage: 1388 - 2094

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Sudo.sol:66

# Analysis result for Ticker

No issues found.
# Analysis results for TickerDecentralized.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string)`
- PC address: 213
- Estimated Gas Usage: 171 - 689

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:149

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string)`
- PC address: 218
- Estimated Gas Usage: 183 - 701

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:149

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string)`
- PC address: 225
- Estimated Gas Usage: 208 - 726

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:149

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string)`
- PC address: 227
- Estimated Gas Usage: 214 - 732

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:149

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string)`
- PC address: 250
- Estimated Gas Usage: 279 - 987

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:149

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 309
- Estimated Gas Usage: 193 - 711

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 314
- Estimated Gas Usage: 205 - 723

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 321
- Estimated Gas Usage: 230 - 748

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 346
- Estimated Gas Usage: 295 - 1003

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 352
- Estimated Gas Usage: 313 - 1021

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 372
- Estimated Gas Usage: 361 - 3466

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 377
- Estimated Gas Usage: 376 - 3481

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 384
- Estimated Gas Usage: 401 - 3506

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 386
- Estimated Gas Usage: 407 - 3512

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 405
- Estimated Gas Usage: 463 - 3758

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 414
- Estimated Gas Usage: 487 - 3782

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:123

### Code

```
function __callback(bytes32 id, string result, bytes proof) public {
        require(msg.sender == oraclize_cbAddress());

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if(enabled) {
            update();
        }
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `__callback(bytes32,string)`
- PC address: 629
- Estimated Gas Usage: 383 - 3583

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:149

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `update()`
- PC address: 753
- Estimated Gas Usage: 213 - 731

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:140

### Code

```
oraclize_getPrice("URL")
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: TickerDecentralized
- Function name: `update()`
- PC address: 797
- Estimated Gas Usage: 243 - 951

### Description

This binary add operation can result in integer overflow.
In file: TickerDecentralized.sol:140

### Code

```
oraclize_getPrice("URL")
```

# Analysis results for TimePausable.sol

## External call
- SWC ID: 107
- Type: Informational
- Contract: TimePausable
- Function name: `isAgent(address)`
- PC address: 1388
- Estimated Gas Usage: 1498 - 2959

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: TimePausable.sol:119

### Code

```
ue;
        }
    }
}

```

## External call
- SWC ID: 107
- Type: Informational
- Contract: TimePausable
- Function name: `fallback`
- PC address: 1739
- Estimated Gas Usage: 1425 - 2791

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: TimePausable.sol:93

### Code

```
    function disableTimeValid
```

# Analysis results for Trader.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Trader
- Function name: `fallback`
- PC address: 1044
- Estimated Gas Usage: 998 - 1376

### Description

This binary add operation can result in integer overflow.
In file: Trader.sol:60

## External call
- SWC ID: 107
- Type: Informational
- Contract: Trader
- Function name: `getOwnerAddress()`
- PC address: 1200
- Estimated Gas Usage: 1388 - 2094

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Trader.sol:60

# Analysis result for UserModifiers

No issues found.
# Analysis results for usingOraclize.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `fallback`
- PC address: 108
- Estimated Gas Usage: 136 - 324

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:124

### Code

```
function __callback(bytes32 myid, string result) public {
        __callback(myid, result, new bytes(0));
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `fallback`
- PC address: 113
- Estimated Gas Usage: 148 - 336

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:124

### Code

```
function __callback(bytes32 myid, string result) public {
        __callback(myid, result, new bytes(0));
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `fallback`
- PC address: 120
- Estimated Gas Usage: 173 - 361

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:124

### Code

```
function __callback(bytes32 myid, string result) public {
        __callback(myid, result, new bytes(0));
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `fallback`
- PC address: 122
- Estimated Gas Usage: 179 - 367

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:124

### Code

```
function __callback(bytes32 myid, string result) public {
        __callback(myid, result, new bytes(0));
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `fallback`
- PC address: 145
- Estimated Gas Usage: 244 - 622

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:124

### Code

```
function __callback(bytes32 myid, string result) public {
        __callback(myid, result, new bytes(0));
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 204
- Estimated Gas Usage: 158 - 346

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 209
- Estimated Gas Usage: 170 - 358

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 216
- Estimated Gas Usage: 195 - 383

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 241
- Estimated Gas Usage: 260 - 638

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 247
- Estimated Gas Usage: 278 - 656

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 267
- Estimated Gas Usage: 326 - 3101

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 272
- Estimated Gas Usage: 341 - 3116

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 279
- Estimated Gas Usage: 366 - 3141

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 281
- Estimated Gas Usage: 372 - 3147

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 300
- Estimated Gas Usage: 428 - 3393

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `__callback(bytes32,string,bytes)`
- PC address: 309
- Estimated Gas Usage: 452 - 3417

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:127

### Code

```
function __callback(bytes32 myid, string result, bytes proof) public {
      return;
      myid; result; proof; // Silence compiler warnings
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: usingOraclize
- Function name: `fallback`
- PC address: 344
- Estimated Gas Usage: 348 - 3218

### Description

This binary add operation can result in integer overflow.
In file: usingOraclize.sol:125

### Code

```
new bytes(0)
```

# Analysis result for Wallet

No issues found.
# Analysis results for Whitelist.sol

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Whitelist
- Function name: `isWhitelisted(address,uint256[])`
- PC address: 359
- Estimated Gas Usage: 224 - 412

### Description

This binary add operation can result in integer overflow.
In file: Whitelist.sol:35

### Code

```
function isWhitelisted(address _address, uint256[] memory _countries) public view returns (bool) {
        for(uint256 i = 0; i < _countries.length; i++) {
            if(whitelists[_address][_countries[i]]) {
                return true;
            }
        }

        return false;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Whitelist
- Function name: `isWhitelisted(address,uint256[])`
- PC address: 363
- Estimated Gas Usage: 236 - 424

### Description

This binary multiply operation can result in integer overflow.
In file: Whitelist.sol:35

### Code

```
function isWhitelisted(address _address, uint256[] memory _countries) public view returns (bool) {
        for(uint256 i = 0; i < _countries.length; i++) {
            if(whitelists[_address][_countries[i]]) {
                return true;
            }
        }

        return false;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Whitelist
- Function name: `isWhitelisted(address,uint256[])`
- PC address: 366
- Estimated Gas Usage: 247 - 435

### Description

This binary add operation can result in integer overflow.
In file: Whitelist.sol:35

### Code

```
function isWhitelisted(address _address, uint256[] memory _countries) public view returns (bool) {
        for(uint256 i = 0; i < _countries.length; i++) {
            if(whitelists[_address][_countries[i]]) {
                return true;
            }
        }

        return false;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Whitelist
- Function name: `isWhitelisted(address,uint256[])`
- PC address: 368
- Estimated Gas Usage: 253 - 441

### Description

This binary add operation can result in integer overflow.
In file: Whitelist.sol:35

### Code

```
function isWhitelisted(address _address, uint256[] memory _countries) public view returns (bool) {
        for(uint256 i = 0; i < _countries.length; i++) {
            if(whitelists[_address][_countries[i]]) {
                return true;
            }
        }

        return false;
    }
```

## Integer Overflow
- SWC ID: 101
- Type: Warning
- Contract: Whitelist
- Function name: `isWhitelisted(address,uint256[])`
- PC address: 400
- Estimated Gas Usage: 337 - 1045

### Description

This binary add operation can result in integer overflow.
In file: Whitelist.sol:35

### Code

```
function isWhitelisted(address _address, uint256[] memory _countries) public view returns (bool) {
        for(uint256 i = 0; i < _countries.length; i++) {
            if(whitelists[_address][_countries[i]]) {
                return true;
            }
        }

        return false;
    }
```

## External call
- SWC ID: 107
- Type: Informational
- Contract: Whitelist
- Function name: `isVerifiedAgent(address)`
- PC address: 724
- Estimated Gas Usage: 1474 - 2605

### Description

The contract executes a function call to an external address. Verify that the code at this address is trusted and immutable.
In file: Whitelist.sol:44

