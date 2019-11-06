# IAssetRankTracker.sol

View Source: [contracts/platform/interfaces/IAssetRankTracker.sol](../contracts/platform/interfaces/IAssetRankTracker.sol)

**↘ Derived Contracts: [AssetRankTracker](AssetRankTracker.md)**

**IAssetRankTracker**

## Functions

- [setRank(uint256 _rank, uint256 _period, uint256 _periodLimit, uint256 _periodUserLimit)](#setrank)
- [validatePeriod(address _user, uint256 _amount)](#validateperiod)
- [validateUser(address _user, uint256 _amount)](#validateuser)
- [validate(address _user, uint256 _amount)](#validate)

### setRank

⤿ Overridden Implementation(s): [AssetRankTracker.setRank](AssetRankTracker.md#setrank)

```js
function setRank(uint256 _rank, uint256 _period, uint256 _periodLimit, uint256 _periodUserLimit) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _rank | uint256 |  | 
| _period | uint256 |  | 
| _periodLimit | uint256 |  | 
| _periodUserLimit | uint256 |  | 

### validatePeriod

⤿ Overridden Implementation(s): [AssetRankTracker.validatePeriod](AssetRankTracker.md#validateperiod)

```js
function validatePeriod(address _user, uint256 _amount) internal nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _user | address |  | 
| _amount | uint256 |  | 

### validateUser

⤿ Overridden Implementation(s): [AssetRankTracker.validateUser](AssetRankTracker.md#validateuser)

```js
function validateUser(address _user, uint256 _amount) internal nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _user | address |  | 
| _amount | uint256 |  | 

### validate

⤿ Overridden Implementation(s): [AssetRankTracker.validate](AssetRankTracker.md#validate)

```js
function validate(address _user, uint256 _amount) public nonpayable
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _user | address |  | 
| _amount | uint256 |  | 

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
