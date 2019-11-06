# AssetBallot (AssetBallot.sol)

View Source: [contracts/lifecycle/AssetBallot.sol](../contracts/lifecycle/AssetBallot.sol)

**↗ Extends: [CyclicPausable](CyclicPausable.md)**

**AssetBallot**

## Structs
### Ballot

```js
struct Ballot {
 uint256 sellAssetCount,
 uint256 sellCycle,
 uint256 keepAssetCount,
 uint256 keepCycle,
 uint256 minOwnershipPercentage,
 mapping(address => uint256) votersAndCycles
}
```

## Contract Members
**Constants & Variables**

```js
struct AssetBallot.Ballot private assetBallot;
contract AssetToken private assetToken;

```

**Events**

```js
event SellAssetVote(address indexed _voter, uint256  _cycle);
event KeepAssetVote(address indexed _voter, uint256  _cycle);
event StartAssetAuction(address indexed _asset, uint256  _cycle, uint256  _minOwnership, uint256  _sellCount, uint256  _keepCount);
```

## Modifiers

- [onlyTokenHolders](#onlytokenholders)

### onlyTokenHolders

Checks if msg.sender is a token holder and if it has already voted.

```js
modifier onlyTokenHolders() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles, address _assetToken, address _config)](#)
- [sellAssetVote()](#sellassetvote)
- [keepAssetVote()](#keepassetvote)
- [getTradingPeriodDuration()](#gettradingperiodduration)
- [getVotingPeriodDuration()](#getvotingperiodduration)
- [isInTradingPeriod()](#isintradingperiod)
- [getAssetToken()](#getassettoken)

### 

```js
function (uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles, address _assetToken, address _config) public nonpayable CyclicPausable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _minOwnershipPercentage | uint256 | The minimum quorum | 
| _tradingPeriod | uint256 | The period (in seconds) that trading will be allowed | 
| _votingPeriod | uint256 | The period (in seconds) that voting will be allowed | 
| _maxCycles | uint8 | Number of maximum cycles allow for the asset (see waves: CyclicPausable.sol) | 
| _assetToken | address | Reference to the corresponding AssetToken. | 
| _config | address | From Groups contract. References to AccessControl contracts. | 

### sellAssetVote

The balance of msg.sender is counted as Selling the Car Vote.

```js
function sellAssetVote() public nonpayable onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### keepAssetVote

The balance of msg.sender is counted as Keeping the Car Vote.

```js
function keepAssetVote() public nonpayable onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getTradingPeriodDuration

Gets the duration of the Trading Period in seconds

```js
function getTradingPeriodDuration() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getVotingPeriodDuration

Gets the duration of the Voting Period in seconds

```js
function getVotingPeriodDuration() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isInTradingPeriod

Gets the duration of the Voting Period in seconds

```js
function isInTradingPeriod() public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAssetToken

Returns the reference to the corresponding AssetToken.

```js
function getAssetToken() public view
returns(address)
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
