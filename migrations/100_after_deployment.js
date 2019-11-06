const http = require('http');
const chalk = require('chalk');
const fs = require('fs');
const { BITCAR_TOKEN_ADDRESSES } = require("./util/helpers.js");

module.exports = function(deployer, network, accounts) {

    if(BITCAR_TOKEN_ADDRESSES[network] && (process.env.REDEPLOY_PLATFORM_TOKEN && process.env.REDEPLOY_PLATFORM_TOKEN.toUpperCase() === "FALSE")) {

        console.log(chalk.yellow(`Updating BitcarToken address in the PlatformToken.json file`));
        
        const bitcarTokenJSONFilename = __dirname + "/../build/contracts/PlatformToken.json";
                                    
        try {
            const rawData = fs.readFileSync(bitcarTokenJSONFilename);
            const json = JSON.parse(rawData);

            json.networks[deployer.network_id] = {address: BITCAR_TOKEN_ADDRESSES[network]};

            fs.writeFileSync(bitcarTokenJSONFilename, JSON.stringify(json), 'utf8');
            
            console.log(`Successfully updated BitcarToken contract artifact for networkId '${deployer.network_id}':`, BITCAR_TOKEN_ADDRESSES[network]);
        }
        catch(err) {
            console.error("Error parsing or writing BitcarToken contract artifact", err);
        }
    }

    // Detect if script is being ran in a pipeline
    if(!process.env.CI_JOB_TOKEN) {
        return;
    }

    // Unpause Ticker if appropriate network
    let tickerURL = false;

    if(network == "staging") {
        process.env.STAGING_HOST;
        tickerURL = `http://${process.env.STAGING_HOST}:8082/unpause`
    }
    else if(network == "development") {
        tickerURL = `http://${process.env.DEVELOPMENT_HOST}:8082/unpause`
    }

    if(tickerURL) {
        http.get(tickerURL, (res) => {
            const { statusCode } = res;

            if (statusCode !== 200) {
                console.error("Unable to unpause ticker")
            }

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                console.log(chalk.yellow(`Unpaused ticker on network ${network} with job id ${process.env.CI_JOB_TOKEN}`));
            });
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }
};