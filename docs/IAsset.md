# IAsset.sol

View Source: [contracts/platform/interfaces/IAsset.sol](../contracts/platform/interfaces/IAsset.sol)

**IAsset**

## Functions

- [createAssetToken(string _name, string _symbol, uint256 _totalSupply, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles)](#createassettoken)
- [createFeeManager()](#createfeemanager)
- [createWhitelist()](#createwhitelist)
- [setMinTokenPercentage(uint256 _minTokenPercentage)](#setmintokenpercentage)
- [setPurchasePercentages(uint256 _tokenPercentage, uint256 _ethPercentage)](#setpurchasepercentages)
- [getFeeForAmount(uint256 _buyAmount, uint256 _fee)](#getfeeforamount)
- [canBuyAssetTokens(uint256 _amount, uint256 _tokenAmount)](#canbuyassettokens)
- [buyAssetTokens(uint256 _amount)](#buyassettokens)
- [setDataHash(string _hash)](#setdatahash)
- [agentApproveData(string _optionalHash)](#agentapprovedata)
- [adminApproveData(bool _approved, uint256 _adminApprovalDelta)](#adminapprovedata)
- [approveContractCreation(bool _approved)](#approvecontractcreation)
- [setState(uint256 _state)](#setstate)
- [getTokenAddress()](#gettokenaddress)
- [getFeeManagerAddress()](#getfeemanageraddress)
- [getAgent()](#getagent)

### createAssetToken

```js
function createAssetToken(string _name, string _symbol, uint256 _totalSupply, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _name | string |  | 
| _symbol | string |  | 
| _totalSupply | uint256 |  | 
| _minOwnershipPercentage | uint256 |  | 
| _tradingPeriod | uint256 |  | 
| _votingPeriod | uint256 |  | 
| _maxCycles | uint8 |  | 

### createFeeManager

```js
function createFeeManager() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### createWhitelist

```js
function createWhitelist() public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setMinTokenPercentage

```js
function setMinTokenPercentage(uint256 _minTokenPercentage) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _minTokenPercentage | uint256 |  | 

### setPurchasePercentages

```js
function setPurchasePercentages(uint256 _tokenPercentage, uint256 _ethPercentage) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenPercentage | uint256 |  | 
| _ethPercentage | uint256 |  | 

### getFeeForAmount

```js
function getFeeForAmount(uint256 _buyAmount, uint256 _fee) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _buyAmount | uint256 |  | 
| _fee | uint256 |  | 

### canBuyAssetTokens

```js
function canBuyAssetTokens(uint256 _amount, uint256 _tokenAmount) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 
| _tokenAmount | uint256 |  | 

### buyAssetTokens

```js
function buyAssetTokens(uint256 _amount) public payable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 |  | 

### setDataHash

```js
function setDataHash(string _hash) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _hash | string |  | 

### agentApproveData

```js
function agentApproveData(string _optionalHash) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _optionalHash | string |  | 

### adminApproveData

```js
function adminApproveData(bool _approved, uint256 _adminApprovalDelta) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _approved | bool |  | 
| _adminApprovalDelta | uint256 |  | 

### approveContractCreation

```js
function approveContractCreation(bool _approved) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _approved | bool |  | 

### setState

```js
function setState(uint256 _state) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _state | uint256 |  | 

### getTokenAddress

```js
function getTokenAddress() public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getFeeManagerAddress

```js
function getFeeManagerAddress() public view
returns(address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAgent

```js
function getAgent() public view
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
