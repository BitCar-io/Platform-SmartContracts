/**
 * Displays all the information contained in obj recursively
 * @param {*} obj 
 * @param {*} tabSpaces 
 */
module.exports.displayRecursively = function (obj, tabSpaces) {
    for (var k in obj) {
        console.log(tabSpaces + k + ": " + obj[k]);
        if (typeof obj[k] == "object" && obj[k] !== null) {
            module.exports.displayRecursively(obj[k], tabSpaces + "\t");
        }
    }
}

/**
 * Displays all the information contained in obj
 * @param {*} obj 
 */
module.exports.displayWholeResult = function (obj) {
    console.log("\tRESULT:");
    module.exports.displayRecursively(obj, "\t");
}

/**
 * @param {*} obj 
 * @param {*} attr 
 */
module.exports.displayAttribute = function (obj, attr) {
    for (var k in obj) {
        if (k === attr) {
            console.log("\t\t" + attr + ": " + obj[k]);
        } else {
            if (typeof obj[k] == "object" && obj[k] !== null) {
                module.exports.displayAttribute(obj[k], attr);
            }
        }
    }
}

/**
 * @param {*} name
 * @param {*} tx
 */
module.exports.printGas = function (name, tx) {
    if (tx.hasOwnProperty("receipt")) {
        console.log("\t\tGAS - " + name + ": " + tx["receipt"]["gasUsed"]);
    }
}

/**
 * @param {*} name
 * @param {*} transactionHash
 */
module.exports.printGasContract = async function (name, transactionHash) {
    tx = await web3.eth.getTransactionReceipt(transactionHash);
    if (tx.hasOwnProperty("gasUsed")) {
        console.log("\tGAS - " + name + " creation: " + tx["gasUsed"]);
    }
}
