# IBEE.sol

View Source: [contracts/platform/interfaces/IBEE.sol](../contracts/platform/interfaces/IBEE.sol)

**↘ Derived Contracts: [BEE](BEE.md)**

**IBEE**

## Functions

- [getRatio()](#getratio)
- [assetTokensToPlatformTokens(uint256 _amount)](#assettokenstoplatformtokens)
- [claimEth()](#claimeth)
- [claimPlatformTokens()](#claimplatformtokens)
- [claimAssetTokens()](#claimassettokens)
- [getPlatformTokenBalance()](#getplatformtokenbalance)
- [getAssetTokenBalance()](#getassettokenbalance)

### getRatio

⤿ Overridden Implementation(s): [BEE.getRatio](BEE.md#getratio)

```js
function getRatio() public nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### assetTokensToPlatformTokens

⤿ Overridden Implementation(s): [BEE.assetTokensToPlatformTokens](BEE.md#assettokenstoplatformtokens)

```js
function assetTokensToPlatformTokens(uint256 _amount) public nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### claimEth

⤾ overrides [IFee.claimEth](IFee.md#claimeth)

⤿ Overridden Implementation(s): [BEE.claimEth](BEE.md#claimeth)

```js
function claimEth() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimPlatformTokens

⤾ overrides [IFee.claimPlatformTokens](IFee.md#claimplatformtokens)

⤿ Overridden Implementation(s): [BEE.claimPlatformTokens](BEE.md#claimplatformtokens)

Amount of car tokens to claim and receive bitcar tokens in return

```js
function claimPlatformTokens() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimAssetTokens

⤾ overrides [IFee.claimAssetTokens](IFee.md#claimassettokens)

⤿ Overridden Implementation(s): [BEE.claimAssetTokens](BEE.md#claimassettokens)

```js
function claimAssetTokens() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getPlatformTokenBalance

⤾ overrides [IFee.getPlatformTokenBalance](IFee.md#getplatformtokenbalance)

⤿ Overridden Implementation(s): [BEE.getPlatformTokenBalance](BEE.md#getplatformtokenbalance)

```js
function getPlatformTokenBalance() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAssetTokenBalance

⤾ overrides [IFee.getAssetTokenBalance](IFee.md#getassettokenbalance)

⤿ Overridden Implementation(s): [BEE.getAssetTokenBalance](BEE.md#getassettokenbalance)

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
