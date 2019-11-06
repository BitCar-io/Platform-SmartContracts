// Required contract artifacts
const AdminContract = artifacts.require('governance/Admin.sol');
const AgentContract = artifacts.require('governance/Agent.sol');
const TraderContract = artifacts.require('governance/Trader.sol');
const AssetFactoryContract = artifacts.require('AssetFactory.sol');
const AssetContract = artifacts.require("Asset.sol");
const BitcarTokenContract = artifacts.require("PlatformToken.sol");
const AssetTokenContract = artifacts.require("AssetToken.sol");
const FeeManagerContract = artifacts.require("FeeManager.sol");
const FeeEscrowContract = artifacts.require("BEE.sol");
const FeeContract = artifacts.require("Fee.sol");
const RankTrackerContract = artifacts.require("RankTracker.sol");
const AssetWhitelistFactoryContract = artifacts.require("AssetWhitelistFactory.sol");
const AssetWhitelistContract = artifacts.require("AssetWhitelist.sol");
const AssetRankTrackerFactoryContract = artifacts.require("AssetRankTrackerFactory.sol");
const AssetRankTrackerContract = artifacts.require("AssetRankTracker.sol");
const AssetControlBallotFactoryContract = artifacts.require("AssetControlBallotFactory.sol");
const AssetControlBallotContract = artifacts.require("AssetControlBallot.sol");

const {
    oneFinney
} = require('../helpers/units.js')

const {
    sleep
} = require('../helpers/sleep.js')

const truffleAssert = require('truffle-assertions');

const PlatformHelper = require('../helpers/platform.js').PlatformHelper;
const SimpleKycHelper = require('../helpers/kyc-simple.js').SimpleKycHelper;

