const {
    sleep
} = require('../../helpers/sleep.js')

const crypto = require("crypto")

const {
    setupContracts,
    getSignature,
} = require('../../helpers/kyc.js')

const PlatformHelper = require('../../helpers/platform.js').PlatformHelper;

const {setBlockchainTime} = require("../../helpers/utils.js");

const truffleAssert = require('truffle-assertions');

contract("RankTracker and AssetRankTracker Tests - Platform Limits", async (accounts) => {
    let platformHelper;
    let KycProcessTracker;

    const bronzeRank = {
        rankId: 0,
        period: 20,
        periodLimit: 1000000 * Math.pow(10, 5), 
        periodUserLimit: 250000 * Math.pow(10, 5),
        globalLimit: 1000 * Math.pow(10, 5)
    };

    const silverRank = {
        rankId: 1,
        period: 20,
        periodLimit: 1000000 * Math.pow(10, 5),
        periodUserLimit: 500000 * Math.pow(10, 5),
        globalLimit: 10000 * Math.pow(10, 5)
    };

    const goldRank = {
        rankId: 2,
        period: 20,
        periodLimit: 1000000 * Math.pow(10, 5), 
        periodUserLimit: 1000000 * Math.pow(10, 5),
        globalLimit: 100000 * Math.pow(10, 5)
    };

    const dataHash = "QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw";

    before("setup", async function () {
        console.log("Note: This unit test requires 20 accounts to be unlocked (ganache-cli -a 20)");

        await setBlockchainTime(Math.round(new Date().getTime() / 1000));

        platformHelper = new PlatformHelper(accounts);
        await platformHelper.setup();
        await platformHelper.createUsers(true);
        await platformHelper.createAsset();
        await platformHelper.agentApproveData(dataHash);
        await platformHelper.setPercentages(100, 0);
        await platformHelper.createAssetToken("ferrari", "ferrari", 1000000 * Math.pow(10, 5), 70, 31536000, 2628000, 2);
        await platformHelper.createAssetFees(1, 1, 1, 1);
        await platformHelper.createAssetWhitelist();
        await platformHelper.createRankTracker();
        await platformHelper.createAssetBallot(76, 50, 30 * 60 * 60 * 24);
        await platformHelper.adminApproveData(5);
        await platformHelper.agentApproveContracts();

        await setBlockchainTime(Math.round(new Date().getTime() / 1000) + 10);

        // Change Asset min purchase amount
        await platformHelper.Asset.setMinPurchaseAmount(1, {from: platformHelper.admin0});
        
        // Setup ranks
        await platformHelper.AssetRankTracker.setRank(bronzeRank.rankId, bronzeRank.period, bronzeRank.periodLimit, bronzeRank.periodUserLimit, {from: platformHelper.admin0});
        await platformHelper.AssetRankTracker.setRank(silverRank.rankId, silverRank.period, silverRank.periodLimit, silverRank.periodUserLimit, {from: platformHelper.admin0});
        await platformHelper.AssetRankTracker.setRank(goldRank.rankId, goldRank.period, goldRank.periodLimit, goldRank.periodUserLimit, {from: platformHelper.admin0});

        // Setup user ranks
        await platformHelper.RankTracker.setUserRank(platformHelper.trader0, bronzeRank.rankId, {from: platformHelper.admin0});
        await platformHelper.RankTracker.setUserRank(platformHelper.trader1, silverRank.rankId, {from: platformHelper.admin0});
        await platformHelper.RankTracker.setUserRank(platformHelper.trader2, goldRank.rankId, {from: platformHelper.admin0});
        await platformHelper.RankTracker.setUserRank(platformHelper.trader3, bronzeRank.rankId, {from: platformHelper.admin0});

        // Transfer bitcar tokens to traders
        await platformHelper.BitcarToken.transfer(platformHelper.trader0, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader1, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader2, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});

        // Set allowances for traders
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader0});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader1});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader2});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader3});

        console.log("BitcarToken", platformHelper.BitcarToken.address);
        console.log("Asset", platformHelper.Asset.address);
        console.log("AssetToken", platformHelper.AssetToken.address);
        console.log("RankTracker", platformHelper.RankTracker.address);
        console.log("KycProcessTracker", platformHelper.KycProcessTracker.address);
    });

    it("should NOT be able to trade tokens since platform limits are not set", async function () {
        await truffleAssert.fails(
            platformHelper.AssetToken.transfer(platformHelper.trader3, 10 * Math.pow(10, 5), {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Amount is to big or user has exceeded the global limit for the current rank"
        );
    });

    it("should set global limits for BRONZE/SILVER/GOLD", async function () {
        const resultBronze = await platformHelper.RankTracker.setGlobalLimit(bronzeRank.rankId, bronzeRank.globalLimit, {from: platformHelper.admin0});
        const resultSilver = await platformHelper.RankTracker.setGlobalLimit(silverRank.rankId, silverRank.globalLimit, {from: platformHelper.admin0});
        const resultGold = await platformHelper.RankTracker.setGlobalLimit(goldRank.rankId, goldRank.globalLimit, {from: platformHelper.admin0});

        assert.isTrue(resultBronze["tx"].length === 66);
        assert.isTrue(resultSilver["tx"].length === 66);
        assert.isTrue(resultGold["tx"].length === 66);
    });

    it("traders should be able to buy asset tokens", async function () {
        await platformHelper.Asset.buyAssetTokens(800 * Math.pow(10, 5), { from: platformHelper.trader0 });
        await platformHelper.Asset.buyAssetTokens(10000 * Math.pow(10, 5), { from: platformHelper.trader1 });
        await platformHelper.Asset.buyAssetTokens(99000 * Math.pow(10, 5), { from: platformHelper.trader2 });
        await platformHelper.Asset.buyAssetTokens(100 * Math.pow(10, 5), { from: platformHelper.trader3 });

        const trader0Balance = await platformHelper.AssetToken.balanceOf(platformHelper.trader0);
        const trader1Balance = await platformHelper.AssetToken.balanceOf(platformHelper.trader1);
        const trader2Balance = await platformHelper.AssetToken.balanceOf(platformHelper.trader2);
        const trader3Balance = await platformHelper.AssetToken.balanceOf(platformHelper.trader3);

        assert.equal(trader0Balance.toString(), 800 * Math.pow(10, 5));
        assert.equal(trader1Balance.toString(), 10000 * Math.pow(10, 5));
        assert.equal(trader2Balance.toString(), 99000 * Math.pow(10, 5));
        assert.equal(trader3Balance.toString(), 100 * Math.pow(10, 5));
    });

    it("trader0 should be able to perform token transfer", async function () {
        const balanceBefore = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        const result = await platformHelper.AssetToken.transfer(platformHelper.trader3, 100 * Math.pow(10, 5), {from: platformHelper.trader0});

        const trader3GlobalUsage = await platformHelper.RankTracker.getUserGlobalUsage(platformHelper.trader3);

        const balanceAfter = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        assert.equal(result.tx.length, 66);
        assert.equal(balanceBefore.toString(), 800 * Math.pow(10, 5));
        assert.equal(balanceAfter.toString(), 700 * Math.pow(10, 5));

        assert.equal(trader3GlobalUsage.toString(), 200 * Math.pow(10, 5));
    });

    it("trader0 NOT be able to perform token transfer since amount is bigger than user's rank limit", async function () {
        await truffleAssert.fails(
            platformHelper.AssetToken.transfer(platformHelper.trader0, 300 * Math.pow(10, 5), {from: platformHelper.trader1}),
            truffleAssert.ErrorType.REVERT,
            "Amount is to big or user has exceeded the global limit for the current rank"
        );
    });

    it("trader0 shoulb be able to perform token transfers between hot and cold wallet", async function () {
        const trader0GlobalUsageBefore = await platformHelper.RankTracker.getUserGlobalUsage(platformHelper.trader0);

        const resultToCold = await platformHelper.AssetToken.transfer(platformHelper.trader0ColdWallet, 300 * Math.pow(10, 5), {from: platformHelper.trader0});
        const resultToHot = await platformHelper.AssetToken.transfer(platformHelper.trader0, 300 * Math.pow(10, 5), {from: platformHelper.trader0ColdWallet});

        const trader0GlobalUsageAfter = await platformHelper.RankTracker.getUserGlobalUsage(platformHelper.trader0);

        assert.equal(resultToCold.tx.length, 66);
        assert.equal(resultToHot.tx.length, 66);

        assert.equal(trader0GlobalUsageBefore.toString(), trader0GlobalUsageAfter.toString());
    });

    it("trader0 should be able to perform token transfer to different ranked user", async function () {
        const balanceBefore = await platformHelper.AssetToken.balanceOf(platformHelper.trader2) ;

        const result = await platformHelper.AssetToken.transfer(platformHelper.trader2, 100 * Math.pow(10, 5), {from: platformHelper.trader0});

        const trader2GlobalUsage = await platformHelper.RankTracker.getUserGlobalUsage(platformHelper.trader2);

        const balanceAfter = await platformHelper.AssetToken.balanceOf(platformHelper.trader2) ;

        assert.equal(result.tx.length, 66);
        assert.equal(balanceBefore.toString(), 99000 * Math.pow(10, 5));
        assert.equal(balanceAfter.toString(), 99100 * Math.pow(10, 5));

        assert.equal(trader2GlobalUsage.toString(), 99100 * Math.pow(10, 5));
    });

    it("should upgrade trader3 rank", async function () {
        const result = await platformHelper.RankTracker.setUserRank(platformHelper.trader3, silverRank.rankId, {from: platformHelper.admin0});

        assert.equal(result.tx.length, 66);
    });

    it("trader1 should be able to perform token transfer to trader3 since trader3 rank was upgraded", async function () {
        const balanceBefore = await platformHelper.AssetToken.balanceOf(platformHelper.trader1) ;

        const result = await platformHelper.AssetToken.transfer(platformHelper.trader3, 2000 * Math.pow(10, 5), {from: platformHelper.trader1});

        const trader3GlobalUsage = await platformHelper.RankTracker.getUserGlobalUsage(platformHelper.trader3);

        const balanceAfter = await platformHelper.AssetToken.balanceOf(platformHelper.trader1) ;

        assert.equal(result.tx.length, 66);
        assert.equal(balanceBefore.toString(), 10000 * Math.pow(10, 5));
        assert.equal(balanceAfter.toString(), 8000 * Math.pow(10, 5));

        assert.equal(trader3GlobalUsage.toString(), 2200 * Math.pow(10, 5));
    });

    // SECURITY
    it("should NOT be able to validate global limits since non asset", async function () {
        await truffleAssert.fails(
            platformHelper.RankTracker.validateGlobalLimits(platformHelper.trader0, platformHelper.trader3, 1 * Math.pow(10, 5), {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Address is not an Asset."
        );
    });
});