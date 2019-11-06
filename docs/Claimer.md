# Claimer.sol

View Source: [contracts/platform/Claimer.sol](../contracts/platform/Claimer.sol)

**↗ Extends: [IFee](IFee.md), [IClaimer](IClaimer.md)**

**Claimer**

## Contract Members
**Constants & Variables**

```js
contract Registry internal config;
contract Ticker internal ticker;
contract IPlatformToken internal platformToken;
contract IAssetToken internal assetToken;
bool internal isClaimerFunded;
uint256 internal fundedTicker;
mapping(address => uint256) internal claimers;

```

**Events**

```js
event Claimed(address  _address, uint256  _amountPlatformTokens, uint256  _amountAssetTokens);
event Funded(address  _address, uint256  _amountPlatformTokens);
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

- [(address _config, address _assetTokenAddress)](#)
- [hasEnoughPlatformTokens()](#hasenoughplatformtokens)
- [assetTokensToPlatformTokens(uint256 _amount)](#assettokenstoplatformtokens)
- [claimerFunded()](#claimerfunded)
- [claimEth()](#claimeth)
- [claim()](#claim)
- [claimPlatformTokens()](#claimplatformtokens)
- [claimAssetTokens()](#claimassettokens)
- [getPlatformTokenBalance()](#getplatformtokenbalance)
- [getAssetTokenBalance()](#getassettokenbalance)

### 

Constructor

```js
function (address _config, address _assetTokenAddress) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | Storage config address | 
| _assetTokenAddress | address | Address of the asset this claimer will be associated with | 

### hasEnoughPlatformTokens

⤾ overrides [IClaimer.hasEnoughPlatformTokens](IClaimer.md#hasenoughplatformtokens)

Checks if enough bitcar tokens are held under the claimer for this particular CarToken

```js
function hasEnoughPlatformTokens() public view
returns(bool)
```

**Returns**

true if claimer has enough platform tokens, false otherwise

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### assetTokensToPlatformTokens

⤾ overrides [IClaimer.assetTokensToPlatformTokens](IClaimer.md#assettokenstoplatformtokens)

Converts asset tokens to platform tokens based on the funded ticker

```js
function assetTokensToPlatformTokens(uint256 _amount) public view
returns(uint256)
```

**Returns**

Converted amount

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 | The amount of asset tokens | 

### claimerFunded

⤾ overrides [IClaimer.claimerFunded](IClaimer.md#claimerfunded)

Called by the agent to notify that this claimer was fully funded

```js
function claimerFunded() public nonpayable assetClaimsEnabled 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimEth

⤾ overrides [IFee.claimEth](IFee.md#claimeth)

```js
function claimEth() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claim

⤾ overrides [IClaimer.claim](IClaimer.md#claim)

```js
function claim() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimPlatformTokens

⤾ overrides [IFee.claimPlatformTokens](IFee.md#claimplatformtokens)

Amount of car tokens to claim and receive bitcar tokens in return

```js
function claimPlatformTokens() public nonpayable assetClaimsEnabled canSenderClaim 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### claimAssetTokens

⤾ overrides [IFee.claimAssetTokens](IFee.md#claimassettokens)

```js
function claimAssetTokens() public nonpayable
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
