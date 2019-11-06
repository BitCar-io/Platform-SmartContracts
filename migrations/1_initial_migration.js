const Migrations = artifacts.require("Migrations");
const chalk = require('chalk');

module.exports = function(deployer, network, accounts) {

  console.log(`truffle network configuration: ${network}.`);

  console.log(`\n${chalk.yellow("*** Environment Variables set ***")}`);
  if(network === "devnet") {
    console.log(`\n DEVNET_HOST:\t${process.env.DEVNET_HOST}
    \n DEVNET_HOSTPORT:\t${process.env.DEVNET_HOSTPORT}
    \n DEVNET_NETWORKID:\t${process.env.DEVNET_NETWORKID}
    \n HDWALLET_UNLOCKACCOUNTS:\t${process.env.HDWALLET_UNLOCKACCOUNTS}`);

  } else if(network === "development") {
    console.log(`\n \n BLOCKCHAIN_HOST:\t${process.env.DEVELOPMENT_HOST}
    \n BLOCKCHAIN_HOSTPORT:\t${process.env.DEVELOPMENT_PORT}
    \n BLOCKCHAIN_NETWORKID:\t${process.env.DEVELOPMENT_NETWORKID}`);
  }

  console.log(`
  \n LOCALTICKER:\t${process.env.LOCALTICKER}
  \n TICKER_EPOCH_MINUTES:\t${process.env.TICKER_EPOCH_MINUTES}
  \n REDEPLOY_PLATFORM_TOKEN:\t${process.env.REDEPLOY_PLATFORM_TOKEN}
  \n ${chalk.yellow("*********")}`);
  
  // Deploy the Migrations contract as our only task
  deployer.deploy(Migrations);
};