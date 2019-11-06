## Sūrya's Description Report

### Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| ./contracts/factories/AbstractFactory.sol | c398ea195e55f920f6994cc47734a6d2ca8e5ec3 |
| ./contracts/factories/AssetControlBallotFactory.sol | 00a155bc55f19c5ec4337f65608678d2fc360001 |
| ./contracts/factories/AssetFactory.sol | 056f96a85071b9f5c3b5579c6a3a318830f2a608 |
| ./contracts/factories/AssetRankTrackerFactory.sol | 974667f8147ecd04a6f0055fbd2828489303dd72 |
| ./contracts/factories/AssetTokenFactory.sol | f061e2bf7f40c126f5325c10e4277bc540cd59fe |
| ./contracts/factories/AssetWhitelistFactory.sol | 39591ad434cdb7c629bbd384d42bdeaaf56b5fef |
| ./contracts/factories/BEEFactory.sol | 3303bb2fe1cb91a39cb1c72dfb2842ecb1994863 |
| ./contracts/factories/ClaimerFactory.sol | 0939deccfd4cfdcad83cd4249040bc6a83ececc8 |
| ./contracts/factories/FeeFactory.sol | 78eca1e7fb482161a195ccac910acaf92e042aa2 |
| ./contracts/factories/FeeManagerFactory.sol | 1494448ead85c4827d68cc72eb3aed472894ce54 |
| ./contracts/governance/AccessControl.sol | 74e15392a9425946924ab9e5111f4b3f042dc644 |
| ./contracts/governance/Admin.sol | de5854ccc3d704d692a8be54359edc851c9bd2e5 |
| ./contracts/governance/Agent.sol | 6a376332c18b7ad1acbd3c0973a5d134bf6a0981 |
| ./contracts/governance/AssetRole.sol | 784c744ccc08b3c5edec5bc5f098b6d86baf28a7 |
| ./contracts/governance/Groups.sol | 4fce58bd35b8414c0e6de9a740714c38eb1b6c0e |
| ./contracts/governance/Priced.sol | c2630e8e2d96fd495e385217576e6ae2a7abcccc |
| ./contracts/governance/Sudo.sol | f3c7dd8c2a856cf79c9e2b5bcf3199ddd5fd563f |
| ./contracts/governance/Trader.sol | 23eff36bf6edc1f293708f2f26f27c6da4c01713 |
| ./contracts/libs/ECVerify.sol | dfdba2c5a7b6996d03e2c19091475bf622db25ca |
| ./contracts/libs/IndexedEntities.sol | 5ff1c1203806f8967638582281c0eaff05704da4 |
| ./contracts/libs/ReentrancyLock.sol | b3265ccb0c14913672e49d8476cef4e5f1576a10 |
| ./contracts/libs/Wallet.sol | e9452ef496ab4a7f27ba6c2f3b4f3c9c1a862acb |
| ./contracts/lifecycle/AssetBallot.sol | 77f4ddd5310b3177db4c377171512ee111a38e1b |
| ./contracts/lifecycle/CyclicPausable.sol | a6282118e0d8953fe03ca5a115f2a814b58837e6 |
| ./contracts/lifecycle/Pausable.sol | 71856d4750f693d82a6b0ff6170d9490501e0508 |
| ./contracts/lifecycle/TimePausable.sol | 1f1fa2504eb2436977c8c08551621730184b0709 |
| ./contracts/platform/Asset.sol | 152cab17739a852cf69afa46f036fd75adabb375 |
| ./contracts/platform/AssetControlBallot.sol | 4287979eb8936237752b4965d92f70dd570d9560 |
| ./contracts/platform/BEE.sol | 81db56152ca909a9cbbd1e5f654f7e4140197a19 |
| ./contracts/platform/Claimer.sol | 847ee0b32481c22fe634ea3658d5ff7803ee9c84 |
| ./contracts/platform/Entity.sol | 1c530556c1ae46991ec9b5fe389280465129a6f8 |
| ./contracts/platform/Fee.sol | 11f937ee83ffc7cb73bce900a844f7578bcc9149 |
| ./contracts/platform/FeeManager.sol | 00196918f4ba68a9a4b6581f7f176c43a23530f4 |
| ./contracts/platform/Registry.sol | 01cab0fb5d84dd0e3fdfe2deb541328f75aee9fa |
| ./contracts/platform/Ticker.sol | f103baadb76c82255c152972e2ea15d0b8d8815f |
| ./contracts/platform/TickerDecentralized.sol | 3f524690bae42361ea035cda6379acb8d6a9ca4b |
| ./contracts/vendor/SafeMath.sol | d17180e0b5f385bb583c52b05826ea668c3479de |
| ./contracts/vendor/usingOraclize.sol | 392d85a364fd8e672e5df92ade38c5f93167ef61 |
| ./contracts/whitelist/AssetWhitelist.sol | 61d9dd5b0cf5cb1f3490d3362a4168dcb59e422f |
| ./contracts/whitelist/Whitelist.sol | 5e43e6aa4b2b57452ec9ae75cb4cb13adf5b28c2 |


