const { getContract } = require("./helpers.js");
const chalk = require('chalk');

let isInitialised = undefined;

const euWhitelist = createWhitelistCountryForMigration(1, "EU");
const otherWhitelist = createWhitelistCountryForMigration(999, "Other");
const ukWhitelist = createWhitelistCountryForMigration(826, "UK");

function createWhitelistCountryForMigration(code, text) {
    return {code: code, text: text};
}

async function initialiseWhitelistHelper(artifacts) {

    if(isInitialised) {
        return;
    }

    console.log('Initialising Whitelist Helper');

    PlatformWhitelist = await getContract(artifacts.require('Whitelist.sol'));

    isInitialised = true;
}

async function addUserToWhitelist(adminUser, userText, userAddress, migrationWhitelist) {
    console.log(chalk.yellow(`Adding User '${userText}' (${userAddress}) to Whitelist Country '${migrationWhitelist.text}' (# ${migrationWhitelist.code}).`));

    const isInWhitelist = await PlatformWhitelist.isWhitelisted(userAddress, [migrationWhitelist.code], {from: adminUser});

    if(isInWhitelist) {
        return;
    }

    await PlatformWhitelist.add(userAddress, migrationWhitelist.code, {from: adminUser});
}

async function addCountryToAssetAndEnableWhitelist(asset, adminUser, migrationWhitelist) {
    console.log(chalk.yellow(`Adding Whitelist Country '${migrationWhitelist.text}' (# ${migrationWhitelist.code}) to asset ${asset.tokenCode} and enabling Whitelist`));
    await asset.whitelist.addCountry(migrationWhitelist.code, {from: adminUser});
    await asset.whitelist.setEnabled(true, {from: adminUser});
}

async function setInitialPurchases(asset, adminUser, setValue) {
    const valueText = setValue ? "Enforcing" : "Disabling";
    console.log(chalk.yellow(`${valueText} Whitelists for Initial Purchases on asset ${asset.tokenCode}.`));
    await asset.whitelist.setInitialPurchases(setValue, {from: adminUser});
}

async function setP2PTransfers(asset, adminUser, setValue) {
    const valueText = setValue ? "Enforcing" : "Disabling";
    console.log(chalk.yellow(`${valueText} Whitelists for P2P on asset ${asset.tokenCode}.`));
    await asset.whitelist.setP2PTransfers(setValue, {from: adminUser});
}

async function setClaimerTransfers(asset, adminUser, setValue) {
    const valueText = setValue ? "Enforcing" : "Disabling";
    console.log(chalk.yellow(`${valueText} Whitelists for Claimer on asset ${asset.tokenCode}.`));
    await asset.whitelist.setClaimerTransfers(setValue, {from: adminUser});
}

module.exports = {
    addCountryToAssetAndEnableWhitelist,
    addUserToWhitelist,
    createWhitelistCountryForMigration,
    euWhitelist,
    initialiseWhitelistHelper,
    otherWhitelist,
    setClaimerTransfers,
    setInitialPurchases,
    setP2PTransfers,
    ukWhitelist
}