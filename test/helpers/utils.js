const crypto = require('crypto')
const chalk = require('chalk')
const CryptoJS = require('crypto-js')
const sha3 = require('crypto-js/sha3')

/**
 * Generating random numbers in specific range using crypto.randomBytes from crypto library
 * Maximum available range is 281474976710655 or 256^6-1
 * Maximum number for range must be equal or less than Number.MAX_SAFE_INTEGER (usually 9007199254740991)
 * Usage examples:
 * cryptoRandomNumber(0, 350);
 * cryptoRandomNumber(556, 1250425);
 * cryptoRandomNumber(0, 281474976710655);
 * cryptoRandomNumber((Number.MAX_SAFE_INTEGER-281474976710655), Number.MAX_SAFE_INTEGER);
 * 
 * @param {*} minimum 
 * @param {*} maximum 
 */
const cryptoRandomNumber = (minimum, maximum) => {

    var distance = maximum - minimum

    if (minimum >= maximum) {
        console.log(chalk.red('Minimum number should be less than maximum'))
        return false
    } else if (distance > 281474976710655) {
        console.log(chalk.red('You can not get all possible random numbers if range is greater than 256^6-1'))
        return false
    } else if (maximum > Number.MAX_SAFE_INTEGER) {
        console.log(chalk.red('Maximum number should be safe integer limit'))
        return false
    } else {
        let maxBytes = 6
        let maxDec = 281474976710656

        // To avoid huge mathematical operations and increase function performance for small ranges: 
		if(distance<256){
			maxBytes = 1
			maxDec = 256
		} else if(distance<65536){
			maxBytes = 2
			maxDec = 65536
		} else if(distance<16777216){
			maxBytes = 3
			maxDec = 16777216
		} else if(distance<4294967296){
			maxBytes = 4
			maxDec = 4294967296
		} else if(distance<1099511627776){
			maxBytes = 4
			maxDec = 1099511627776
		}

        let randbytes = parseInt(crypto.randomBytes(maxBytes).toString('hex'), 16)
        let result = Math.floor(randbytes / maxDec * (maximum - minimum + 1) + minimum)

        if (result > maximum) {
            result = maximum
        }
        return result
    }
}

/**
 * Trucates decimal of the given number
 * @param {*} number 
 */
const truncateDecimals = async (number) => {
    return Math[number < 0 ? 'ceil' : 'floor'](number)
}

/**
 * Transforms HexStr into an array of integers
 * @param {*} _hexStr The HexStr
 */
const parseHexString = (
    _hexStr
) => {
    let result = []
    if (_hexStr.length > 2 && _hexStr.substr(0, 2) === '0x') {
        _hexStr = _hexStr.substr(2)
    }
    while (_hexStr.length >= 8) {
        result.push(parseInt(_hexStr.substring(0, 8), 16))
        _hexStr = _hexStr.substring(8, _hexStr.length)
    }
    return result
}

/**
 * Transforms an array into a HexString
 * @param {*} _arr The array being transformed into a HexString
 */
const arrayToHexString = (
    _arr
) => {
    let result = ""
    let z
    for (let i = 0; i < _arr.length; i++) {
        let str = _arr[i].toString(16)
        z = 8 - str.length + 1
        str = Array(z).join("0") + str
        result += str
    }
    return "0x" + result
}

/**
 * Transforms a Buffer into a HexString
 * @param {*} _buffer The buffer being transformed into a HexString
 */
const bufferToHexString = (
    _buffer
) => {
    return "0x" + Array.prototype.map.call(new Uint8Array(_buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

/**
 * Converts a buffer to a word array.
 * @param {*} _buffer The data
 */
const bufferToWordArray = (
    _buffer
) => {
    var bufferLength = _buffer.length
    var words = []
    for (var i = 0; i < bufferLength; i++) {
        words[i >>> 2] |= _buffer.readUInt8(i) << (24 - (i % 8) * 8)
    }
    return new CryptoJS.lib.WordArray.init(words, bufferLength)
}

/**
 * Calculates keccak256 hash on given data
 * @param {*} _hexStr Hexadecimal String with the 0x prefix
 * @returns HexString that represents the hash
 */
const stringSha3 = (
    _hexStr
) => {
    if (_hexStr.length > 2 && _hexStr.substr(0, 2) === '0x') {
        _hexStr = _hexStr.substr(2)
    }
    let _wordArr = CryptoJS.enc.Hex.parse(_hexStr)
    return "0x" + sha3(_wordArr, {
        outputLength: 256
    }).toString()
}

/**
 * Calculates keccak256 hash on given data
 * @param {*} _buffer 
 * @returns HexString that represents the hash
 */
const binarySha3 = (
    _buffer
) => {
    let _wordArr = bufferToWordArray(_buffer)
    return "0x" + sha3(_wordArr, {
        outputLength: 256
    }).toString()
}

/**
 * 
 * @param {*} _msg 
 * @param {*} _tabs 
 */
const logger = (
    _msg,
    _tabs
) => {
    let _strTabs = ''
    for (let i = 0; i < _tabs; i++) { _strTabs = _strTabs + '\t' }
    console.log(_strTabs + _msg)
}

const setBlockchainTime = (time) => {
    return new Promise((resolve, reject) => {
        web3.currentProvider.send({
            jsonrpc: "2.0",
            method: "evm_mine",
            params: [time],
            id: new Date().getTime()
        }, (err, result) => {
            if (err) { return reject(err); }
            const newBlock = web3.eth.getBlock('latest');

            return resolve(newBlock)
        });
    });
}

module.exports = {
    cryptoRandomNumber,
    truncateDecimals,
    parseHexString,
    arrayToHexString,
    bufferToHexString,
    bufferToWordArray,
    stringSha3,
    binarySha3,
    logger,
    setBlockchainTime
}
