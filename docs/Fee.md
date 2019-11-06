# Fee.sol

View Source: [contracts/platform/Fee.sol](../contracts/platform/Fee.sol)

**↗ Extends: [IFee](IFee.md)**

**Fee**

## Contract Members
**Constants & Variables**

```js
contract Registry internal config;
contract IPlatformToken internal platformToken;
contract IAssetToken internal assetToken;
address payable internal claimerAddress;

```

## Modifiers

- [onlyClaimer](#onlyclaimer)

### onlyClaimer

```js
modifier onlyClaimer() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(address _config, address payable _claimerAddress, address _assetTokenAddress)](#)
- [claimEth()](#claimeth)
- [claimPlatformTokens()](#claimplatformtokens)
- [claimAssetTokens()](#claimassettokens)
- [getPlatformTokenBalance()](#getplatformtokenbalance)
- [getAssetTokenBalance()](#getassettokenbalance)

### 

Constructor

```js
function (address _config, address payable _claimerAddress, address _assetTokenAddress) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | The Registry address | 
| _claimerAddress | address payable | The Registry address | 
| _assetTokenAddress | address | The Registry address | 

### claimEth

⤾ overrides [IFee.claimEth](IFee.md#claimeth)

```js
function claimEth() public nonpayable onlyClaimer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimPlatformTokens

⤾ overrides [IFee.claimPlatformTokens](IFee.md#claimplatformtokens)

```js
function claimPlatformTokens() public nonpayable onlyClaimer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimAssetTokens

⤾ overrides [IFee.claimAssetTokens](IFee.md#claimassettokens)

```js
function claimAssetTokens() public nonpayable onlyClaimer 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getPlatformTokenBalance

⤾ overrides [IFee.getPlatformTokenBalance](IFee.md#getplatformtokenbalance)

```js
function getPlatformTokenBalance() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAssetTokenBalance

⤾ overrides [IFee.getAssetTokenBalance](IFee.md#getassettokenbalance)

```js
function getAssetTokenBalance() public view
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