### Contracts Description Table


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **AbstractFactory** | Implementation | Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | get | Public ❗️ |   |NO❗️ |
| └ | size | Public ❗️ |   |NO❗️ |
||||||
| **AssetControlBallotFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **AssetFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  | onlyAgents |
||||||
| **AssetRankTrackerFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **AssetTokenFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **AssetWhitelistFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **BEEFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **ClaimerFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **FeeFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **FeeManagerFactory** | Implementation | AbstractFactory |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AbstractFactory |
| └ | create | Public ❗️ | 🛑  |NO❗️ |
||||||
| **AccessControl** | Implementation | Wallet |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | checkRole | Public ❗️ |   |NO❗️ |
| └ | isRole | Internal 🔒 |   | |
| └ | isRole | Public ❗️ |   |NO❗️ |
| └ | addAddressToGroup | Internal 🔒 | 🛑  | |
| └ | removeAddressFromGroup | Internal 🔒 | 🛑  | |
| └ | isVerifiedUser | Public ❗️ |   |NO❗️ |
| └ | verifyUser | Internal 🔒 | 🛑  | |
| └ | unVerifyUser | Internal 🔒 | 🛑  | |
| └ | getRoleMembersCount | Public ❗️ |   |NO❗️ |
| └ | getOwnerAddress | Public ❗️ |   |NO❗️ |
||||||
| **Admin** | Implementation | AccessControl |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToAdminGroup | Public ❗️ | 🛑  | onlySudoOrOwner |
| └ | verify | Public ❗️ | 🛑  | onlySudoOrOwner |
||||||
| **Agent** | Implementation | AccessControl |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToAgentsGroup | Public ❗️ | 🛑  | onlyAdmins |
| └ | verify | Public ❗️ | 🛑  | onlyAdmins |
||||||
| **AssetRole** | Implementation | Ownable, AccessControl |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToAssetsGroup | Public ❗️ | 🛑  | onlyWhitelisted |
| └ | verify | Public ❗️ | 🛑  | onlyAdmins |
||||||
| **Groups** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | isOwner | Public ❗️ |   |NO❗️ |
| └ | isSudo | Public ❗️ |   |NO❗️ |
| └ | isAdmin | Public ❗️ |   |NO❗️ |
| └ | isVerifiedAdmin | Public ❗️ |   |NO❗️ |
| └ | isAgent | Public ❗️ |   |NO❗️ |
| └ | isVerifiedAgent | Public ❗️ |   |NO❗️ |
| └ | isTrader | Public ❗️ |   |NO❗️ |
| └ | isVerifiedTrader | Public ❗️ |   |NO❗️ |
| └ | isAsset | Public ❗️ |   |NO❗️ |
| └ | isVerifiedAsset | Public ❗️ |   |NO❗️ |
||||||
| **Priced** | Implementation |  |||
||||||
| **Sudo** | Implementation | AccessControl |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToSudoGroup | Public ❗️ | 🛑  | onlySudoOrOwner |
| └ | removeAddressFromSudoGroup | Public ❗️ | 🛑  | onlySudoOrOwner |
||||||
| **Trader** | Implementation | AccessControl |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | AccessControl |
| └ | addAddressToTradersGroup | Public ❗️ | 🛑  | onlyAdmins |
| └ | verify | Public ❗️ | 🛑  | onlyAdmins |
||||||
| **ECVerify** | Implementation |  |||
| └ | getAddrFromSignature | Public ❗️ |   |NO❗️ |
| └ | getAddrFromSignatureWithPrefix | Public ❗️ |   |NO❗️ |
| └ | validateSignature | Public ❗️ |   |NO❗️ |
||||||
| **IndexedEntities** | Implementation | Ownable |||
| └ | addItem | Public ❗️ | 🛑  | onlyImmediateOwnerOrWhitelisted |
| └ | getItem | Public ❗️ |   | onlyImmediateOwnerOrWhitelisted |
| └ | getCount | Public ❗️ |   | onlyImmediateOwnerOrWhitelisted |
| └ | hasItem | Public ❗️ |   | onlyImmediateOwnerOrWhitelisted |
||||||
| **ReentrancyLock** | Implementation |  |||
||||||
| **Wallet** | Implementation | Ownable |||
| └ | \<Fallback\> | External ❗️ |  💵 |NO❗️ |
| └ | withdraw | Public ❗️ | 🛑  | onlyImmediateOwnerOrWhitelisted |
| └ | getBalance | Public ❗️ |   |NO❗️ |
||||||
| **AssetBallot** | Implementation | CyclicPausable |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | CyclicPausable |
| └ | sellAssetVote | Public ❗️ | 🛑  | onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle |
| └ | keepAssetVote | Public ❗️ | 🛑  | onlyTokenHolders whenNotPaused whileIsInLowerWave isNotLastCycle |
| └ | getTradingPeriodDuration | Public ❗️ |   |NO❗️ |
| └ | getVotingPeriodDuration | Public ❗️ |   |NO❗️ |
| └ | isInTradingPeriod | Public ❗️ |   |NO❗️ |
| └ | getAssetToken | Public ❗️ |   |NO❗️ |
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
| └ | hasDeltaExpired | Public ❗️ |   |NO❗️ |
| └ | activate | Public ❗️ | 🛑  | onlyImmediateOwnerOrWhitelisted |
||||||
| **Asset** | Implementation | Entity |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Entity |
| └ | setMinPurchaseAmount | External ❗️ | 🛑  | onlyAdmins |
| └ | createAssetToken | Public ❗️ | 🛑  | onlyAdmins |
| └ | createFeeManager | Public ❗️ | 🛑  | onlyAdmins |
| └ | createWhitelist | Public ❗️ | 🛑  | onlyAdmins |
| └ | createRankTracker | Public ❗️ | 🛑  | onlyAdmins |
| └ | createAssetBallot | Public ❗️ | 🛑  | onlyAdmins |
| └ | setMinTokenPercentage | Public ❗️ | 🛑  | onlySudo |
| └ | setPurchasePercentages | Public ❗️ | 🛑  | onlyAdmins |
| └ | getFeeForAmount | Public ❗️ |   |NO❗️ |
| └ | canBuyAssetTokens | Public ❗️ |   |NO❗️ |
| └ | buyAssetTokens | Public ❗️ |  💵 | onlyTraders |
| └ | setDataHash | Public ❗️ | 🛑  | onlyAgent |
| └ | agentApproveData | Public ❗️ | 🛑  | onlyAgent |
| └ | adminApproveData | Public ❗️ | 🛑  | onlyAdmins |
| └ | approveContractCreation | Public ❗️ | 🛑  | onlyAgent |
| └ | setState | Internal 🔒 | 🛑  | |
| └ | getTokenAddress | Public ❗️ |   |NO❗️ |
| └ | getFeeManagerAddress | Public ❗️ |   |NO❗️ |
| └ | getAgent | Public ❗️ |   |NO❗️ |
| └ | getAssetRankTrackerAddress | Public ❗️ |   |NO❗️ |
| └ | getWhitelistAddress | Public ❗️ |   |NO❗️ |
| └ | getAssetControlBallotAddress | Public ❗️ |   |NO❗️ |
||||||
| **AssetControlBallot** | Implementation | IAssetControlBallot, Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | createCategory | External ❗️ | 🛑  | onlyAdmins |
| └ | percentSold | Public ❗️ |   |NO❗️ |
| └ | hasVoteExpired | Public ❗️ |   |NO❗️ |
| └ | canPerformTransfers | External ❗️ |   |NO❗️ |
| └ | checkAllowanceForUser | Internal 🔒 |   | |
| └ | createVote | External ❗️ | 🛑  | onlyTokenHolder |
| └ | vote | External ❗️ | 🛑  | onlyTokenHolder |
| └ | completeVote | External ❗️ | 🛑  | onlyVoteCreator |
| └ | getUserVoteIndexByID | Public ❗️ |   |NO❗️ |
| └ | cancelVote | External ❗️ | 🛑  |NO❗️ |
| └ | removeUserVote | Internal 🔒 | 🛑  | |
| └ | adjustUserVote | External ❗️ | 🛑  | onlyAssetToken |
| └ | voteInfo | External ❗️ |   |NO❗️ |
| └ | voterVoteCount | External ❗️ |   |NO❗️ |
| └ | changeVoteCosts | External ❗️ | 🛑  | onlyAdmins |
| └ | changeVoteReceiverAddress | External ❗️ | 🛑  | onlyAdmins |
| └ | changeLockTokenTransfers | External ❗️ | 🛑  | onlyAdmins |
||||||
| **BEE** | Implementation | IFee, IBEE |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | getRatio | Public ❗️ | 🛑  |NO❗️ |
| └ | assetTokensToPlatformTokens | Public ❗️ | 🛑  |NO❗️ |
| └ | claimEth | Public ❗️ | 🛑  |NO❗️ |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | assetClaimsEnabled canSenderClaim |
| └ | claimAssetTokens | Public ❗️ | 🛑  |NO❗️ |
| └ | getPlatformTokenBalance | Public ❗️ |   |NO❗️ |
| └ | getAssetTokenBalance | Public ❗️ |   |NO❗️ |
||||||
| **Claimer** | Implementation | IFee, IClaimer |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | hasEnoughPlatformTokens | Public ❗️ |   |NO❗️ |
| └ | assetTokensToPlatformTokens | Public ❗️ |   |NO❗️ |
| └ | claimerFunded | Public ❗️ | 🛑  | assetClaimsEnabled |
| └ | claimEth | Public ❗️ | 🛑  |NO❗️ |
| └ | claim | Public ❗️ | 🛑  |NO❗️ |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | assetClaimsEnabled canSenderClaim |
| └ | claimAssetTokens | Public ❗️ | 🛑  |NO❗️ |
| └ | getPlatformTokenBalance | Public ❗️ |   |NO❗️ |
| └ | getAssetTokenBalance | Public ❗️ |   |NO❗️ |
||||||
| **Entity** | Implementation | Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | like | Public ❗️ | 🛑  |NO❗️ |
| └ | dislike | Public ❗️ | 🛑  |NO❗️ |
| └ | getLikes | Public ❗️ |   |NO❗️ |
| └ | getDislikes | Public ❗️ |   |NO❗️ |
| └ | hasPositiveFeedback | Public ❗️ |   |NO❗️ |
||||||
| **Fee** | Implementation | IFee |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | claimEth | Public ❗️ | 🛑  | onlyClaimer |
| └ | claimPlatformTokens | Public ❗️ | 🛑  | onlyClaimer |
| └ | claimAssetTokens | Public ❗️ | 🛑  | onlyClaimer |
| └ | getPlatformTokenBalance | Public ❗️ |   |NO❗️ |
| └ | getAssetTokenBalance | Public ❗️ |   |NO❗️ |
||||||
| **FeeManager** | Implementation | IFeeManager |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | createDefaultFees | Public ❗️ | 🛑  |NO❗️ |
| └ | createClaimer | Internal 🔒 | 🛑  | |
| └ | createBEE | Internal 🔒 | 🛑  | |
| └ | createFee | Internal 🔒 | 🛑  | |
| └ | getAddress | Public ❗️ |   |NO❗️ |
| └ | getAmount | Public ❗️ |   |NO❗️ |
| └ | hasDefaultFees | Public ❗️ |   |NO❗️ |
||||||
| **Registry** | Implementation |  |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | getAddress | External ❗️ |   |NO❗️ |
| └ | setAddress | Public ❗️ | 🛑  | onlyOwner |
||||||
| **Ticker** | Implementation | ITicker |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | |
| └ | setUSD | Public ❗️ | 🛑  | onlyOwner |
| └ | setBTC | Public ❗️ | 🛑  | onlyOwner |
| └ | setETH | Public ❗️ | 🛑  | onlyOwner |
| └ | getUSD | Public ❗️ |   | isValidTicker |
| └ | getETH | Public ❗️ |   | isValidTicker |
| └ | getBTC | Public ❗️ |   | isValidTicker |
| └ | unitsToBase | Public ❗️ |   |NO❗️ |
| └ | baseToUnits | Public ❗️ |   |NO❗️ |
| └ | unitsToUSD | Public ❗️ |   |NO❗️ |
| └ | usdToUnits | Public ❗️ |   |NO❗️ |
| └ | unitsToETH | Public ❗️ |   |NO❗️ |
| └ | ethToUnits | Public ❗️ |   |NO❗️ |
| └ | test | Public ❗️ |   |NO❗️ |
||||||
| **TickerDecentralized** | Implementation | usingOraclize |||
| └ | \<Constructor\> | Public ❗️ |  💵 | |
| └ | setState | Public ❗️ | 🛑  | onlyOwner |
| └ | getTicker | Public ❗️ |   | isValidTicker |
| └ | getLastQuery | Public ❗️ |   |NO❗️ |
| └ | unitsToBase | Public ❗️ |   |NO❗️ |
| └ | baseToUnits | Public ❗️ |   |NO❗️ |
| └ | unitsToUSD | Public ❗️ |   |NO❗️ |
| └ | usdToUnits | Public ❗️ |   |NO❗️ |
| └ | __callback | Public ❗️ | 🛑  |NO❗️ |
| └ | update | Public ❗️ |  💵 |NO❗️ |
||||||
| **SafeMath** | Library |  |||
| └ | mul | Internal 🔒 |   | |
| └ | div | Internal 🔒 |   | |
| └ | sub | Internal 🔒 |   | |
| └ | add | Internal 🔒 |   | |
||||||
| **solcChecker** | Implementation |  |||
| └ | f | External ❗️ | 🛑  |NO❗️ |
||||||
| **OraclizeI** | Implementation |  |||
| └ | setProofType | External ❗️ | 🛑  |NO❗️ |
| └ | setCustomGasPrice | External ❗️ | 🛑  |NO❗️ |
| └ | getPrice | Public ❗️ | 🛑  |NO❗️ |
| └ | randomDS_getSessionPubKeyHash | External ❗️ |   |NO❗️ |
| └ | getPrice | Public ❗️ | 🛑  |NO❗️ |
| └ | queryN | Public ❗️ |  💵 |NO❗️ |
| └ | query | External ❗️ |  💵 |NO❗️ |
| └ | query2 | Public ❗️ |  💵 |NO❗️ |
| └ | query_withGasLimit | External ❗️ |  💵 |NO❗️ |
| └ | queryN_withGasLimit | External ❗️ |  💵 |NO❗️ |
| └ | query2_withGasLimit | External ❗️ |  💵 |NO❗️ |
||||||
| **OraclizeAddrResolverI** | Implementation |  |||
| └ | getAddress | Public ❗️ | 🛑  |NO❗️ |
||||||
| **Buffer** | Library |  |||
| └ | init | Internal 🔒 |   | |
| └ | resize | Private 🔐 |   | |
| └ | max | Private 🔐 |   | |
| └ | append | Internal 🔒 |   | |
| └ | append | Internal 🔒 |   | |
| └ | appendInt | Internal 🔒 |   | |
||||||
| **CBOR** | Library |  |||
| └ | encodeType | Private 🔐 |   | |
| └ | encodeIndefiniteLengthType | Private 🔐 |   | |
| └ | encodeUInt | Internal 🔒 |   | |
| └ | encodeInt | Internal 🔒 |   | |
| └ | encodeBytes | Internal 🔒 |   | |
| └ | encodeString | Internal 🔒 |   | |
| └ | startArray | Internal 🔒 |   | |
| └ | startMap | Internal 🔒 |   | |
| └ | endSequence | Internal 🔒 |   | |
||||||
| **usingOraclize** | Implementation |  |||
| └ | oraclize_setNetwork | Internal 🔒 | 🛑  | |
| └ | oraclize_setNetworkName | Internal 🔒 | 🛑  | |
| └ | oraclize_getNetworkName | Internal 🔒 |   | |
| └ | oraclize_setNetwork | Internal 🔒 | 🛑  | |
| └ | __callback | Public ❗️ | 🛑  |NO❗️ |
| └ | __callback | Public ❗️ | 🛑  |NO❗️ |
| └ | oraclize_getPrice | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_getPrice | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_query | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_setProof | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_cbAddress | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | getCodeSize | Internal 🔒 |   | |
| └ | oraclize_setCustomGasPrice | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | oraclize_randomDS_getSessionPubKeyHash | Internal 🔒 | 🛑  | oraclizeAPI |
| └ | parseAddr | Internal 🔒 |   | |
| └ | strCompare | Internal 🔒 |   | |
| └ | indexOf | Internal 🔒 |   | |
| └ | strConcat | Internal 🔒 |   | |
| └ | strConcat | Internal 🔒 |   | |
| └ | strConcat | Internal 🔒 |   | |
| └ | strConcat | Internal 🔒 |   | |
| └ | safeParseInt | Internal 🔒 |   | |
| └ | safeParseInt | Internal 🔒 |   | |
| └ | parseInt | Internal 🔒 |   | |
| └ | parseInt | Internal 🔒 |   | |
| └ | uint2str | Internal 🔒 |   | |
| └ | stra2cbor | Internal 🔒 |   | |
| └ | ba2cbor | Internal 🔒 |   | |
| └ | oraclize_newRandomDSQuery | Internal 🔒 | 🛑  | |
| └ | oraclize_randomDS_setCommitment | Internal 🔒 | 🛑  | |
| └ | verifySig | Internal 🔒 | 🛑  | |
| └ | oraclize_randomDS_proofVerify__sessionKeyValidity | Internal 🔒 | 🛑  | |
| └ | oraclize_randomDS_proofVerify__returnCode | Internal 🔒 | 🛑  | |
| └ | matchBytes32Prefix | Internal 🔒 |   | |
| └ | oraclize_randomDS_proofVerify__main | Internal 🔒 | 🛑  | |
| └ | copyBytes | Internal 🔒 |   | |
| └ | safer_ecrecover | Internal 🔒 | 🛑  | |
| └ | ecrecovery | Internal 🔒 | 🛑  | |
| └ | safeMemoryCleaner | Internal 🔒 |   | |
||||||
| **AssetWhitelist** | Implementation | Groups, IAssetWhitelist |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | addCountry | Public ❗️ | 🛑  | onlyAdmins |
| └ | removeCountry | Public ❗️ | 🛑  | onlyAdmins |
| └ | allowTransaction | Public ❗️ |   |NO❗️ |
| └ | setEnabled | Public ❗️ | 🛑  | onlyAdmins |
| └ | setInitialPurchases | Public ❗️ | 🛑  | onlyAdmins |
| └ | setP2PTransfers | Public ❗️ | 🛑  | onlyAdmins |
| └ | setClaimerTransfers | Public ❗️ | 🛑  | onlyAdmins |
| └ | getEnabled | Public ❗️ |   |NO❗️ |
| └ | getInitialPurchases | Public ❗️ |   |NO❗️ |
| └ | getP2PTransfers | Public ❗️ |   |NO❗️ |
| └ | getClaimerTransfers | Public ❗️ |   |NO❗️ |
| └ | getCountries | Public ❗️ |   |NO❗️ |
||||||
| **Whitelist** | Implementation | Groups |||
| └ | \<Constructor\> | Public ❗️ | 🛑  | Groups |
| └ | add | Public ❗️ | 🛑  | onlyAdmins |
| └ | remove | Public ❗️ | 🛑  | onlyAdmins |
| └ | isWhitelisted | Public ❗️ |   |NO❗️ |


### Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |
