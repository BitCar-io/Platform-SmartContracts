const chalk = require('chalk');
const carDataHashes = require('./util/carDataHashes').carDataHashes;
const BigNumber = require('bignumber.js');

const { convertToSolidityNumber, getContract, getUserAccounts, daysToSeconds, yearsToSeconds, RANK_LEVEL } = require("./util/helpers.js");
const { initialiseUserHelper, addToAdminAndVerify,
    addToAgentAndVerify,
    addToSudo,
    addToTrader } = require("./util/platformUsers");
const {approveAsset, initialiseAssetHelper,
    createAsset, createAssetBallot, createAssetBallotCategory, createRank, retrieveAsset } = require('./util/assets');

const { initialiseWhitelistHelper,
    addCountryToAssetAndEnableWhitelist,
    createWhitelistCountryForMigration,
    setClaimerTransfers,
    setInitialPurchases,
    setP2PTransfers} = require('./util/whitelist');

module.exports = function(deployer, network, accounts) {

    if(network !== "mainnet") {
        console.log(chalk.yellow(`Not running ${__filename} as network is not mainnet`));
        return;
    }

    if(true) {
        console.log(chalk.red(`Not running ${__filename}. Please set the wrapping IF to false to run this script!`));
        return;     
    }

    const RankTrackerContract = artifacts.require("RankTracker.sol");

    const users = getUserAccounts(accounts);

    deployer.then(async () => {

        const admin0 = users.admin0;
        const agent0 = users.agent0;
        const sudo0 = users.ownerAddr;

        // const euWhitelist = createWhitelistCountryForMigration(1, "EU");
        const allWhitelist = createWhitelistCountryForMigration(999, "All");
        // const ukWhitelist = createWhitelistCountryForMigration(826, "UK");

        console.log('Loading contract abis');
        await initialiseAssetHelper(artifacts);
        await initialiseUserHelper(artifacts);
        await initialiseWhitelistHelper(artifacts);

        console.log("Creating Sudo User..\n");
        await addToSudo(sudo0);

        console.log("\nCreating Admin User..\n");
        await addToAdminAndVerify(admin0, sudo0);

        console.log("\nCreating and verifying Agent User..\n");
        await addToTrader(agent0, admin0, true, web3, users.ownerAddr, null, allWhitelist.code);
        await addToAgentAndVerify(agent0, admin0);

        let RankTracker = await getContract(RankTrackerContract);

        console.log('Setting Bronze platform limit to 14,000');
        await RankTracker.setGlobalLimit(RANK_LEVEL.bronze, convertToSolidityNumber(14000), {from: users.admin0});

        console.log('Setting Silver platform limit to 24,000');
        await RankTracker.setGlobalLimit(RANK_LEVEL.silver, convertToSolidityNumber(24000), {from: users.admin0});

        console.log('Setting Gold platform limit to 50,000,000');
        await RankTracker.setGlobalLimit(RANK_LEVEL.gold, convertToSolidityNumber(50000000), {from: users.admin0});

        let confirmations = await Promise.all([RankTracker.getGlobalLimit(RANK_LEVEL.bronze),
            RankTracker.getGlobalLimit(RANK_LEVEL.silver),
            RankTracker.getGlobalLimit(RANK_LEVEL.gold)]);

        console.log(chalk.yellow(`Confirm Rank '${RANK_LEVEL.bronze}' set to ${confirmations[0].toString()}`));
        console.log(chalk.yellow(`Confirm Rank '${RANK_LEVEL.silver}' set to ${confirmations[1].toString()}`));
        console.log(chalk.yellow(`Confirm Rank '${RANK_LEVEL.gold}' set to ${confirmations[2].toString()}`));

        console.log("\nRegistering assets...");

        /**** Ferrari 599 GTO ****/

        // $561,000
        const tokenName = "Ferrari 599 GTO 1";
        const tokenCode = "599GTO1";
        const dataHash = carDataHashes.ferrari599GT;
        const minimumPurchaseAmount = 25;
        const ownershipLock = 95;
        const bitcarPercent = 20;
        const launchDelaySeconds = 30;
        const salePrice = 561000;
        const tradingPeriodSeconds = yearsToSeconds(5);
        const votingPeriodSeconds = daysToSeconds(30);
        const numberOfExtensions = 1;
        const purchaseLimitPeriodSeconds = daysToSeconds(1);
        const userPeriodLimitBronze = 5000;
        const userPeriodLimitSilver = 20000;
        const userPeriodLimitGold = salePrice;
        const membershipPeriodLimitBronze = salePrice;
        const membershipPeriodLimitSilver = salePrice;
        const membershipPeriodLimitGold = salePrice;
        const escrowPercent = 15;
        const msiPercent = 0;
        const pafPercent = 0;
        const ptfPercent = 0;

        const assetSuccessfulVotePercent = 90;
        const assetMinimumTokensBeforeVotingPercent = 75;
        const assetVotePeriodSeconds = daysToSeconds(21);



        const deployedAssetAddress = await createAsset(tokenName, tokenCode, dataHash, agent0, admin0, salePrice, msiPercent, bitcarPercent, tradingPeriodSeconds, votingPeriodSeconds, ownershipLock, numberOfExtensions, escrowPercent, pafPercent, ptfPercent);
        let asset = await retrieveAsset(deployedAssetAddress);

        let assetControlBallotContract = await createAssetBallot(asset, assetMinimumTokensBeforeVotingPercent, assetSuccessfulVotePercent, assetVotePeriodSeconds, admin0);
        await createAssetBallotCategory(assetControlBallotContract, "Change Storage Location", 90, admin0);
        await createAssetBallotCategory(assetControlBallotContract, "Temporary Display", 75, admin0);
        await createAssetBallotCategory(assetControlBallotContract, "Other", 90, admin0);

        await createRank(asset, admin0, "Bronze", RANK_LEVEL.bronze, purchaseLimitPeriodSeconds, membershipPeriodLimitBronze, userPeriodLimitBronze);
        await createRank(asset, admin0, "Silver", RANK_LEVEL.silver, purchaseLimitPeriodSeconds, membershipPeriodLimitSilver, userPeriodLimitSilver);
        await createRank(asset, admin0, "Gold", RANK_LEVEL.gold, purchaseLimitPeriodSeconds, membershipPeriodLimitGold, userPeriodLimitGold);

        await approveAsset(asset, admin0, launchDelaySeconds, true);

        await asset.assetContract.setMinPurchaseAmount(new BigNumber(minimumPurchaseAmount).shiftedBy(8).toString(), {from: admin0})

        // await addCountryToAssetAndEnableWhitelist(asset, admin0, euWhitelist);
        await addCountryToAssetAndEnableWhitelist(asset, admin0, allWhitelist);
        // await addCountryToAssetAndEnableWhitelist(asset, admin0, ukWhitelist);
        await setInitialPurchases(asset, admin0, true);
        await setP2PTransfers(asset, admin0, true);
        await setClaimerTransfers(asset, admin0, true);

    });
}