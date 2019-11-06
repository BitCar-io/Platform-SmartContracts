const { getUserAccounts } = require("./util/helpers.js");
const chalk = require('chalk');

const { initialiseUserHelper, addToAdminAndVerify,
    addToAgentAndVerify,
    addToSudo,
    addToTrader } = require("./util/platformUsers");

const { euWhitelist,
    otherWhitelist,
    ukWhitelist} = require('./util/whitelist');

module.exports = function(deployer, network, accounts) {

    if(network === "mainnet" || network === "rinkeby" || network === "ropsten" || network === "local") {
        console.log(chalk.yellow(`Not running ${__filename} as network is either mainnet, rinkeby, ropsten or local`));
        return;
    }

    const users = getUserAccounts(accounts);

    deployer.then(async () => {

        await initialiseUserHelper(artifacts);

        const ownerAddr = users.ownerAddr;
        const sudo0 = users.sudo0;

        console.log("Creating Sudo Users..\n");
        await addToSudo(sudo0);
        await addToSudo(users.sudo1);

        console.log("\nCreating Admin Users..\n");
        await addToAdminAndVerify(users.admin0, sudo0);
        await addToAdminAndVerify(users.admin1, sudo0);

        console.log("\nCreating and verifying Agent Users..\n");
        await addToAgentAndVerify(users.agent0, users.admin0);
        await addToTrader(users.agent0, users.admin0, true, web3, ownerAddr, null, otherWhitelist.code);
        await addToAgentAndVerify(users.agent1, users.admin0);
        await addToTrader(users.agent1, users.admin0, true, web3, ownerAddr, null, otherWhitelist.code);
        
        console.log("\nCreating traders..")
        await addToTrader(users.trader0, users.admin0, true, web3, ownerAddr, users.coldStorageTrader0, otherWhitelist.code);
        await addToTrader(users.trader1, users.admin0, true, web3, ownerAddr, users.coldStorageTrader1, otherWhitelist.code);
        await addToTrader(users.trader2, users.admin0, true, web3, ownerAddr, users.coldStorageTrader2, otherWhitelist.code);
        await addToTrader(users.trader3, users.admin0, true, web3, ownerAddr, users.coldStorageTrader3, otherWhitelist.code);
        // await addToTrader(users.trader4, users.admin0, true, web3, ownerAddr, null, ukWhitelist.code);
        // await addToTrader(users.trader5, users.admin0, true, web3, ownerAddr, null, euWhitelist.code);
        // await addToTrader(users.trader6, users.admin0, true, web3, ownerAddr, null, euWhitelist.code);
        // await addToTrader(users.trader7, users.admin0, true, web3, ownerAddr, null, otherWhitelist.code);

        console.log("\nUnregistered Users..\n");
        for (let i = 6; i < accounts.length; i++) {
            console.log(accounts[i]);
        }
    });
};
