# Groups (Groups.sol)

View Source: [contracts/governance/Groups.sol](../contracts/governance/Groups.sol)

**↘ Derived Contracts: [AssetRankTracker](AssetRankTracker.md), [AssetWhitelist](AssetWhitelist.md), [Entity](Entity.md), [Pausable](Pausable.md), [RankTracker](RankTracker.md), [Whitelist](Whitelist.md)**

**Groups**

Contract that implements the modifiers that check 
permissions among all the users groups available

## Contract Members
**Constants & Variables**

```js
contract AccessControl internal sudoAccCtrl;
contract AccessControl internal adminAccCtrl;
contract AccessControl internal agentAccCtrl;
contract AccessControl internal traderAccCtrl;

```

## Modifiers

- [onlyOwner](#onlyowner)
- [onlySudo](#onlysudo)
- [onlyAdmins](#onlyadmins)
- [onlyAgents](#onlyagents)
- [onlyTraders](#onlytraders)
- [onlyVerifiedTraders](#onlyverifiedtraders)
- [onlySudoOrOwner](#onlysudoorowner)

### onlyOwner

Throws if msg.sender is not from the Sudo Group

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlySudo

Throws if msg.sender is not from the Group

```js
modifier onlySudo() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyAdmins

Throws if msg.sender is not from the Group

```js
modifier onlyAdmins() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyAgents

Throws if msg.sender is not from the Group

```js
modifier onlyAgents() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyTraders

Throws if msg.sender is not from the Group

```js
modifier onlyTraders() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyVerifiedTraders

Throws if msg.sender is not from the Group

```js
modifier onlyVerifiedTraders() internal
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

## Functions

- [(address _config)](#)
- [isOwner(address _addr)](#isowner)
- [isSudo(address _addr)](#issudo)
- [isAdmin(address _addr)](#isadmin)
- [isVerifiedAdmin(address _addr)](#isverifiedadmin)
- [isAgent(address _addr)](#isagent)
- [isVerifiedAgent(address _addr)](#isverifiedagent)
- [isTrader(address _addr)](#istrader)
- [isVerifiedTrader(address _addr)](#isverifiedtrader)

### 

```js
function (address _config) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _config | address | References to AccessControl contracts | 

### isOwner

Returns TRUE if _addr is The Owner, FALSE otherwise.

```js
function isOwner(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 

### isSudo

Returns TRUE if _addr belongs to SUDO Group, FALSE otherwise.

```js
function isSudo(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 

### isAdmin

Returns TRUE if _addr belongs to ADMIN Group, FALSE otherwise.

```js
function isAdmin(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 

### isVerifiedAdmin

Returns TRUE if _addr is verified, FALSE otherwise.

```js
function isVerifiedAdmin(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 

### isAgent

Returns TRUE if _addr belongs to AGENTS Group, FALSE otherwise.

```js
function isAgent(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 

### isVerifiedAgent

Returns TRUE if _addr is verified, FALSE otherwise.

```js
function isVerifiedAgent(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 

### isTrader

Returns TRUE if _addr belongs to TRADERS Group, FALSE otherwise.

```js
function isTrader(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _addr | address |  | 

### isVerifiedTrader

Returns TRUE if _addr is verified, FALSE otherwise.

```js
function isVerifiedTrader(address _addr) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
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
