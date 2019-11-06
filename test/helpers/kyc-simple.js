const {
    cryptoRandomNumber,
    binarySha3
} = require('../../test/helpers/utils.js');
const crypto = require('crypto');
const chalk = require('chalk');

const sig = require('../helpers/sig');

const RegistryContract = artifacts.require('Registry.sol');

class SimpleKycHelper {

    constructor(platformHelper) {
        this.platformHelper = platformHelper;

        this.KycProcessTracker = undefined;
        this.Registry = undefined;
        this.isInitialised = false;
    }

    async setup (ownerAddr) {

        if(this.isInitialised) {
            return;
        }

        this.ownerAddr = ownerAddr;

        await this.platformHelper.setup();

        this.Registry = await RegistryContract.deployed();
        this.KycProcessTracker = this.platformHelper.KycProcessTracker;
        this.platformHelper.AdminAccCtrl.addAddressToAdminGroup(this.KycProcessTracker.address, { from: this.ownerAddr});
        await this.platformHelper.AdminAccCtrl.verify(this.KycProcessTracker.address, true, { from: this.ownerAddr });

        this.isInitialised = true;
    }

    async doKycAndAddUserToTraderGroup(tradeableAddress, storageAddress) {

        if(!this.isInitialised || !this.platformHelper.isInitialised) {
            throw new Error("Please run setup method of SimpleKycHelper and PlatformHelper before calling doKycAndAddUserToTraderGroup");
        }

        const storageAddressToUse = storageAddress ? storageAddress : "0x0000000000000000000000000000000000000000";

        const rndDataSig = await sig.signData(tradeableAddress, crypto.randomBytes(cryptoRandomNumber(1024, 4096)));

        console.log(`Submitting KYC for User Address '${tradeableAddress}' | Storage Address:`, storageAddressToUse);

        await this.KycProcessTracker.submitDocumentDigestAndSignature(
            999,             // uint256 _region (dummy used just for migration KYC)
            0,             // uint8 _membership (defaulted to Bronze)
            storageAddressToUse, // address _storageAddr
            77,             // uint8 _docType
            rndDataSig.h,   // bytes32 _hash
            rndDataSig.v,   // uint8 _v
            rndDataSig.r,   // bytes32 _r
            rndDataSig.s,   // bytes32 _s
            { from: tradeableAddress }).catch(error => {
                console.log(chalk.red('submitDocumentDigestAndSignature failed to run', error));
                console.log(chalk.yellow('DataSignature obtained: ', rndDataSig));
                throw 'KYC process failed.';
            });

        await this.KycProcessTracker.confirmDocument(tradeableAddress, rndDataSig.h, {from: this.ownerAddr});

        const customerCreated = await this.KycProcessTracker.getCustomer(tradeableAddress);

        if(!customerCreated) {
            console.log(chalk.red('Could not retrieve customer data using getCustomer method'));
        } else {
            console.log(chalk.green('Successfully created customer data.'));
        }

        return true;
    }
}

module.exports = {
    SimpleKycHelper
}