// ADD TWO VOTES AND TEST TOKEN TRANSFER/CANCELATION 

const truffleAssert = require('truffle-assertions');

const {setBlockchainTime} = require("../../helpers/utils.js");

const PlatformHelper = require('../../helpers/platform.js').PlatformHelper;

contract("AssetControlBallot Tests - LockTransfer", async (accounts) => {
    const dataHash = "QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw";
    const data0 = "0x0000000000000000000000000000000000000000";
    const data1 = "0x0000000000000000000000000000000000000001";
    const category0 = 0;
    const category1 = 1;

    let platformHelper;

    it("setup", async function () {
        // Reset blockchain time
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

        // Set Global platform limits
        platformHelper.setGlobalLimits([{id: 0, limit: 1000000 * Math.pow(10, 8)}])

        // Set Asset Rank limits
        platformHelper.AssetRankTracker.setRank(0, 1000, 1000000 * Math.pow(10, 8), 1000000 * Math.pow(10, 8), {from: platformHelper.admin0});

        await setBlockchainTime(Math.round(new Date().getTime() / 1000) + 10);

        // Transfer bitcar tokens to traders
        await platformHelper.BitcarToken.transfer(platformHelper.trader0, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader1, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader2, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
        await platformHelper.BitcarToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});

        // Transfer bitcar tokens to agent0
        // await platformHelper.BitcarToken.transfer(platformHelper.agent0, 250000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});

        // Set allowances for traders
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader0});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader1});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader2});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 250000 * Math.pow(10, 8), {from: platformHelper.trader3});

        // Buy asset tokens
        await platformHelper.Asset.buyAssetTokens(250000 * Math.pow(10, 5), { from: platformHelper.trader0 });
        await platformHelper.Asset.buyAssetTokens(250000 * Math.pow(10, 5), { from: platformHelper.trader1 });
        await platformHelper.Asset.buyAssetTokens(250000 * Math.pow(10, 5), { from: platformHelper.trader2 });
        await platformHelper.Asset.buyAssetTokens(250000 * Math.pow(10, 5), { from: platformHelper.trader3 });

        assert.equal(platformHelper.AssetToken.address.length, 42);
        assert.equal(platformHelper.AssetControlBallot.address.length, 42);
    });

    it("should create new category", async function () {
        const result = await platformHelper.AssetControlBallot.createCategory("Change storage", 50, {from: platformHelper.admin0});

        assert.equal(result.tx.length, 66);
    });
    
    it("should create new vote", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 100 * Math.pow(10, 8), {from: platformHelper.trader0});

        const result = await platformHelper.AssetControlBallot.createVote(category0, data0, {from: platformHelper.trader0});

        assert.equal(result.tx.length, 66);
    });

    it("trader0 should vote", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
            
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 250000 * Math.pow(10, 5));
    });

    it("trader0 should be able to perform token transfers with trader3", async function () {
        const balanceBefore = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        const result = await platformHelper.AssetToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 5), {from: platformHelper.trader0});

        const balanceAfter = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        assert.equal(result.tx.length, 66);
        assert.equal(balanceBefore.toString(), 250000 * Math.pow(10, 5));
        assert.equal(balanceAfter.toString(), 0 * Math.pow(10, 5));
    });

    it("should lock token transfers in case of user having open votes", async function () { 
        const result = await platformHelper.AssetControlBallot.changeLockTokenTransfers(true, {from: platformHelper.admin0});

        assert.equal(result.tx.length, 66);
    });

    it("trader3 should be able to perform token transfers since vote was cancelled with previous transfer", async function () {
        const balanceBefore = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        const result = await platformHelper.AssetToken.transfer(platformHelper.trader0, 250000 * Math.pow(10, 5), {from: platformHelper.trader3});

        const balanceAfter = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        assert.equal(result.tx.length, 66);
        assert.equal(balanceBefore.toString(), 0 * Math.pow(10, 5));
        assert.equal(balanceAfter.toString(), 250000 * Math.pow(10, 5));
    });


    it("trader0 should vote, again", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
            
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 250000 * Math.pow(10, 5));
    });

    it("trader0 NOT be able to perform token transfers since lock flag is set", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 5), {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Transfers are locked due to user having open votes"
        );
    });

    it("should be able to transfer tokens since token has expired", async function () { 
        await setBlockchainTime(Math.round(new Date().getTime() / 1000) + 30 * 60 * 60 * 24);

        const balanceBefore = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        const result = await platformHelper.AssetToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 5), {from: platformHelper.trader0});

        const balanceAfter = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        assert.equal(result.tx.length, 66);
        assert.equal(balanceBefore.toString(), 250000 * Math.pow(10, 5));
        assert.equal(balanceAfter.toString(), 0 * Math.pow(10, 5));

        // Roll back time, transfer tokens back to trader0 and re-vote
        await setBlockchainTime(Math.round(new Date().getTime() / 1000));
        await platformHelper.AssetToken.transfer(platformHelper.trader0, 250000 * Math.pow(10, 5), {from: platformHelper.trader3});
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
        await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0});
    });

    it("trader1 should vote", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader1});
            
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader1});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 500000 * Math.pow(10, 5));
    });

    it("trader0 should complete vote", async function () { 
        const result = await platformHelper.AssetControlBallot.completeVote(data0, {from: platformHelper.trader0});
        assert.equal(result.tx.length, 66);
    });

    it("trader0 should be able to perform token transfers since existing votes are already completed", async function () {
        const balanceBefore = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        const result = await platformHelper.AssetToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 5), {from: platformHelper.trader0});

        const balanceAfter = await platformHelper.AssetToken.balanceOf(platformHelper.trader0) ;

        assert.equal(result.tx.length, 66);
        assert.equal(balanceBefore.toString(), 250000 * Math.pow(10, 5));
        assert.equal(balanceAfter.toString(), 0 * Math.pow(10, 5));
    });
});