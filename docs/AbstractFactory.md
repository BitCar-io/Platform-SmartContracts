# AbstractFactory.sol

View Source: [contracts/factories/AbstractFactory.sol](../contracts/factories/AbstractFactory.sol)

**↘ Derived Contracts: [AssetFactory](AssetFactory.md), [AssetRankTrackerFactory](AssetRankTrackerFactory.md), [AssetTokenFactory](AssetTokenFactory.md), [AssetWhitelistFactory](AssetWhitelistFactory.md), [BEEFactory](BEEFactory.md), [ClaimerFactory](ClaimerFactory.md), [FeeFactory](FeeFactory.md), [FeeManagerFactory](FeeManagerFactory.md)**

**AbstractFactory**

## Contract Members
**Constants & Variables**

```js
address[] internal addresses;
contract Registry internal config;

```

**Events**

```js
event ContractCreated(address indexed createdBy, address indexed contractAddress);
```

## Functions

- [(address _config)](#)
- [get(uint256 _index)](#get)
- [size()](#size)

### 

Constructor

```js
function (address _config) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | The Registry address | 

### get

Gets an address for a given index

```js
function get(uint256 _index) public view
returns(address)
```

**Returns**

Addresses address

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _index | uint256 | Address index | 

### size

Gets the size of the addresses array

```js
function size() public view
returns(uint256)
```

**Returns**

Array size

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
