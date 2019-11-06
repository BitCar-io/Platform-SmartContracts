# FeeManager.sol

View Source: [contracts/platform/FeeManager.sol](../contracts/platform/FeeManager.sol)

**↗ Extends: [IFeeManager](IFeeManager.md)**

**FeeManager**

## Structs
### Fees

```js
struct Fees {
 address fee,
 uint256 amount,
 bool created
}
```

## Contract Members
**Constants & Variables**

```js
contract Registry internal config;
contract FeeFactory internal feeFactory;
contract ClaimerFactory internal claimerFactory;
contract BEEFactory internal beeFactory;
contract Asset internal asset;
mapping(string => struct FeeManager.Fees) internal fees;
bool internal defaultFeesCreated;

```

**Events**

```js
event DefaultFeesCreated(uint256  feeBEE, uint256  feeMSI, uint256  feeBPF);
```

## Functions

- [(address _config, address _asset)](#)
- [createDefaultFees(uint256 _feeBEE, uint256 _feeMSI, uint256 _feeBPF)](#createdefaultfees)
- [createClaimer(string _feeName, address _token, uint256 _amount)](#createclaimer)
- [createBEE(string _feeName, address _token, uint256 _amount)](#createbee)
- [createFee(string _feeName, address payable _claimer, address _token, uint256 _amount)](#createfee)
- [getAddress(string _feeName)](#getaddress)
- [getAmount(string _feeName)](#getamount)
- [hasDefaultFees()](#hasdefaultfees)

### 

Constructor

```js
function (address _config, address _asset) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | The Registry address | 
| _asset | address |  | 

### createDefaultFees

⤾ overrides [IFeeManager.createDefaultFees](IFeeManager.md#createdefaultfees)

Creates the default fee contracts

```js
function createDefaultFees(uint256 _feeBEE, uint256 _feeMSI, uint256 _feeBPF) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeBEE | uint256 | BEE (former escrow) fee | 
| _feeMSI | uint256 | MSI fee | 
| _feeBPF | uint256 |  | 

### createClaimer

Creates a Claimer type fee

```js
function createClaimer(string _feeName, address _token, uint256 _amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeName | string | Name of the fee | 
| _token | address | Address of the AssetToken | 
| _amount | uint256 | Fee amount | 

### createBEE

Creates a BEE type fee

```js
function createBEE(string _feeName, address _token, uint256 _amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeName | string | Name of the fee | 
| _token | address | Address of the AssetToken | 
| _amount | uint256 | Fee amount | 

### createFee

Creates a general type fee

```js
function createFee(string _feeName, address payable _claimer, address _token, uint256 _amount) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeName | string | Name of the fee | 
| _claimer | address payable | Address of who can claim this fee | 
| _token | address | Address of the AssetToken | 
| _amount | uint256 | Fee amount | 

### getAddress

⤾ overrides [IFeeManager.getAddress](IFeeManager.md#getaddress)

Gets the address of the specified fee

```js
function getAddress(string _feeName) public view
returns(address)
```

**Returns**

Address of the fee

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeName | string | Name of the fee | 

### getAmount

⤾ overrides [IFeeManager.getAmount](IFeeManager.md#getamount)

Gets the amount specified when the fee was created

```js
function getAmount(string _feeName) public view
returns(uint256)
```

**Returns**

Amount of the fee

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _feeName | string | Name of the fee | 

### hasDefaultFees

⤾ overrides [IFeeManager.hasDefaultFees](IFeeManager.md#hasdefaultfees)

Gets the default fees created flag

```js
function hasDefaultFees() public view
returns(bool)
```

**Returns**

true if default fees were created, false otherwise

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
