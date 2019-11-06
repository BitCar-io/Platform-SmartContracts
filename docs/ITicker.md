# ITicker.sol

View Source: [contracts/platform/interfaces/ITicker.sol](../contracts/platform/interfaces/ITicker.sol)

**↘ Derived Contracts: [Ticker](Ticker.md)**

**ITicker**

## Functions

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

### setUSD

⤿ Overridden Implementation(s): [Ticker.setUSD](Ticker.md#setusd)

```js
function setUSD(uint256 _usd) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _usd | uint256 |  | 

### setBTC

⤿ Overridden Implementation(s): [Ticker.setBTC](Ticker.md#setbtc)

```js
function setBTC(uint256 _btc) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _btc | uint256 |  | 

### setETH

⤿ Overridden Implementation(s): [Ticker.setETH](Ticker.md#seteth)

```js
function setETH(uint256 _eth) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _eth | uint256 |  | 

### getUSD

⤿ Overridden Implementation(s): [Ticker.getUSD](Ticker.md#getusd)

```js
function getUSD() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getETH

⤿ Overridden Implementation(s): [Ticker.getETH](Ticker.md#geteth)

```js
function getETH() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getBTC

⤿ Overridden Implementation(s): [Ticker.getBTC](Ticker.md#getbtc)

```js
function getBTC() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### unitsToBase

⤿ Overridden Implementation(s): [Ticker.unitsToBase](Ticker.md#unitstobase)

```js
function unitsToBase(uint256 _units) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### baseToUnits

⤿ Overridden Implementation(s): [Ticker.baseToUnits](Ticker.md#basetounits)

```js
function baseToUnits(uint256 _units) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### unitsToUSD

⤿ Overridden Implementation(s): [Ticker.unitsToUSD](Ticker.md#unitstousd)

```js
function unitsToUSD(uint256 _units) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### usdToUnits

⤿ Overridden Implementation(s): [Ticker.usdToUnits](Ticker.md#usdtounits)

```js
function usdToUnits(uint256 _usd) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _usd | uint256 |  | 

### unitsToETH

⤿ Overridden Implementation(s): [Ticker.unitsToETH](Ticker.md#unitstoeth)

```js
function unitsToETH(uint256 _units) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _units | uint256 |  | 

### ethToUnits

⤿ Overridden Implementation(s): [Ticker.ethToUnits](Ticker.md#ethtounits)

```js
function ethToUnits(uint256 _eth) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _eth | uint256 |  | 

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
