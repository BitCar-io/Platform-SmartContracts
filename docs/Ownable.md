# Ownable (Ownable.sol)

View Source: [contracts/libs/ownership/Ownable.sol](../contracts/libs/ownership/Ownable.sol)

**↘ Derived Contracts: [DocsTracker](DocsTracker.md), [IndexedEntities](IndexedEntities.md), [Pausable](Pausable.md), [RBACData](RBACData.md), [Wallet](Wallet.md)**

**Ownable**

The Ownable contract has an owner address, and provides basic authorization control
functions, this simplifies the implementation of "user permissions".

## Contract Members
**Constants & Variables**

```js
address payable private immediateOwner;
mapping(address => bool) private whitelist;

```

**Events**

```js
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
event AddressRegistered(address indexed _addr);
event AddressUnregistered(address indexed _addr);
```

## Modifiers

- [onlyImmediateOwner](#onlyimmediateowner)
- [onlyWhitelisted](#onlywhitelisted)
- [onlyImmediateOwnerOrWhitelisted](#onlyimmediateownerorwhitelisted)

### onlyImmediateOwner

Throws if called by any account other than the owner.

```js
modifier onlyImmediateOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyWhitelisted

Throws if msg.sender is not an Authorized Component

```js
modifier onlyWhitelisted() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyImmediateOwnerOrWhitelisted

Throws if msg.sender is not The Owner or an Authorized Component

```js
modifier onlyImmediateOwnerOrWhitelisted() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [()](#)
- [getImmediateOwnerAddress()](#getimmediateowneraddress)
- [transferOwnership(address payable _newOwner)](#transferownership)
- [_transferOwnership(address payable _newOwner)](#_transferownership)
- [registerComponent(address _addr)](#registercomponent)
- [deregisterComponent(address _addr)](#deregistercomponent)

### 

The Ownable constructor sets the original `owner` of the contract to the sender
account.

```js
function () public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getImmediateOwnerAddress

Returns the address of The Owner.

```js
function getImmediateOwnerAddress() public view
returns(address payable)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### transferOwnership

Allows the current owner to transfer control of the contract to a newOwner.

```js
function transferOwnership(address payable _newOwner) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _newOwner | address payable | The address to transfer ownership to. | 

### _transferOwnership

Transfers control of the contract to a newOwner.

```js
function _transferOwnership(address payable _newOwner) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _newOwner | address payable | The address to transfer ownership to. | 

### registerComponent

Grants a component the ability to access this contract's functions.

```js
function registerComponent(address _addr) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The address to be whitelisted | 

### deregisterComponent

Removes the component's ability to access this contract's functions.

```js
function deregisterComponent(address _addr) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | The address to be dewhitelisted | 

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
