# PlatformToken.sol

View Source: [contracts/token/Platform/PlatformToken.sol](../contracts/token/Platform/PlatformToken.sol)

**↗ Extends: [IPlatformToken](IPlatformToken.md)**

**PlatformToken**

## Contract Members
**Constants & Variables**

```js
//public members
string public name;
string public symbol;
uint256 public constant decimals;
string public constant version;
string public constant provenance;
mapping(address => uint256) public balances;
mapping(address => mapping(address => uint256)) public allowed;

//private members
uint256 private totalTokens;

```

**Events**

```js
event Transfer(address indexed from, address indexed to, uint256  value);
event Approval(address indexed owner, address indexed spender, uint256  value);
```

## Functions

- [()](#)
- [(string _name, string _symbol, uint256 _totalTokens)](#)
- [totalSupply()](#totalsupply)
- [transfer(address _to, uint256 _value)](#transfer)
- [transferFrom(address _from, address _to, uint256 _value)](#transferfrom)
- [balanceOf(address _owner)](#balanceof)
- [approve(address _spender, uint256 _value)](#approve)
- [compareAndApprove(address _spender, uint256 _currentValue, uint256 _newValue)](#compareandapprove)
- [allowance(address _owner, address _spender)](#allowance)

### 

```js
function () external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### 

```js
function (string _name, string _symbol, uint256 _totalTokens) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _name | string |  | 
| _symbol | string |  | 
| _totalTokens | uint256 |  | 

### totalSupply

⤾ overrides [IPlatformToken.totalSupply](IPlatformToken.md#totalsupply)

```js
function totalSupply() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transfer

⤾ overrides [IPlatformToken.transfer](IPlatformToken.md#transfer)

```js
function transfer(address _to, uint256 _value) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _to | address |  | 
| _value | uint256 |  | 

### transferFrom

⤾ overrides [IPlatformToken.transferFrom](IPlatformToken.md#transferfrom)

```js
function transferFrom(address _from, address _to, uint256 _value) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address |  | 
| _to | address |  | 
| _value | uint256 |  | 

### balanceOf

⤾ overrides [IPlatformToken.balanceOf](IPlatformToken.md#balanceof)

```js
function balanceOf(address _owner) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 

### approve

⤾ overrides [IPlatformToken.approve](IPlatformToken.md#approve)

```js
function approve(address _spender, uint256 _value) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address |  | 
| _value | uint256 |  | 

### compareAndApprove

```js
function compareAndApprove(address _spender, uint256 _currentValue, uint256 _newValue) public nonpayable
returns(bool)
```

**Returns**

bool Whether the approval was a success (see ERC20's `approve`)

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address | The address to approve | 
| _currentValue | uint256 | The previous value approved, which can be retrieved with allowance(msg.sender, _spender) | 
| _newValue | uint256 | The new value to approve, this will replace the _currentValue | 

### allowance

⤾ overrides [IPlatformToken.allowance](IPlatformToken.md#allowance)

```js
function allowance(address _owner, address _spender) public view
returns(remaining uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 
| _spender | address |  | 

## Contracts

* [AbstractFactory](AbstractFactory.md)
* [AccessControl](AccessControl.md)
* [Admin](Admin.md)
* [Agent](Agent.md)
* [Asset](Asset.md)
* [AssetBallot](AssetBallot.md)
* [AssetFactory](AssetFactory.md)
* [AssetRankTracker](AssetRankTracker.md)
* [AssetRankTrackerFactory](AssetRankTrackerFactory.md)
* [AssetToken](AssetToken.md)
* [AssetTokenFactory](AssetTokenFactory.md)
* [AssetWhitelist](AssetWhitelist.md)
* [AssetWhitelistFactory](AssetWhitelistFactory.md)
* [BaseAssetToken](BaseAssetToken.md)
* [BEE](BEE.md)
* [BEEFactory](BEEFactory.md)
* [Buffer](Buffer.md)
* [CBOR](CBOR.md)
* [Claimer](Claimer.md)
* [ClaimerFactory](ClaimerFactory.md)
* [CyclicPausable](CyclicPausable.md)
* [DocsTracker](DocsTracker.md)
* [ECVerify](ECVerify.md)
* [Entity](Entity.md)
* [Fee](Fee.md)
* [FeeFactory](FeeFactory.md)
* [FeeManager](FeeManager.md)
* [FeeManagerFactory](FeeManagerFactory.md)
* [Groups](Groups.md)
* [IAsset](IAsset.md)
* [IAssetRankTracker](IAssetRankTracker.md)
* [IAssetToken](IAssetToken.md)
* [IAssetWhitelist](IAssetWhitelist.md)
* [IBEE](IBEE.md)
* [IClaimer](IClaimer.md)
* [IFee](IFee.md)
* [IFeeManager](IFeeManager.md)
* [IndexedEntities](IndexedEntities.md)
* [IPlatformToken](IPlatformToken.md)
* [ITicker](ITicker.md)
* [Migrations](Migrations.md)
* [Multisignature](Multisignature.md)
* [OraclizeAddrResolverI](OraclizeAddrResolverI.md)
* [OraclizeI](OraclizeI.md)
* [Ownable](Ownable.md)
* [Pausable](Pausable.md)
* [PlatformToken](PlatformToken.md)
* [Priced](Priced.md)
* [RankTracker](RankTracker.md)
* [RBACData](RBACData.md)
* [Registry](Registry.md)
* [Roles](Roles.md)
* [SafeMath](SafeMath.md)
* [solcChecker](solcChecker.md)
* [Sudo](Sudo.md)
* [Ticker](Ticker.md)
* [TickerDecentralized](TickerDecentralized.md)
* [TimePausable](TimePausable.md)
* [Trader](Trader.md)
* [usingOraclize](usingOraclize.md)
* [Wallet](Wallet.md)
* [Whitelist](Whitelist.md)
