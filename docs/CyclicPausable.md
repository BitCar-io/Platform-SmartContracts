# CyclicPausable (CyclicPausable.sol)

View Source: [contracts/lifecycle/CyclicPausable.sol](../contracts/lifecycle/CyclicPausable.sol)

**↗ Extends: [TimePausable](TimePausable.md)**
**↘ Derived Contracts: [AssetBallot](AssetBallot.md), [BaseAssetToken](BaseAssetToken.md)**

**CyclicPausable**

Base contract which allows a child object to implement a cyclic time based start/stop mechanism.

 *                          |-------CYCLE 1--------|-------CYCLE 2--------|-------CYCLE 3--------|  . . .
                         |                      |                      |                      |
                            UPPER WAVE             UPPER WAVE             UPPER WAVE           
                         /-------^-------\      /-------^-------\      /-------^-------\      /
 |=== . . . =|===========|===============|======|===============|======|===============|======|= . . . ====> TIME (in seconds)
 ^           ^           ^               \------/               \------/               \------/
 0           |-- DELTA --|              LOWER WAVE             LOWER WAVE             LOWER WAVE
                         | 
                       BIRTH

## Contract Members
**Constants & Variables**

```js
uint256 public upperWave;
uint256 public lowerWave;
uint8 public maxCycles;

```

## Modifiers

- [whileIsInUpperWave](#whileisinupperwave)
- [whileIsInLowerWave](#whileisinlowerwave)
- [isNotLastCycle](#isnotlastcycle)
- [withinLifespan](#withinlifespan)

### whileIsInUpperWave

While block.timestamp falls within the UpperWave, execution will be allowed.

```js
modifier whileIsInUpperWave() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whileIsInLowerWave

While block.timestamp falls within the LowerWave, execution will be allowed.

```js
modifier whileIsInLowerWave() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isNotLastCycle

Validates if the current cycle is NOT the lastone

```js
modifier isNotLastCycle() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### withinLifespan

Validates if the contract is within the lifespan

```js
modifier withinLifespan() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(uint256 _upperWave, uint256 _lowerWave, uint8 _maxCycles, address _config)](#)
- [getR()](#getr)
- [isInUpperWave()](#isinupperwave)
- [getCycle()](#getcycle)
- [isWithinLifespan()](#iswithinlifespan)
- [getCycleProgress()](#getcycleprogress)

### 

```js
function (uint256 _upperWave, uint256 _lowerWave, uint8 _maxCycles, address _config) public nonpayable TimePausable 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _upperWave | uint256 | The period (in seconds) for the UpperWave | 
| _lowerWave | uint256 | The period (in seconds) for the LowerWave | 
| _maxCycles | uint8 | The maximum number of cycles. maxCycles = 0 for infinite number of cycles | 
| _config | address | From Groups contract. References to AccessControl contracts. | 

### getR

Calculates the element R needed for the majority of calculations

```js
function getR() private view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isInUpperWave

Returns TRUE if block.timestamp falls within the UpperWave, FALSE otherwise.

```js
function isInUpperWave() public view onlyIfActivated onlyIfDeltaHasExpired 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getCycle

Depending on the TimeStamp, returns the corresponding cycle number.

```js
function getCycle() public view onlyIfActivated onlyIfDeltaHasExpired 
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### isWithinLifespan

Returns FALSE if the current cycle is greater than maxCycles, in other words, expired. TRUE otherwise.
Returns always TRUE if maxCycles is 0

```js
function isWithinLifespan() public view onlyIfActivated onlyIfDeltaHasExpired 
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getCycleProgress

Gets the progress for the current cycle as %

```js
function getCycleProgress() public view onlyIfActivated onlyIfDeltaHasExpired 
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
