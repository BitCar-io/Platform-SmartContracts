# Sudo (Sudo.sol)

View Source: [contracts/governance/Sudo.sol](../contracts/governance/Sudo.sol)

**↗ Extends: [AccessControl](AccessControl.md), [Multisignature](Multisignature.md)**

**Sudo**

The Sudo contract has a SUDO Group of addresses, 
and provides basic authorization control functions.
This simplifies the implementation of "user permissions".

## Contract Members
**Constants & Variables**

```js
address private tempAddr;

```

## Functions

- [(address _config)](#)
- [addAddressToSudoGroup(address _addr)](#addaddresstosudogroup)
- [requestRemoveAddressFromSudoGroup(address _addr)](#requestremoveaddressfromsudogroup)
- [confirmRemoveAddressFromSudoGroup(uint256 _transactionId)](#confirmremoveaddressfromsudogroup)

### 

Constructor needs instance of RBACData

```js
function (address _config) public nonpayable AccessControl 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | Reference to the RBACData contract | 

### addAddressToSudoGroup

Adds address to Sudo Group

```js
function addAddressToSudoGroup(address _addr) public nonpayable onlySudoOrOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### requestRemoveAddressFromSudoGroup

Requests execution of address removal from Sudo Group

```js
function requestRemoveAddressFromSudoGroup(address _addr) public nonpayable onlySudo 
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### confirmRemoveAddressFromSudoGroup

Once confirmed, the address is removed.

```js
function confirmRemoveAddressFromSudoGroup(uint256 _transactionId) public nonpayable onlySudo 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _transactionId | uint256 | The transaction ID obtained from the execution of the 
function requestRemoveAddressFromSudoGroup | 

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
