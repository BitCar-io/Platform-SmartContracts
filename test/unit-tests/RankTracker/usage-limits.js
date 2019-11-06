const {
    sleep
} = require('../../helpers/sleep.js')

const chalk = require('chalk');

const {setBlockchainTime} = require("../../helpers/utils.js");

const PlatformHelper = require('../../helpers/platform.js').PlatformHelper;

const RegistryContract = artifacts.require('Registry.sol');
const RankTrackerContract = artifacts.require("RankTracker.sol");
const AssetRankTrackerFactoryContract = artifacts.require("AssetRankTrackerFactory.sol");
const AssetRankTrackerContract = artifacts.require("AssetRankTracker.sol");

const truffleAssert = require('truffle-assertions');

contract("RankTracker and AssetRankTracker Tests - Usage Limits", async (accounts) => {
    let RankTracker;
    let AssetRankTracker;
    let Asset;

    let ownerAddr;
    let admin0;
    let agent0;
    let trader0;
    let trader1;
    let trader2;
    let trader3;
    let trader3ColdWalletAddress;

    let platformHelper;

    const bronzeRank = {
        rankId: 0,
        period: 20 * 60,
        periodLimit: 100 * Math.pow(10, 8), 
        periodUserLimit: 60 * Math.pow(10, 8),
        globalLimit: 200 * Math.pow(10, 8)
    };

    const silverRank = {
        rankId: 1,
        period: 20 * 60,
        periodLimit: 500 * Math.pow(10, 8),
        periodUserLimit: 100 * Math.pow(10, 8),
        globalLimit: 400 * Math.pow(10, 8)
    };

    const goldRank = {
        rankId: 2,
        period: 20 * 60,
        periodLimit: 600 * Math.pow(10, 8),
        periodUserLimit: 200 * Math.pow(10, 8),
        globalLimit: 600 * Math.pow(10, 8)
    };

    before("Setup for usageLimit checks", async function () {
        const dataHash = "QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw";

        console.log('Setting up Platform Helper');
        platformHelper = new PlatformHelper(accounts);
        await platformHelper.setup();
        await platformHelper.createUsers(true);
        await platformHelper.createAsset();
        await platformHelper.agentApproveData(dataHash);
        await platformHelper.setPercentages(100, 0);
        await platformHelper.createAssetToken("ferrari", "ferrari", 250 * Math.pow(10, 8), 70, 31536000, 2628000, 2);
        await platformHelper.createAssetFees(1, 0, 0, 0);
        await platformHelper.createAssetWhitelist();
        await platformHelper.createRankTracker();
        await platformHelper.createAssetBallot(76, 50, 30 * 60 * 60 * 24);
        await platformHelper.adminApproveData(5);
        await platformHelper.agentApproveContracts();

        Asset = platformHelper.Asset;

        ownerAddr = platformHelper.ownerAddr;
        admin0 = platformHelper.admin0;
        agent0 = platformHelper.agent0;
        trader0 = platformHelper.trader0;
        trader1 = platformHelper.trader1;
        trader2 = platformHelper.trader2;
        trader3 = platformHelper.trader3;
        trader3ColdWalletAddress = platformHelper.trader3ColdWallet;

        // get deployed global rank tracker and set asset rank tracker for deployed asset
        console.log('Deploying Rank Tracker');
        RankTracker = await RankTrackerContract.deployed();
        AssetRankTracker = platformHelper.AssetRankTracker;

        // set global limits
        console.log('Setting global RankTracker platform limits');
        await RankTracker.setGlobalLimit(bronzeRank.rankId, bronzeRank.globalLimit, {from: admin0});
        await RankTracker.setGlobalLimit(silverRank.rankId, silverRank.globalLimit, {from: admin0});
        await RankTracker.setGlobalLimit(goldRank.rankId, goldRank.globalLimit, {from: admin0});

        // create bronze, silver and gold ranks for asset
        console.log('Setting up RankTracker asset limits');
        await AssetRankTracker.setRank(bronzeRank.rankId, bronzeRank.period, bronzeRank.periodLimit, bronzeRank.periodUserLimit, {from: admin0});
        await AssetRankTracker.setRank(silverRank.rankId, silverRank.period, silverRank.periodLimit, silverRank.periodUserLimit, {from: admin0});
        await AssetRankTracker.setRank(goldRank.rankId, goldRank.period, goldRank.periodLimit, goldRank.periodUserLimit, {from: admin0});

        console.log('Setting up user ranks');
        // trader 1 explicitly in bronze
        await RankTracker.setUserRank(trader1, bronzeRank.rankId, {from: admin0});

        // trader 2 in silver
        await RankTracker.setUserRank(trader2, silverRank.rankId, {from: admin0});

        // trader 3 in gold
        await RankTracker.setUserRank(trader3, goldRank.rankId, {from: admin0});

        console.log('Fast forwarding blockchain time by 10 seconds.');
        // await setBlockchainTime(Math.round(new Date().getTime() / 1000) + 10);
        await sleep(10000);

        // Transfer bitcar tokens to traders
        console.log('Transferring bitcar tokens to traders');
        await platformHelper.BitcarToken.transfer(platformHelper.trader0, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader1, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader2, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});

        // Set allowances for traders
        console.log('Setting bitcar allowances for traders');
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader0});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader1});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader2});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader3});
    });

    it("should return correct default Bronze rank limits", async function () {
        const result = await AssetRankTracker.getRankLimits(bronzeRank.rankId, {from: trader0});
        const globalResult = await RankTracker.getGlobalLimit(bronzeRank.rankId, {from: trader0});

        assert.equal(result.period.toString(), bronzeRank.period.toString(), 'Period did not match');
        assert.equal(result.periodLimit.toString(), bronzeRank.periodLimit.toString(), 'Period Limit did not match');
        assert.equal(globalResult.toString(), bronzeRank.globalLimit.toString(), 'Global Limit did not match');
        assert.equal(result.periodUsage.toString(), '0', 'Period Usage did not match');
    });

    it("should return correct default Silver rank limits", async function () {
        const result = await AssetRankTracker.getRankLimits(silverRank.rankId, {from: trader0});
        const globalResult = await RankTracker.getGlobalLimit(silverRank.rankId, {from: trader0});

        assert.equal(result.period.toString(), silverRank.period.toString(), 'Period did not match');
        assert.equal(result.periodLimit.toString(), silverRank.periodLimit.toString(), 'Period Limit did not match');
        assert.equal(globalResult.toString(), silverRank.globalLimit.toString(), 'Global Limit did not match');
        assert.equal(result.periodUsage.toString(), '0', 'Period Usage did not match');
    });

    it("should return correct default Trader0 (Bronze) user rank limits", async function () {
        const result = await AssetRankTracker.getUserRankLimits(trader0, {from: trader0});

        assert.equal(result.rank.toString(), bronzeRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.period.toString(), bronzeRank.period.toString(), 'Period did not match');
        assert.equal(result.periodUserLimit.toString(), bronzeRank.periodUserLimit.toString(), 'Period User Limit did not match');
        assert.equal(result.periodUsage.toString(), '0', 'User Period Usage did not match');
    });

    it("should return correct Trader1 (Bronze) user rank limits", async function () {
        const result = await AssetRankTracker.getUserRankLimits(trader0, {from: trader0});

        assert.equal(result.rank.toString(), bronzeRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.period.toString(), bronzeRank.period.toString(), 'Period did not match');
        assert.equal(result.periodUserLimit.toString(), bronzeRank.periodUserLimit.toString(), 'Period User Limit did not match');
        assert.equal(result.periodUsage.toString(), '0', 'User Period Usage did not match');
    });

    it("should return correct Trader2 (Silver) user rank limits", async function () {
        const result = await AssetRankTracker.getUserRankLimits(trader2, {from: trader2});

        assert.equal(result.rank.toString(), silverRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.period.toString(), silverRank.period.toString(), 'Period did not match');
        assert.equal(result.periodUserLimit.toString(), silverRank.periodUserLimit.toString(), 'Period User Limit did not match');
        assert.equal(result.periodUsage.toString(), '0', 'User Period Usage did not match');
    });

    it("should return correct Trader3 (Gold) user rank limits for cold wallet address", async function () {
        const result = await AssetRankTracker.getUserRankLimits(trader3ColdWalletAddress, {from: trader3ColdWalletAddress});

        assert.equal(result.rank.toString(), goldRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.period.toString(), goldRank.period.toString(), 'Period did not match');
        assert.equal(result.periodUserLimit.toString(), goldRank.periodUserLimit.toString(), 'Period User Limit did not match');
        assert.equal(result.periodUsage.toString(), '0', 'User Period Usage did not match');
    });

    it("Personal and Bronze member usage should adjust after a purchase", async function () {
        let purchase = 50 * Math.pow(10, 8);
        await Asset.buyAssetTokens(purchase, { from: trader0 });
        let result = await AssetRankTracker.getUserRankLimits(trader0, {from: trader0});

        let globalUsage = await RankTracker.getUserGlobalUsage(trader0, {from: trader0});

        assert.equal(result.rank.toString(), bronzeRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.periodUsage.toString(), purchase.toString(), 'User Period Usage did not match purchase size');

        result = await AssetRankTracker.getRankLimits(bronzeRank.rankId, {from: trader0});

        assert.equal(result.periodUsage.toString(), purchase.toString(), 'Period Usage did not match purchase size');
        assert.equal(globalUsage.toString(), purchase.toString(), 'Global Usage did not match purchase size');
    });

    it("should return bronze member usage to Trader1 after Trader0 purchase", async function () {
        const result = await AssetRankTracker.getRankLimits(bronzeRank.rankId, {from: trader1});

        assert.equal(result.periodUsage.toString(), (50 * Math.pow(10, 8)).toString(), 'Period Usage did not match purchase size');
    });

    it("Personal and Silver member usage should adjust after a purchase", async function () {
        let purchase = 80 * Math.pow(10, 8);
        await Asset.buyAssetTokens(purchase, { from: trader2 });
        let result = await AssetRankTracker.getUserRankLimits(trader2, {from: trader2});
        
        let globalUsage = await RankTracker.getUserGlobalUsage(trader2, {from: trader2});

        assert.equal(result.rank.toString(), silverRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.periodUsage.toString(), purchase.toString(), 'User Period Usage did not match purchase size');

        result = await AssetRankTracker.getRankLimits(silverRank.rankId, {from: trader2});

        assert.equal(result.periodUsage.toString(), purchase.toString(), 'Period Usage did not match purchase size');
        assert.equal(globalUsage.toString(), purchase.toString(), 'Global Usage did not match purchase size');
    });

    it("User Period and Global Usage should remain if user changes Rank, but previous rank period usage should remain", async function () {
        await RankTracker.setUserRank(trader2, goldRank.rankId, {from: admin0});
        let result = await AssetRankTracker.getUserRankLimits(trader2, {from: trader2});
        let globalUsage = await RankTracker.getUserGlobalUsage(trader2, {from: trader2});

        const trader2SilverPurchase = 80 * Math.pow(10, 8);

        assert.equal(result.rank.toString(), goldRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.periodUsage.toString(), trader2SilverPurchase.toString(), 'User Period Usage was not correct after rank change');
        assert.equal(globalUsage.toString(), trader2SilverPurchase.toString(), 'User Global Usage was not correct after rank change');

        result = await AssetRankTracker.getRankLimits(silverRank.rankId, {from: trader2});
        assert.equal(result.periodUsage.toString(), trader2SilverPurchase.toString(), 'Period Usage for Silver should not change');
        
        result = await AssetRankTracker.getRankLimits(goldRank.rankId, {from: trader2});
        assert.equal(result.periodUsage.toString(), '0', 'Period Usage for Gold should be 0');
    });

    it("Personal and Bronze member usage should reset after period has expired, global should remain", async function () {
        
        const periodToUse = 5;

        let originalGlobalUsage = await RankTracker.getUserGlobalUsage(trader0, {from: trader0});

        let result = await AssetRankTracker.setRank(bronzeRank.rankId, periodToUse, bronzeRank.periodLimit, bronzeRank.periodUserLimit, {from: admin0});
        assert.equal(result["tx"].length, 66, 'Bronze Rank was not updated');

        result = await AssetRankTracker.getRankLimits(bronzeRank.rankId, {from: trader0});
        assert.equal(result.period.toString(), periodToUse.toString(), 'New period did not match');
        console.log(chalk.yellow("Last update", result.lastUpdate));

        // fast forward to 'reset' the usage period
        // await setBlockchainTime(Math.round(new Date().getTime() / 1000) + periodToUse + 30);
        await sleep(35000);

        // reset should now have occurred
        result = await AssetRankTracker.getUserRankLimits(trader0, {from: trader0});

        let newGlobalUsage = await RankTracker.getUserGlobalUsage(trader0, {from: trader0});

        assert.equal(result.rank.toString(), bronzeRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.periodUsage.toString(), '0', 'User Period Usage did not reset to 0');

        result = await AssetRankTracker.getRankLimits(bronzeRank.rankId, {from: trader0});

        assert.equal(result.periodUsage.toString(), '0', 'Period Usage did not reset to 0');

        assert.equal(originalGlobalUsage.toString(), newGlobalUsage.toString(), 'Global Usage did not remain after asset period expired.');
    });

    it("Personal and Period usage should match for cold and hot wallet after a purchase", async function () {

        const trader3Wallets = await platformHelper.KycProcessTracker.getWallets(trader3, {from: trader3});
        const hotWallet = trader3Wallets._hotWallet;
        const coldWallet = trader3Wallets._coldWallet;

        console.log("Trader 3 Hot:", hotWallet);
        console.log("Trader 3 Cold:", coldWallet);

        let purchase = 50 * Math.pow(10, 8);
        await Asset.buyAssetTokens(purchase, { from: hotWallet });

        let result = await AssetRankTracker.getUserRankLimits(hotWallet, {from: hotWallet});
        let coldResult = await AssetRankTracker.getUserRankLimits(coldWallet, {from: coldWallet});

        let hotGlobalUsage = await RankTracker.getUserGlobalUsage(hotWallet, {from: hotWallet});
        let coldGlobalUsage = await RankTracker.getUserGlobalUsage(coldWallet, {from: coldWallet});

        if(result.periodUsage.toString() !== coldResult.periodUsage.toString()) {
            console.log('Hot Result', result);
            console.log('Cold Result', coldResult);
        }

        assert.equal(result.rank.toString(), goldRank.rankId.toString(), 'RankId did not match');
        assert.equal(result.periodUsage.toString(), purchase.toString(), 'User Period Usage did not match purchase size');
        assert.equal(result.periodUsage.toString(), coldResult.periodUsage.toString(), 'Hot and Cold User Period Usage did not match');

        assert.equal(hotGlobalUsage.toString(), purchase.toString(), 'User Global Usage did not match purchase size');
        assert.equal(hotGlobalUsage.toString(), coldGlobalUsage.toString(), 'Hot and Cold User Global Usage did not match');

        result = await AssetRankTracker.getRankLimits(goldRank.rankId, {from: hotWallet});
        coldResult = await AssetRankTracker.getRankLimits(goldRank.rankId, {from: coldWallet});

        assert.equal(result.periodUsage.toString(), purchase.toString(), 'Period Usage did not match purchase size');
        assert.equal(result.periodUsage.toString(), coldResult.periodUsage.toString(), 'Hot and Cold Period Usage did not match');
    });
});