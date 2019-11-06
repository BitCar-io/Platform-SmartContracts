# Roles (Roles.sol)

View Source: [contracts/libs/rbac/Roles.sol](../contracts/libs/rbac/Roles.sol)

**Roles**

Library for managing addresses assigned to a Role.
See RBAC.sol for example usage.

## Structs
### Role

```js
struct Role {
 mapping(address => bool) bearer,
 mapping(address => bool) verified_bearer
}
```

## Functions

- [add(struct Roles.Role role, address _addr)](#add)
- [remove(struct Roles.Role role, address _addr)](#remove)
- [check(struct Roles.Role role, address _addr)](#check)
- [has(struct Roles.Role role, address _addr)](#has)
- [verify(struct Roles.Role role, address _addr)](#verify)
- [unverify(struct Roles.Role role, address _addr)](#unverify)
- [verified(struct Roles.Role role, address _addr)](#verified)

### add

give an address access to this role

```js
function add(struct Roles.Role role, address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| _addr | address |  | 

### remove

remove an address' access to this role

```js
function remove(struct Roles.Role role, address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| _addr | address |  | 

### check

check if an address has this role
// reverts

```js
function check(struct Roles.Role role, address _addr) internal view
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| _addr | address |  | 

### has

check if an address has this role

```js
function has(struct Roles.Role role, address _addr) internal view
returns(bool)
```

**Returns**

bool

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| _addr | address |  | 

### verify

Changes the verfified flag to TRUE for the addr

```js
function verify(struct Roles.Role role, address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| _addr | address |  | 

### unverify

Changes the verfified flag to FALSE for the addr

```js
function unverify(struct Roles.Role role, address _addr) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| _addr | address |  | 

### verified

check if an address is verified

```js
function verified(struct Roles.Role role, address _addr) internal view
returns(bool)
```

**Returns**

bool

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| _addr | address |  | 

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
