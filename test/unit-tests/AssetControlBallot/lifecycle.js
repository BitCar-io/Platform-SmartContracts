// ADD TWO VOTES AND TEST TOKEN TRANSFER/CANCELATION 

const truffleAssert = require('truffle-assertions');

const {setBlockchainTime} = require("../../helpers/utils.js");

const PlatformHelper = require('../../helpers/platform.js').PlatformHelper;

contract("AssetControlBallot Tests", async (accounts) => {
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

        assert.equal(platformHelper.AssetToken.address.length, 42);
        assert.equal(platformHelper.AssetControlBallot.address.length, 42);
    });

    it("should NOT create new vote since category does not exist", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.createVote(category0, data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Invalid category"
        );
    });

    it("should create new category", async function () {
        const result = await platformHelper.AssetControlBallot.createCategory("Change storage", 50, {from: platformHelper.admin0});

        assert.equal(result.tx.length, 66);
    });

    it("should NOT create new vote since creator is not a token holder", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.createVote(category0, data0, {from: platformHelper.admin0}),
            truffleAssert.ErrorType.REVERT,
            "Only token holders can execute this operation."
        );
    });

    it("should NOT create new vote since minimum tokens sold has not been reached", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.createVote(category0, data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Minimum tokens have not been sold in order to create votes"
        );
    });

    it("trader3 should buy tokens from asset", async function () { 
        const result = await platformHelper.Asset.buyAssetTokens(250000 * Math.pow(10, 5), { from: platformHelper.trader3 });

        assert.equal(result.tx.length, 66);
    });

    it("should NOT be able to create new vote since allowance is not set", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.createVote(category0, data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "PlatformToken allowance is not enough to cover this operation"
        );
    });

    it("should create new vote", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 100 * Math.pow(10, 8), {from: platformHelper.trader0});

        const result = await platformHelper.AssetControlBallot.createVote(category0, data0, {from: platformHelper.trader0});

        assert.equal(result.tx.length, 66);
    });

    it("should NOT create the same vote twice", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.createVote(category0, data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Vote already exists"
        );
    });

    it("should NOT be able to vote since allowance is not set", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "PlatformToken allowance is not enough to cover this operation"
        );
    });

    it("trader0 should vote", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
            
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 250000 * Math.pow(10, 5));
    });

    it("trader0, should NOT vote twice", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "User has already voted"
        );
    });

    it("should NOT vote on token that does not exist", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.vote(data1, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Vote does not exist or is not on a pending state"
        );
    });

    it("should NOT be able to complete vote since the vote is still open", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.completeVote(data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Vote cannot be completed has threashold has not been reached"
        );
    });

    it("trader0 should test a portion of vote cancelation by means of token transfer", async function () { 
        const transferResult = await platformHelper.AssetToken.transfer(platformHelper.trader3, 200000 * Math.pow(10, 5), {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(transferResult.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 50000 * Math.pow(10, 5));
    });

    it("trader0 should NOT change vote amount if transferred amount if bigger than user balance", async function () { 
        const transferResult = await platformHelper.AssetToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 5), {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(transferResult.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 50000 * Math.pow(10, 5));
    });

    it("trader0 should cancel vote by transferring entire token balance", async function () { 
        const transferResult = await platformHelper.AssetToken.transfer(platformHelper.trader3, 50000 * Math.pow(10, 5), {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(transferResult.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 0 * Math.pow(10, 5));
    });

    it("should transfer tokens from trader3 back to trader0", async function () { 
        const result = await platformHelper.AssetToken.transfer(platformHelper.trader0, 250000 * Math.pow(10, 5), {from: platformHelper.trader3});

        assert.equal(result.tx.length, 66);
    });

    it("trader0 should be able to vote twice since vote was cancelled due to token transfer", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
        
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 250000 * Math.pow(10, 5));

    });









    


    it("trader0 should NOT be able to cancel vote since allowance is not set", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.cancelVote(data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "PlatformToken allowance is not enough to cover this operation"
        );
    });

    it("trader0 should cancel its vote", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
        
        const result = await platformHelper.AssetControlBallot.cancelVote(data0, {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 0 * Math.pow(10, 5));
    });

    it("trader0 should NOT cancel vote twice", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.cancelVote(data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "User has not voted in this vote"
        );
    });

    it("trader0 should vote again", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
        
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 250000 * Math.pow(10, 5));

        assert.equal(result.tx.length, 66);
    });

    it("trader0 should cancel vote a second time due to total token transfer", async function () { 
        const voteInfoBefore = await platformHelper.AssetControlBallot.voteInfo(data0);

        const transferResult = await platformHelper.AssetToken.transfer(platformHelper.trader3, 250000 * Math.pow(10, 5), {from: platformHelper.trader0});

        const voteInfoAfter = await platformHelper.AssetControlBallot.voteInfo(data0);


        assert.equal(voteInfoBefore.numOfVotes.toString(), 250000 * Math.pow(10, 5));
        assert.equal(voteInfoAfter.numOfVotes.toString(), 0 * Math.pow(10, 5));
        assert.equal(transferResult.tx.length, 66);
    });










    it("should transfer tokens from trader3 back to trader0", async function () { 
        const result = await platformHelper.AssetToken.transfer(platformHelper.trader0, 250000 * Math.pow(10, 5), {from: platformHelper.trader3});

        assert.equal(result.tx.length, 66);
    });

    it("trader0 should vote a second time", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader0});
        
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader0});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 250000 * Math.pow(10, 5));
    });

    it("trader1 should NOT be able to vote since vote has expired", async function () {
        await setBlockchainTime(Math.round(new Date().getTime() / 1000) + 30 * 60 * 60 * 24);

        await truffleAssert.fails(
            platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader1}),
            truffleAssert.ErrorType.REVERT,
            "Vote has expired"
        );

        await setBlockchainTime(Math.round(new Date().getTime() / 1000));
    });

    it("trader1 should vote", async function () { 
        // Set PlatformToken allowance
        await platformHelper.BitcarToken.approve(platformHelper.AssetControlBallot.address, 10 * Math.pow(10, 8), {from: platformHelper.trader1});
        
        const result = await platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader1});

        const voteInfo = await platformHelper.AssetControlBallot.voteInfo(data0);

        assert.equal(result.tx.length, 66);
        assert.equal(voteInfo.numOfVotes.toString(), 500000 * Math.pow(10, 5));

    });

    it("trader2 should NOT vote since minimum percentage was already reached", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.vote(data0, {from: platformHelper.trader2}),
            truffleAssert.ErrorType.REVERT,
            "Vote does not exist or is not on a pending state"
        );
    });

    it("should NOT be able to complete vote since not vote creator", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.completeVote(data0, {from: platformHelper.trader1}),
            truffleAssert.ErrorType.REVERT,
            "Only the vote creator can execute this operation"
        );
    });

    it("should NOT be able to complete vote since it has expired", async function () { 
        await setBlockchainTime(Math.round(new Date().getTime() / 1000) + 30 * 60 * 60 * 24);

        await truffleAssert.fails(
            platformHelper.AssetControlBallot.completeVote(data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Vote has expired"
        );

        await setBlockchainTime(Math.round(new Date().getTime() / 1000));
    });

    it("trader0 should complete vote", async function () { 
        const result = await platformHelper.AssetControlBallot.completeVote(data0, {from: platformHelper.trader0});
        assert.equal(result.tx.length, 66);
    });

    it("should NOT be able to complete vote twice", async function () { 
        await truffleAssert.fails(
            platformHelper.AssetControlBallot.completeVote(data0, {from: platformHelper.trader0}),
            truffleAssert.ErrorType.REVERT,
            "Vote cannot be completed has threashold has not been reached"
        );
    });
});