describe('Asset Approval Tests', () => {
    contract("Asset.sol", async (accounts) => {
        
        // Required contracts
        let AdminAccCtrl;
        let AgentAccCtrl;
        let TraderAccCtrl;
        let AssetFactory;
        let BitcarToken;
        let AssetRankTracker;
        let AssetControlBallot;

        // Required account
        const ownerAddr = accounts[0];
        const admin0 = accounts[3];
        const agent0 = accounts[5];
        const trader0 = accounts[7];

        // Variables required troughout the tests
        let Asset;

        it("setup", async () => {
            AdminAccCtrl = await AdminContract.deployed();
            AgentAccCtrl = await AgentContract.deployed();
            TraderAccCtrl = await TraderContract.deployed();
            AssetFactory = await AssetFactoryContract.deployed();
            BitcarToken = await BitcarTokenContract.deployed();
            AssetWhitelistFactory = await AssetWhitelistFactoryContract.deployed();
            AssetRankTrackerFactory = await AssetRankTrackerFactoryContract.deployed();
            AssetControlBallotFactory = await AssetControlBallotFactoryContract.deployed();
            RankTracker = await RankTrackerContract.deployed();


            await AdminAccCtrl.addAddressToAdminGroup(admin0, { from: ownerAddr });
            await AdminAccCtrl.verify(admin0, true, { from: ownerAddr });

            // Do proper KYC for trader0
            let platformHelper = new PlatformHelper(accounts);
            platformHelper.setup();
            let kycHelper = new SimpleKycHelper(platformHelper);
            await kycHelper.setup(ownerAddr);
            await kycHelper.doKycAndAddUserToTraderGroup(trader0, undefined);


            await AgentAccCtrl.addAddressToAgentsGroup(agent0, { from: admin0 });
            await AgentAccCtrl.verify(agent0, true, { from: admin0 });

            await AssetFactory.create({ from: agent0 });
        
            var assetAddress = await AssetFactory.get(0);
            Asset = await AssetContract.at(assetAddress);

            // Change Asset min purchase amount
            await Asset.setMinPurchaseAmount(1, {from: admin0});

            // Changed the transfer amount because of ISSUE #2077: https://github.com/ethereum/web3.js/issues/2077
            // Truffle v5.0.3 is using web3 1.0.0-beta.37, and until web3.js 1.0.0-beta.41 this issue has not been solved.
            await BitcarToken.transfer(trader0, "50000000000000000", {from: ownerAddr}); // 1000000 BitCar tokens
        })

        it("add data to asset", async function () {
            var result = await Asset.setDataHash("QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw", { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(ADMIN-REJECT) Agent should approve data hash", async function () {
            var result = await Asset.agentApproveData("", { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(ADMIN-REJECT) Admin should NOT be able to approve data since contracts are not created", async function () {
            await truffleAssert.reverts(Asset.adminApproveData(true, 10, { from: admin0 }), "The AssetToken needs to be deployed before approving purchases");
        });

        it("(ADMIN-REJECT) Admin should be able to reject data", async function () {
            var result = await Asset.adminApproveData(false, 10, { from: admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(AGENT-REJECT) Agent should approve data hash", async function () {
            var result = await Asset.agentApproveData("QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw", { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(AGENT-REJECT) Admin create asset token", async function () {
            var result = await Asset.createAssetToken(
                "ferrari", 
                "ferrari", 
                100000000000000, //1,000,000 00000000, 
                70, 
                31536000, 
                2628000,
                2, 
                { from: admin0 });

            var AssetTokenAddress = await Asset.getTokenAddress();
            AssetToken = await AssetTokenContract.at(AssetTokenAddress);
        
            assert.isTrue(result["tx"].length === 66);
        });
        
        it("(AGENT-REJECT) Admin create fee manager", async function () {
            // Create asset fee manager
            await Asset.createFeeManager({ from: admin0 });
            const feeManagerAddress = await Asset.getFeeManagerAddress();
            FeeManager = await FeeManagerContract.at(feeManagerAddress);
        });

        it("(AGENT-REJECT) Admin create default fees", async function () {
            var result = await FeeManager.createDefaultFees(
                10000000000, //100 00000000, 
                10000000000, //100 00000000, 
                10000000000, //100 00000000, 
                10000000000, //100 00000000,
                { from: admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(AGENT-REJECT) Admin create asset whitelist", async function () {
            var result = await Asset.createWhitelist({ from: admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("(AGENT-REJECT) Admin create asset RankTracker", async function () {
            var result = await Asset.createRankTracker({ from: admin0 });

            const assetRankTrackerAddress = await AssetRankTrackerFactory.get(0);
            AssetRankTracker = await AssetRankTrackerContract.at(assetRankTrackerAddress);
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(AGENT-REJECT) Admin create asset control ballot", async function () {
            var result = await Asset.createAssetBallot(76, 50, 30 * 60 * 60 * 24, { from: admin0 });

            const assetControlBallotAddress = await AssetControlBallotFactory.get(0);
            AssetControlBallot = await AssetControlBallotContract.at(assetControlBallotAddress);
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(AGENT-REJECT) Admin should approve data and contracts creation", async function () {
            var result = await Asset.adminApproveData(true, 10, { from: admin0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(AGENT-REJECT) Agent should REJECT data and contracts creation", async function () {
            var result = await Asset.approveContractCreation(false, { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(LIVE) Agent data approval", async function () {
            var result = await Asset.agentApproveData("", { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(LIVE) Admin re-create asset token", async function () {
            var result = await Asset.createAssetToken(
                "ferrari", 
                "ferrari", 
                100000000000000, //1,000,000 00000000, 
                70, 
                31536000, 
                2628000,
                2, 
                { from: admin0 });

            var AssetTokenAddress = await Asset.getTokenAddress();
            AssetToken = await AssetTokenContract.at(AssetTokenAddress);
        
            assert.isTrue(result["tx"].length === 66);
        });
        
        it("(AGENT-REJECT) Admin re-create fee manager", async function () {
            // Create asset fee manager
            await Asset.createFeeManager({ from: admin0 });
            const feeManagerAddress = await Asset.getFeeManagerAddress();
            FeeManager = await FeeManagerContract.at(feeManagerAddress);
        });

        it("(LIVE) Admin re-create asset fees", async function () {
            var result = await FeeManager.createDefaultFees(
                10000000000, //100 00000000, 
                10000000000, //100 00000000, 
                10000000000, //100 00000000, 
                10000000000, //100 00000000,
                { from: admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(LIVE) Admin re-create asset whitelist", async function () {
            var result = await Asset.createWhitelist({ from: admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("(LIVE) Admin Set token/eth percentages", async function () {
            var result = await Asset.setPurchasePercentages(20, 80, { from: admin0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(LIVE) Admin should approve data and contracts creation", async function () {
            var result = await Asset.adminApproveData(true, 10, { from: admin0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("(LIVE) Agent should approve data and contracts creation", async function () {
            var result = await Asset.approveContractCreation(true, { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should get right count for agent/admin rejections", async function () {
            const adminRejections = await Asset.adminRejections.call();
            const agentRejections = await Asset.agentRejections.call();

            assert.isTrue(adminRejections == 1);
            assert.isTrue(agentRejections == 1);
        });

        it("should REJECT purchase since delta time has not passed", async function () {
            await truffleAssert.reverts(Asset.buyAssetTokens(10000000000, {from: trader0, value: 708717220000000000}), "Purchase time has not been reached");
        });

        it("should sleep for 10 seconds", async function () {
            await sleep(10000);
        });

        it("should set asset and global limits", async function () {
            // Set Global platform limits
            const globalLimits = await RankTracker.setGlobalLimit(0, 1000000 * Math.pow(10, 8), {from: admin0});

            // Set Asset Rank limits
            const assetLimits = await AssetRankTracker.setRank(0, 1000, 1000000 * Math.pow(10, 8), 1000000 * Math.pow(10, 8), {from: admin0});

            assert.isTrue(globalLimits["tx"].length === 66);
            assert.isTrue(assetLimits["tx"].length === 66);
        });

        // TODO: TEST REVERTING, ANALYSE LATER
        // it("buy asset tokens", async function () {

        //     // TODO: The test case needs to be adjusted because the 
        //     // activation of the AssetToken goes through the Asset contract, 
        //     // it shouldn't be done directly 

        //     // Approve AssetToken to spend from user
        //     var allowance = await BitcarToken.approve(Asset.address, 100000000000000, {from: trader0}); // 1000000 BitCar tokens

        //     const balance = await BitcarToken.balanceOf(trader0);
        //     const balanceAsset = await AssetToken.balanceOf(trader0);
        //     const balanceAssetAsset = await AssetToken.balanceOf(Asset.address);

        //     console.log(balance.toString());
        //     console.log(balanceAsset.toString());
        //     console.log(balanceAssetAsset.toString());

        //     // // Execute
        //     var result = await Asset.buyAssetTokens(5000000000, {from: trader0, value: 708717220000000000}); // 100 USD = 1467000000000 BitCar tokens

        //     console.log(result);
        //     // assert.isTrue(result["tx"].length === 66);
        // });
    });
});
