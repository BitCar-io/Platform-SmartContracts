const {convertToSolidityNumber, formatNumberForDisplay, getBitCarToken, getUserAccounts} = require("./util/helpers");

const chalk = require('chalk')

module.exports = function(deployer, network, accounts) {
    if(network === "mainnet" || network === "rinkeby" || network === "ropsten" || network === "local") {
        console.log(chalk.yellow(`Not running ${__filename} as network is either mainnet, rinkeby, ropsten or local`));
        return;
    }

    deployer.then(async () => {

        const users = getUserAccounts(accounts);

        const userNames = Object.keys(users);

        let BitCarToken = await getBitCarToken(artifacts);

        console.log("Deployed BITCAR Test token. Address to add to MetaMask:", BitCarToken.address);
        let totalSupply = await BitCarToken.totalSupply();
        console.log("Total Supply:", totalSupply.toString());

        async function giveTokensToUser (transferTo, transferFrom, tokenAmount) {

            let accountID = accounts.indexOf(transferTo);
            let username = userNames[accountID];

            let transferAmount =  convertToSolidityNumber(tokenAmount);
            await BitCarToken.transfer(transferTo, transferAmount, {from: transferFrom});
            let userBalance = await BitCarToken.balanceOf(transferTo);

            console.log(`User BITCAR Balance is now ${formatNumberForDisplay(userBalance, true)}`, userBalance.toString());
            console.log((userBalance.toString() === transferAmount.toString() ? "Successfully transferred " : chalk.red("Failed to transfer ")) + `${transferAmount} BITCAR from owner to user ${username} address ${transferTo}`);
        }

        let ownerBalance = await BitCarToken.balanceOf(users.ownerAddr);

        console.log(`Owner BITCAR balance ${formatNumberForDisplay(ownerBalance, true)}`, ownerBalance.toString());

        await giveTokensToUser(users.sudo0, users.ownerAddr, 100000);
        await giveTokensToUser(users.sudo1, users.ownerAddr, 100000);
        await giveTokensToUser(users.admin0, users.ownerAddr, 250000);
        await giveTokensToUser(users.admin1, users.ownerAddr, 250000);
        await giveTokensToUser(users.agent0, users.ownerAddr, 20000000);
        await giveTokensToUser(users.agent1, users.ownerAddr, 20000000);
        await giveTokensToUser(users.trader0, users.ownerAddr, 50000000);
        await giveTokensToUser(users.trader1, users.ownerAddr, 50000000);
        await giveTokensToUser(users.trader2, users.ownerAddr, 50000000);
        await giveTokensToUser(users.trader3, users.ownerAddr, 50000000);
        await giveTokensToUser(users.trader4, users.ownerAddr, 50000000);
        await giveTokensToUser(users.trader5, users.ownerAddr, 50000000);
        await giveTokensToUser(users.trader6, users.ownerAddr, 50000000);
        await giveTokensToUser(users.trader7, users.ownerAddr, 50000000);
        await giveTokensToUser(users.unregisteredUser0, users.ownerAddr, 50000000);

        ownerBalance = await BitCarToken.balanceOf(users.ownerAddr);

        console.log(`Owner BITCAR balance ${formatNumberForDisplay(ownerBalance, true)}`, ownerBalance.toString());
    });
}