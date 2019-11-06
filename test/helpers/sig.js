const {
    binarySha3
} = require('./utils.js')

/**
 * Signs the data represented in the object _dataBuffer using _account as the account for the signature
 * @param {*} _account 
 * @param {*} _dataBuffer 
 */
const signData = async (
    _account,
    _dataBuffer
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
    signData
}
