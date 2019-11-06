const {sleep, formatNumberForDisplay, getContract, getContractAtAddress,
    isZeroAddress, minsToSeconds, convertToSolidityNumber, RANK_LEVEL} = require("./helpers");
const chalk = require('chalk');

let isInitialised = false;

let AssetFactory = undefined;
let AssetControlBallotContract = undefined;
let AssetContract = undefined;
let AssetRankTrackerContract = undefined;
let AssetTokenContract = undefined;
let AssetWhitelistContract = undefined;
let ClaimerContract = undefined;
let FeeManagerContract = undefined;

const defaultPAFPercent = 0;
const defaultBEEPercent = 15;
const defaultPTFPercent = 0;
const defaultMSIPerYear = 0;

class assetHolder {
    constructor(assetContract) {
        this.assetContract = assetContract;
        this.feeManager = undefined;
        this.assetToken = undefined;
        this.claimer = undefined;
        this.escrowFee = undefined;
        this.msiFee = undefined;
        this.pafFee = undefined;
        this.ptfFee = undefined;
        this.tokenCode = undefined;
        this.assetAgent = undefined;
    }
}

async function initialiseAssetHelper(artifacts) {

    if(isInitialised) {
        return;
    }

    console.log('Initialising Asset Helper');

    AssetFactory = await getContract(artifacts.require("AssetFactory.sol"));
    AssetControlBallotContract = artifacts.require("AssetControlBallot.sol");
    AssetContract = artifacts.require("Asset.sol");
    AssetRankTrackerContract = artifacts.require("AssetRankTracker.sol");
    AssetTokenContract = artifacts.require("AssetToken.sol");
    AssetWhitelistContract = artifacts.require("AssetWhitelist.sol");
    ClaimerContract = artifacts.require("Claimer.sol");
    FeeManagerContract = artifacts.require("FeeManager.sol");

    isInitialised = true;
}

async function listAsset(assetName, tokenCode, agentAccount) {
    console.log(chalk.cyan(`\r\n � Registering Asset ${assetName} - ${tokenCode} �`));

    let currentSize = await AssetFactory.size();
    await AssetFactory.create({from: agentAccount});

    await sleep(3000);

    let assetAddress = await AssetFactory.get(currentSize);
    
    console.log("Retrieved new asset address, now retrieving contract...", assetAddress);
    let asset = await AssetContract.at(assetAddress);

    return asset;
}

async function createQuickAsset(displayName, tokenCode, dataHash, agent, approvalAdmin, listPrice, msiCostPerYear, percentBitCar, tradingPeriodSec, votingPeriodSec, approvalDeltaSec, approvalStateLive) {
    const deployedAssetAddress = await createAsset(displayName, tokenCode, dataHash, agent, approvalAdmin, listPrice, msiCostPerYear, percentBitCar, tradingPeriodSec, votingPeriodSec);

    if(approvalAdmin) {
        const asset = await retrieveAsset(deployedAssetAddress);

        const assetControlBalletContract = await createAssetBallot(asset, 95, 60, 2592000, approvalAdmin);
        await createAssetControlBallotCategories(assetControlBalletContract, approvalAdmin);

        await createAssetRanks(asset, approvalAdmin);

        await approveAsset(asset, approvalAdmin, approvalDeltaSec, approvalStateLive);
    }
}

async function createAsset(displayName, tokenCode, dataHash, agent, approvalAdmin, listPrice, msiCostPerYear, percentBitCar, tradingPeriodSec, votingPeriodSec, minOwnershipPercentage, numberOfExtensions, escrowPercent, pafPercent, ptfPercent) {
    let assetContract = await listAsset(displayName, tokenCode, agent);
    let asset = await retrieveAssetContract(assetContract.address, tokenCode);
    await prepAssetForContractCreation(asset, dataHash);

    if(approvalAdmin) {
        console.log(chalk.yellow("MSI is now set to 0 - Business decision - it must be incorporated into the list price by the agent."));

        const msiOverride = 0;

        await createTokenAndFeeManager(asset, approvalAdmin, displayName, listPrice, msiOverride, percentBitCar, tradingPeriodSec, votingPeriodSec, minOwnershipPercentage, numberOfExtensions, escrowPercent, pafPercent, ptfPercent);

        console.log('Creating Asset Whitelist...');
        await asset.assetContract.createWhitelist({from: approvalAdmin});
        console.log('Whitelist created.');
    }

    return assetContract.address;
}

async function createAssetBallot(asset, minSoldTokensPercentage, defaultMinVotePercentage, defaultVoteRunningPeriod, adminUser) {

    console.log('Creating Asset Ballot....');

    await asset.assetContract.createAssetBallot(minSoldTokensPercentage, defaultMinVotePercentage, defaultVoteRunningPeriod, {from: adminUser});

    const assetControlBallotContractAddress = await asset.assetContract.getAssetControlBallotAddress();
    const assetControlBallot = await getContractAtAddress(AssetControlBallotContract, assetControlBallotContractAddress);

    console.log('Asset Ballot created.');

    return assetControlBallot;
}

