## Sūrya's Description Report

### Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| contracts/factories/AbstractFactory.sol | 7ba19bc402940b39f26faeb5bef4f848d4c1daa0 |
| contracts/factories/AssetFactory.sol | 0365eeea5f6051d32852c2c0e5449f676f28fc1b |
| contracts/factories/AssetTokenFactory.sol | 77595439c7d123e2dc3d53da4060525c7549519e |
| contracts/factories/AssetWhitelistFactory.sol | fb4529e32022dfb2494342a004ef290dde5e55e7 |
| contracts/factories/BEEFactory.sol | 27dde6ac9c6fbfa628a73d945dbb80f0a8f4cbc5 |
| contracts/factories/ClaimerFactory.sol | 0939deccfd4cfdcad83cd4249040bc6a83ececc8 |
| contracts/factories/FeeFactory.sol | 175bc4c2e0c79b0d23a8fe60511ffbd8239809fb |
| contracts/factories/FeeManagerFactory.sol | 1494448ead85c4827d68cc72eb3aed472894ce54 |
| contracts/factories/RankTrackerFactory.sol | 8dc70c4728f2d409ae0d9c778b125ad2aac681ed |
| contracts/governance/AccessControl.sol | f89695f92fb597f4c023e0c8db189bfe9caa0c4c |
| contracts/governance/Admin.sol | b04ae6fb7314cbf5fc20dd164ba71c9f5e72c3bf |
| contracts/governance/Agent.sol | 4d0f311754e786f55a25784e324317ae971e4ebe |
| contracts/governance/Groups.sol | 88dd6a9142cffff0ded37a5b911236f39253a5f8 |
| contracts/governance/Multisignature.sol | f74a23a9759cfa51afac98495685de24589b021f |
| contracts/governance/Priced.sol | 68a70b4e336959c39ee600863cd1b1a4c7f3e49e |
| contracts/governance/Sudo.sol | 439691ba08178a0ff6b389b195fea042e0ed6ec2 |
| contracts/governance/Trader.sol | f3d7219fd8f2be0cb1c55508deebef22f0a09713 |
| contracts/libs/ECVerify.sol | 0273a4d6448f9ce4c0b879443cd7d9ef9e7faff1 |
| contracts/libs/IndexedEntities.sol | 4a92517f610a60c580eb5bc7f6b4d9ad214c9557 |
| contracts/libs/Wallet.sol | d9a5f804bcd98ef508de28e749d1c1bd1e5dc1b6 |
| contracts/lifecycle/AssetBallot.sol | 77f4ddd5310b3177db4c377171512ee111a38e1b |
| contracts/lifecycle/CyclicPausable.sol | 0cb990b386d1c9814ab2757651245d971f52bcd8 |
| contracts/lifecycle/Pausable.sol | 1cf61a13efb6e8ce1f135ea243d5d4e646960f04 |
| contracts/lifecycle/TimePausable.sol | 4a8dfcd954861118568c1a2471d2c8f7acc3b6e7 |
| contracts/platform/Asset.sol | 86942375a6a71c4c9e680678c354c6c5a3002274 |
| contracts/platform/BEE.sol | 81db56152ca909a9cbbd1e5f654f7e4140197a19 |
| contracts/platform/Claimer.sol | 847ee0b32481c22fe634ea3658d5ff7803ee9c84 |
| contracts/platform/Entity.sol | 1c530556c1ae46991ec9b5fe389280465129a6f8 |
| contracts/platform/FeeManager.sol | 3699b66ea90c5d98f69eaf6cd8e3eb189817025c |
| contracts/platform/Fee.sol | 485103cb3ab8f6476c9f7769eeabce2b104ad5ef |
| contracts/platform/RankTracker.sol | 2dd51ac6f423cd1a550c20762952d10cdc6ef539 |
| contracts/platform/Registry.sol | 01cab0fb5d84dd0e3fdfe2deb541328f75aee9fa |
| contracts/platform/TickerDecentralized.sol | 137a3e754ecc24b43de95e505d6099d8ab93e337 |
| contracts/platform/Ticker.sol | f103baadb76c82255c152972e2ea15d0b8d8815f |
| contracts/whitelist/AssetWhitelist.sol | c68317045c0237e6d3b3b3208610e30829d11748 |
| contracts/whitelist/Whitelist.sol | 5e43e6aa4b2b57452ec9ae75cb4cb13adf5b28c2 |


### Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **AbstractFactory** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | get | Public ❗️ |   | |
| └ | size | Public ❗️ |   | |
||||||
| **AssetFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **AssetTokenFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **AssetWhitelistFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **BEEFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **ClaimerFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **FeeFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **FeeManagerFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **RankTrackerFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | |
||||||
| **AccessControl** | Implementation | Wallet |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | checkRole | Public ❗️ |   | |
| └ | isRole | Internal 🔒 |   | |
| └ | isRole | Public ❗️ |   | |
| └ | addAddressToGroup | Internal 🔒 | 🛑  | |
| └ | removeAddressFromGroup | Internal 🔒 | 🛑  | |
| └ | isVerifiedUser | Public ❗️ |   | |
| └ | verifyUser | Internal 🔒 | 🛑  | |
| └ | unVerifyUser | Internal 🔒 | 🛑  | |
| └ | getRoleMembersCount | Public ❗️ |   | |
| └ | getOwnerAddress | Public ❗️ |   | |
||||||
| **Admin** | Implementation | AccessControl, Priced |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToAdminGroup | Public ❗️ |  💵 | onlySudoOrOwner costs |
| └ | updateAddAddressToAdminGroupPrice | Public ❗️ | 🛑  | onlySudoOrOwner |
| └ | verify | Public ❗️ | 🛑  | onlySudoOrOwner |
||||||
| **Agent** | Implementation | AccessControl, Priced |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToAgentsGroup | Public ❗️ |  💵 | costs |
| └ | updateAddAddressToAgentsGroupPrice | Public ❗️ | 🛑  | onlySudoOrOwner |
| └ | verify | Public ❗️ | 🛑  | onlyAdmins |
||||||
| **Groups** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | isOwner | Public ❗️ |   | |
| └ | isSudo | Public ❗️ |   | |
| └ | isAdmin | Public ❗️ |   | |
| └ | isVerifiedAdmin | Public ❗️ |   | |
| └ | isAgent | Public ❗️ |   | |
| └ | isVerifiedAgent | Public ❗️ |   | |
| └ | isTrader | Public ❗️ |   | |
| └ | isVerifiedTrader | Public ❗️ |   | |
||||||
| **Multisignature** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | createMultisigTransaction | Internal 🔒 | 🛑  | |
| └ | signMultisigTransaction | Internal 🔒 | 🛑  | |
| └ | deleteMultisigTransaction | Internal 🔒 | 🛑  | |
| └ | cancelMultisigTransaction | Internal 🔒 | 🛑  | |
| └ | getPendingConfirmations | Public ❗️ |   | |
||||||
| **Priced** | Implementation |  |||
||||||
| **Sudo** | Implementation | AccessControl, Multisignature |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToSudoGroup | Public ❗️ | 🛑  | onlySudoOrOwner |
| └ | requestRemoveAddressFromSudoGroup | Public ❗️ | 🛑  | onlySudo |
| └ | confirmRemoveAddressFromSudoGroup | Public ❗️ | 🛑  | onlySudo |
||||||
| **Trader** | Implementation | AccessControl, Priced |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToTradersGroup | Public ❗️ |  💵 | costs |
| └ | updateAddAddressToTradersGroupPrice | Public ❗️ | 🛑  | onlySudoOrOwner |
| └ | verify | Public ❗️ | 🛑  | onlyAdmins |
||||||
| **ECVerify** | Implementation |  |||
| └ | getAddrFromSignature | Public ❗️ |   | |
| └ | getAddrFromSignatureWithPrefix | Public ❗️ |   | |
| └ | validateSignature | Public ❗️ |   | |
||||||
| **IndexedEntities** | Implementation | Ownable |||
| └ | addItem | Public ❗️ | 🛑  | onlyImmediateOwnerOrWhitelisted |
| └ | getItem | Public ❗️ |   | onlyImmediateOwnerOrWhitelisted |
| └ | getCount | Public ❗️ |   | onlyImmediateOwnerOrWhitelisted |
| └ | hasItem | Public ❗️ |   | onlyImmediateOwnerOrWhitelisted |
||||||
| **Wallet** | Implementation | Ownable |||
| └ | \<Fallback\> | External ❗️ |  💵 | |
| └ | withdraw | Public ❗️ | 🛑  | onlyImmediateOwnerOrWhitelisted |
| └ | getBalance | Public ❗️ |   | |
||||||
| **AssetBallot** | Implementation | CyclicPausable |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | CyclicPausable |
| └ | sellAssetVote | Public ❗️ | 🛑  | onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle |
| └ | keepAssetVote | Public ❗️ | 🛑  | onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle |
| └ | getTradingPeriodDuration | Public ❗️ |   | |
| └ | getVotingPeriodDuration | Public ❗️ |   | |
| └ | isInTradingPeriod | Public ❗️ |   | |
| └ | getAssetToken | Public ❗️ |   | |
||||||
| **CyclicPausable** | Implementation | TimePausable |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | TimePausable |
| └ | getR | Private 🔐 |   | |
| └ | isInUpperWave | Public ❗️ |   | onlyIfActivated onlyIfDeltaHasExpired |
| └ | getCycle | Public ❗️ |   | onlyIfActivated onlyIfDeltaHasExpired |
| └ | isWithinLifespan | Public ❗️ |   | onlyIfActivated onlyIfDeltaHasExpired |
| └ | getCycleProgress | Public ❗️ |   | onlyIfActivated onlyIfDeltaHasExpired |
||||||
| **Pausable** | Implementation | Groups, Ownable |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | pause | Public ❗️ | 🛑  | onlySudoOrOwner whenNotPaused |
| └ | resume | Public ❗️ | 🛑  | onlySudoOrOwner whenPaused |
||||||
| **TimePausable** | Implementation | Pausable |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Pausable |
| └ | hasExpired | Public ❗️ |   | onlyIfActivated |
| └ | enableTimeValidation | Public ❗️ | 🛑  | onlyIfActivated onlySudoOrOwner |
| └ | disableTimeValidation | Public ❗️ | 🛑  | onlyIfActivated onlySudoOrOwner |
| └ | hasDeltaExpired | Public ❗️ |   | |
| └ | activate | Public ❗️ | 🛑  | onlyImmediateOwnerOrWhitelisted |
||||||
| **Asset** | Implementation | Entity |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Entity |
| └ | createAssetToken | Public ❗️ | 🛑  | onlyAdmins |
| └ | createFeeManager | Public ❗️ | 🛑  | onlyAdmins |
| └ | createWhitelist | Public ❗️ | 🛑  | onlyAdmins |
| └ | createRankTracker | Public ❗️ | 🛑  | onlyAdmins |
| └ | setMinTokenPercentage | Public ❗️ | 🛑  | onlySudo |
| └ | setPurchasePercentages | Public ❗️ | 🛑  | onlyAdmins |
| └ | getFeeForAmount | Public ❗️ |   | |
| └ | canBuyAssetTokens | Public ❗️ |   | |
| └ | buyAssetTokens | Public ❗️ |  💵 | onlyTraders |
| └ | setDataHash | Public ❗️ | 🛑  | onlyAgent |
| └ | agentApproveData | Public ❗️ | 🛑  | onlyAgent |
| └ | adminApproveData | Public ❗️ | 🛑  | onlyAdmins |
| └ | approveContractCreation | Public ❗️ | 🛑  | onlyAgent |
| └ | setState | Internal 🔒 | 🛑  | |
| └ | getTokenAddress | Public ❗️ |   | |
| └ | getFeeManagerAddress | Public ❗️ |   | |
| └ | getAgent | Public ❗️ |   | |
| └ | getWhitelistAddress | Public ❗️ |   | |
||||||
| **BEE** | Implementation | IFee, IBEE |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | getRatio | Public ❗️ | 🛑  | |
| └ | assetTokensToPlatformTokens | Public ❗️ | 🛑  | |
| └ | claimEth | Public ❗️ | 🛑  | |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | assetClaimsEnabled canSenderClaim |
| └ | claimAssetTokens | Public ❗️ | 🛑  | |
| └ | getPlatformTokenBalance | Public ❗️ |   | |
| └ | getAssetTokenBalance | Public ❗️ |   | |
||||||
| **Claimer** | Implementation | IFee, IClaimer |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | hasEnoughPlatformTokens | Public ❗️ |   | |
| └ | assetTokensToPlatformTokens | Public ❗️ |   | |
| └ | claimerFunded | Public ❗️ | 🛑  | assetClaimsEnabled |
| └ | claimEth | Public ❗️ | 🛑  | |
| └ | claim | Public ❗️ | 🛑  | |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | assetClaimsEnabled canSenderClaim |
| └ | claimAssetTokens | Public ❗️ | 🛑  | |
| └ | getPlatformTokenBalance | Public ❗️ |   | |
| └ | getAssetTokenBalance | Public ❗️ |   | |
||||||
| **Entity** | Implementation | Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | like | Public ❗️ | 🛑  | |
| └ | dislike | Public ❗️ | 🛑  | |
| └ | getLikes | Public ❗️ |   | |
| └ | getDislikes | Public ❗️ |   | |
| └ | hasPositiveFeedback | Public ❗️ |   | |
||||||
| **FeeManager** | Implementation | IFeeManager |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | createDefaultFees | Public ❗️ | 🛑  | |
| └ | createClaimer | Internal 🔒 | 🛑  | |
| └ | createBEE | Internal 🔒 | 🛑  | |
| └ | createFee | Internal 🔒 | 🛑  | |
| └ | getAddress | Public ❗️ |   | |
| └ | getAmount | Public ❗️ |   | |
| └ | hasDefaultFees | Public ❗️ |   | |
||||||
| **Fee** | Implementation | IFee |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | claimEth | Public ❗️ | 🛑  | onlyClaimer |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | onlyClaimer |
| └ | claimAssetTokens | Public ❗️ | 🛑  | onlyClaimer |
| └ | getPlatformTokenBalance | Public ❗️ |   | |
| └ | getAssetTokenBalance | Public ❗️ |   | |
||||||
| **RankTracker** | Implementation | IRankTracker, Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | setUserRank | Public ❗️ | 🛑  | onlyAdmins |
| └ | setRank | Public ❗️ | 🛑  | onlyAdmins |
| └ | validatePeriod | Internal 🔒 | 🛑  | |
| └ | validateUser | Internal 🔒 | 🛑  | |
| └ | validate | Public ❗️ | 🛑  | onlyOwner |
||||||
| **Registry** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | getAddress | External ❗️ |   | |
| └ | setAddress | Public ❗️ | 🛑  | onlyOwner |
||||||
| **TickerDecentralized** | Implementation | usingOraclize |||
| └ | \<Constructor\> | Public ❗️ |  💵 | |
| └ | setState | Public ❗️ | 🛑  | onlyOwner |
| └ | getTicker | Public ❗️ |   | isValidTicker |
| └ | getLastQuery | Public ❗️ |   | |
| └ | unitsToBase | Public ❗️ |   | |
| └ | baseToUnits | Public ❗️ |   | |
| └ | unitsToUSD | Public ❗️ |   | |
| └ | usdToUnits | Public ❗️ |   | |
| └ | __callback | Public ❗️ | 🛑  | |
| └ | update | Public ❗️ |  💵 | |
||||||
| **Ticker** | Implementation | ITicker |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | setUSD | Public ❗️ | 🛑  | onlyOwner |
| └ | setBTC | Public ❗️ | 🛑  | onlyOwner |
| └ | setETH | Public ❗️ | 🛑  | onlyOwner |
| └ | getUSD | Public ❗️ |   | isValidTicker |
| └ | getETH | Public ❗️ |   | isValidTicker |
| └ | getBTC | Public ❗️ |   | isValidTicker |
| └ | unitsToBase | Public ❗️ |   | |
| └ | baseToUnits | Public ❗️ |   | |
| └ | unitsToUSD | Public ❗️ |   | |
| └ | usdToUnits | Public ❗️ |   | |
| └ | unitsToETH | Public ❗️ |   | |
| └ | ethToUnits | Public ❗️ |   | |
| └ | test | Public ❗️ |   | |
||||||
| **AssetWhitelist** | Implementation | Groups, IAssetWhitelist |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | addCountry | Public ❗️ | 🛑  | onlyAdmins |
| └ | removeCountry | Public ❗️ | 🛑  | onlyAdmins |
| └ | allowTransaction | Public ❗️ |   | |
| └ | setEnabled | Public ❗️ | 🛑  | onlyAdmins |
| └ | setInitialPurchases | Public ❗️ | 🛑  | onlyAdmins |
| └ | setP2PTransfers | Public ❗️ | 🛑  | onlyAdmins |
| └ | setClaimerTransfers | Public ❗️ | 🛑  | onlyAdmins |
| └ | getEnabled | Public ❗️ |   | |
| └ | getInitialPurchases | Public ❗️ |   | |
| └ | getP2PTransfers | Public ❗️ |   | |
| └ | getClaimerTransfers | Public ❗️ |   | |
| └ | getCountries | Public ❗️ |   | |
||||||
| **Whitelist** | Implementation | Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | add | Public ❗️ | 🛑  | onlyAdmins |
| └ | remove | Public ❗️ | 🛑  | onlyAdmins |
| └ | isWhitelisted | Public ❗️ |   | |


### Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
