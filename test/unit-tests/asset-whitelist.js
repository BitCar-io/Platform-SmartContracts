/**
 * TOOD: Test whitelist removal process
 * 
 */

// Required contract artifacts
// const AdminContract = artifacts.require('governance/Admin.sol');
// const AgentContract = artifacts.require('governance/Agent.sol');
// const TraderContract = artifacts.require('governance/Trader.sol');
// const AssetFactoryContract = artifacts.require('AssetFactory.sol');
// // const TokenManagerFactoryContract = artifacts.require('TokenManagerFactory.sol');
// const AssetContract = artifacts.require("Asset.sol");
// // const TokenManagerContract = artifacts.require("TokenManager.sol");
// const BitcarTokenContract = artifacts.require("PlatformToken.sol");
// const AssetTokenContract = artifacts.require("AssetToken.sol");
// const FeeManagerContract = artifacts.require("FeeManager.sol");
// const FeeEscrowContract = artifacts.require("BEE.sol");
// const FeeContract = artifacts.require("Fee.sol");
// const AssetWhitelistFactoryContract = artifacts.require("AssetWhitelistFactory.sol");
// const AssetWhitelistContract = artifacts.require("AssetWhitelist.sol");
// const WhitelistContract = artifacts.require("Whitelist.sol");
// const ClaimerContract = artifacts.require("Claimer.sol");

const PlatformHelper = require('../helpers/platform.js').PlatformHelper;
const truffleAssert = require('truffle-assertions');

const {
    sleep
} = require('../helpers/sleep.js')

