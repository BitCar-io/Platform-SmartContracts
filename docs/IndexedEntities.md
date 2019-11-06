# IndexedEntities (IndexedEntities.sol)

View Source: [contracts/libs/IndexedEntities.sol](../contracts/libs/IndexedEntities.sol)

**↗ Extends: [Ownable](Ownable.md)**

**IndexedEntities**

## Structs
### Item

```js
struct Item {
 mapping(uint256 => address) registry,
 mapping(address => bool) availability,
 uint256 count
}
```

## Contract Members
**Constants & Variables**

```js
mapping(address => mapping(string => struct IndexedEntities.Item)) private items;

```

**Events**

```js
event ItemAdded(address indexed _owner, string  _type, address  _item, uint256  _index);
```

## Functions

- [addItem(address _owner, string _type, address _item)](#additem)
- [getItem(address _owner, string _type, uint256 _index)](#getitem)
- [getCount(address _owner, string _type)](#getcount)
- [hasItem(address _owner, string _type, address _item)](#hasitem)

### addItem

Adds a new item to the map

```js
function addItem(address _owner, string _type, address _item) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The wallet the item is going to be assigned to | 
| _type | string | The type of the item | 
| _item | address | The item | 

### getItem

Gets an item from the map

```js
function getItem(address _owner, string _type, uint256 _index) public view onlyImmediateOwnerOrWhitelisted 
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The wallet to get the item from | 
| _type | string | The type of the item | 
| _index | uint256 | The index where the item is stored | 

### getCount

Gets the item count for the wallet

```js
function getCount(address _owner, string _type) public view onlyImmediateOwnerOrWhitelisted 
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The wallet to get the count from | 
| _type | string | The type of the item | 

### hasItem

Returns TRUE if the _item is associated to _source, FALSE otherwise

```js
function hasItem(address _owner, string _type, address _item) public view onlyImmediateOwnerOrWhitelisted 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The wallet to get the item from | 
| _type | string | The type of the item | 
| _item | address | The item being validated | 

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