async function approveAsset(asset, approvalAdmin, approvalDeltaSec, approvalStateLive) {

    if(approvalStateLive) {
        await approveAssetForListing(asset, approvalAdmin, approvalDeltaSec);
        let approvalDateSec = await asset.assetToken.birth.call();
        console.log("Asset will be available to buy at:", new Date(approvalDateSec * 1000).toString());
    } else {
        await adminApproveAsset(asset, approvalAdmin, approvalDeltaSec);
    }
}

async function createAssetControlBallotCategories(assetControlBallotContract, adminUser) {
    await createAssetBallotCategory(assetControlBallotContract, "Change Storage Location", 75, adminUser);
    await createAssetBallotCategory(assetControlBallotContract, "Change Insurance", 60, adminUser);
    await createAssetBallotCategory(assetControlBallotContract, "Temporary Display", 75, adminUser);
    await createAssetBallotCategory(assetControlBallotContract, "Other", 90, adminUser);
}

async function createAssetBallotCategory(assetControlBallotContract, title, votingPercentage, adminUser) {
    console.log(chalk.cyan(`Creating new Assot Ballot Category ${title} with voting percentage ${votingPercentage}%.`));
    await assetControlBallotContract.createCategory(title, votingPercentage, {from: adminUser});
}

async function createAssetRanks(asset, adminAccount) {
    const oneDayMinutes = 24 * 60;
    await createRank(asset, adminAccount, "Bronze", RANK_LEVEL.bronze, oneDayMinutes, 100000, 100);
    await createRank(asset, adminAccount, "Silver", RANK_LEVEL.silver, oneDayMinutes, 250000, 1000);
    await createRank(asset, adminAccount, "Gold", RANK_LEVEL.gold, oneDayMinutes, 250000, 30000);
}

async function createRank (asset, adminAccount, levelDisplayText, level, limitDurationMin, rankLimitAmount, userLimitAmount) {
    console.log(chalk.yellow(`Creating Asset Rank level '${levelDisplayText} with limit set to ${limitDurationMin} Minutes for asset ${asset.tokenCode}.`));
    console.log(chalk.cyan(`Total (all) member spend limit in this duration is ${formatNumberForDisplay(rankLimitAmount, false)}.`));
    console.log(chalk.cyan(`Total user limit for this duration is ${formatNumberForDisplay(userLimitAmount, false)}.`));
    const assetRankTracker = await getAssetRankTracker(adminAccount, asset.assetContract);

    const periodInSeconds = minsToSeconds(limitDurationMin);
    const rankLimitWith8dp = convertToSolidityNumber(rankLimitAmount);
    const userLimitAmountWith8dp = convertToSolidityNumber(userLimitAmount);

    assetRankTracker.setRank(level, periodInSeconds, rankLimitWith8dp, userLimitAmountWith8dp, {from: adminAccount});
}

async function getAssetRankTracker (adminAccount, assetContract) {

    let assetRankTrackerAddress = await assetContract.getAssetRankTrackerAddress();

    if(isZeroAddress(assetRankTrackerAddress)) {        
        console.log(chalk.cyan("Deploying new RankTracker as one does not exist yet"));
        await assetContract.createRankTracker({from: adminAccount});
        assetRankTrackerAddress = await assetContract.getAssetRankTrackerAddress();
    }

    return await getContractAtAddress(AssetRankTrackerContract, assetRankTrackerAddress);
}

async function createTokenAndFeeManager(asset, adminUser, tokenName, assetCostUSD, msiPercent, bitcarPercent, tradingTimeSeconds, votingTimeSeconds, minOwnershipPercentage, numberOfExtensions, escrowPercent, pafPercent, ptfPercent) {

    console.log("Creating token " + tokenName + " - " + asset.tokenCode);

    let assetContract = asset.assetContract;

    let totalTokenSupply = convertToSolidityNumber(assetCostUSD);

    let ownershipPercentage = minOwnershipPercentage ? minOwnershipPercentage : 95;

    let maxCycles = numberOfExtensions ? numberOfExtensions * 2 : 2;

    console.log("Creating Asset token");
    await assetContract.createAssetToken(tokenName, asset.tokenCode, totalTokenSupply, ownershipPercentage, tradingTimeSeconds, votingTimeSeconds, maxCycles, {from: adminUser});

    let tokenAddress = await assetContract.getTokenAddress();
    let assetToken = await AssetTokenContract.at(tokenAddress);
    console.log("Token Created", tokenAddress);

    let balance = await assetToken.totalSupply();
    console.log(`Token Supply ${formatNumberForDisplay(balance, false)} with 8 d.p, equates to:`, formatNumberForDisplay(balance, true).toString());

    console.log("Creating asset fees");

    let beePercent = escrowPercent ? escrowPercent : defaultBEEPercent;
    let pafPercentValue = pafPercent ? pafPercent : defaultPAFPercent;
    let ptfPercentValue = ptfPercent ? ptfPercent : defaultPTFPercent;
    let msiPercentValue = msiPercent ? msiPercent : defaultMSIPerYear;

    let bee = Math.round(totalTokenSupply * (beePercent/100));
    let msi = Math.round(totalTokenSupply * (msiPercentValue/100));
    let paf = Math.round(totalTokenSupply * (pafPercentValue/100));
    let ptf = Math.round(totalTokenSupply * (ptfPercentValue/100));

    console.log("Creating Asset fees");
    await assetContract.createFeeManager({from:adminUser});
    console.log('asset contract created');
    const feeManagerAddress = await assetContract.getFeeManagerAddress({from:adminUser});
    let feeManager = await getContractAtAddress(FeeManagerContract, feeManagerAddress);
    feeManager.createDefaultFees(bee, msi, paf, ptf, {from:adminUser});

    console.log("MSI Total: $", formatNumberForDisplay(msi, true));
    console.log("BEE (Bitcar Extension Escrow) Total: $", formatNumberForDisplay(bee, true));
    console.log("PAF (Platform Access Fee) Total: $", formatNumberForDisplay(paf, true));
    console.log("PTF (Platform Transaction Fee) Total: $", formatNumberForDisplay(ptf, true));

    console.log("MSI per token: $", formatNumberForDisplay(msi / assetCostUSD, true));
    console.log("BEE per token: $", formatNumberForDisplay(bee / assetCostUSD, true));
    console.log("PAF per token: $", formatNumberForDisplay(paf / assetCostUSD, true));
    console.log("PTF per token: $", formatNumberForDisplay(ptf / assetCostUSD, true));

    let ethPercent = 100 - bitcarPercent;
    console.log(chalk.cyan(`Setting purchase type percentages ETH:${ethPercent}% BITCAR:${bitcarPercent}%`));
    await assetContract.setPurchasePercentages(bitcarPercent, ethPercent, { from: adminUser });
}

