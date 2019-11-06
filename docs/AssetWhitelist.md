# AssetWhitelist.sol

View Source: [contracts/whitelist/AssetWhitelist.sol](../contracts/whitelist/AssetWhitelist.sol)

**↗ Extends: [Groups](Groups.md), [IAssetWhitelist](IAssetWhitelist.md)**

**AssetWhitelist**

## Contract Members
**Constants & Variables**

```js
contract Registry internal registry;
contract Whitelist internal whitelist;
uint256[] internal allowedCountries;
mapping(uint256 => uint256) internal indexOfCountries;
bool internal enabled;
bool internal initialPurchases;
bool internal p2pTransfers;
bool internal claimerTransfers;
address internal assetAddress;
address internal claimerAddress;

```

## Functions

- [(address _registry, address _assetAddress, address _claimerAddress)](#)
- [addCountry(uint256 _country)](#addcountry)
- [removeCountry(uint256 _country)](#removecountry)
- [allowTransaction(address _from, address _to)](#allowtransaction)
- [setEnabled(bool _enabled)](#setenabled)
- [setInitialPurchases(bool _initialPurchases)](#setinitialpurchases)
- [setP2PTransfers(bool _p2pTransfers)](#setp2ptransfers)
- [setClaimerTransfers(bool _claimerTransfers)](#setclaimertransfers)
- [getEnabled()](#getenabled)
- [getInitialPurchases()](#getinitialpurchases)
- [getP2PTransfers()](#getp2ptransfers)
- [getClaimerTransfers()](#getclaimertransfers)
- [getCountries()](#getcountries)

### 

```js
function (address _registry, address _assetAddress, address _claimerAddress) public nonpayable Groups 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _registry | address |  | 
| _assetAddress | address |  | 
| _claimerAddress | address |  | 

### addCountry

⤾ overrides [IAssetWhitelist.addCountry](IAssetWhitelist.md#addcountry)

Adds a new country to the AssetWhitelist

```js
function addCountry(uint256 _country) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _country | uint256 | Country to be added, country is a number | 

### removeCountry

⤾ overrides [IAssetWhitelist.removeCountry](IAssetWhitelist.md#removecountry)

Removes a country to the AssetWhitelist

```js
function removeCountry(uint256 _country) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _country | uint256 | Country to be added, country is a number | 

### allowTransaction

⤾ overrides [IAssetWhitelist.allowTransaction](IAssetWhitelist.md#allowtransaction)

Check if a transaction between two addresses is allowed

```js
function allowTransaction(address _from, address _to) public view
returns(bool)
```

**Returns**

If transaction is allowed or not

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address | Transfer from address | 
| _to | address |  | 

### setEnabled

```js
function setEnabled(bool _enabled) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _enabled | bool |  | 

### setInitialPurchases

```js
function setInitialPurchases(bool _initialPurchases) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _initialPurchases | bool |  | 

### setP2PTransfers

```js
function setP2PTransfers(bool _p2pTransfers) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _p2pTransfers | bool |  | 

### setClaimerTransfers

```js
function setClaimerTransfers(bool _claimerTransfers) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _claimerTransfers | bool |  | 

### getEnabled

```js
function getEnabled() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getInitialPurchases

```js
function getInitialPurchases() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getP2PTransfers

```js
function getP2PTransfers() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getClaimerTransfers

```js
function getClaimerTransfers() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getCountries

```js
function getCountries() public view
returns(uint256[])
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
