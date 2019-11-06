const { convertFromSolidityNumber,getContract, sleep } = require("./util/helpers");
const {bitcarTickerValues, bitcoinTickerValues, ethereumTickerValues } = require("./util/tickerValues");
const chalk = require('chalk');

module.exports = function(deployer, network, accounts) {

    if(!process.env.LOCALTICKER || process.env.LOCALTICKER.toUpperCase() === "FALSE") {
        console.log(chalk.yellow(`Not running ${__filename} as LOCALTICKER is set to false.`));
        return;
    }
    
    let TickerContract = artifacts.require('Ticker.sol');
    
    const ownerAddr = accounts[0];
    const timeInMinutes = 30;

    // 1 BITCAR = 0.00681660 USD
    //let tickerValue = 681660;

    let currentTickerCount = 0;

    const timeLapse = timeInMinutes*60000;

    setTickerValue = async (currency, array, currentIndex, method) => {

        let valueIndex = currentIndex;

        if(valueIndex >= array.length) {
            valueIndex = 0;
        }

        let value = array[valueIndex];

        let realworldValue = parseFloat(convertFromSolidityNumber(value).toFixed(8));
        let usdValue = parseFloat((1/realworldValue).toFixed(8));
        console.log(chalk.cyan(`1 ${currency} = ${realworldValue} USD`));
        console.log(chalk.cyan(`1 USD = ${usdValue} ${currency}`));

        await method(value, {from: ownerAddr});

        return valueIndex+=1;
    }

    deployer.then(async () => {
        const Ticker = await getContract(TickerContract);

        let bitCarIndex = 0;
        let bitcoinIndex = 0;
        let ethereumIndex = 0;

        console.log(`Starting ticker cycle, this will be set every ${timeLapse} minutes.`);

        while(true) {

            bitCarIndex = await setTickerValue("BITCAR", bitcarTickerValues, bitCarIndex, Ticker.setUSD);
            bitcoinIndex = await setTickerValue("BTC", bitcoinTickerValues, bitcoinIndex, Ticker.setBTC);
            ethereumIndex = await setTickerValue("ETH", ethereumTickerValues, ethereumIndex, Ticker.setETH);

            console.log(`Next ticker set at ${(new Date(new Date().getTime() + timeLapse)).toTimeString()}`);
            console.log(`Time now:${new Date().toTimeString()}`);

            // wait for next tick
            await sleep(timeLapse);
        }
    });
};