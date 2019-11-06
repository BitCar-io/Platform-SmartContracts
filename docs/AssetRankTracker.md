# AssetRankTracker.sol

View Source: [contracts/platform/ranktracker/AssetRankTracker.sol](../contracts/platform/ranktracker/AssetRankTracker.sol)

**↗ Extends: [IAssetRankTracker](IAssetRankTracker.md), [Groups](Groups.md)**

**AssetRankTracker**

## Structs
### AssetLimits

```js
struct AssetLimits {
 uint256 period,
 uint256 periodLimit,
 uint256 periodUserLimit,
 uint256 periodUsage,
 uint256 lastUpdate
}
```

### UserLimits

```js
struct UserLimits {
 uint256 periodUsage,
 uint256 lastUpdate
}
```

## Contract Members
**Constants & Variables**

```js
//internal members
address internal owner;
contract Registry internal config;
contract RankTracker internal rankTracker;

//public members
mapping(uint256 => struct AssetRankTracker.AssetLimits) public limits;
mapping(address => struct AssetRankTracker.UserLimits) public userLimits;

```

## Modifiers

- [onlyOwner](#onlyowner)

### onlyOwner

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(address _registry, address _owner)](#)
- [setRank(uint256 _rank, uint256 _period, uint256 _periodLimit, uint256 _periodUserLimit)](#setrank)
- [validatePeriod(address _user, uint256 _amount)](#validateperiod)
- [validateUser(address _user, uint256 _amount)](#validateuser)
- [validate(address _user, uint256 _amount)](#validate)

### 

```js
function (address _registry, address _owner) public nonpayable Groups 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _registry | address |  | 
| _owner | address |  | 

### setRank

⤾ overrides [IAssetRankTracker.setRank](IAssetRankTracker.md#setrank)

Creates a new rank or changes an existing rank

```js
function setRank(uint256 _rank, uint256 _period, uint256 _periodLimit, uint256 _periodUserLimit) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _rank | uint256 | Index of the rank | 
| _period | uint256 | Period duration in seconds | 
| _periodLimit | uint256 | Period amount limit | 
| _periodUserLimit | uint256 | Period user amount limit | 

### validatePeriod

⤾ overrides [IAssetRankTracker.validatePeriod](IAssetRankTracker.md#validateperiod)

Validates the current period limits

```js
function validatePeriod(address _user, uint256 _amount) internal nonpayable
returns(bool)
```

**Returns**

True if period does not exceed the limits

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _user | address | Address of the user | 
| _amount | uint256 | Amount of the purchase | 

### validateUser

⤾ overrides [IAssetRankTracker.validateUser](IAssetRankTracker.md#validateuser)

Validates the user limits

```js
function validateUser(address _user, uint256 _amount) internal nonpayable
returns(bool)
```

**Returns**

True if user does not exceed the limits

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _user | address | Address of the user | 
| _amount | uint256 | Amount of the purchase | 

### validate

⤾ overrides [IAssetRankTracker.validate](IAssetRankTracker.md#validate)

Validates both the current period and user limits

```js
function validate(address _user, uint256 _amount) public nonpayable onlyOwner 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _user | address | Address of the user | 
| _amount | uint256 | Amount of the purchase | 

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