describe('Asset Whitelist Tests', () => {
    contract("Asset Whitelist", async (accounts) => {
        
        let platformHelper;

        let AssetWhitelist;

        // Variables required troughout the tests
        let Asset;
        const dataHash = "QmaF3frmgQXfbx7aqpEED3bqXVBYaPMxGvXrotHi5T9fgw";

        before("setup", async () => {
            platformHelper = new PlatformHelper(accounts);
            await platformHelper.setup();
            await platformHelper.createUsers(true);
            await platformHelper.createAsset();
            await platformHelper.agentApproveData(dataHash);
            await platformHelper.setPercentages(100, 0);
            await platformHelper.createAssetToken("ferrari", "ferrari", 100, 70, 31536000, 2628000, 2);
            await platformHelper.createAssetFees(1, 1, 1, 1);

            await sleep(10000);
        });


        it("should throw error since trying to create whitelist directly on the asset", async function () {
            await truffleAssert.fails(
                platformHelper.AssetToken.setAssetWhitelist(platformHelper.AssetToken.address, { from: platformHelper.agent0 }),
                truffleAssert.ErrorType.REVERT,
                "Only the owner can call this function"
            )
        });

        it("should create asset whitelist", async function () {
            var result = await platformHelper.Asset.createWhitelist({ from: platformHelper.admin0 });

            var assetWhitelistAddress = await platformHelper.AssetWhitelistFactory.get(0);
            AssetWhitelist = await platformHelper.AssetWhitelistContract.at(assetWhitelistAddress);
        
            assert.isTrue(result["tx"].length === 66);
            // For some reason assert.isAddress no longer works on truffle v5.0.3
            //assert.isAddress(assetWhitelistAddress);
        });

        // TODO: Approve asset not really part of this test, fix it?
        it("finish asset setup", async function () {
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


            
            // Transfer bitcar tokens to trader0
            await platformHelper.BitcarToken.transfer(platformHelper.trader0, 25000000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});
            await platformHelper.BitcarToken.transfer(platformHelper.trader1, 25000000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});

            // Transfer bitcar tokens to agent0
            await platformHelper.BitcarToken.transfer(platformHelper.agent0, 25000000 * Math.pow(10, 8), {from: platformHelper.ownerAddr});

            // Set allowance trader0 -> TokenManager
            await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 1000000 * Math.pow(10, 8), {from: platformHelper.trader0});
            await platformHelper.BitcarToken.approve(platformHelper.Asset.address, 1000000 * Math.pow(10, 8), {from: platformHelper.trader1});


    
            // Sleeping for 20 seconds in order for the approval time to pass by
            await sleep(20000);
        });

        it("should be able to buy tokens whithout whitelist being enabled", async function () {
            var result = await platformHelper.Asset.buyAssetTokens(40, {from: platformHelper.trader0});
        
            assert.isTrue(result["tx"].length === 66);
        });

        // Enabled
        it("should enable asset whitelist", async function () {
            var result = await AssetWhitelist.setEnabled(true, { from: platformHelper.admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should be able to buy tokens with whitelist enabled but no other flags being set", async function () {
            var result = await platformHelper.Asset.buyAssetTokens(40, {from: platformHelper.trader0});
        
            assert.isTrue(result["tx"].length === 66);
        });

        // Initial Purchase
        it("should enable initial purchases flag", async function () {
            var result = await AssetWhitelist.setInitialPurchases(true, { from: platformHelper.admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should NOT be able to buy tokens since whitelist has been approved and trader0 not in whitelist", async function () {
            await truffleAssert.fails(
                platformHelper.Asset.buyAssetTokens(20, {from: platformHelper.trader0}),
                truffleAssert.ErrorType.REVERT,
                "Initial purchases check is enabled and user is not whitelisted"
            )
        });

        it("should add new country to AssetWhitelist, country 10", async function () {
            var result = await AssetWhitelist.addCountry(10, { from: platformHelper.admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should add trader0 to whitelist, country 10", async function () {
            var result = await platformHelper.Whitelist.add(platformHelper.trader0, 10, { from: platformHelper.admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("should be able to buy tokens since trader0 is in whitelist", async function () {
            var result = await platformHelper.Asset.buyAssetTokens(20, {from: platformHelper.trader0});
        
            assert.isTrue(result["tx"].length === 66);
        });

        // P2P
        it("should be able to trade P2P from trader0 to trader1 since P2P flag is disabled", async function () {
            var result = await platformHelper.AssetToken.transfer(platformHelper.trader1, 10, {from: platformHelper.trader0});
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should enable p2p transfers flag", async function () {
            var result = await AssetWhitelist.setP2PTransfers(true, { from: platformHelper.admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should NOT be able to transfer p2p since trader1 is not on the whitelist and P2P flag is enabled", async function () {
            await truffleAssert.fails(
                platformHelper.AssetToken.transfer(platformHelper.trader1, 10, {from: platformHelper.trader0}),
                truffleAssert.ErrorType.REVERT,
                "P2P transfer check is enabled and from or to is not whitelisted"
            )
        });

        it("should add new country to AssetWhitelist, country 11", async function () {
            var result = await AssetWhitelist.addCountry(11, { from: platformHelper.admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should add trader1 to whitelist, country 11", async function () {
            var result = await platformHelper.Whitelist.add(platformHelper.trader1, 11, { from: platformHelper.admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("should be able to trade P2P from trader0 to trader1 since both traders are whitelisted", async function () {
            var result = await platformHelper.AssetToken.transfer(platformHelper.trader1, 10, {from: platformHelper.trader0});
        
            assert.isTrue(result["tx"].length === 66);
        });

        // CLAIMER
        it("should disable P2P flag", async function () {
            var result = await AssetWhitelist.setP2PTransfers(false, { from: platformHelper.admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should enable claims in order to test claimer flag", async function () {
            // Disable time validation so that a vote can be performed
            var disabled = await platformHelper.AssetToken.disableTimeValidation({ from: platformHelper.ownerAddr });

            // Vote to sell the car in order to enable claims
            var vote = await platformHelper.AssetToken.voteForSellingTheAsset({ from: platformHelper.trader0 });

            // Transfer necessary funds to Claimer
            // Changed the transfer amount because of ISSUE #2077: https://github.com/ethereum/web3.js/issues/2077
            // Truffle v5.0.3 is using web3 1.0.0-beta.37, and until web3.js 1.0.0-beta.41 this issue has not been solved.
            //await BitcarToken.transfer(Claimer.address, 25000000000000000, { from: agent0 });
            await platformHelper.BitcarToken.transfer(platformHelper.Claimer.address, 2500000000000000, { from: platformHelper.agent0 });
            var claimsEnabled = await platformHelper.Claimer.claimerFunded();

            assert.isTrue(disabled["tx"].length === 66);
            assert.isTrue(vote["tx"].length === 66);
            assert.isTrue(claimsEnabled["tx"].length === 66);
        });

        it("should add Claimer to whitelist, country 10", async function () {
            var result = await platformHelper.Whitelist.add(platformHelper.Claimer.address, 10, { from: platformHelper.admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("should remove trader1 from whitelist, country 11 in order to test claimer flag", async function () {
            var result = await platformHelper.Whitelist.remove(platformHelper.trader1, 11, { from: platformHelper.admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("trader1 should be able to claim since claimer transfers flag is disabled", async function () {
            var result = await platformHelper.Claimer.claimPlatformTokens({ from: platformHelper.trader1 });
            
            assert.isTrue(result.tx.length === 66);
        });

        it("should enable claimer transfers flag", async function () {
            var result = await AssetWhitelist.setClaimerTransfers(true, { from: platformHelper.admin0 });
        
            assert.isTrue(result["tx"].length === 66);
        });

        it("should remove trader0 from whitelist, country 10 in order to test claimer flag", async function () {
            var result = await platformHelper.Whitelist.remove(platformHelper.trader0, 10, { from: platformHelper.admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("should NOT be able to claim since trader0 was removed from whitelist", async function () {
            await truffleAssert.fails(
                platformHelper.Claimer.claimPlatformTokens({ from: platformHelper.trader0 }),
                truffleAssert.ErrorType.REVERT,
                "Claimer transfer check is enabled and user is not whitelisted"
            )
        });

        it("should add trader0 to whitelist, country 10", async function () {
            var result = await platformHelper.Whitelist.add(platformHelper.trader0, 10, { from: platformHelper.admin0 });

            assert.isTrue(result["tx"].length === 66);
        });

        it("should be able to claim since trader0 is whitelisted", async function () {
            var result = await platformHelper.Claimer.claimPlatformTokens({ from: platformHelper.trader0 });
            
            assert.isTrue(result.tx.length === 66);
        });





        // SECURITY CHECKS
        it("should NOT allow random user to set AssetWhitelist flags", async function () {
            await truffleAssert.fails(
                AssetWhitelist.setEnabled(true, { from: platformHelper.agent0 }),
                truffleAssert.ErrorType.REVERT,
                "Address is not a verified Admin"
            )
        });

        it("should NOT allow random user to add users to AssetWhitelist", async function () {
            await truffleAssert.fails(
                AssetWhitelist.addCountry(10, { from: platformHelper.agent0 }),
                truffleAssert.ErrorType.REVERT,
                "Address is not a verified Admin"
            )
        });

        it("should NOT allow random user to add users to Whitelist", async function () {
            await truffleAssert.fails(
                platformHelper.Whitelist.add(platformHelper.trader0, 10, { from: platformHelper.agent0 }),
                truffleAssert.ErrorType.REVERT,
                "Address is not a verified Admin"
            )
        });


        // TODO: Test country addition removal
        it("should NOT be able to add the same country twice", async function () {
            await truffleAssert.fails(
                AssetWhitelist.addCountry(10, { from: platformHelper.admin0 }),
                truffleAssert.ErrorType.REVERT,
                "Country already exists"
            )
        });

        it("should remove country from whitelist", async function () {
            const result = await AssetWhitelist.removeCountry(10, { from: platformHelper.admin0 });

            const countries = await AssetWhitelist.getCountries();

            assert.isTrue(result["tx"].length === 66);
            assert.equal(countries.length, 1);
        });
    });
});