# Ticker.sol

View Source: [contracts/platform/Ticker.sol](../contracts/platform/Ticker.sol)

**↗ Extends: [ITicker](ITicker.md)**

**Ticker**

## Contract Members
**Constants & Variables**

```js
//internal members
address internal owner;

//private members
string private name;
uint256 private usd;
uint256 private usdEpoch;
uint256 private btc;
uint256 private btcEpoch;
uint256 private eth;
uint256 private ethEpoch;
uint256 private decimals;
uint256 private minEpoch;

```

**Events**

```js
event RateChange(string  currency, uint256  value);
```

## Modifiers

- [onlyOwner](#onlyowner)
- [isValidTicker](#isvalidticker)

### onlyOwner

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isValidTicker

```js
modifier isValidTicker(uint256 _ticker, uint256 _tickerEpoch) internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _ticker | uint256 |  | 
| _tickerEpoch | uint256 |  | 

## Functions

- [(string _name, uint256 _minEpochMinutes)](#)
- [setUSD(uint256 _usd)](#setusd)
- [setBTC(uint256 _btc)](#setbtc)
- [setETH(uint256 _eth)](#seteth)
- [getUSD()](#getusd)
- [getETH()](#geteth)
- [getBTC()](#getbtc)
- [unitsToBase(uint256 _units)](#unitstobase)
- [baseToUnits(uint256 _units)](#basetounits)
- [unitsToUSD(uint256 _units)](#unitstousd)
- [usdToUnits(uint256 _usd)](#usdtounits)
- [unitsToETH(uint256 _units)](#unitstoeth)
- [ethToUnits(uint256 _eth)](#ethtounits)
- [test()](#test)

### 

```js
function (string _name, uint256 _minEpochMinutes) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _name | string |  | 
| _minEpochMinutes | uint256 |  | 

### setUSD

⤾ overrides [ITicker.setUSD](ITicker.md#setusd)

```js
function setUSD(uint256 _usd) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _usd | uint256 |  | 

### setBTC

⤾ overrides [ITicker.setBTC](ITicker.md#setbtc)

```js
function setBTC(uint256 _btc) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _btc | uint256 |  | 

### setETH

⤾ overrides [ITicker.setETH](ITicker.md#seteth)

```js
function setETH(uint256 _eth) public nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _eth | uint256 |  | 

### getUSD

⤾ overrides [ITicker.getUSD](ITicker.md#getusd)

```js
function getUSD() public view isValidTicker 
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getETH

⤾ overrides [ITicker.getETH](ITicker.md#geteth)

```js
function getETH() public view isValidTicker 
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getBTC

⤾ overrides [ITicker.getBTC](ITicker.md#getbtc)

```js
function getBTC() public view isValidTicker 
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### unitsToBase

⤾ overrides [ITicker.unitsToBase](ITicker.md#unitstobase)

Converts units into the smallest unit

```js
function unitsToBase(uint256 _units) public view
returns(uint256)
```

**Returns**

The units in the smallest denomination possible

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### baseToUnits

⤾ overrides [ITicker.baseToUnits](ITicker.md#basetounits)

Converts units from the smallest denomination possible into the
base unit

```js
function baseToUnits(uint256 _units) public view
returns(uint256)
```

**Returns**

Units converted to base unit

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### unitsToUSD

⤾ overrides [ITicker.unitsToUSD](ITicker.md#unitstousd)

Converts units to USD

```js
function unitsToUSD(uint256 _units) public view
returns(uint256)
```

**Returns**

Converted units in USD

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### usdToUnits

⤾ overrides [ITicker.usdToUnits](ITicker.md#usdtounits)

Converts USD to units

```js
function usdToUnits(uint256 _usd) public view
returns(uint256)
```

**Returns**

Converted USD to units

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _usd | uint256 |  | 

### unitsToETH

⤾ overrides [ITicker.unitsToETH](ITicker.md#unitstoeth)

Converts units to USD

```js
function unitsToETH(uint256 _units) public view
returns(uint256)
```

**Returns**

Converted units in USD

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### ethToUnits

⤾ overrides [ITicker.ethToUnits](ITicker.md#ethtounits)

Converts USD to units

```js
function ethToUnits(uint256 _eth) public view
returns(uint256)
```

**Returns**

Converted USD to units

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _eth | uint256 |  | 

### test

```js
function test() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

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
