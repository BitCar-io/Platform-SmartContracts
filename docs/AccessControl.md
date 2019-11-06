# AccessControl (AccessControl.sol)

View Source: [contracts/governance/AccessControl.sol](../contracts/governance/AccessControl.sol)

**↗ Extends: [Wallet](Wallet.md)**
**↘ Derived Contracts: [Admin](Admin.md), [Agent](Agent.md), [Sudo](Sudo.md), [Trader](Trader.md)**

**AccessControl**

Contract that encapsules the basic functionality that allows 
users permissions management

## Contract Members
**Constants & Variables**

```js
//public members
string public constant SUDO_ROLE;
string public constant ADMIN_ROLE;
string public constant AGENT_ROLE;
string public constant TRADER_ROLE;

//private members
contract RBACData private rbacData;
string private role;

```

## Modifiers

- [onlyRole](#onlyrole)
- [onlyOwner](#onlyowner)
- [onlySudo](#onlysudo)
- [onlySudoOrOwner](#onlysudoorowner)
- [onlyAdmins](#onlyadmins)

### onlyRole

Throws if msg.sender is not from the Group

```js
modifier onlyRole() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyOwner

Throws if called by any account other than the owner.

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlySudo

Throws if msg.sender is not from the Sudo Group

```js
modifier onlySudo() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlySudoOrOwner

Throws if msg.sender is not from the Sudo Group or The Owner

```js
modifier onlySudoOrOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyAdmins

Throws if msg.sender is not from the Admin Group

```js
modifier onlyAdmins() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [(string _role, address _config)](#)
- [checkRole(address _operator)](#checkrole)
- [isRole(address _addr, string _role)](#isrole)
- [isRole(address _addr)](#isrole)
- [addAddressToGroup(address _addr)](#addaddresstogroup)
- [removeAddressFromGroup(address _addr)](#removeaddressfromgroup)
- [isVerifiedUser(address _addr)](#isverifieduser)
- [verifyUser(address _addr)](#verifyuser)
- [unVerifyUser(address _addr)](#unverifyuser)
- [getRoleMembersCount()](#getrolememberscount)
- [getOwnerAddress()](#getowneraddress)

### 

Role and RBACData are needed

```js
function (string _role, address _config) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _role | string | The role as String | 
| _config | address | Reference to the RBACData contract | 

### checkRole

reverts if addr does not have role

```js
function checkRole(address _operator) public view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address
// Reverts if the _addr DOES NOT belongs to the group | 

### isRole

Determines if the given address belongs to this group.

```js
function isRole(address _addr, string _role) internal view
returns(bool)
```

**Returns**

TRUE if the _addr belongs to the group, otherwise FALSE

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 
| _role | string | the role in particular that needs to be validated | 

### isRole

Determines if the given address belongs to this group.

```js
function isRole(address _addr) public view
returns(bool)
```

**Returns**

TRUE if the _addr belongs to the group, otherwise FALSE

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### addAddressToGroup

Adds address to Group.

```js
function addAddressToGroup(address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### removeAddressFromGroup

Removes address from Group.

```js
function removeAddressFromGroup(address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### isVerifiedUser

determine if addr is verified

```js
function isVerifiedUser(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### verifyUser

Sets to TRUE the verified flag for the addr (_operator)

```js
function verifyUser(address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### unVerifyUser

Sets to FALSE the verified flag for the addr (_operator)

```js
function unVerifyUser(address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address | address | 

### getRoleMembersCount

Returns the number of members of the Group.

```js
function getRoleMembersCount() public view
returns(uint256)
```

**Returns**

the number of members of the Group

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getOwnerAddress

Returns the address of The Owner.

```js
function getOwnerAddress() public view
returns(address payable)
```

**Returns**

The address of the Owner

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
