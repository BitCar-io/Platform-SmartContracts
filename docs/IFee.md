# IFee.sol

View Source: [contracts/platform/interfaces/IFee.sol](../contracts/platform/interfaces/IFee.sol)

**↘ Derived Contracts: [BEE](BEE.md), [Claimer](Claimer.md), [Fee](Fee.md)**

**IFee**

## Functions

- [claimEth()](#claimeth)
- [claimPlatformTokens()](#claimplatformtokens)
- [claimAssetTokens()](#claimassettokens)
- [getPlatformTokenBalance()](#getplatformtokenbalance)
- [getAssetTokenBalance()](#getassettokenbalance)

### claimEth

⤿ Overridden Implementation(s): [BEE.claimEth](BEE.md#claimeth),[Claimer.claimEth](Claimer.md#claimeth),[Fee.claimEth](Fee.md#claimeth),[IBEE.claimEth](IBEE.md#claimeth)

```js
function claimEth() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimPlatformTokens

⤿ Overridden Implementation(s): [BEE.claimPlatformTokens](BEE.md#claimplatformtokens),[Claimer.claimPlatformTokens](Claimer.md#claimplatformtokens),[Fee.claimPlatformTokens](Fee.md#claimplatformtokens),[IBEE.claimPlatformTokens](IBEE.md#claimplatformtokens)

```js
function claimPlatformTokens() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimAssetTokens

⤿ Overridden Implementation(s): [BEE.claimAssetTokens](BEE.md#claimassettokens),[Claimer.claimAssetTokens](Claimer.md#claimassettokens),[Fee.claimAssetTokens](Fee.md#claimassettokens),[IBEE.claimAssetTokens](IBEE.md#claimassettokens)

```js
function claimAssetTokens() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getPlatformTokenBalance

⤿ Overridden Implementation(s): [BEE.getPlatformTokenBalance](BEE.md#getplatformtokenbalance),[Claimer.getPlatformTokenBalance](Claimer.md#getplatformtokenbalance),[Fee.getPlatformTokenBalance](Fee.md#getplatformtokenbalance),[IBEE.getPlatformTokenBalance](IBEE.md#getplatformtokenbalance)

```js
function getPlatformTokenBalance() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAssetTokenBalance

⤿ Overridden Implementation(s): [BEE.getAssetTokenBalance](BEE.md#getassettokenbalance),[Claimer.getAssetTokenBalance](Claimer.md#getassettokenbalance),[Fee.getAssetTokenBalance](Fee.md#getassettokenbalance),[IBEE.getAssetTokenBalance](IBEE.md#getassettokenbalance)

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
