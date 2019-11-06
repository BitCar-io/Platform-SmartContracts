const {approvalState, convertFromSolidityNumber, convertToSolidityNumber, etherToWei, formatNumberForDisplay,
    getBitCarToken, getContract, getUserAccounts, RANK_LEVEL,
    setBitCarTicker, setEthTicker, setUserRank, sleep} = require("./util/helpers");

const {getAllDeployedAssets, initialiseAssetHelper } = require('./util/assets');

const chalk = require('chalk')

let BitCarToken = undefined;
let RankTracker = undefined;

let ethereumToUSD = 10000;

module.exports = function(deployer, network, accounts) {

    if(network !== "local_frontend") {
        console.log(chalk.yellow(`Not running ${__filename} as network is not local_frontend`));
        return;
    }

    let TickerContract = artifacts.require('Ticker.sol');
    const RankTrackerContract = artifacts.require("RankTracker.sol");

    async function getRequiredEthereum(qtyTokensIncDecimals, ethPercentage) {

        let qtyTokensInEth = (ethPercentage / 100) * qtyTokensIncDecimals;
        let tickerQty = await Ticker.ethToUnits(qtyTokensInEth);
        return convertFromSolidityNumber(tickerQty);
    }

    async function purchaseFeedback(asset, buyerAddress, qtyToBuyIncDecimals, ethPercentage, username) {

        let feeEscrow = await asset.assetContract.getFeeForAmount(qtyToBuyIncDecimals, await Ticker.usdToUnits(await asset.feeManager.getAmount('BEE')));
        console.log(`feeEscrow\t${formatNumberForDisplay(feeEscrow, true)} BITCAR`);
        let feeMSI = await asset.assetContract.getFeeForAmount(qtyToBuyIncDecimals, await Ticker.usdToUnits(await asset.feeManager.getAmount('MSI')));
        console.log(`feeMSI   \t${formatNumberForDisplay(feeMSI, true)} BITCAR`);
        let feePAF = await asset.assetContract.getFeeForAmount(qtyToBuyIncDecimals, await Ticker.usdToUnits(await asset.feeManager.getAmount('PAF')));
        console.log(`feePAF   \t${formatNumberForDisplay(feePAF, true)} BITCAR`);
        let feePTF = await asset.assetContract.getFeeForAmount(qtyToBuyIncDecimals, await Ticker.usdToUnits(await asset.feeManager.getAmount('PTF')));
        console.log(`feePTF   \t${formatNumberForDisplay(feePTF, true)} BITCAR`);

        let bitcarQty = ((100 - ethPercentage) / 100) * qtyToBuyIncDecimals;

        let feeTokenBitCar = await Ticker.usdToUnits(bitcarQty);
        let feeTokenEth = 0;
        console.log(`token   \t${formatNumberForDisplay(feeTokenBitCar, true)} BITCAR`);

        if(ethPercentage > 0) {
            feeTokenEth = parseFloat(await getRequiredEthereum(qtyToBuyIncDecimals, ethPercentage));
            console.log(` token   \t${formatNumberForDisplay(feeTokenEth, false)} ETH`);
        }

        let userBitCarBalance = await BitCarToken.balanceOf(buyerAddress);
        const totalBitCar = parseFloat(feeEscrow.add(feeMSI.add(feePAF.add(feePTF.add(feeTokenBitCar)))));
        console.log(`TOTAL Price   \t${formatNumberForDisplay(totalBitCar, true)} BITCAR`);

        if(ethPercentage > 0) {
            console.log(`+   \t\t${formatNumberForDisplay(feeTokenEth, false)} ETH`);
        }

        console.log(chalk.yellow(`User ${username} BITCAR balance ${formatNumberForDisplay(userBitCarBalance, true)}`));

        let userEthBalance = 0;

        if(ethPercentage > 0) {
            const userWeiBalance = await web3.eth.getBalance(buyerAddress);
            userEthBalance = parseFloat(web3.utils.fromWei(userWeiBalance));
            console.log(chalk.yellow(`User ${username} ETH balance ${userEthBalance}`));
        }
 
        let balanceError = undefined;
        if(parseFloat(userBitCarBalance) < totalBitCar) {
            balanceError = "User does not have enough BITCAR for this transaction!!";
            console.log(chalk.red(`userBitCarBalance: ${userBitCarBalance} | totalBitCar: ${totalBitCar}`));
        }

        if(ethPercentage > 0 && userEthBalance < feeTokenEth) {
            balanceError = "User does not have enough ETH for this transaction!!";
            console.log(chalk.red(`userEthBalance: ${userEthBalance} | feeTokenEth: ${feeTokenEth}`));
        }

        if(balanceError) {
            throw new Error(balanceError);
        }

        let assetBalance = await asset.assetToken.balanceOf(asset.assetContract.address);
        console.log(`Asset tokens prior to purchase ${formatNumberForDisplay(assetBalance, true)}, user ${username} wants to buy: ${formatNumberForDisplay(qtyToBuyIncDecimals, true)}`);
    }

    async function waitForApproval(asset) {
        try {

            let assetState = parseInt(await asset.assetContract.state.call());

            if(assetState !== approvalState.LIVE) {
                throw new Error(`Asset state for '${asset.tokenCode}' is ${assetState}, which is not 'LIVE' (expected ${approvalState.LIVE})`);
            }

            console.log("Asset state is ", assetState);

            let isPaused = await asset.assetToken.paused.call();

            if(isPaused) {
                throw new Error(`Asset is currently paused - please ensure it has been activated!`);
            }

            console.log("Asset is not paused - buying allowed.");

            let approvalTime = new Date(await asset.assetToken.birth.call() * 1000);
            console.log(`Approval time: ${approvalTime.toString()} | Time Now: ${new Date().toString()}`);

            let waitCount = 0;
            let isActive = await asset.assetToken.activated.call();

            console.log("Is asset active?", isActive);

            while(new Date() < approvalTime && !isActive) {
                await sleep(2000);
                waitCount++;
                console.log(`Waiting for asset to reach approval time, current wait time: ${waitCount * 2} seconds.`);
                isActive = await asset.assetToken.activated.call();

                if(waitCount > 10) {
                    break;
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function buyTokens(asset, buyerAddress, qtyUSD, adminUser, accounts) {

        let qtyToBuy = convertToSolidityNumber(qtyUSD);
        let assetBalance = await asset.assetToken.balanceOf(asset.assetContract.address);
        
        try {

            let tokenCode = await asset.assetToken.symbol.call();

            let accountID = accounts.indexOf(buyerAddress);
            let username = Object.keys(getUserAccounts(accounts))[accountID];

            console.log("getting asset ETH percent...");
            let bitcarPercent = parseInt(await asset.assetContract.tokenPercentage.call());
            let ethereumPercent = 100-bitcarPercent;
            
            console.log(chalk.green(`Buying for ${tokenCode} BITCAR %: ${bitcarPercent} ETH percent: ${ethereumPercent}`));
            console.log(chalk.cyan(`Buying ${formatNumberForDisplay(qtyUSD)} tokens for asset '${asset.tokenCode}'`));

            await purchaseFeedback(asset, buyerAddress, qtyToBuy, ethereumPercent, username);
            
            // ensure asset is approved for buying
            await waitForApproval(asset);

            if(bitcarPercent !== 100) {
                let ethereumAmount = await getRequiredEthereum(qtyToBuy, ethereumPercent);
                let weiAmount = etherToWei(ethereumAmount + 1000);
                console.log(`Buying tokens with BITCAR and ${ethereumAmount} ETH | ${weiAmount.toString()} WEI`);
                await asset.assetContract.buyAssetTokens(qtyToBuy, {from: buyerAddress, value: weiAmount});    
            } else {
                console.log('Buying tokens with just BITCAR 100%');
                await asset.assetContract.buyAssetTokens(qtyToBuy, {from: buyerAddress});
            }
            
            assetBalance = await asset.assetToken.balanceOf(asset.assetContract.address);

            let userBalance = await asset.assetToken.balanceOf(buyerAddress);
            let userBitCarBalance = await BitCarToken.balanceOf(buyerAddress);

            console.log(chalk.green(`Successfully bought ${formatNumberForDisplay(qtyToBuy, true)} asset tokens.`));
            console.log(chalk.green(`User ${username} asset balance: ${formatNumberForDisplay(userBalance, true)}. BITCAR balance: ${formatNumberForDisplay(userBitCarBalance, true)}`));
            console.log(chalk.green(`Asset tokens remaining: ${formatNumberForDisplay(assetBalance, true)}.`));

        } catch (error) {
            console.log(chalk.red(`Failed to buy ${formatNumberForDisplay(qtyToBuy, true)} asset tokens.`));
            console.log(chalk.red(`Asset tokens remaining: ${formatNumberForDisplay(assetBalance, true)}.`));

            throw error;
        }
    }

    async function setAllowances(allUsers, assets, value, rankLevel) {

        let traders = Object.keys(allUsers).filter(username => {
            return username.startsWith("trader");
        });

        let adminUser = allUsers[Object.keys(allUsers).find(username => {
            return username.startsWith("admin");
        })];

        console.log("ADMIN USER", adminUser);

        for (let userIndex = 0; userIndex < traders.length; userIndex++) {
            let username = traders[userIndex];
            let buyerAddress = allUsers[username];

            let allowance = value < 0 ? await BitCarToken.balanceOf(buyerAddress) : 0;

            for (let assetIndex = 0; assetIndex < assets.length; assetIndex++) {
                const asset = assets[assetIndex];

                if(!asset) {
                    continue;
                }

                let approval = await BitCarToken.approve(asset.assetContract.address, allowance, {from: buyerAddress});
        
                console.log(`AssetContract allowance set to ${formatNumberForDisplay(allowance, true)} BITCAR to buy ${asset.tokenCode} tokens on behalf of user ${username}.`); 

                await setUserRank(artifacts, adminUser, buyerAddress, rankLevel);

                let globalLimitUsed = await RankTracker.getUserGlobalUsage(buyerAddress);

                console.log(`User rank set to ${rankLevel} global allowance remaining: ${globalLimitUsed.toString()}`);
            }

            // await sleep(3000);
        }
    }

    async function buyF40s(ferrariF40, users, accounts) {

        if(!ferrariF40) {
            return;
        }

        await buyTokens(ferrariF40, users.trader0, 30000, users.admin0, accounts);
        await buyTokens(ferrariF40, users.trader1, 30000, users.admin0, accounts);
        await buyTokens(ferrariF40, users.trader2, 30000, users.admin0, accounts);
        await buyTokens(ferrariF40, users.trader3, 30000, users.admin0, accounts);
        // await buyTokens(ferrariF40, users.trader4, 25000, users.admin0, accounts);
        // await buyTokens(ferrariF40, users.trader5, 20000, users.admin0, accounts);
        // await buyTokens(ferrariF40, users.trader6, 16000, users.admin0, accounts);
        // await sleep(3000);
    }
    
    deployer.then(async () => {

        RankTracker = await getContract(RankTrackerContract);
        BitCarToken = await getBitCarToken(artifacts);
        Ticker = await getContract(TickerContract);

        console.log(`Setting Ticker (1 ETH = ${ethereumToUSD}USD)...`);
        await setEthTicker(artifacts, ethereumToUSD);
        await setBitCarTicker(artifacts, 1);

        const users = getUserAccounts(accounts);

        // get assets
        await initialiseAssetHelper(artifacts);
        let assets = await getAllDeployedAssets(approvalState.LIVE);

        let currentBitCarToUSD = await Ticker.usdToUnits(100000000);
        console.log(`1 USD = ${formatNumberForDisplay(currentBitCarToUSD, true)} BITCAR`);

        // transfer some ether for larger purchases in ether
        // await web3.eth.sendTransaction({from: users.etherAccount0, to: users.trader})

        let bugattiVeyron = assets.find(asset => asset.tokenCode === "BVEY-08");
        let ferrariF40 = assets.find(asset => asset.tokenCode === "FF40-88");
        let ferrariF401 = assets.find(asset => asset.tokenCode === "FF40-881");
        let ferrariF402 = assets.find(asset => asset.tokenCode === "FF40-882");

        // if (network === "local_frontend") {
            await setAllowances(users, [bugattiVeyron, ferrariF40, ferrariF401, ferrariF402], -1, RANK_LEVEL.gold);

            // buy tokens for car 1 (Bugatti Veyron)
            if(bugattiVeyron) {
                await buyTokens(bugattiVeyron, users.trader0, 6000, users.admin0, accounts);
                await buyTokens(bugattiVeyron, users.trader1, 10000, users.admin0, accounts);
                await buyTokens(bugattiVeyron, users.trader2, 30000, users.admin0, accounts);
                await buyTokens(bugattiVeyron, users.trader3, 11400, users.admin0, accounts);
                // await buyTokens(bugattiVeyron, users.trader4, 22000, users.admin0, accounts);
                // await buyTokens(bugattiVeyron, users.trader5, 12000, users.admin0, accounts);
                // await buyTokens(bugattiVeyron, users.trader6, 20000, users.admin0, accounts);
                // await buyTokens(bugattiVeyron, users.trader7, 20000, users.admin0, accounts);
            }
            // await sleep(3000);

            // buy tokens for car 2 (Ferrari F40)
            await buyF40s(ferrariF40, users, accounts);
            await buyF40s(ferrariF401, users, accounts);
            await buyF40s(ferrariF402, users, accounts);

            await setAllowances(users, [bugattiVeyron, ferrariF40, ferrariF401, ferrariF402], 0, RANK_LEVEL.bronze);
        // }

        // if (network === "staging") {
        //     await setAllowances(users, [ferrariF40], -1, RANK_LEVEL.gold);
        //     await buyF40s(ferrariF40, users, accounts);
        //     await setAllowances(users, [ferrariF40], 0, RANK_LEVEL.bronze);
        // }
    });
}