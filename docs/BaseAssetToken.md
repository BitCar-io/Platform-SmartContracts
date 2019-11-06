# BaseAssetToken.sol

View Source: [contracts/token/Asset/BaseAssetToken.sol](../contracts/token/Asset/BaseAssetToken.sol)

**↗ Extends: [IAssetToken](IAssetToken.md), [CyclicPausable](CyclicPausable.md)**
**↘ Derived Contracts: [AssetToken](AssetToken.md)**

**BaseAssetToken**

## Contract Members
**Constants & Variables**

```js
//internal members
contract IAssetWhitelist internal assetWhitelist;
address internal owner;

//public members
string public name;
string public symbol;
uint256 public constant decimals;
string public constant version;
string public constant provenance;
mapping(address => uint256) public balances;
mapping(address => mapping(address => uint256)) public allowed;
bool public claimsEnabled;

//private members
uint256 private totalTokens;

```

## Modifiers

- [onlyOwner](#onlyowner)
- [whitelistAllowed](#whitelistallowed)

### onlyOwner

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whitelistAllowed

Checks if whitelist is set and if so, if both the sender and receiver are whitelisted

```js
modifier whitelistAllowed(address _from, address _to) internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address |  | 
| _to | address |  | 

## Functions

- [()](#)
- [(address _owner, string _name, string _symbol, uint256 _totalTokens, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles, address _config)](#)
- [totalSupply()](#totalsupply)
- [getOwner()](#getowner)
- [getName()](#getname)
- [getSymbol()](#getsymbol)
- [transfer(address _to, uint256 _value)](#transfer)
- [transferFrom(address _from, address _to, uint256 _value)](#transferfrom)
- [balanceOf(address _owner)](#balanceof)
- [approve(address _spender, uint256 _value)](#approve)
- [compareAndApprove(address _spender, uint256 _currentValue, uint256 _newValue)](#compareandapprove)
- [allowance(address _owner, address _spender)](#allowance)
- [canClaim()](#canclaim)
- [setAssetWhitelist(address _assetWhitelistAddress)](#setassetwhitelist)
- [isWhitelistAllowed(address _from, address _to)](#iswhitelistallowed)

### 

```js
function () external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### 

TOOD: Check security around "owner"

```js
function (address _owner, string _name, string _symbol, uint256 _totalTokens, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles, address _config) public nonpayable CyclicPausable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The owner of the contract (Will have initial total supply) | 
| _name | string | The name given to the token | 
| _symbol | string | The symbol given to the token | 
| _totalTokens | uint256 | The total amount of tokens issued | 
| _minOwnershipPercentage | uint256 | The minimum quorum | 
| _tradingPeriod | uint256 | The period (in seconds) that trading will be allowed | 
| _votingPeriod | uint256 | The period (in seconds) that voting will be allowed | 
| _maxCycles | uint8 | Number of maximum cycles allow for the asset (see waves: CyclicPausable.sol) | 
| _config | address | From Groups contract. References to AccessControl contracts. | 

### totalSupply

⤾ overrides [IAssetToken.totalSupply](IAssetToken.md#totalsupply)

```js
function totalSupply() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getOwner

⤾ overrides [IAssetToken.getOwner](IAssetToken.md#getowner)

```js
function getOwner() public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getName

⤾ overrides [IAssetToken.getName](IAssetToken.md#getname)

```js
function getName() public view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getSymbol

⤾ overrides [IAssetToken.getSymbol](IAssetToken.md#getsymbol)

```js
function getSymbol() public view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transfer

⤾ overrides [IAssetToken.transfer](IAssetToken.md#transfer)

```js
function transfer(address _to, uint256 _value) public nonpayable whenNotPaused whileIsInUpperWave withinLifespan whitelistAllowed 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _to | address |  | 
| _value | uint256 |  | 

### transferFrom

⤾ overrides [IAssetToken.transferFrom](IAssetToken.md#transferfrom)

```js
function transferFrom(address _from, address _to, uint256 _value) public nonpayable whenNotPaused whileIsInUpperWave withinLifespan whitelistAllowed 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address |  | 
| _to | address |  | 
| _value | uint256 |  | 

### balanceOf

⤾ overrides [IAssetToken.balanceOf](IAssetToken.md#balanceof)

```js
function balanceOf(address _owner) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 

### approve

⤾ overrides [IAssetToken.approve](IAssetToken.md#approve)

```js
function approve(address _spender, uint256 _value) public nonpayable whenNotPaused whileIsInUpperWave withinLifespan whitelistAllowed 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address |  | 
| _value | uint256 |  | 

### compareAndApprove

```js
function compareAndApprove(address _spender, uint256 _currentValue, uint256 _newValue) public nonpayable whenNotPaused whileIsInUpperWave withinLifespan 
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

⤾ overrides [IAssetToken.allowance](IAssetToken.md#allowance)

```js
function allowance(address _owner, address _spender) public view
returns(remaining uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 
| _spender | address |  | 

### canClaim

⤾ overrides [IAssetToken.canClaim](IAssetToken.md#canclaim)

Returns if claims are enabled

```js
function canClaim() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setAssetWhitelist

⤾ overrides [IAssetToken.setAssetWhitelist](IAssetToken.md#setassetwhitelist)

Sets the whitelist for this asset token

```js
function setAssetWhitelist(address _assetWhitelistAddress) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _assetWhitelistAddress | address | The address of the newly created whitelist | 

### isWhitelistAllowed

⤾ overrides [IAssetToken.isWhitelistAllowed](IAssetToken.md#iswhitelistallowed)

Checks if an from and to are whitelisted in case of whitelists being enabled

```js
function isWhitelistAllowed(address _from, address _to) public view
returns(bool)
```

**Returns**

true if whitelists are enabled and both addresses are in the whitelist, false otherwise

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address | From address to be checked | 
| _to | address | To address to be checked | 

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
