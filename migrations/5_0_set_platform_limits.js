const { convertToSolidityNumber, getContract, getUserAccounts, RANK_LEVEL } = require("./util/helpers.js");
const chalk = require('chalk');

module.exports = function(deployer, network, accounts) {

    if(network === "mainnet" || network === "rinkeby" || network === "ropsten" || network === "local") {
        console.log(chalk.yellow(`Not running ${__filename} as network is either mainnet, rinkeby, ropsten or local`));
        return;
    }

    deployer.then(async () => {

        const RankTrackerContract = artifacts.require("RankTracker.sol");
        
        let RankTracker = await getContract(RankTrackerContract);

        const users = getUserAccounts(accounts);

        console.log('Setting Bronze platform limit to 14,000');
        await RankTracker.setGlobalLimit(RANK_LEVEL.bronze, convertToSolidityNumber(14000), {from: users.admin0});

        console.log('Setting Silver platform limit to 24,000');
        await RankTracker.setGlobalLimit(RANK_LEVEL.silver, convertToSolidityNumber(24000), {from: users.admin0});

        console.log('Setting Gold platform limit to 50,000,000');
        await RankTracker.setGlobalLimit(RANK_LEVEL.gold, convertToSolidityNumber(50000000), {from: users.admin0});

        let confirmations = await Promise.all([RankTracker.getGlobalLimit(RANK_LEVEL.bronze),
            RankTracker.getGlobalLimit(RANK_LEVEL.silver),
            RankTracker.getGlobalLimit(RANK_LEVEL.gold)]);

        console.log(chalk.yellow(`Confirm Rank '${RANK_LEVEL.bronze}' set to ${confirmations[0].toString()}`));
        console.log(chalk.yellow(`Confirm Rank '${RANK_LEVEL.silver}' set to ${confirmations[1].toString()}`));
        console.log(chalk.yellow(`Confirm Rank '${RANK_LEVEL.gold}' set to ${confirmations[2].toString()}`));
    });
}
