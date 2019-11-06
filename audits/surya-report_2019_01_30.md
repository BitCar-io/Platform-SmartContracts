## Sūrya's Description Report

### Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| contracts/factories/AbstractFactory.sol | c3b48485bad13fda94f35f520b36137c14156152 |
| contracts/factories/AssetFactory.sol | 1bc28a36b74db99a470fda4e1030b99af4e417b8 |
| contracts/factories/AssetRankFactory.sol | f819831f9b3d2aa45436a29c961616faa4539077 |
| contracts/factories/AssetTokenFactory.sol | d4b127516cbc61aa052ea8e21ddd9e66add40b14 |
| contracts/factories/AssetWhitelistFactory.sol | 98f35ba48c8167cc701753ae195307ee9656017e |
| contracts/factories/BEEFactory.sol | e3ccb2d931fca88b05b2d37e1b2d4d1d72a7b9bf |
| contracts/factories/ClaimerFactory.sol | 2b4853a241a1d149044e0ce92f9589dfcb92f734 |
| contracts/factories/FeeFactory.sol | 4a8b6f47bebeec18bb0bfa0977cba65939c0d735 |
| contracts/factories/FeeManagerFactory.sol | fd5ac75537760c39371491806a86b2f67e789105 |
| contracts/governance/AccessControl.sol | c40e4c0487a88ed4b769130bb9de5824c83f4f75 |
| contracts/governance/Admin.sol | 681b88516694d13c6c66b71c2e2cf9cd283e68cb |
| contracts/governance/Agent.sol | 8ff670a00d132edee47c4724894812439788dab0 |
| contracts/governance/Groups.sol | 13d382f1c947b679ef773d993aa2f33e77a66711 |
| contracts/governance/Multisignature.sol | 8a731ad8e719f3531af65a8c7b87c84603f5aa93 |
| contracts/governance/Priced.sol | dd8eb231aa58da223914ebce6c2b0fa43b428f28 |
| contracts/governance/Sudo.sol | b078a4c51afc3a8b1448cf9f6e589ff5c39957aa |
| contracts/governance/Trader.sol | 2fb7674f16399212a3bd5809cf2bf8fcb9c0d014 |
| contracts/libs/AssetRankParameters.sol | bb00dacfcd3565ab76e48608a20a614e79a4c588 |
| contracts/libs/AssetRank.sol | cecaba4f55a32c5aac5e51caff23b3bcc22822d1 |
| contracts/libs/ECVerify.sol | fd3d6d072edd88c8d46cbd38105e323c38bbca73 |
| contracts/libs/IndexedEntities.sol | 2c2266fb972bab9bf0bb3993db505fb62bf255e0 |
| contracts/libs/Modifiers.sol | 65eebe78f1a8b1005020c7896522da66a96ffe36 |
| contracts/libs/Wallet.sol | 4845091a75c17ff05ca77f517cbbfdb994019286 |
| contracts/lifecycle/AssetBallot.sol | 718a6b6ba1ab083f57ff4fe3ed22fd9765fd2bff |
| contracts/lifecycle/CyclicPausable.sol | e2bde07719d4c3f1c796ae54d6467c9136d90646 |
| contracts/lifecycle/Pausable.sol | 03bee0a1a5cca535feff14d1d8eed0fcc14e9b99 |
| contracts/lifecycle/TimePausable.sol | a1d44bb5828fae9a866529607633c846b9b681f3 |
| contracts/platform/Asset.sol | ada1fbc8f3935896ef98c7329bc80b7fe4f9396f |
| contracts/platform/BEE.sol | b48246f84cc090a359a72beb37d772a9183bb153 |
| contracts/platform/Claimer.sol | 4a74678bfd2d41f0582e326fcace7f8fa10f3317 |
| contracts/platform/Entity.sol | 23d2e6f58c9718fde89d0e54007ab691eec9a768 |
| contracts/platform/FeeManager.sol | d6fc235e8854f83818fccd96e7806efece675607 |
| contracts/platform/Fee.sol | e139d5b93914a4a83234fc6f8c5bb7956e2178a9 |
| contracts/platform/Ranking.sol | 6af05e27912344e7067027f4ef9a9e7fb4d9bfc2 |
| contracts/platform/Registry.sol | 7059d8b10ac470dc3597d9a31039139e9cf84537 |
| contracts/platform/TickerDecentralized.sol | d9c160901f58f32edeeb81984b89f642a77cac4e |
| contracts/platform/Ticker.sol | 12c122541e9baacbee6fb7abb7bf03f997276ef0 |
| contracts/portfolio/GenericPortfolio.sol | 3c6f2ccfc9945d6485e96592b89a114e5812b08a |
| contracts/portfolio/Portfolio.sol | 6304db2540b60dc63e67ce59f0c287ad4465dcf3 |
| contracts/whitelist/AssetWhitelist.sol | 2a27affe8f9693d60930207c90e94d9135b82304 |
| contracts/whitelist/Whitelist.sol | 68a36b78faffbf92090bc22b1016731bb0741a61 |


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
| **AssetRankFactory** | Implementation | AbstractFactory, Ownable |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | onlyImmediateOwnerOrWhitelisted |
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
| **AssetRankParameters** | Implementation | Groups, Ownable, Multisignature |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | getTheUnit | External ❗️ |   | |
| └ | setTheThreshold | External ❗️ | 🛑  | onlySudo |
| └ | getTheThreshold | External ❗️ |   | |
| └ | getNumParams | External ❗️ |   | |
| └ | getParam | External ❗️ |   | |
| └ | addRankParameter | Internal 🔒 | 🛑  | |
| └ | requestRankWeightsUpdate | External ❗️ | 🛑  | onlySudo |
| └ | confirmRankWeightsUpdate | External ❗️ | 🛑  | onlySudo |
||||||
| **AssetRank** | Implementation | IAssetRank, Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | setRankInputs | External ❗️ | 🛑  | |
| └ | calculateRanking | External ❗️ | 🛑  | |
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
| **UserModifiers** | Library |  |||
||||||
| **Wallet** | Implementation | Ownable |||
| └ | \<Fallback\> | Public ❗️ |  💵 | |
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
| **Asset** | Implementation | Entity, Ranking |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Entity Ranking |
| └ | createAssetToken | Public ❗️ | 🛑  | onlyAdmins |
| └ | createFeeManager | Public ❗️ | 🛑  | onlyAdmins |
| └ | createWhitelist | Public ❗️ | 🛑  | onlyAdmins |
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
| **BEE** | Implementation | IFee |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | getRatio | Public ❗️ | 🛑  | |
| └ | assetTokensToPlatformTokens | Public ❗️ | 🛑  | |
| └ | claimEth | Public ❗️ | 🛑  | |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | assetClaimsEnabled canSenderClaim |
| └ | claimAssetTokens | Public ❗️ | 🛑  | |
| └ | getPlatformTokenBalance | Public ❗️ |   | |
| └ | getAssetTokenBalance | Public ❗️ |   | |
||||||
| **Claimer** | Implementation | IFee |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | hasEnoughPlatformTokens | Public ❗️ |   | |
| └ | assetTokensToPlatformTokens | Public ❗️ |   | |
| └ | claimerFunded | Public ❗️ | 🛑  | assetClaimsEnabled |
| └ | claimEth | Public ❗️ | 🛑  | |
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
| **FeeManager** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | createDefaultFees | Public ❗️ | 🛑  | |
| └ | createClaimer | Internal 🔒 | 🛑  | |
| └ | createBEE | Internal 🔒 | 🛑  | |
| └ | createFee | Internal 🔒 | 🛑  | |
| └ | getAddress | Public ❗️ |   | |
| └ | getAmount | Public ❗️ |   | |
| └ | hasDefaultFees | Public ❗️ |   | |
||||||
| **Fee** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | claimEth | Public ❗️ | 🛑  | onlyClaimer |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | onlyClaimer |
| └ | claimAssetTokens | Public ❗️ | 🛑  | onlyClaimer |
| └ | getPlatformTokenBalance | Public ❗️ |   | |
| └ | getAssetTokenBalance | Public ❗️ |   | |
||||||
| **Ranking** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | createAssetRankInstance | Private 🔐 | 🛑  | |
| └ | setRankInputs | Public ❗️ | 🛑  | |
| └ | calculateRanking | Public ❗️ | 🛑  | |
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
| **GenericPortfolio** | Implementation | Portfolio |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Portfolio |
| └ | addAddress | Public ❗️ | 🛑  | onlyWhitelisted |
| └ | getAddress | Public ❗️ |   | |
| └ | hasAddress | Public ❗️ |   | |
||||||
| **Portfolio** | Implementation | Ownable, Pausable |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Pausable |
| └ | addItem | Internal 🔒 | 🛑  | whenNotPaused |
| └ | getItem | Internal 🔒 |   | |
| └ | getCount | Public ❗️ |   | |
| └ | getType | Public ❗️ |   | |
||||||
| **AssetWhitelist** | Implementation | Groups |||
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
