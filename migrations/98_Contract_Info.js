const {formatNumberForDisplay, getBitCarToken, getUserAccounts} = require("./util/helpers");
const chalk = require('chalk');
const cTable = require('console.table');

module.exports = function(deployer, network, accounts) {

    deployer.then(async () => {

        function createContractInfo(contractPath) {
            let contract = artifacts.require(contractPath);
            return getContractInfo(contract.contractName, contract.address);
        }

        function getContractInfo(contractName, address) {
            return {Contract: contractName.replace(".sol", ""), Address: address};
        }

        let BitCarToken = await getBitCarToken(artifacts);

        let contractData = [];

        contractData.push(createContractInfo("AssetFactory.sol"));
        contractData.push(createContractInfo('Admin.sol'));
        contractData.push(createContractInfo('Agent.sol'));
        contractData.push(createContractInfo('KycProcessTracker.sol'));
        contractData.push(getContractInfo("BitCarToken (PlatformToken)", BitCarToken.address));
        contractData.push(createContractInfo('RankTracker.sol'));
        contractData.push(createContractInfo("Registry.sol"));
        contractData.push(createContractInfo('Sudo.sol'));
        contractData.push(createContractInfo('Ticker.sol'));
        contractData.push(createContractInfo('Trader.sol'));
        contractData.push(createContractInfo('Whitelist.sol'));

        console.table(contractData);
        
        // if(network === "mainnet" || network === "rinkeby" || network === "ropsten" || network === "local") {
        //     console.log(chalk.yellow(`Not running ${__filename} as network is either mainnet, rinkeby, ropsten or local`));
        //     return;
        // }

        

        // const users = getUserAccounts(accounts);
        // let userNames = Object.keys(users);

        // let userData = [];

        // for (let index = 0; index < userNames.length; index++) {
        //     let userName = userNames[index];
        //     let userAddress = users[userName];
        //     let accountID = accounts.indexOf(userAddress);
        //     let rawBitCar = await BitCarToken.balanceOf(userAddress);
        //     let BITCAR = rawBitCar > 0 ? formatNumberForDisplay(rawBitCar, true) : 0;

        //     userData.push({UserName: userName, GanacheID: accountID, BITCARBalance: BITCAR, PublicAddress: userAddress});
        // }

        // console.table(userData);

        // console.log(chalk.cyan("**** BITCAR token Address:", BitCarToken.address));
    });
}