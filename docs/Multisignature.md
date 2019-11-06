# Multisignature (Multisignature.sol)

View Source: [contracts/governance/Multisignature.sol](../contracts/governance/Multisignature.sol)

**↘ Derived Contracts: [Sudo](Sudo.md)**

**Multisignature**

Contract that implements the basic functionality for multisignature 
function execution
TODO: Implement BlockNumber based expiration mechanism

## Structs
### MultisigTransaction

```js
struct MultisigTransaction {
 address initiatedBy,
 uint8 signatureCount,
 uint8 minSignatureCount,
 mapping(address => uint8) signatures
}
```

## Contract Members
**Constants & Variables**

```js
mapping(uint256 => struct Multisignature.MultisigTransaction) private multisigTransactions;
uint256 private transactionIdx;
uint256[] private pendingMultisigTransactions;

```

**Events**

```js
event MultisigExecutionRequest(address  initiatedBy, uint256  transactionId);
event MultisigExecutionApproval(address  signedBy, uint256  transactionId);
event MultisigExecutionCompleted(uint256  transactionId);
event MultisigExecutionCancelled(uint256  transactionId);
```

## Functions

- [()](#)
- [createMultisigTransaction(uint8 _minSignCount, uint256 _groupMembersCount)](#createmultisigtransaction)
- [signMultisigTransaction(uint256 _transactionId)](#signmultisigtransaction)
- [deleteMultisigTransaction(uint256 _transactionId)](#deletemultisigtransaction)
- [cancelMultisigTransaction(uint256 _transactionId)](#cancelmultisigtransaction)
- [getPendingConfirmations()](#getpendingconfirmations)

### 

```js
function () public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### createMultisigTransaction

<STEP 1> in the Multisignature process: A Request for the execution 
of protected funtionality is submitted

```js
function createMultisigTransaction(uint8 _minSignCount, uint256 _groupMembersCount) internal nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _minSignCount | uint8 |  | 
| _groupMembersCount | uint256 |  | 

### signMultisigTransaction

<STEP 2> in the Multisignature process: Using the transactionId 
given in <STEP 1>, the request is signed.

```js
function signMultisigTransaction(uint256 _transactionId) internal nonpayable
returns(_signCount uint8, _minSignCount uint8)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _transactionId | uint256 |  | 

### deleteMultisigTransaction

<STEP 4> Once the multi-signature process is finished or a cancellation is
requested, the transaction is deleted

```js
function deleteMultisigTransaction(uint256 _transactionId) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _transactionId | uint256 |  | 

### cancelMultisigTransaction

Cancels the current transaction, at a cost.

```js
function cancelMultisigTransaction(uint256 _transactionId) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _transactionId | uint256 |  | 

### getPendingConfirmations

Returns the number of pending transactions.

```js
function getPendingConfirmations() public view
returns(uint256)
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
