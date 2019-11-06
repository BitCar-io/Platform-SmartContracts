const HDWalletProvider = require("truffle-hdwallet-provider");
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
require('dotenv').config();

const walletProviderWithNonceSupport = function (mnemonic, host, defaultAccount, accountsToUnlock) {
  const wallet = new HDWalletProvider(mnemonic, host, defaultAccount, accountsToUnlock ? accountsToUnlock : 1);
  var nonceTracker = new NonceTrackerSubprovider();
  wallet.engine._providers.unshift(nonceTracker);
  nonceTracker.setEngine(wallet.engine);
  return wallet;
}

module.exports = {
  networks: {
    mainnet: {
        provider: () => walletProviderWithNonceSupport(process.env.MNENOMIC, `${process.env.MAINNET_HOST}${process.env.INFURA_API_KEY}`, 0, process.env.HDWALLET_UNLOCKACCOUNTS),
        network_id: process.env.MAINNET_NETWORKID,
        gas: 7000000,
        gasPrice: 10000000000
    },
    rinkeby: {
        provider: () => walletProviderWithNonceSupport(process.env.MNENOMIC, `${process.env.RINKEBY_HOST}${process.env.INFURA_API_KEY}`, 0, process.env.HDWALLET_UNLOCKACCOUNTS),
        network_id: process.env.RINKEBY_NETWORKID,
        gas: 7000000,
        gasPrice: 10000000000
    },
    ropsten: {
        provider: () => walletProviderWithNonceSupport(process.env.MNENOMIC, `${process.env.ROPSTEN_HOST}${process.env.INFURA_API_KEY}`, 0, process.env.HDWALLET_UNLOCKACCOUNTS),
        network_id: process.env.ROPSTEN_NETWORKID,
        gas: 7000000,
        gasPrice: 10000000000
    },
    staging: {
        provider: () => walletProviderWithNonceSupport(process.env.MNENOMIC, `${process.env.STAGING_HOST}:${process.env.STAGING_PORT}`, 0, process.env.HDWALLET_UNLOCKACCOUNTS),
        network_id: process.env.STAGING_NETWORKID,
        gas: 7000000,
        gasPrice: 10000000000
    },
    development: {
        provider: () => walletProviderWithNonceSupport(process.env.MNENOMIC, `${process.env.DEVELOPMENT_HOST}:${process.env.DEVELOPMENT_PORT}`, 0, process.env.HDWALLET_UNLOCKACCOUNTS),
        network_id: process.env.DEVELOPMENT_NETWORKID,
        gas: 7000000,
        gasPrice: 10000000000
    },
    local: {
        host: process.env.LOCAL_HOST,
        port: process.env.LOCAL_PORT,
        network_id: process.env.LOCAL_NETWORKID,
        gas: 7000000
    },
    local_frontend: {
        host: process.env.LOCAL_HOST,
        port: process.env.LOCAL_PORT,
        network_id: process.env.LOCAL_NETWORKID,
        gas: 7000000
    },
    devHDProvider: {
      provider: () => walletProviderWithNonceSupport(process.env.MNENOMIC, `http://${process.env.LOCAL_HOST}:${process.env.LOCAL_PORT}`, 0, process.env.HDWALLET_UNLOCKACCOUNTS),
        network_id: process.env.LOCAL_NETWORKID,
        gas: 7000000,
        gasPrice: 10000000000
    }
  }, 
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      gasPrice: 21
    }
  }
};