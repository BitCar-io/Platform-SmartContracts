# AssetToken.sol

View Source: [contracts/token/Asset/AssetToken.sol](../contracts/token/Asset/AssetToken.sol)

**↗ Extends: [BaseAssetToken](BaseAssetToken.md)**

**AssetToken**

## Structs
### Ballot

```js
struct Ballot {
 uint256 sellTheAssetCount,
 uint256 sellCycle,
 uint256 keepTheAssetCount,
 uint256 keepCycle,
 uint256 minOwnershipPercentage,
 mapping(address => uint256) votersAndCycles
}
```

## Contract Members
**Constants & Variables**

```js
struct AssetToken.Ballot private assetBallot;

```

**Events**

```js
event SellTheAssetVote(address indexed _voter, uint256  _cycle);
event KeepTheAssetVote(address indexed _voter, uint256  _cycle);
event StartAssetAuction(uint256  _cycle, uint256  _minOwnership, uint256  _sellCount, uint256  _keepCount);
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

- [(address _owner, string _name, string _symbol, uint256 _totalTokens, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles, address _config)](#)
- [voteForSellingTheAsset()](#voteforsellingtheasset)
- [voteForKeepingTheAsset()](#voteforkeepingtheasset)

### 

TOOD: Check security around "owner"

```js
function (address _owner, string _name, string _symbol, uint256 _totalTokens, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles, address _config) public nonpayable BaseAssetToken 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The owner of the contract (Will have initial total supply) | 
| _name | string | The name given to the token | 
| _symbol | string | The symbol given to the token | 
| _totalTokens | uint256 | The total amount of tokens issued | 
| _minOwnershipPercentage | uint256 | The minimum quorum | 
| _tradingPeriod | uint256 | The period (in seconds) that trading will be allowed | 
| _votingPeriod | uint256 | The period (in seconds) that voting will be allowed | 
| _maxCycles | uint8 | Number of maximum cycles allow for the asset (see waves: CyclicPausable.sol) | 
| _config | address | From Groups contract. References to AccessControl contracts. | 

### voteForSellingTheAsset

The balance of msg.sender is counted as Selling the Asset Vote.

```js
function voteForSellingTheAsset() public nonpayable onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### voteForKeepingTheAsset

The balance of msg.sender is counted as Keeping the Asset Vote.

```js
function voteForKeepingTheAsset() public nonpayable onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle 
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
