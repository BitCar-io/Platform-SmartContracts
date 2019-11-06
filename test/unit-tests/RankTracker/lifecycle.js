const {
    sleep
} = require('../../helpers/sleep.js')

const chalk = require('chalk');

const PlatformHelper = require('../../helpers/platform.js').PlatformHelper;

const RegistryContract = artifacts.require('Registry.sol');
const RankTrackerContract = artifacts.require("RankTracker.sol");
const AssetRankTrackerFactoryContract = artifacts.require("AssetRankTrackerFactory.sol");
const AssetRankTrackerContract = artifacts.require("AssetRankTracker.sol");

const truffleAssert = require('truffle-assertions');

contract("RankTracker and AssetRankTracker Tests - General Functionality", async (accounts) => {
    let RankTracker;
    let AssetRankTrackerFactory;
    let AssetRankTracker;

    let ownerAddr;
    let admin0;
    let agent0;
    let trader0;
    let trader1;
    let trader2;
    let trader3;


    let platformHelper;

    const bronzeRank = {
        rankId: 0,
        period: 20,
        periodLimit: 20, 
        periodUserLimit: 10
    };

    const silverRank = {
        rankId: 1,
        period: 20,
        periodLimit: 500,
        periodUserLimit: 100
    };

    const goldRank = {
        rankId: 2,
        period: 20,
        periodLimit: 100, 
        periodUserLimit: 10
    };

    // TODO: Should not be a test, port to a separate file?
    it("setup", async function () {
        platformHelper = new PlatformHelper(accounts);
        await platformHelper.setup();
        await platformHelper.createUsers(true);

        ownerAddr = platformHelper.ownerAddr;
        admin0 = platformHelper.admin0;
        agent0 = platformHelper.agent0;
        trader0 = platformHelper.trader0;
        trader1 = platformHelper.trader1;
        trader2 = platformHelper.trader2;
        trader3 = platformHelper.trader3;

        Registry = await RegistryContract.deployed();

        RankTracker = await RankTrackerContract.deployed();
        AssetRankTrackerFactory = await AssetRankTrackerFactoryContract.deployed();
    });

    it("should deploy new RankTracker", async function () {
        const result = await AssetRankTrackerFactory.create(ownerAddr, {from: ownerAddr});

        const rankTrackerAddress = await AssetRankTrackerFactory.get(0);
        AssetRankTracker = await AssetRankTrackerContract.at(rankTrackerAddress);

        assert.isTrue(result["tx"].length === 66);
    });

    it("should create BRONZE/SILVER/GOLD ranks", async function () {
        const bronzeResult = await AssetRankTracker.setRank(bronzeRank.rankId, bronzeRank.period, bronzeRank.periodLimit, bronzeRank.periodUserLimit, {from: admin0});
        const silverResult = await AssetRankTracker.setRank(silverRank.rankId, silverRank.period, silverRank.periodLimit, silverRank.periodUserLimit, {from: admin0});
        const goldResult = await AssetRankTracker.setRank(goldRank.rankId, goldRank.period, goldRank.periodLimit, goldRank.periodUserLimit, {from: admin0});

        assert.equal(bronzeResult["tx"].length, 66, 'Bronze rank not created');
        assert.equal(silverResult["tx"].length, 66, 'Silver rank not created');
        assert.equal(goldResult["tx"].length, 66, 'Gold rank not created');
    });

    it("should ALLOW trader0 validation without setting rank, defaults to BRONZE", async function () {
        const result = await AssetRankTracker.validate(trader0, 1, {from: ownerAddr});

        assert.isTrue(result["tx"].length === 66);
    });

    it("should set trader0 rank to BRONZE", async function () {
        const result = await RankTracker.setUserRank(trader0, bronzeRank.rankId, {from: admin0});

        assert.isTrue(result["tx"].length === 66);
    });

    it("should set trader1 rank to BRONZE", async function () {
        const result = await RankTracker.setUserRank(trader1, bronzeRank.rankId, {from: admin0});

        assert.isTrue(result["tx"].length === 66);
    });

    it("should set trader2 rank to SILVER", async function () {
        const result = await RankTracker.setUserRank(trader2, silverRank.rankId, {from: admin0});

        assert.isTrue(result["tx"].length === 66);
    });

    it("should ALLOW trader0 validation", async function () {
        const result = await AssetRankTracker.validate(trader0, 9, {from: ownerAddr});

        assert.isTrue(result["tx"].length === 66);
    });

    it("should REJECT trader1 validation due to period limit", async function () {
        await truffleAssert.fails(
            AssetRankTracker.validate(trader1, 11, {from: ownerAddr}),
            truffleAssert.ErrorType.REVERT,
            "Period limit has been exceeded"
        )
    });

    it("should sleep for 20 seconds", async function () {
        await sleep(20000);
    });

    it("should REJECT trader0 validation due to user period limit", async function () {
        await truffleAssert.fails(
            AssetRankTracker.validate(trader0, 11, {from: ownerAddr}),
            truffleAssert.ErrorType.REVERT,
            "User period limit has been exceeded"
        )
    });

    it("should validate trader0", async function () {
        const result = await AssetRankTracker.validate(trader0, 10, {from: ownerAddr});

        assert.isTrue(result["tx"].length === 66);
    });

    it("should validate trader2", async function () {
        const result = await AssetRankTracker.validate(trader2, 100, {from: ownerAddr});

        assert.isTrue(result["tx"].length === 66);
    });
});