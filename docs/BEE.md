# BEE.sol

View Source: [contracts/platform/BEE.sol](../contracts/platform/BEE.sol)

**↗ Extends: [IFee](IFee.md), [IBEE](IBEE.md)**

**BEE**

## Contract Members
**Constants & Variables**

```js
contract Registry internal config;
contract IPlatformToken internal platformToken;
contract IAssetToken internal assetToken;
uint256 internal totalFee;
uint256 internal ratio;
mapping(address => uint256) internal claimers;

```

**Events**

```js
event Claimed(address  _address, uint256  _amountPlatformTokens, uint256  _amountAssetTokens);
```

## Modifiers

- [assetClaimsEnabled](#assetclaimsenabled)
- [canSenderClaim](#cansenderclaim)

### assetClaimsEnabled

Are claims enabled for the associated asset token

```js
modifier assetClaimsEnabled() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### canSenderClaim

Checks if an user can still claim tokens

```js
modifier canSenderClaim() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(address _config, address _assetTokenAddress, uint256 _totalFee)](#)
- [getRatio()](#getratio)
- [assetTokensToPlatformTokens(uint256 _amount)](#assettokenstoplatformtokens)
- [claimEth()](#claimeth)
- [claimPlatformTokens()](#claimplatformtokens)
- [claimAssetTokens()](#claimassettokens)
- [getPlatformTokenBalance()](#getplatformtokenbalance)
- [getAssetTokenBalance()](#getassettokenbalance)

### 

```js
function (address _config, address _assetTokenAddress, uint256 _totalFee) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address |  | 
| _assetTokenAddress | address |  | 
| _totalFee | uint256 |  | 

### getRatio

⤾ overrides [IBEE.getRatio](IBEE.md#getratio)

```js
function getRatio() public nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### assetTokensToPlatformTokens

⤾ overrides [IBEE.assetTokensToPlatformTokens](IBEE.md#assettokenstoplatformtokens)

```js
function assetTokensToPlatformTokens(uint256 _amount) public nonpayable
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### claimEth

⤾ overrides [IBEE.claimEth](IBEE.md#claimeth)

```js
function claimEth() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimPlatformTokens

⤾ overrides [IBEE.claimPlatformTokens](IBEE.md#claimplatformtokens)

Amount of car tokens to claim and receive bitcar tokens in return

```js
function claimPlatformTokens() public nonpayable assetClaimsEnabled canSenderClaim 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimAssetTokens

⤾ overrides [IBEE.claimAssetTokens](IBEE.md#claimassettokens)

```js
function claimAssetTokens() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getPlatformTokenBalance

⤾ overrides [IBEE.getPlatformTokenBalance](IBEE.md#getplatformtokenbalance)

```js
function getPlatformTokenBalance() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAssetTokenBalance

⤾ overrides [IBEE.getAssetTokenBalance](IBEE.md#getassettokenbalance)

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
