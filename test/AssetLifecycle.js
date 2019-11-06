// Required contract artifacts
const AdminContract = artifacts.require('governance/Admin.sol');
const AgentContract = artifacts.require('governance/Agent.sol');
const TraderContract = artifacts.require('governance/Trader.sol');
const AssetFactoryContract = artifacts.require('AssetFactory.sol');
const AssetContract = artifacts.require("Asset.sol");
const BitcarTokenContract = artifacts.require("PlatformToken.sol");
const AssetTokenContract = artifacts.require("AssetToken.sol");
const FeeManagerContract = artifacts.require("FeeManager.sol");
const FeeContract = artifacts.require("Fee.sol");
const FeeBEEContract = artifacts.require("BEE.sol");
const AssetWhitelistFactoryContract = artifacts.require("AssetWhitelistFactory.sol");
const AssetWhitelistContract = artifacts.require("AssetWhitelist.sol");
const AssetRankTrackerFactoryContract = artifacts.require("AssetRankTrackerFactory.sol");
const AssetRankTrackerContract = artifacts.require("AssetRankTracker.sol");

const AssetControlBallotFactoryContract = artifacts.require("AssetControlBallotFactory.sol");
const AssetControlBallotContract = artifacts.require("AssetControlBallot.sol");

const truffleAssert = require('truffle-assertions');

const PlatformHelper = require('./helpers/platform.js').PlatformHelper;
const SimpleKycHelper = require('./helpers/kyc-simple.js').SimpleKycHelper;

const {
    oneFinney
} = require('./helpers/units.js')

const {
    sleep
} = require('./helpers/sleep.js')

