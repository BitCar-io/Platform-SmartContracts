const chalk = require('chalk');
const carDataHashes = require('./util/carDataHashes').carDataHashes;
const BigNumber = require('bignumber.js');

const { getUserAccounts, daysToSeconds, yearsToSeconds, RANK_LEVEL } = require("./util/helpers.js");
const { initialiseUserHelper } = require("./util/platformUsers");
const {approveAsset, initialiseAssetHelper,
    createAsset, createAssetBallot, createAssetBallotCategory, createRank, retrieveAsset } = require('./util/assets');

const { initialiseWhitelistHelper,
    addCountryToAssetAndEnableWhitelist,
    createWhitelistCountryForMigration,
    setClaimerTransfers,
    setInitialPurchases,
    setP2PTransfers} = require('./util/whitelist');

module.exports = function(deployer, network, accounts) {

    if(network === "local" || network === "ropsten") {
        console.log(chalk.yellow(`Not running ${__filename} as network is local or ropsten`));
        return;
    }

    if(network === "mainnet" && true) {
        console.log(chalk.red(`Not running ${__filename}. Please set the wrapping IF to false to run this script!`));
        return;     
    }

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

        console.log('Setting Minimum Purchase amount.');
        await asset.assetContract.setMinPurchaseAmount(new BigNumber(minimumPurchaseAmount).shiftedBy(8).toString(), {from: admin0})
        console.log('Minimum Purchase amount set.');

        // await addCountryToAssetAndEnableWhitelist(asset, admin0, euWhitelist);
        await addCountryToAssetAndEnableWhitelist(asset, admin0, allWhitelist);
        // await addCountryToAssetAndEnableWhitelist(asset, admin0, ukWhitelist);
        await setInitialPurchases(asset, admin0, true);
        await setP2PTransfers(asset, admin0, true);
        await setClaimerTransfers(asset, admin0, true);

    });
}