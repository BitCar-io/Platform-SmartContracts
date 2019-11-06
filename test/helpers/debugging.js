/**
 * Displays all the information contained in obj recursively
 * @param {*} obj 
 * @param {*} tabSpaces 
 */
const displayRecursively = async (obj, tabSpaces) => {
    for (var k in obj) {
        console.log(tabSpaces + k + ": " + obj[k])
        if (typeof obj[k] == "object" && obj[k] !== null) {
            displayRecursively(obj[k], tabSpaces + "\t")
        }
    }
}

/**
 * Displays all the information contained in obj
 * @param {*} obj 
 */
const displayWholeResult = async (obj) => {
    console.log("\tRESULT:")
    displayRecursively(obj, "\t")
}

/**
 * @param {*} obj 
 * @param {*} attr 
 */
const displayAttribute = async (obj, attr) => {
    for (var k in obj) {
        if (k === attr) {
            console.log("\t\t" + attr + ": " + obj[k])
        } else {
            if (typeof obj[k] == "object" && obj[k] !== null) {
                displayAttribute(obj[k], attr)
            }
        }
    }
}

/**
 * @param {*} name
 * @param {*} tx
 */
const printGas = async (name, tx) => {
    if (tx.hasOwnProperty("receipt")) {
        console.log("\t\tGAS - " + name + ": " + tx["receipt"]["gasUsed"])
    }
}

/**
 * @param {*} name
 * @param {*} transactionHash
 */
const printGasContract = async (name, transactionHash) => {
    tx = await web3.eth.getTransactionReceipt(transactionHash)
    if (tx.hasOwnProperty("gasUsed")) {
        console.log("\tGAS - " + name + " creation: " + tx["gasUsed"])
    }
}

module.exports = {
    displayRecursively,
    displayWholeResult,
    displayAttribute,
    printGas,
    printGasContract
}