describe('Asset Lifecycle Tests', () => {
    contract("Asset Lifecycle", async (accounts) => {

        const bronzeRank = {
            rankId: 0,
            period: 20 * 60,
            periodLimit: 10000 * Math.pow(10, 8), 
            periodUserLimit: 6000 * Math.pow(10, 8),
            globalLimit: 20000 * Math.pow(10, 8)
        };
        
        // Required contracts
        let AdminAccCtrl;
        let AgentAccCtrl;
        let TraderAccCtrl;
        let AssetFactory;
        let BitcarToken;
        let AssetToken;
        let AssetWhitelistFactory;
        let AssetWhitelist;
        let AssetRankTrackerFactory;
        let AssetRankTracker;
        let AssetControlBallotFactory;
        let AssetControlBallot;
        let FeeManager;

        // Required account
        const ownerAddr = accounts[0];
        const admin0 = accounts[3];
        const agent0 = accounts[5];
        const trader0 = accounts[7];

        // Variables required troughout the tests
        let Asset;
        const dataHash = "QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw";

        before("setup", async () => {
            AdminAccCtrl = await AdminContract.deployed();
            AgentAccCtrl = await AgentContract.deployed();
            TraderAccCtrl = await TraderContract.deployed();
            AssetFactory = await AssetFactoryContract.deployed();
            BitcarToken = await BitcarTokenContract.deployed();
            AssetWhitelistFactory = await AssetWhitelistFactoryContract.deployed();
            AssetRankTrackerFactory = await AssetRankTrackerFactoryContract.deployed();
            AssetControlBallotFactory = await AssetControlBallotFactoryContract.deployed();
        })

        it("add admin to admins", async function () {
            var result = await AdminAccCtrl.addAddressToAdminGroup(admin0, { from: ownerAddr });
            await AdminAccCtrl.verify(admin0, true, { from: ownerAddr });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("set global platform limit for Bronze", async function () {
            let platformHelper = new PlatformHelper(accounts);
            await platformHelper.setup();
            platformHelper.admin0 = admin0;

            const result = await platformHelper.setGlobalRankLimit(bronzeRank.rankId, bronzeRank.globalLimit);
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("add user to traders group and do kyc", async function () {

            let platformHelper = new PlatformHelper(accounts);
            platformHelper.setup();

            let kycHelper = new SimpleKycHelper(platformHelper);
            await kycHelper.setup(ownerAddr);

            var result = await kycHelper.doKycAndAddUserToTraderGroup(trader0, undefined);
        
            assert.isTrue(result);
        });

        it("add agent to agents", async function () {
            var result = await AgentAccCtrl.addAddressToAgentsGroup(agent0, { from: admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("verify agent", async function () {
            var result = await AgentAccCtrl.verify(agent0, true, { from: admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("create asset", async function () {
            var result = await AssetFactory.create({ from: agent0 });
        
            var assetAddress = await AssetFactory.get(0);
            Asset = await AssetContract.at(assetAddress);

            assert.isTrue(result["tx"].length === 66);
            // For some reason assert.isAddress no longer works on truffle v5.0.3
            //assert.isAddress(assetAddress);
        });

        it("add data to asset", async function () {
            var result = await Asset.setDataHash(dataHash, { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("agent should approve data hash", async function () {
            var result = await Asset.agentApproveData(dataHash, { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("create asset token", async function () {
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

            var assetBalance = await AssetToken.balanceOf(Asset.address);
        
            assert.isTrue(result["tx"].length === 66);
            assert.isTrue(assetBalance.toString() === "100000000000000");
            // For some reason assert.isAddress no longer works on truffle v5.0.3
            //assert.isAddress(AssetTokenAddress);
        });
        
        it("create asset fee manager", async function () {
            var result = await Asset.createFeeManager({ from: admin0 });

            const feeManagerAddress = await Asset.getFeeManagerAddress();
            FeeManager = await FeeManagerContract.at(feeManagerAddress);

            assert.isTrue(result["tx"].length === 66);
            assert.isTrue(feeManagerAddress.length === 42);
        });

        // function createDefaultFees(uint256 _feeBEE, uint256 _feeMSI, uint256 _feePAF, uint256 _feePTF) public {
        it("create fee manager default fees", async function () {
            var result = await FeeManager.createDefaultFees(
                10000000000, //100 00000000, 
                10000000000, //100 00000000, 
                10000000000, //100 00000000, 
                10000000000, //100 00000000, 
                { from: admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("create asset whitelist", async function () {
            var result = await Asset.createWhitelist({ from: admin0 });

            const assetWhitelistAddress = await AssetWhitelistFactory.get(0);
            AssetWhitelist = await AssetWhitelistContract.at(assetWhitelistAddress);
        
            assert.isTrue(result["tx"].length === 66);

            // For some reason assert.isAddress no longer works on truffle v5.0.3
            //assert.isAddress(assetWhitelistAddress);
        });

        it("create asset RankTracker", async function () {
            var result = await Asset.createRankTracker({ from: admin0 });

            const assetRankTrackerAddress = await AssetRankTrackerFactory.get(0);
            AssetRankTracker = await AssetRankTrackerContract.at(assetRankTrackerAddress);
        
            assert.isTrue(result["tx"].length === 66);

            // For some reason assert.isAddress no longer works on truffle v5.0.3
            // assert.isAddress(assetWhitelistAddress);
        });

        it("create asset control ballot", async function () {
            var result = await Asset.createAssetBallot(76, 50, 30 * 60 * 60 * 24, { from: admin0 });

            const assetControlBallotAddress = await AssetControlBallotFactory.get(0);
            AssetControlBallot = await AssetControlBallotContract.at(assetControlBallotAddress);
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("set RankTracker BRONZE rank", async function () {
            const result = await AssetRankTracker.setRank(bronzeRank.rankId, bronzeRank.period, bronzeRank.periodLimit, bronzeRank.periodUserLimit, {from: admin0});
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("set token/eth percentages", async function () {
            var result = await Asset.setPurchasePercentages(20, 80, { from: admin0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("admin should approve data and contracts creation", async function () {
            var result = await Asset.adminApproveData(true, 10, { from: admin0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("agent should approve data and contracts creation", async function () {
            var result = await Asset.approveContractCreation(true, { from: agent0 })
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should sleep for 10 seconds", async function () {
            await sleep(10000);
        });

        it("transfer bitcar tokens to trader0", async function () {
            var result = await BitcarToken.transfer(trader0, "50000000000000000", { from: accounts[0] }); // 1000000 BitCar tokens
            assert.isTrue(result["tx"].length === 66);
        });

        it("buy asset tokens", async function () {
            // Approve AssetToken to spend from user
            var allowance = await BitcarToken.approve(Asset.address, 100000000000000, {from: trader0}); // 1000000 BitCar tokens
            var agentEthBalanceBefore = await web3.eth.getBalance(agent0);

            // Execute
            var result = await Asset.buyAssetTokens(10000000000, {from: trader0, value: 708717220000000000}); // 100 USD = 2934.01402458 BitCar tokens

            // EXPECTED BoughtAssetTokens EVENT OUTPUT:-
            // tokenAmount: 10000000000, tokenCostBitcar: 293401402458, costWei: 708717220000000000
            // BITCAR Fees: bee: 146700701, msi: 146700701, paf: 146700701, ptf: 146700701
        
            var assetBalance = await AssetToken.balanceOf(Asset.address);
            var userAssetBalance = await AssetToken.balanceOf(trader0);
            var userBitcarBalance = await BitcarToken.balanceOf(trader0);
            var agentBitcarBalance = await BitcarToken.balanceOf(agent0);

            var agentEthBalanceAfter = await web3.eth.getBalance(agent0);

            assert.strictEqual(result["tx"].length, 66, 'Transaction length was not equal');
        
            assert.strictEqual(assetBalance.toString(), "99990000000000", 'Asset Balance is incorrect'); // User bought 100 Asset tokens
            assert.strictEqual(userAssetBalance.toString(), "10000000000", 'User Asset Balance is incorrect'); // User bought 100 Asset tokens

            assert.strictEqual(userBitcarBalance.toString(), "49999706011794738", 'User BITCAR Balance is incorrect'); // User spent 293401402458 (tokens) + 4*146700701 (fees) = 293988205262 Bitcar
            
            assert.strictEqual(agentBitcarBalance.toString(), "293401402458", 'Agent BITCAR Balance is incorrect'); // Bitcar tokens were sent to the agent

            // TODO: Sending gas with the transaction (agent.transfer), how to handle it?
            // For now we are removing the trailing decimals
            assert.strictEqual(Math.round((agentEthBalanceAfter - agentEthBalanceBefore) / 100000000000).toString(), "7087172", 'Agent ETH was not received correctly'); // Bitcar tokens were sent to the agent
        });
        
        it("confirm fee accounts", async function () {
            const feeBEEAddress = await FeeManager.getAddress("BEE");
            const feeMSIAddress = await FeeManager.getAddress("MSI");
            const feePAFAddress = await FeeManager.getAddress("PAF");
            const feePTFAddress = await FeeManager.getAddress("PTF");
        
            const feeBEE = await FeeBEEContract.at(feeBEEAddress);
            const feeMSI = await FeeContract.at(feeMSIAddress);
            const feePAF = await FeeContract.at(feePAFAddress);
            const feePTF = await FeeContract.at(feePTFAddress);
        
            const beeBalance = await feeBEE.getPlatformTokenBalance();
            const msiBalance = await feeMSI.getPlatformTokenBalance();
            const pafBalance = await feePAF.getPlatformTokenBalance();
            const ptfBalance = await feePTF.getPlatformTokenBalance();
        
            assert.isTrue(beeBalance.toString() === "146700701");
            assert.isTrue(msiBalance.toString() === "146700701");
            assert.isTrue(pafBalance.toString() === "146700701");
            assert.isTrue(ptfBalance.toString() === "146700701");
        });

        it("should ALLOW a purchase amount equal to the minimum purchase amount", async function () {
            // Approve AssetToken to spend from user
            var allowance = await BitcarToken.approve(Asset.address, 100000000000000, {from: trader0}); // 1000000 BitCar tokens
            var agentEthBalanceBefore = await web3.eth.getBalance(agent0);

            // Execute
            var result = await Asset.buyAssetTokens(5000000000, {from: trader0, value: 708717220000000000}); // 50 USD = 2934.01402458 BitCar tokens

            assert.isTrue(result["tx"].length === 66);
        });

        it("should NOT ALLOW a purchase amount under the minimum purchase amount", async function () {

            var allowance = await BitcarToken.approve(Asset.address, 100000000000000, {from: trader0}); // 1000000 BitCar tokens

            await truffleAssert.fails(
                // 49 USD
                Asset.buyAssetTokens(4900000000, {from: trader0, value: 708717220000000000}),
                truffleAssert.ErrorType.REVERT,
                "Min purchase amount not met"
            );
        });

        it("should ALLOW the minimum purchase amount to be changed by an admin", async function () {
            // Approve AssetToken to spend from user
            var result = await Asset.setMinPurchaseAmount(4000000000, {from: admin0}); // 40 USD

            assert.equal(result["tx"].length, 66, 'Transaction length is not valid');

            const minAmount = await Asset.minPurchaseAmount.call();

            assert.equal(minAmount.toString(), '4000000000', 'Minimum purchase amount was not set correctly');
        });

        it("should NOT ALLOW the minimum purchase amount to be changed by a user", async function () {
            await truffleAssert.fails(
                // 10 USD = 293.401402458 BitCar tokens
                Asset.setMinPurchaseAmount(5000000000, {from: trader0}),
                truffleAssert.ErrorType.REVERT,
                "Address is not a verified Admin."
            );
        });

        it("when amount remaining is below minimum amount, should allow purchase for amount remaining", async function () {
            let platformHelperForMin = new PlatformHelper(accounts);
            await platformHelperForMin.setup();
            platformHelperForMin.admin0 = admin0;
            platformHelperForMin.agent0 = agent0;
            platformHelperForMin.trader0 = trader0;

            await platformHelperForMin.quickCreateAsset(100, "ferrari", 100 * Math.pow(10, 8), 70, 31536000, 2628000, 2);
            await platformHelperForMin.AssetRankTracker.setRank(bronzeRank.rankId, bronzeRank.period, bronzeRank.periodLimit, bronzeRank.periodUserLimit, {from: admin0});
            
            // TODO: Port to PlatformHelper
            await sleep(10000);
            
            await BitcarToken.approve(platformHelperForMin.Asset.address, 100000000000000, {from: trader0});

            const firstPurchase = 80 * Math.pow(10, 8);
            const secondPurchase = 20 * Math.pow(10, 8);

            const minPurchaseAmount = await platformHelperForMin.Asset.minPurchaseAmount.call();

            await platformHelperForMin.Asset.buyAssetTokens(firstPurchase, {from: trader0});

            let userBalance = await platformHelperForMin.AssetToken.balanceOf(trader0);
            let assetBalance = await platformHelperForMin.AssetToken.balanceOf(platformHelperForMin.Asset.address);

            assert.equal(userBalance, firstPurchase, 'User Balance is not correct for first purchase');
            assert.equal(assetBalance, secondPurchase, 'Remaining Asset Balance is not correct after first purchase');

            assert.ok(minPurchaseAmount > assetBalance, `Invalid test setup minimum purchase amount (${minPurchaseAmount}) is not greater than assetBalance`);

            console.log('Second Purchase');
            let result = await platformHelperForMin.Asset.buyAssetTokens(secondPurchase, {from: trader0});

            assert.equal(result["tx"].length, 66, 'Transaction length is not valid');

            userBalance = await platformHelperForMin.AssetToken.balanceOf(trader0);
            assetBalance = await platformHelperForMin.AssetToken.balanceOf(platformHelperForMin.Asset.address);

            assert.equal(userBalance, firstPurchase + secondPurchase, 'User Balance is not correct after second purchase');
            assert.equal(assetBalance, 0, 'Remaining Asset Balance is not 0');
        });

        it("when amount remaining is below minimum amount, should prevent purchase below amount remaining", async function () {
            let platformHelperForMin = new PlatformHelper(accounts);
            await platformHelperForMin.setup();
            platformHelperForMin.admin0 = admin0;
            platformHelperForMin.agent0 = agent0;
            platformHelperForMin.trader0 = trader0;

            await platformHelperForMin.quickCreateAsset(100, "ferrari", 100 * Math.pow(10, 8), 70, 31536000, 2628000, 2);
            await platformHelperForMin.AssetRankTracker.setRank(bronzeRank.rankId, bronzeRank.period, bronzeRank.periodLimit, bronzeRank.periodUserLimit, {from: admin0});

            // TODO: Port to PlatformHelper
            await sleep(10000);
            
            await BitcarToken.approve(platformHelperForMin.Asset.address, 100000000000000, {from: trader0});

            const firstPurchase = 80 * Math.pow(10, 8);
            const secondPurchase = 10 * Math.pow(10, 8);

            const minPurchaseAmount = await platformHelperForMin.Asset.minPurchaseAmount.call();

            await platformHelperForMin.Asset.buyAssetTokens(firstPurchase, {from: trader0});

            userBalance = await platformHelperForMin.AssetToken.balanceOf(trader0);
            assetBalance = await platformHelperForMin.AssetToken.balanceOf(platformHelperForMin.Asset.address);

            assert.equal(userBalance, firstPurchase, 'User Balance is not correct for first purchase');
            assert.equal(assetBalance, 20 * Math.pow(10, 8), 'Remaining Asset Balance is not correct after first purchase');

            assert.ok(minPurchaseAmount > assetBalance, `Invalid test setup minimum purchase amount (${minPurchaseAmount}) is not greater than assetBalance`);

            await truffleAssert.fails(
                platformHelperForMin.Asset.buyAssetTokens(secondPurchase, {from: trader0}),
                truffleAssert.ErrorType.REVERT,
                "Min purchase amount not met"
            );
        });
    });
});
