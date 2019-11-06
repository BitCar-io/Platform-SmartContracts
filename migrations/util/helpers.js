const BigNumber = require('bignumber.js');
const chalk = require('chalk');

const emptyAddress = "0x0000000000000000000000000000000000000000";

const convertToSolidityNumber = value => {
    return value * Math.pow(10, 8);
}

const convertFromSolidityNumber = value => {
    return value / Math.pow(10, 8);
}

const etherToWei = value => {
    return new BigNumber((value * Math.pow(10, 18)).toString());
}

const getContract = async contract => {
    return await getContractAtAddress(contract, contract.address);
}

const getContractAtAddress = async (contract, address) => {
    return await contract.at(address);
}

const getBitCarToken = async (artifacts) => {
    const RegistryContract = artifacts.require('Registry.sol');
    const Registry = await getContract(RegistryContract);
    const BitCarTokenContractAddress = await Registry.getAddress("PlatformToken");
    return await getContractAtAddress(artifacts.require('token/PlatformToken.sol'), BitCarTokenContractAddress);
}

const isZeroAddress = (address) => {
    return address.toString() === emptyAddress;
}

const formatNumberForDisplay = (number, removeDecimals) => {
    let value = (removeDecimals ? convertFromSolidityNumber(number) : number).toString();
    let values = value.split('.');
    return `${values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${values.length > 1 ? values[1] : "0"}`;
}

const sleep = sleepTime => new Promise(resolve => setTimeout(resolve, sleepTime));

const yearsToSeconds = (years) => {
    return daysToSeconds(years * 365);
}

const daysToSeconds = (days) => {
    return days * 86400;
}

const minsToSeconds = (minutes) => {
    return minutes * 60;
}

// From Asset.sol
const approvalState = {
    PENDING_AGENT_DATA_APPROVAL: 0,
    PENDING_ADMIN_DATA_APPROVAL: 1,
    PENDING_AGENT_CONTRACT_APPROVAL: 2,
    LIVE: 3
};

const setBitCarTicker = async (artifacts, valueBitCarUSD) => {
    let Ticker = await getContract(artifacts.require("Ticker.sol"));

    let tickerValue = 681660;
    if(valueBitCarUSD) {
        tickerValue = Math.round(convertToSolidityNumber(valueBitCarUSD));
    }

    console.log(`Setting BITCAR/USD Ticker.setUSD(${tickerValue})`);

    await Ticker.setUSD(tickerValue);
}

const setEthTicker = async (artifacts, valueETHUSD) => {
    let Ticker = await getContract(artifacts.require("Ticker.sol"));

    console.log(`Setting ETH/USD Ticker.setETH(${valueETHUSD})`);

    // ticker requires 8dp
    await Ticker.setETH(convertToSolidityNumber(valueETHUSD));
}

const RANK_LEVEL = {
    bronze: 0,
    silver: 1,
    gold: 2
};

const setUserRank = async (artifacts, adminAccount, userAddress, rankLevel) => {
    const RankTrackerContract = artifacts.require("RankTracker.sol");
    const rankTracker = await getContract(RankTrackerContract);

    rankTracker.setUserRank(userAddress, rankLevel, {from: adminAccount});
}

let loadedAccounts = undefined;

const getUserAccounts = (accounts) => {

   if(loadedAccounts) {
       // console.log("Accounts already loaded", loadedAccounts);
       return loadedAccounts;
   }

   loadedAccounts = {
       ownerAddr: accounts[0],
       sudo0: accounts[1],
       sudo1: accounts[2],
       admin0: accounts[3],
       admin1: accounts[4],
       agent0: accounts[5],
       agent1: accounts[6],
       trader0: accounts[7],
       trader1: accounts[8],

       trader2: accounts[9],
       trader3: accounts[10],
       trader4: accounts[11],
       trader5: accounts[12],
       trader6: accounts[13],
       trader7: accounts[14],
       trader8: accounts[15],

       unregisteredUser0: accounts[16],

       etherAccount0: accounts[17],
       etherAccount1: accounts[18],

       oraclizeAccount: accounts[20],

       coldStorageTrader0: '0x5edb9143befacd4df4a7c417ea9bc03d74d26610', //   (Account Index 40)
       coldStorageTrader1: '0xc5682ea5cef19cfc57d20dd2941ea61ec03ac37c', //   (Account Index 41)
       coldStorageTrader2: '0x0ed1f9fedd4f547a30c88333c61984d3a085934c', //   (Account Index 42)
       coldStorageTrader3: '0x86c58e2e3b8167d01b960ad7bf1387587588f31a' //   (Account Index 43)
   };

   console.log("Account mapping used by Truffle Migrate:-\n", loadedAccounts);

   return loadedAccounts;
}

const BITCAR_TOKEN_ADDRESSES = {
    mainnet: "0x08b4c866ae9d1be56a06e0c302054b4ffe067b43",
    rinkeby: "0xE84ED9deA7145CC94f1eF15b5341926ac8aEb457",
    ropsten: "0x83Ebf5C4Ac7a45db52AC7fD3Af02F73A3cd33b9E"
}

module.exports = {
    approvalState,
    convertToSolidityNumber,
    convertFromSolidityNumber,
    daysToSeconds,
    emptyAddress,
    etherToWei,
    getContract,
    getContractAtAddress,
    getBitCarToken,
    getUserAccounts,
    isZeroAddress,
    formatNumberForDisplay,
    BITCAR_TOKEN_ADDRESSES,
    minsToSeconds,
    RANK_LEVEL,
    setBitCarTicker,
    setEthTicker,
    setUserRank,
    sleep,
    yearsToSeconds
}