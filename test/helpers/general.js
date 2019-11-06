const Registry = artifacts.require('storage/Registry')
const RBACData = artifacts.require('libs/rbac/RBACData')
const Sudo = artifacts.require('governance/Sudo');
const Admin = artifacts.require('governance/Admin');
const Agent = artifacts.require('governance/Agent');
const Trader = artifacts.require('governance/Trader');
const AssetRole = artifacts.require('governance/AssetRole');
const IndxEntities = artifacts.require('libs/IndexedEntities');
const BigNumber = require('bignumber.js')
const assert = require('assert')

const setupBaseContracts = async (
    owner
) => {
    const stc = await Registry.new({ from: owner })
    const rba = await RBACData.new({ from: owner })
    await stc.setAddress("RBACData", rba.address, { from: owner })
    const sud = await Sudo.new(stc.address, { from: owner })
    const adm = await Admin.new(stc.address, { from: owner })
    const agn = await Agent.new(stc.address, { from: owner })
    const trd = await Trader.new(stc.address, { from: owner })
    const asr = await AssetRole.new(stc.address, { from: owner })
    await rba.registerComponent(sud.address, { from: owner })
    await rba.registerComponent(adm.address, { from: owner })
    await rba.registerComponent(agn.address, { from: owner })
    await rba.registerComponent(trd.address, { from: owner })
    await rba.registerComponent(asr.address, { from: owner })
    await stc.setAddress("Sudo", sud.address, { from: owner })
    await stc.setAddress("Admin", adm.address, { from: owner })
    await stc.setAddress("Agent", agn.address, { from: owner })
    await stc.setAddress("Trader", trd.address, { from: owner })
    await stc.setAddress("AssetRole", asr.address, { from: owner })
    const idx = await IndxEntities.new({ from: owner })
    await stc.setAddress("IndexedEntities", idx.address, { from: owner })
    await sud.addAddressToSudoGroup(owner, { from: owner })
    return {
        stc,
        rba,
        sud,
        adm,
        agn,
        trd,
        idx
    }
}

const sendTransaction = (web3, args) => {
    return new Promise(function (resolve, reject) {
        web3.eth.sendTransaction(args, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

const testWillThrow = async (fn, args) => {
    try {
        const txHash = await fn.apply(null, args)
        if (web3.version.network === 4448) { // if network is devGeth
            await waitForReceiptStatusSuccessOrThrow(txHash)
        }
        assert(false, 'the contract should throw here')
    } catch (error) {
        assert(
            /invalid opcode/.test(error.message || error) ||
            /invalid argument/.test(error.message || error) || // needed for geth compatibility
            /revert/.test(error.message || error),
            `the error message should be "invalid opcode", "invalid argument" or "revert", the error was ${error}`
        )
    }
}

const getEtherBalance = address => {
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(address, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

const getReceipt = txHash => {
    // seems that sometimes actual transaction is returned instead of txHash
    if (typeof txHash === 'object' && txHash.receipt) {
        return txHash.receipt
    }
    return new Promise(function (resolve, reject) {
        web3.eth.getTransactionReceipt(txHash, (err, res) => {
            if (err) {
                reject(err)
            }
            resolve(res)
        })
    })
}

const getGasUsed = async txHash => {
    const receipt = await getReceipt(txHash)
    return receipt.gasUsed
}

// tests the amount in Bignumber is in given range
const isInRange = (amount, gte, lte) => {
    return amount.gte(gte) && amount.lte(lte)
}

const testIsInRange = (amount, gte, lte, message) => {
    const res = isInRange(amount, gte, lte)
    message += ` ${gte} < ${amount} < ${lte} is expected`
    assert.ok(res, message)
}

const gasPrice = new BigNumber(30e9)
const bigZero = new BigNumber(0)
const addressZero = '0x' + '0'.repeat(40)

const printJSON = x => JSON.stringify(x, null, 2)

const checkForEvent = (eventName, eventArgs, txReceipt) => {
    assert.equal(txReceipt.logs.length, 1, 'there should be one event emitted')

    const log = txReceipt.logs[0]
    assert.equal(log.event, eventName, `the event emitted is ${eventName}`)
    assert.deepEqual(
        printJSON(log.args),
        printJSON(eventArgs),
        `the event args should match ${printJSON(eventArgs)} ${printJSON(log.args)}`
    )
}

const toBytes32 = text => {
    return web3.toHex(text)
}

const sleep = sleepTime => new Promise(resolve => setTimeout(resolve, sleepTime))

module.exports = {
    addressZero,
    bigZero,
    checkForEvent,
    gasPrice,
    getEtherBalance,
    getGasUsed,
    getReceipt,
    isInRange,
    sendTransaction,
    setupBaseContracts,
    sleep,
    testIsInRange,
    testWillThrow,
    toBytes32
}
