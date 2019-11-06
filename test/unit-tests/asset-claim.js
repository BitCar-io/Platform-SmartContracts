const {
    sleep
} = require('../helpers/sleep.js')

const PlatformHelper = require('../helpers/platform.js').PlatformHelper;
const truffleAssert = require('truffle-assertions');

contract("Claimer Tests", async (accounts) => {

    // Required accounts
    const ownerAddr = accounts[0];
    const admin0 = accounts[3];
    const agent0 = accounts[5];
    const trader0 = accounts[7];
    const trader1 = accounts[8];

    let platformHelper;

    const dataHash = "QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw";

    // TODO: Should not be a test, port to a separate file?
    it("setup", async function () {

        platformHelper = new PlatformHelper(accounts);
        await platformHelper.setup();
        await platformHelper.createUsers(true);
        await platformHelper.createAsset();
        await platformHelper.agentApproveData(dataHash);
        await platformHelper.setPercentages(100, 0);
        await platformHelper.createAssetToken("ferrari", "ferrari", 100, 70, 31536000, 2628000, 2);
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

        // Set min purchase amount
        await platformHelper.Asset.setMinPurchaseAmount(1, {from: platformHelper.admin0});

        // Wait for asset token to be alive
        // TODO: Port to PlatformHelper
        await sleep(10000);

        // Transfer bitcar tokens to trader0
        await platformHelper.BitcarToken.transfer(trader0, 2500000000000000, {from: ownerAddr});
        await platformHelper.BitcarToken.transfer(trader1, 2500000000000000, {from: ownerAddr});

        // Transfer bitcar tokens to agent0
        await platformHelper.BitcarToken.transfer(agent0, 2500000000000000, {from: ownerAddr});

        // Set allowance trader0 -> TokenManager
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 100000000000000, {from: trader0});
        await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 100000000000000, {from: trader1});

        // Buy asset tokens
        await platformHelper.Asset.buyAssetTokens(60, { from: trader0 });
        await platformHelper.Asset.buyAssetTokens(30, { from: trader1 });

        // Disable time validation so that a vote can be performed
        await platformHelper.AssetToken.disableTimeValidation({ from: ownerAddr });

        // Vote to sell the car in order to enable claims
        await platformHelper.AssetToken.voteForSellingTheAsset({ from: trader0 });
        await platformHelper.AssetToken.voteForSellingTheAsset({ from: trader1 });
    });

    it("should confirm that claims are enabled", async function () {
        var canClaim = await platformHelper.AssetToken.canClaim();

        assert.isTrue(canClaim);
    });

    // CLAIMER
    // 20000 * (681660 / 100000000) = 136.332
    // BCT * (TICKER / (10 ** DECIMALS)) = BCT USD        
    it("should NOT enable claimer claims since not enough funds", async function () {
        await platformHelper.BitcarToken.transfer(platformHelper.Claimer.address, 10000, { from: agent0 });

        await truffleAssert.reverts(platformHelper.Claimer.claimerFunded(), "Claimer does not have enough platform tokens to allow claims");
    });

    it("should enable claimer claims", async function () {
        await platformHelper.BitcarToken.transfer(platformHelper.Claimer.address, 10000, { from: agent0 });
        var result = await platformHelper.Claimer.claimerFunded();

        assert.isTrue(result.tx.length === 66);
    });

    // TODO: Confirm values, balance after should be initial amount + escrow, other fees (msi, paf, ptf) are taken by the platform
    it("should claim platform tokens", async function () {
        var userPlatformBalanceBefore = await platformHelper.BitcarToken.balanceOf(trader0);

        var result = await platformHelper.Claimer.claimPlatformTokens({ from: trader0 });

        var userPlatformBalanceAfter = await platformHelper.BitcarToken.balanceOf(trader0);

        assert.isTrue(result.tx.length === 66);
        assert.isTrue(userPlatformBalanceAfter - userPlatformBalanceBefore === 8802);

    });

    it("should NOT claim platform tokens twice", async function () {
        await truffleAssert.reverts(platformHelper.Claimer.claimPlatformTokens(), "User already claimed all asset tokens");
    });

});