# DocsTracker (DocsTracker.sol)

View Source: [contracts/platform/kyc/DocsTracker.sol](../contracts/platform/kyc/DocsTracker.sol)

**↗ Extends: [Ownable](Ownable.md), [ECVerify](ECVerify.md)**

**DocsTracker**

## Structs
### Document

```js
struct Document {
 uint8 docType,
 bool validSignature,
 bool submissionConfirmed,
 bytes32 digest,
 uint256 idx,
 uint8 v,
 bytes32 r,
 bytes32 s
}
```

### Repository

```js
struct Repository {
 mapping(bytes32 => struct DocsTracker.Document) doc,
 mapping(uint256 => bytes32) idx,
 uint256 count
}
```

## Contract Members
**Constants & Variables**

```js
mapping(address => struct DocsTracker.Repository) private repo;

```

**Events**

```js
event DocumentSubmitted(address indexed _addr, bytes32  _hash);
event DocumentConfirmed(address indexed _addr, bytes32  _hash);
```

## Functions

- [submitDocumentDigestAndSignature(uint8 _docType, bytes32 _hash, uint8 _v, bytes32 _r, bytes32 _s)](#submitdocumentdigestandsignature)
- [confirmDocument(address _addr, bytes32 _hash)](#confirmdocument)
- [getDocStatusByHash(address _addr, bytes32 _hash)](#getdocstatusbyhash)
- [getDocStatusByIdx(address _addr, uint256 _idx)](#getdocstatusbyidx)
- [getDocCount(address _addr)](#getdoccount)

### submitDocumentDigestAndSignature

Submitts document digest and signature
param _docType The document type
param _hash The hash of the document
param _v Component V of the signature
param _r Component R of the signature
param _s Component S of the signature

```js
function submitDocumentDigestAndSignature(uint8 _docType, bytes32 _hash, uint8 _v, bytes32 _r, bytes32 _s) public nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _docType | uint8 |  | 
| _hash | bytes32 |  | 
| _v | uint8 |  | 
| _r | bytes32 |  | 
| _s | bytes32 |  | 

### confirmDocument

Confirms the document as successfully submitted

```js
function confirmDocument(address _addr, bytes32 _hash) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 
| _hash | bytes32 |  | 

### getDocStatusByHash

Gets the status of the submitted documents

```js
function getDocStatusByHash(address _addr, bytes32 _hash) public view
returns(_docType uint8, _validSignature bool, _submissionConfirmed bool, _digest bytes32, _idx uint256, _v uint8, _r bytes32, _s bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The wallet that corresponds to the user submitting the documents | 
| _hash | bytes32 | The hash (sha3) of the document | 

### getDocStatusByIdx

Gets the status of the submitted documents

```js
function getDocStatusByIdx(address _addr, uint256 _idx) public view
returns(_docType uint8, _validSignature bool, _submissionConfirmed bool, _digest bytes32, _idx_r uint256, _v uint8, _r bytes32, _s bytes32)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The wallet that corresponds to the user submitting the documents | 
| _idx | uint256 | The index of the document | 

### getDocCount

Returns the quantity of documents associated with an address

```js
function getDocCount(address _addr) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The address to obtain the count from | 

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
