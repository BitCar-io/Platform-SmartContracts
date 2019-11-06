# ECVerify (ECVerify.sol)

View Source: [contracts/libs/ECVerify.sol](../contracts/libs/ECVerify.sol)

**↘ Derived Contracts: [DocsTracker](DocsTracker.md)**

**ECVerify**

## Functions

- [getAddrFromSignature(bytes32 _docHash, uint8 _v, bytes32 _r, bytes32 _s)](#getaddrfromsignature)
- [getAddrFromSignatureWithPrefix(bytes32 _docHash, uint8 _v, bytes32 _r, bytes32 _s)](#getaddrfromsignaturewithprefix)
- [validateSignature(address _addr, bytes32 _docHash, uint8 _v, bytes32 _r, bytes32 _s)](#validatesignature)

### getAddrFromSignature

Obtains the original address that created the signature

```js
function getAddrFromSignature(bytes32 _docHash, uint8 _v, bytes32 _r, bytes32 _s) public pure
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _docHash | bytes32 | Hash of the message | 
| _v | uint8 | Element part of the digital signature | 
| _r | bytes32 | Element part of the digital signature | 
| _s | bytes32 | Element part of the digital signature | 

### getAddrFromSignatureWithPrefix

Obtains the original address that created the signature

```js
function getAddrFromSignatureWithPrefix(bytes32 _docHash, uint8 _v, bytes32 _r, bytes32 _s) public pure
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _docHash | bytes32 | Hash of the message | 
| _v | uint8 | Element part of the digital signature | 
| _r | bytes32 | Element part of the digital signature | 
| _s | bytes32 | Element part of the digital signature | 

### validateSignature

Obtains and validates the original address that created the signature

```js
function validateSignature(address _addr, bytes32 _docHash, uint8 _v, bytes32 _r, bytes32 _s) public pure
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The address to compare with the one obtained from the signature | 
| _docHash | bytes32 | Hash of the message | 
| _v | uint8 | Element part of the digital signature | 
| _r | bytes32 | Element part of the digital signature | 
| _s | bytes32 | Element part of the digital signature | 

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
