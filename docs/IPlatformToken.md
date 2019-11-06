# IPlatformToken.sol

View Source: [contracts/token/Platform/IPlatformToken.sol](../contracts/token/Platform/IPlatformToken.sol)

**↘ Derived Contracts: [PlatformToken](PlatformToken.md)**

**IPlatformToken**

**Events**

```js
event Transfer(address indexed from, address indexed to, uint256  value);
event Approval(address indexed owner, address indexed spender, uint256  value);
```

## Functions

- [totalSupply()](#totalsupply)
- [balanceOf(address _owner)](#balanceof)
- [transfer(address _to, uint256 _value)](#transfer)
- [transferFrom(address _from, address _to, uint256 _value)](#transferfrom)
- [approve(address _spender, uint256 _value)](#approve)
- [allowance(address _owner, address _spender)](#allowance)

### totalSupply

⤿ Overridden Implementation(s): [PlatformToken.totalSupply](PlatformToken.md#totalsupply)

```js
function totalSupply() public view
returns(supply uint256)
```

**Returns**

The total amount of tokens

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### balanceOf

⤿ Overridden Implementation(s): [PlatformToken.balanceOf](PlatformToken.md#balanceof)

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

⤿ Overridden Implementation(s): [PlatformToken.transfer](PlatformToken.md#transfer)

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

⤿ Overridden Implementation(s): [PlatformToken.transferFrom](PlatformToken.md#transferfrom)

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

⤿ Overridden Implementation(s): [PlatformToken.approve](PlatformToken.md#approve)

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

⤿ Overridden Implementation(s): [PlatformToken.allowance](PlatformToken.md#allowance)

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
