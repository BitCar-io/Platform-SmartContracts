const { emptyAddress, getContract, getUserAccounts } = require("./helpers.js");
const {
    cryptoRandomNumber,
    binarySha3
} = require('../../test/helpers/utils.js');
const crypto = require('crypto');
const chalk = require('chalk');

let isInitialised = false;

let AdminAccCtrl = undefined;
let AgentAccCtrl = undefined;
let SudoAccCtrl = undefined;
let TraderAccCtrl = undefined;
let KycProcessTracker = undefined;

let randomBytes;

async function initialiseUserHelper(artifacts) {

    if(isInitialised) {
        return;
    }

    console.log('Initialising User Helper');

    AdminAccCtrl = await getContract(artifacts.require('governance/Admin.sol'));
    AgentAccCtrl = await getContract(artifacts.require('governance/Agent.sol'));
    SudoAccCtrl = await getContract(artifacts.require('governance/Sudo.sol'));
    TraderAccCtrl = await getContract(artifacts.require('governance/Trader.sol'));
    KycProcessTracker = await getContract(artifacts.require('KycProcessTracker.sol'));

    randomBytes = crypto.randomBytes(cryptoRandomNumber(1024, 4096));

    isInitialised = true;
}

function getUsername (accounts, address) {
    const users = getUserAccounts(accounts);
    const userNames = Object.keys(users);
    return userNames[accounts.indexOf(address)];
}

async function addToAdminAndVerify (address, sudoUserAddress) {
    await AdminAccCtrl.addAddressToAdminGroup(address, { from: sudoUserAddress });
    AdminAccCtrl.verify(address, true, { from: sudoUserAddress });
    return logUserAddress("Admin", address);
}

async function addToAgentAndVerify (address, adminUserAddress) {
    await AgentAccCtrl.addAddressToAgentsGroup(address, { from: adminUserAddress });
    await AgentAccCtrl.verify(address, true, { from: adminUserAddress });
    return logUserAddress("Agent", address);
}

async function addToSudo (address) {
    await SudoAccCtrl.addAddressToSudoGroup(address);
    return logUserAddress("Sudo", address);
}

async function addToTrader (address, adminUserAddress, useKyc, web3, ownerAddress, storageAddress, whitelistNumber) {
    if(useKyc) {
        await doKycAndAddUserToTraderGroup(address, storageAddress, ownerAddress, web3, whitelistNumber);
    } else {
        await TraderAccCtrl.addAddressToTradersGroup(address, { from: adminUserAddress });
    }
    return logUserAddress("Trader", address);
}

function logUserAddress (role, address) {
    console.log(`Address:${address} registered as ${role}.`);
    return address;
}

async function doKycAndAddUserToTraderGroup(address, storageAddress, ownerAddress, web3, whitelistNumber) {
    console.log(`Getting KYC data signature '${address}'`);

    const storageAddressToUse = storageAddress ? storageAddress : emptyAddress;

    const rndDataSig = await getSignature(address, randomBytes, web3);

    console.log(`Submitting KYC for User Address '${address}' | Storage Address: ${storageAddressToUse} | Whitelist:`, whitelistNumber);

    await KycProcessTracker.submitDocumentDigestAndSignature(
        whitelistNumber ? whitelistNumber : 999,             // uint256 _region (dummy used just for migration KYC)
        0,             // uint8 _membership (defaulted to Bronze)
        storageAddressToUse, // address _storageAddr
        77,             // uint8 _docType
        rndDataSig.h,   // bytes32 _hash
        rndDataSig.v,   // uint8 _v
        rndDataSig.r,   // bytes32 _r
        rndDataSig.s,   // bytes32 _s
        { from: address }).catch(error => {
            console.log(chalk.red('submitDocumentDigestAndSignature failed to run', error));
            console.log(chalk.yellow('DataSignature obtained: ', rndDataSig));
            throw 'KYC process failed.';
        });

    await KycProcessTracker.confirmDocument(address, rndDataSig.h, {from: ownerAddress});

    const customerCreated = await KycProcessTracker.getCustomer(address);

    if(!customerCreated) {
        console.log(chalk.red('Could not retrieve customer data using getCustomer method'));
    } else {
        // console.log("Customer created", customerCreated);
    }
}

const getSignature = async (
    _user,
    _data,
    web3
) => {
    dataSig = await signData(_user, _data, web3)
    return dataSig
}

const signData = async (
    _account,
    _dataBuffer,
    web3
) => {
    let h = binarySha3(_dataBuffer)
    let rawSig = await web3.eth.sign(h, _account)
    rawSig = rawSig.slice(2)
    let r = `0x${rawSig.slice(0, 64)}`
    let s = `0x${rawSig.slice(64, 128)}`
    let v = await web3.utils.hexToNumber(rawSig.slice(128, 130)) + 27
    rawSig = '0x' + rawSig
    return {
        rawSig,
        h,
        v,
        r,
        s
    }
}


module.exports = {
    addToAdminAndVerify,
    addToAgentAndVerify,
    addToSudo,
    addToTrader,
    getUsername,
    initialiseUserHelper
}