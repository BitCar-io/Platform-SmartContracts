const http = require('http');
const chalk = require('chalk');

module.exports = function(deployer, network, accounts) {
    // Detect if script is being ran in a pipeline
    if(!process.env.CI_JOB_TOKEN) {
        return;
    }

    // Pause Ticker if appropriate network
    let tickerURL = false;

    if(network == "staging") {
        process.env.STAGING_HOST;
        tickerURL = `${process.env.STAGING_HOST}:8082/pause?by=Job${process.env.CI_JOB_TOKEN}`
    }
    else if(network == "development") {
        tickerURL = `${process.env.DEVELOPMENT_HOST}:8082/pause?by=Job${process.env.CI_JOB_TOKEN}`
    }

    if(tickerURL) {
        http.get(tickerURL, (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                console.error("Unable to pause ticker")
            }

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                console.log(chalk.yellow(`Paused ticker on network ${network} with job id ${process.env.CI_JOB_TOKEN}`));
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }
};