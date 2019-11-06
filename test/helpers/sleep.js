/**
 * Async sleep
 * @param {*} ms 
 */
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    sleep
}