async function retrieveAssetContract (assetAddress, tokenCode) {

    console.log(`Retrieving asset information for address '${assetAddress}'`);

    let asset = new assetHolder(await getContractAtAddress(AssetContract, assetAddress));

    asset.assetAgent = await asset.assetContract.agent.call();
    asset.tokenCode = tokenCode;

    console.log(`Successfully retrieved asset contract '${asset.tokenCode}' agent: '${asset.assetAgent}'`);
    return asset;
}

async function retrieveAsset (assetAddress) {

    console.log(`Retrieving asset information for address '${assetAddress}'`);

    let asset = new assetHolder(await getContractAtAddress(AssetContract, assetAddress));
    asset.assetToken = await getContractAtAddress(AssetTokenContract, await asset.assetContract.getTokenAddress());
    asset.feeManager = await getContractAtAddress(FeeManagerContract, await asset.assetContract.getFeeManagerAddress());
    asset.whitelist = await getContractAtAddress(AssetWhitelistContract, await asset.assetContract.getWhitelistAddress());
    // asset.claimer = await getContractAtAddress(ClaimerContract, await asset.feeManager.getClaimerAddress());

    asset.tokenCode = await asset.assetToken.getSymbol();

    console.log(`Getting fees for asset '${asset.tokenCode}'`);
    asset.escrowFee = await asset.feeManager.getAmount('BEE');
    asset.msiFee = await asset.feeManager.getAmount('MSI');
    asset.pafFee = await asset.feeManager.getAmount('PAF');
    asset.ptfFee = await asset.feeManager.getAmount('PAF');
    asset.assetAgent = await asset.assetContract.agent.call();

    console.log(`Successfully retrieved everything for asset '${asset.tokenCode}'`);
    return asset;
}

async function getAllDeployedAssets (minimumApprovalState) {

    let assets = [];
    const totalAssets = await AssetFactory.size();
    for (let assetIndex = 0; assetIndex < totalAssets; assetIndex++) {

        let assetAddress = await AssetFactory.get(assetIndex);
        let asset = await getContractAtAddress(AssetContract, assetAddress)

        let currentState = await asset.state.call();
        if(currentState < minimumApprovalState) {
            continue;
        }

        let retrievedAsset = await retrieveAsset(await AssetFactory.get(assetIndex));
        assets.push(retrievedAsset);
    }

    return assets;
}

const prepAssetForContractCreation = async (asset, dataHash) => {
    console.log(`Agent data approval for ${asset.tokenCode}, hash: ${dataHash}`);
    await asset.assetContract.agentApproveData(dataHash, {from: asset.assetAgent});
}

const adminApproveAsset = async (asset, adminUser, approvalDeltaSec) => {
    console.log(`Admin data approval for ${asset.tokenCode}, with delta (seconds): ${approvalDeltaSec}`);
    await asset.assetContract.adminApproveData(true, approvalDeltaSec, {from: adminUser});
}

const approveAssetForListing = async (asset, adminUser, approvalDeltaSec) => {
    await adminApproveAsset(asset, adminUser, approvalDeltaSec);

    console.log(`Agent contract approval for ${asset.tokenCode}.`);
    await asset.assetContract.approveContractCreation(true, {from: asset.assetAgent});

    console.log("Asset state is now live and token is activated (pending approval delta).");
}

module.exports = {
    approveAsset,
    initialiseAssetHelper,
    createAsset,
    createAssetBallot,
    createAssetBallotCategory,
    createQuickAsset,
    createRank,
    getAllDeployedAssets,
    retrieveAsset
}