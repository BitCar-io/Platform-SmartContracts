# IFeeManager.sol

View Source: [contracts/platform/interfaces/IFeeManager.sol](../contracts/platform/interfaces/IFeeManager.sol)

**↘ Derived Contracts: [FeeManager](FeeManager.md)**

**IFeeManager**

## Functions

- [createDefaultFees(uint256 _feeBEE, uint256 _feeMSI, uint256 _feeBPF)](#createdefaultfees)
- [getAddress(string _feeName)](#getaddress)
- [getAmount(string _feeName)](#getamount)
- [hasDefaultFees()](#hasdefaultfees)

### createDefaultFees

⤿ Overridden Implementation(s): [FeeManager.createDefaultFees](FeeManager.md#createdefaultfees)

```js
function createDefaultFees(uint256 _feeBEE, uint256 _feeMSI, uint256 _feeBPF) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeBEE | uint256 |  | 
| _feeMSI | uint256 |  | 
| _feeBPF | uint256 |  | 

### getAddress

⤿ Overridden Implementation(s): [FeeManager.getAddress](FeeManager.md#getaddress)

```js
function getAddress(string _feeName) public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeName | string |  | 

### getAmount

⤿ Overridden Implementation(s): [FeeManager.getAmount](FeeManager.md#getamount)

```js
function getAmount(string _feeName) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeName | string |  | 

### hasDefaultFees

⤿ Overridden Implementation(s): [FeeManager.hasDefaultFees](FeeManager.md#hasdefaultfees)

```js
function hasDefaultFees() public view
returns(bool)
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
