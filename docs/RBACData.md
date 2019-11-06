# RBACData (Role-Based Access Control Data) (RBACData.sol)

View Source: [contracts/libs/rbac/RBACData.sol](../contracts/libs/rbac/RBACData.sol)

**↗ Extends: [Ownable](Ownable.md)**

**RBACData**

Stores and provides setters and getters for roles and addresses.
Supports unlimited numbers of roles and addresses.

## Contract Members
**Constants & Variables**

```js
mapping(string => struct Roles.Role) private roles;
mapping(string => uint256) private roleMembersCount;
mapping(string => uint256) private verifiedMembersCount;

```

**Events**

```js
event RoleAdded(address indexed _operator, string  _role);
event RoleRemoved(address indexed _operator, string  _role);
event UserVerified(address indexed _operator, string  _role);
event UserUnverified(address indexed _operator, string  _role);
```

## Functions

- [checkRole(address _operator, string _role)](#checkrole)
- [hasRole(address _operator, string _role)](#hasrole)
- [addRole(address _operator, string _role)](#addrole)
- [removeRole(address _operator, string _role)](#removerole)
- [getRoleMembersCount(string _role)](#getrolememberscount)
- [isVerifiedUser(address _operator, string _role)](#isverifieduser)
- [verifyUser(address _operator, string _role)](#verifyuser)
- [unVerifyUser(address _operator, string _role)](#unverifyuser)

### checkRole

reverts if addr does not have role

```js
function checkRole(address _operator, string _role) public view onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address | 
| _role | string | the name of the role
// reverts | 

### hasRole

determine if addr has role

```js
function hasRole(address _operator, string _role) public view onlyImmediateOwnerOrWhitelisted 
returns(bool)
```

**Returns**

bool

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address | 
| _role | string | the name of the role | 

### addRole

add a role to an address

```js
function addRole(address _operator, string _role) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address | 
| _role | string | the name of the role | 

### removeRole

remove a role from an address

```js
function removeRole(address _operator, string _role) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address | 
| _role | string | the name of the role | 

### getRoleMembersCount

Returns the count of role members

```js
function getRoleMembersCount(string _role) public view
returns(uint256)
```

**Returns**

Returns the count of role members

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _role | string |  | 

### isVerifiedUser

determine if addr is verified

```js
function isVerifiedUser(address _operator, string _role) public view onlyImmediateOwnerOrWhitelisted 
returns(bool)
```

**Returns**

bool

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address | 
| _role | string | the name of the role | 

### verifyUser

Sets to TRUE the verified flag for the addr (_operator)

```js
function verifyUser(address _operator, string _role) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address | 
| _role | string | the name of the role | 

### unVerifyUser

Sets to FALSE the verified flag for the addr (_operator)

```js
function unVerifyUser(address _operator, string _role) public nonpayable onlyImmediateOwnerOrWhitelisted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _operator | address | address | 
| _role | string | the name of the role | 

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
