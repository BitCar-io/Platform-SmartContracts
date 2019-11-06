# Asset.sol

View Source: [contracts/platform/Asset.sol](../contracts/platform/Asset.sol)

**↗ Extends: [Entity](Entity.md)**

**Asset**

## Contract Members
**Constants & Variables**

```js
//internal members
contract Registry internal config;
contract IPlatformToken internal platformToken;
contract IAssetToken internal assetToken;
contract IFeeManager internal feeManager;
contract IAssetWhitelist internal assetWhitelist;
contract IAssetRankTracker internal assetRankTracker;
contract ITicker internal ticker;
address internal owner;
uint256 internal ethPercentage;
uint256 internal PENDING_AGENT_DATA_APPROVAL;
uint256 internal PENDING_ADMIN_DATA_APPROVAL;
uint256 internal PENDING_AGENT_CONTRACT_APPROVAL;
uint256 internal LIVE;
uint256 internal adminApprovalDelta;
uint256 internal agentApprovalEpoch;

//public members
string public dataHash;
address payable public agent;
uint256 public minTokenPercentage;
uint256 public tokenPercentage;
uint256 public state;
uint256 public agentRejections;
uint256 public adminRejections;

```

**Events**

```js
event Log(string  msg);
event LogInt(string  msg, uint256  val);
event BoughtAssetTokens(address  user, uint256  platformTokens, uint256  assetTokens);
event StateChanged(uint256  currentState);
event BitCarPercentChanged(uint256  bitCarPercent);
```

## Modifiers

- [onlyAgent](#onlyagent)

### onlyAgent

```js
modifier onlyAgent() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(address _config, address payable _agent)](#)
- [createAssetToken(string _name, string _symbol, uint256 _totalSupply, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles)](#createassettoken)
- [createFeeManager()](#createfeemanager)
- [createWhitelist()](#createwhitelist)
- [createRankTracker()](#createranktracker)
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
- [getAssetRankTrackerAddress()](#getassetranktrackeraddress)
- [getWhitelistAddress()](#getwhitelistaddress)

### 

Constructor

```js
function (address _config, address payable _agent) public nonpayable Entity 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | The Registry address | 
| _agent | address payable | Address of the user that wants to create a new asset | 

### createAssetToken

Creates a new token for this asset

```js
function createAssetToken(string _name, string _symbol, uint256 _totalSupply, uint256 _minOwnershipPercentage, uint256 _tradingPeriod, uint256 _votingPeriod, uint8 _maxCycles) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _name | string | Name of the token | 
| _symbol | string | Symbol of the new asset token | 
| _totalSupply | uint256 | The total cost of the asset (in the smallest unit) | 
| _minOwnershipPercentage | uint256 | Minimum ownership required to own and therefore lock the asset | 
| _tradingPeriod | uint256 | Allowed trading duration period | 
| _votingPeriod | uint256 | Allowed voting duration period, after tradingPeriod is over (see waves: CyclicPausable.sol) | 
| _maxCycles | uint8 | Number of maximum cycles allow for the asset (see waves: CyclicPausable.sol) | 

### createFeeManager

Creates a new fee manager for this asset

```js
function createFeeManager() public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### createWhitelist

Creates a new AssetWhitelist and attaches it to the AssetToken

```js
function createWhitelist() public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### createRankTracker

Creates a new assetRankTracker and attaches it to the AssetToken

```js
function createRankTracker() public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setMinTokenPercentage

Sets the minimum token percentage to be used with setPurchasePercentages

```js
function setMinTokenPercentage(uint256 _minTokenPercentage) public nonpayable onlySudo 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _minTokenPercentage | uint256 | Token percentage | 

### setPurchasePercentages

Sets the Token/Eth percentage accepted as payment

```js
function setPurchasePercentages(uint256 _tokenPercentage, uint256 _ethPercentage) public nonpayable onlyAdmins 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenPercentage | uint256 | Token percentage | 
| _ethPercentage | uint256 | Eth percentage | 

### getFeeForAmount

Calculates the required fee for a given amount based on what percentage the
        amount corresponds to the total asset supply

```js
function getFeeForAmount(uint256 _buyAmount, uint256 _fee) public view
returns(uint256)
```

**Returns**

Fee cost (smallest unit)

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _buyAmount | uint256 | The amount of asset tokens | 
| _fee | uint256 |  | 

### canBuyAssetTokens

Checks if the sender is allowed to purchase asset tokens

```js
function canBuyAssetTokens(uint256 _amount, uint256 _tokenAmount) public view
returns(bool)
```

**Returns**

true if user can purchase tokens, false otherwise

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 | The amount of asset tokens | 
| _tokenAmount | uint256 | The correspondent amount of platform (BitCar) tokens | 

### buyAssetTokens

Performs an asset token purchase in exchange for platform tokens

```js
function buyAssetTokens(uint256 _amount) public payable onlyTraders 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _amount | uint256 | Total amount of asset tokens the user wants to purchase (smallest unit) | 

### setDataHash

```js
function setDataHash(string _hash) public nonpayable onlyAgent 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _hash | string |  | 

### agentApproveData

Agent approves that the data hash is correctly set.

```js
function agentApproveData(string _optionalHash) public nonpayable onlyAgent 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _optionalHash | string |  | 

### adminApproveData

Admin approves that the data hash is correctly set.

```js
function adminApproveData(bool _approved, uint256 _adminApprovalDelta) public nonpayable onlyAdmins 
```

**Returns**

false in case of rejection

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _approved | bool | Approved flag | 
| _adminApprovalDelta | uint256 | After the agent approval purchases will be available after "delta" has passed | 

### approveContractCreation

Agent approves contracts created by admin.

```js
function approveContractCreation(bool _approved) public nonpayable onlyAgent 
```

**Returns**

false in case of rejection

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _approved | bool | Approved flag | 

### setState

```js
function setState(uint256 _state) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _state | uint256 |  | 

### getTokenAddress

Gets the asset token(ERC20) address

```js
function getTokenAddress() public view
returns(address)
```

**Returns**

ERC20 address

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getFeeManagerAddress

Gets the FeeManager address for this asset

```js
function getFeeManagerAddress() public view
returns(address)
```

**Returns**

FeeManager address

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAgent

Gets the Agent address

```js
function getAgent() public view
returns(address payable)
```

**Returns**

Agent address

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getAssetRankTrackerAddress

Gets the AssetRankTracker address for this asset

```js
function getAssetRankTrackerAddress() public view
returns(address)
```

**Returns**

AssetRankTracker address

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getWhitelistAddress

Gets the Whitelist address for this asset

```js
function getWhitelistAddress() public view
returns(address)
```

**Returns**

Whitelist address

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
