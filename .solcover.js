module.exports = {
    skipFiles: ['vendor/usingOraclize.sol', 'vendor/SafeMath.sol'],
    reporterOptions: ['html', 'json-summary', 'text-summary', 'text'] // Needs pull-request at: https://github.com/sc-forks/solidity-coverage/pull/308/files
};