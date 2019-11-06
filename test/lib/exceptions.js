/*
// TODO: Change the way of handling exceptions ...
const PREFIX = "VM Exception while processing transaction: ";

async function tryCatch(promise, message) {
    try {
        await promise;
        throw null;
    }
    catch (error) {
        assert(error, "Expected an error but did not get one");
        assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
    }
};

module.exports = {
    catchRevert: async function (promise) { await tryCatch(promise, "revert"); },
    catchOutOfGas: async function (promise) { await tryCatch(promise, "out of gas"); },
    catchInvalidJump: async function (promise) { await tryCatch(promise, "invalid JUMP"); },
    catchInvalidOpcode: async function (promise) { await tryCatch(promise, "invalid opcode"); },
    catchStackOverflow: async function (promise) { await tryCatch(promise, "stack overflow"); },
    catchStackUnderflow: async function (promise) { await tryCatch(promise, "stack underflow"); },
    catchStaticStateChange: async function (promise) { await tryCatch(promise, "static state change"); },
};
*/

const errTypes = {
    revert: "revert",
    outOfGas: "out of gas",
    invalidJump: "invalid JUMP",
    invalidOpcode: "invalid opcode",
    stackOverflow: "stack overflow",
    stackUnderflow: "stack underflow",
    staticStateChange: "static state change"
}

const tryCatch = async (promise, errType) => {
    try {
        await promise
        throw null
    }
    catch (error) {
        let prefx = "VM Exception while processing transaction: "
        assert(error, "Expected an error but did not get one")
        assert(error.message.startsWith(prefx + errType), "Expected an error starting with '" + prefx + errType + "' but got '" + error.message + "' instead")
    }
}

module.exports = {
    errTypes,
    tryCatch
}
