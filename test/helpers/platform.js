const SimpleKycHelper = require('./kyc-simple.js').SimpleKycHelper;

const BigNumber = require('bignumber.js');

const {
    oneFinney
} = require('./units.js')

class PlatformHelper {

    constructor(accounts) {
        this.accounts = accounts;
        this.isInitialised = false;
        // this.setup();
    }

    async setup() {
        await this.setupContracts();

        this.AdminAccCtrl = await this.AdminContract.deployed();
        this.AgentAccCtrl = await this.AgentContract.deployed();
        this.TraderAccCtrl = await this.TraderContract.deployed();
        this.AssetFactory = await this.AssetFactoryContract.deployed();
        this.BitcarToken = await this.BitcarTokenContract.deployed();
        this.AssetWhitelistFactory = await this.AssetWhitelistFactoryContract.deployed();
        this.Whitelist = await this.WhitelistContract.deployed();
        this.AssetRankTrackerFactory = await this.AssetRankTrackerFactoryContract.deployed();
        this.AssetControlBallotFactory = await this.AssetControlBallotFactoryContract.deployed();
        this.RankTracker = await this.RankTrackerContract.deployed();
        this.KycProcessTracker = await this.KycProcessTrackerContract.deployed();


        this.isInitialised = true;
    }

    async setupContracts() {
        this.AdminContract = artifacts.require('governance/Admin.sol');
        this.AgentContract = artifacts.require('governance/Agent.sol');
        this.TraderContract = artifacts.require('governance/Trader.sol');
        this.AssetFactoryContract = artifacts.require('AssetFactory.sol');
        this.AssetContract = artifacts.require("Asset.sol");
        this.BitcarTokenContract = artifacts.require("PlatformToken.sol");
        this.AssetTokenContract = artifacts.require("AssetToken.sol");
        this.FeeManagerContract = artifacts.require("FeeManager.sol");
        this.FeeContract = artifacts.require("Fee.sol");
        this.FeeBEEContract = artifacts.require("BEE.sol");
        this.ClaimerContract = artifacts.require("Claimer.sol");
        this.AssetWhitelistFactoryContract = artifacts.require("AssetWhitelistFactory.sol");
        this.AssetWhitelistContract = artifacts.require("AssetWhitelist.sol");
        this.WhitelistContract = artifacts.require("Whitelist.sol");
        this.RankTrackerContract = artifacts.require("RankTracker.sol");
        this.AssetRankTrackerFactoryContract = artifacts.require("AssetRankTrackerFactory.sol");
        this.AssetRankTrackerContract = artifacts.require("AssetRankTracker.sol");
        this.AssetControlBallotFactoryContract = artifacts.require("AssetControlBallotFactory.sol");
        this.AssetControlBallotContract = artifacts.require("AssetControlBallot.sol");
        this.KycProcessTrackerContract = artifacts.require("KycProcessTracker.sol");
    }

    async createUsers(useKycForTraders) {

        this.checkInitialised();

        if(this.usersCreated) {
            return;
        }

        this.ownerAddr = this.accounts[0];
        this.admin0 = this.accounts[3];
        this.agent0 = this.accounts[5];
        this.trader0 = this.accounts[6];
        this.trader1 = this.accounts[7];
        this.trader2 = this.accounts[8];
        this.trader3 = this.accounts[9];

        this.trader0ColdWallet = this.accounts[10];
        this.trader2ColdWallet = '0xE1b4d5C0330Fdd0959b3A86992077Dc81530e0E7';
        this.trader3ColdWallet = '0x286251aFd71F0a6BFDe985b8B76e8B5BdB8e6618';

        // Setup users
        await this.AdminAccCtrl.addAddressToAdminGroup(this.admin0, { from: this.ownerAddr});
        await this.AdminAccCtrl.verify(this.admin0, true, { from: this.ownerAddr });

        await this.AgentAccCtrl.addAddressToAgentsGroup(this.agent0, { from: this.admin0});
        await this.AgentAccCtrl.verify(this.agent0, true, { from: this.admin0 });

        if(!useKycForTraders) {

            await this.TraderAccCtrl.addAddressToTradersGroup(this.trader0, { from: this.admin0});
            await this.TraderAccCtrl.verify(this.trader0, true, { from: this.admin0 });

            await this.TraderAccCtrl.addAddressToTradersGroup(this.trader1, { from: this.admin0});
            await this.TraderAccCtrl.verify(this.trader1, true, { from: this.admin0 });

            await this.TraderAccCtrl.addAddressToTradersGroup(this.trader2, { from: this.admin0});
            await this.TraderAccCtrl.verify(this.trader2, true, { from: this.admin0 });

            await this.TraderAccCtrl.addAddressToTradersGroup(this.trader3, { from: this.admin0});
            await this.TraderAccCtrl.verify(this.trader3, true, { from: this.admin0 });
        } else {
            console.log('Setting up Kyc Helper');

            let kycHelper = new SimpleKycHelper(this);
            await kycHelper.setup(this.ownerAddr);

            console.log('KYC registering traders 0-3');
            await kycHelper.doKycAndAddUserToTraderGroup(this.trader0, this.trader0ColdWallet);
            await kycHelper.doKycAndAddUserToTraderGroup(this.trader1, undefined);
            await kycHelper.doKycAndAddUserToTraderGroup(this.trader2, this.trader2ColdWallet);
            await kycHelper.doKycAndAddUserToTraderGroup(this.trader3, this.trader3ColdWallet);
        }

        this.usersCreated = true;
    }

