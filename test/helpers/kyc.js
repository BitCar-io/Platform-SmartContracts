const {
    setupBaseContracts
} = require('./general.js')

const KycProcessTracker = artifacts.require('./platform/kyc/KycProcessTracker.sol')

const Whitelist = artifacts.require('./whitelist/Whitelist.sol')

const crypto = require("crypto")

const {
    cryptoRandomNumber,
    stringSha3,
    bufferToHexString,
    logger
} = require('./utils.js')

const {
    signData
} = require('./sig.js')

const fileSys = require('fs')

const setupContracts = async (
    owner,
    admin,
    fundsRecipient,
    binFilePath,
    textFilePath
) => {
    let kpt
    let rnd
    let bin
    let txt
    let reg

    const contracts = await setupBaseContracts(owner)
    adm = contracts.adm
    reg = contracts.stc
    await adm.addAddressToAdminGroup(admin, { from: owner })
    await adm.verify(admin, true, { from: owner })
    let wlt = await Whitelist.new(reg.address, { from: owner })
    await reg.setAddress("Whitelist", wlt.address, { from: owner })
    kpt = await KycProcessTracker.new(fundsRecipient, reg.address, { from: owner })
    await adm.addAddressToAdminGroup(kpt.address, { from: owner })
    await adm.verify(kpt.address, true, { from: owner })

    // Generating random data from 5MB to 20MB in size
    rnd = crypto.randomBytes(cryptoRandomNumber(1024 * 1024, 2 * 1024 * 1024))
    bin = fileSys.readFileSync(binFilePath)
    txt = fileSys.readFileSync(textFilePath)

    return {
        kpt,
        rnd,
        bin,
        txt
    }
}

const getSignature = async (
    _user,
    _data
) => {
    logger("", 0)
    logger("Data length (in MB): " + (_data.length / (1024 * 1024)), 1);
    let start = new Date()
    dataSig = await signData(_user, _data)
    logger("Data signing exec time " + (new Date() - start) + " ms.", 1)
    logger("sha3: " + dataSig.h, 1)
    logger("sha3 control ok?: " + (stringSha3(bufferToHexString(_data)) === dataSig.h), 1)
    logger("raw signature: " + dataSig.rawSig, 1)
    logger("v: " + dataSig.v, 1)
    logger("r: " + dataSig.r, 1)
    logger("s: " + dataSig.s, 1)
    return dataSig
}

module.exports = {
    setupContracts,
    getSignature
}
