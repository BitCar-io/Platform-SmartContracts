# IAssetToken.sol

View Source: [contracts/token/Asset/IAssetToken.sol](../contracts/token/Asset/IAssetToken.sol)

**↘ Derived Contracts: [BaseAssetToken](BaseAssetToken.md)**

**IAssetToken**

**Events**

```js
event Transfer(address indexed from, address indexed to, uint256  value);
event Approval(address indexed owner, address indexed spender, uint256  value);
```

## Functions

- [totalSupply()](#totalsupply)
- [getName()](#getname)
- [getSymbol()](#getsymbol)
- [getOwner()](#getowner)
- [canClaim()](#canclaim)
- [balanceOf(address _owner)](#balanceof)
- [transfer(address _to, uint256 _value)](#transfer)
- [transferFrom(address _from, address _to, uint256 _value)](#transferfrom)
- [approve(address _spender, uint256 _value)](#approve)
- [allowance(address _owner, address _spender)](#allowance)
- [setAssetWhitelist(address _assetWhitelistAddress)](#setassetwhitelist)
- [isWhitelistAllowed(address _from, address _to)](#iswhitelistallowed)
- [activate(uint256 _delta)](#activate)

### totalSupply

⤿ Overridden Implementation(s): [BaseAssetToken.totalSupply](BaseAssetToken.md#totalsupply)

```js
function totalSupply() public view
returns(supply uint256)
```

**Returns**

The total amount of tokens

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getName

⤿ Overridden Implementation(s): [BaseAssetToken.getName](BaseAssetToken.md#getname)

```js
function getName() public view
returns(name string)
```

**Returns**

The name of the token

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getSymbol

⤿ Overridden Implementation(s): [BaseAssetToken.getSymbol](BaseAssetToken.md#getsymbol)

```js
function getSymbol() public view
returns(symbol string)
```

**Returns**

The symbol of the token

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### getOwner

⤿ Overridden Implementation(s): [BaseAssetToken.getOwner](BaseAssetToken.md#getowner)

```js
function getOwner() public view
returns(owner address)
```

**Returns**

The owner/deployer of the token

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### canClaim

⤿ Overridden Implementation(s): [BaseAssetToken.canClaim](BaseAssetToken.md#canclaim)

```js
function canClaim() public view
returns(claimsEnabled bool)
```

**Returns**

The total amount of tokens

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### balanceOf

⤿ Overridden Implementation(s): [BaseAssetToken.balanceOf](BaseAssetToken.md#balanceof)

```js
function balanceOf(address _owner) public view
returns(balance uint256)
```

**Returns**

The balance

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The address from which the balance will be retrieved | 

### transfer

⤿ Overridden Implementation(s): [BaseAssetToken.transfer](BaseAssetToken.md#transfer)

send `_value` token to `_to` from `msg.sender`

```js
function transfer(address _to, uint256 _value) public nonpayable
returns(success bool)
```

**Returns**

Whether the transfer was successful or not

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _to | address | The address of the recipient | 
| _value | uint256 | The amount of token to be transferred | 

### transferFrom

⤿ Overridden Implementation(s): [BaseAssetToken.transferFrom](BaseAssetToken.md#transferfrom)

send `_value` token to `_to` from `_from` on the condition it is approved by `_from`

```js
function transferFrom(address _from, address _to, uint256 _value) public nonpayable
returns(success bool)
```

**Returns**

Whether the transfer was successful or not

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address | The address of the sender | 
| _to | address | The address of the recipient | 
| _value | uint256 | The amount of token to be transferred | 

### approve

⤿ Overridden Implementation(s): [BaseAssetToken.approve](BaseAssetToken.md#approve)

`msg.sender` approves `_spender` to spend `_value` tokens

```js
function approve(address _spender, uint256 _value) public nonpayable
returns(success bool)
```

**Returns**

Whether the approval was successful or not

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _spender | address | The address of the account able to transfer the tokens | 
| _value | uint256 | The amount of tokens to be approved for transfer | 

### allowance

⤿ Overridden Implementation(s): [BaseAssetToken.allowance](BaseAssetToken.md#allowance)

```js
function allowance(address _owner, address _spender) public view
returns(remaining uint256)
```

**Returns**

Amount of remaining tokens allowed to spent

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | The address of the account owning tokens | 
| _spender | address | The address of the account able to transfer the tokens | 

### setAssetWhitelist

⤿ Overridden Implementation(s): [BaseAssetToken.setAssetWhitelist](BaseAssetToken.md#setassetwhitelist)

```js
function setAssetWhitelist(address _assetWhitelistAddress) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _assetWhitelistAddress | address | Address of the whitelist | 

### isWhitelistAllowed

⤿ Overridden Implementation(s): [BaseAssetToken.isWhitelistAllowed](BaseAssetToken.md#iswhitelistallowed)

```js
function isWhitelistAllowed(address _from, address _to) public view
returns(bool)
```

**Returns**

True if whitelists are enabled and transaction is allowed between sender and receiver

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _from | address | Address of the sender | 
| _to | address | Address of the receiver | 

### activate

⤿ Overridden Implementation(s): [TimePausable.activate](TimePausable.md#activate)

```js
function activate(uint256 _delta) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _delta | uint256 | The amount of time that the contract needs to wait in order to allow trading | 

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
