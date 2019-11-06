const chalk = require('chalk');
const {approvalState, getUserAccounts } = require("./util/helpers");
const {getAllDeployedAssets, initialiseAssetHelper } = require('./util/assets');

const { initialiseWhitelistHelper,
    addCountryToAssetAndEnableWhitelist,
    addUserToWhitelist,
    euWhitelist,
    otherWhitelist,
    setClaimerTransfers,
    setInitialPurchases,
    setP2PTransfers,
    ukWhitelist} = require('./util/whitelist');

module.exports = function(deployer, network, accounts) {

    if(network !== "local_frontend") {
        console.log(chalk.yellow(`Not running ${__filename} as network is not local_frontend`));
        return;
    }

    deployer.then(async () => {

        await initialiseAssetHelper(artifacts);
        await initialiseWhitelistHelper(artifacts);

        const users = getUserAccounts(accounts);
        const admin0 = users.admin0;

        // await addUserToWhitelist(admin0, 'trader0', users.trader0, ukWhitelist);
        // await addUserToWhitelist(admin0, 'trader1', users.trader1, ukWhitelist);
        // await addUserToWhitelist(admin0, 'trader2', users.trader2, ukWhitelist);
        // await addUserToWhitelist(admin0, 'trader3', users.trader3, ukWhitelist);
        // await addUserToWhitelist(admin0, 'trader4', users.trader4, ukWhitelist);
        // await addUserToWhitelist(admin0, 'trader5', users.trader5, euWhitelist);
        // await addUserToWhitelist(admin0, 'trader6', users.trader6, euWhitelist);
        // await addUserToWhitelist(admin0, 'trader7', users.trader7, otherWhitelist);
    
        const allAssets = await getAllDeployedAssets(approvalState.LIVE);

        for (let index = 0; index < allAssets.length; index++) {
            let asset = allAssets[index];            
            
            await addCountryToAssetAndEnableWhitelist(asset, admin0, ukWhitelist);
            await setInitialPurchases(asset, admin0, true);
            await setP2PTransfers(asset, admin0, true);
            await setClaimerTransfers(asset, admin0, true);
        }

        let bugattiVeyron = allAssets.find(asset => asset.tokenCode === "BVEY-08");
        let ferrariF40 = allAssets.find(asset => asset.tokenCode === "FF40-88");
        let ferrariF401 = allAssets.find(asset => asset.tokenCode === "FF40-881");
        let ferrariF402 = allAssets.find(asset => asset.tokenCode === "FF40-882");
        let ferrari599 = allAssets.find(asset => asset.tokenCode === "F599-11");

        if(bugattiVeyron) {
            await setP2PTransfers(bugattiVeyron, admin0, false);
        }

        if(ferrariF40) {
            await addCountryToAssetAndEnableWhitelist(ferrariF40, admin0, euWhitelist);
            await addCountryToAssetAndEnableWhitelist(ferrariF40, admin0, otherWhitelist);
        }

        if(ferrariF401) {
            await addCountryToAssetAndEnableWhitelist(ferrariF401, admin0, euWhitelist);
            await addCountryToAssetAndEnableWhitelist(ferrariF401, admin0, otherWhitelist);
        }

        if(ferrariF402) {
            await addCountryToAssetAndEnableWhitelist(ferrariF402, admin0, euWhitelist);
            await addCountryToAssetAndEnableWhitelist(ferrariF402, admin0, otherWhitelist);
        }

        if(ferrari599) {
            await addCountryToAssetAndEnableWhitelist(ferrari599, admin0, euWhitelist);
            await addCountryToAssetAndEnableWhitelist(ferrari599, admin0, otherWhitelist);
        }
    });
}