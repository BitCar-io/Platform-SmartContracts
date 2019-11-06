# Admin (Admin.sol)

View Source: [contracts/governance/Admin.sol](../contracts/governance/Admin.sol)

**↗ Extends: [AccessControl](AccessControl.md)**

**Admin**

The Admin contract has a Admin Group of addresses, 

and provides basic authorization control functions.

This simplifies the implementation of "user permissions".

## Functions

- [(address _config)](#)
- [addAddressToAdminGroup(address _addr)](#addaddresstoadmingroup)
- [verify(address _addr, bool _verified)](#verify)

### 

Constructor needs instance of RBACData

```js
function (address _config) public nonpayable AccessControl 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | Reference to the RBACData contract | 

### addAddressToAdminGroup

Adds address to Admin Group

```js
function addAddressToAdminGroup(address _addr) public nonpayable onlySudoOrOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### verify

Changes the verified flag of the User

```js
function verify(address _addr, bool _verified) public nonpayable onlySudoOrOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 
| _verified | bool | true / false | 

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