    async setGlobalRankLimit(rank, limit) {
        this.checkInitialised();
        const longLimit = new BigNumber(limit).shiftedBy(8);
        return await this.RankTracker.setGlobalLimit(rank, longLimit.toString(), {from: this.admin0});
    }

    async agentApproveData(dataHash) {
        this.checkInitialised();
        await this.Asset.agentApproveData(dataHash, { from: this.agent0 });
    }

    async adminApproveData(delay) {
        this.checkInitialised();
        await this.Asset.adminApproveData(true, delay, { from: this.admin0 })
    }

    async agentApproveContracts() {
        this.checkInitialised();
        await this.Asset.approveContractCreation(true, { from: this.agent0 })
    }

    async createAsset() {
        this.checkInitialised();

        let currentSize = await this.AssetFactory.size();

        // Create asset
        await this.AssetFactory.create({ from: this.agent0 });

        // Get Asset from AssetFactory
        const assetAddress = await this.AssetFactory.get(currentSize);
        this.Asset = await this.AssetContract.at(assetAddress);
    }

    async quickCreateAsset(_percentBitCar, _symbol, _totalTokens, _minOwnershipPercentage, _tradingPeriod, _votingPeriod, _maxCycles) {
        this.checkInitialised();
        await this.createAsset();
        await this.agentApproveData('XXXXXXXX');
        await this.setPercentages(_percentBitCar, 100 - _percentBitCar);
        await this.createAssetToken(_symbol, _symbol, _totalTokens, _minOwnershipPercentage, _tradingPeriod, _votingPeriod, _maxCycles);
        await this.createAssetFees(1, 1, 1, 1);
        await this.createAssetWhitelist();
        await this.createRankTracker();
        await this.createAssetBallot(76, 50, 30 * 60 * 60 * 24);
        await this.adminApproveData(5);
        await this.agentApproveContracts();
    }

    async createAssetToken(_name, _symbol, _totalTokens, _minOwnershipPercentage, _tradingPeriod, _votingPeriod, _maxCycles) {
        this.checkInitialised();
        // Create AssetToken
        await this.Asset.createAssetToken(_name, _symbol, _totalTokens, _minOwnershipPercentage, _tradingPeriod, _votingPeriod, _maxCycles, { from: this.admin0 });

        // Get AssetToken from AssetTokenFactory
        const assetTokenAddress = await this.Asset.getTokenAddress();
        this.AssetToken = await this.AssetTokenContract.at(assetTokenAddress);
    }

    /**
     * @param _feeBEE BEE (former escrow) fee - BitCar Extension Escrow
     * @param _feeMSI MSI fee (Maintenance Storage and Insurance)
     * @param _feePAF Platform Access Fee
     * @param _feePTF Platform Transaction Fee
     */
    async createAssetFees(_feeBEE, _feeMSI, _feePAF, _feePTF) {
        this.checkInitialised();
        // Create asset fee manager
        await this.Asset.createFeeManager({ from: this.admin0 });
        const feeManagerAddress = await this.Asset.getFeeManagerAddress();
        this.FeeManager = await this.FeeManagerContract.at(feeManagerAddress);

        // Create asset default fees
        await this.FeeManager.createDefaultFees(
            _feeBEE,
            _feeMSI,
            _feePAF,
            _feePTF,
            { from: this.admin0 });

        // Get claimer
        this.Claimer = await this.ClaimerContract.at(await this.FeeManager.getAddress("CLAIMER"));
        this.Escrow = await this.ClaimerContract.at(await this.FeeManager.getAddress("BEE"));
    }

    async createAssetWhitelist() {
        this.checkInitialised();

        await this.Asset.createWhitelist({ from: this.admin0 });

        const assetWhitelistAddress = await this.Asset.getWhitelistAddress();
        this.AssetWhitelist = await this.AssetWhitelistContract.at(assetWhitelistAddress);
    }

    async createRankTracker() {
        this.checkInitialised();

        await this.Asset.createRankTracker({ from: this.admin0 });

        const rankTrackerAddress = await this.Asset.getAssetRankTrackerAddress();
        this.AssetRankTracker = await this.AssetRankTrackerContract.at(rankTrackerAddress);
    }

    async createAssetBallot(_minSoldTokensPercentage, _defaultMinVotePercentage, _defaultVoteRunningPeriod) {
        this.checkInitialised();

        await this.Asset.createAssetBallot(_minSoldTokensPercentage, _defaultMinVotePercentage, _defaultVoteRunningPeriod, { from: this.admin0 });

        const assetControlBallotAddress = await this.Asset.getAssetControlBallotAddress();
        this.AssetControlBallot = await this.AssetControlBallotContract.at(assetControlBallotAddress);
    }

    async setPercentages(_tokenPercentage, _ethPercentage) {
        this.checkInitialised();
        await this.Asset.setPurchasePercentages(_tokenPercentage, _ethPercentage, { from: this.admin0 });
    }

    // limits = Array with object with the limits
    // eg: [{id: 0, limit: 100}, {id: 1, limit: 200}]
    async setGlobalLimits(limits) {
        for(const limit of limits) {
            const rankID = limit["id"];
            const rankLimit = limit["limit"];
            await this.RankTracker.setGlobalLimit(rankID, rankLimit, {from: this.admin0});
        }
    }

    checkInitialised() {
        if(!this.isInitialised) {
            throw new Error("Please run setup method of PlatformHelper before calling any functions.");
        }
    }
}

module.exports = {
    PlatformHelper
}
