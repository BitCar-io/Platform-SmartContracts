const {daysToSeconds, minsToSeconds, yearsToSeconds, getUserAccounts} = require("./util/helpers");

const {initialiseAssetHelper, createQuickAsset} = require('./util/assets');
    
const chalk = require('chalk');

const carDataHashes = require('./util/carDataHashes').carDataHashes;

module.exports = function(deployer, network, accounts) {

    if(network !== "local_frontend") {
        console.log(chalk.yellow(`Not running ${__filename} as network is not local_frontend`));
        return;
    }

    deployer.then(async () => {

        const users = getUserAccounts(accounts);

        await initialiseAssetHelper(artifacts);

        let bugattiHash = carDataHashes.bugattiVeyron;
        let ferrariF40Hash = carDataHashes.ferrariF40;
        let ferrariF50Hash = carDataHashes.ferrariF50;
        let ferrari599GTOHash = carDataHashes.ferrari599GT;
        let lamborghiniHash = carDataHashes.lamboCentenario;
        let mcLarenHash = carDataHashes.mclarenP1;
        let porsche918Hash = carDataHashes.porsche918Spyder;
        let astonDB5Hash = carDataHashes.astonDB5;
        let lamboDiabloHash = carDataHashes.lamboDiablo;

        console.log("\nRegistering assets..");

        const bugattiTradeCycle = minsToSeconds(network === "local_frontend" ? 10 : 60);

        // Assets listed and bought by traders
        await createQuickAsset("Bugatti Veyron", "BVEY-08", bugattiHash, users.agent0, users.admin0, 1350000, 5000, 100, bugattiTradeCycle, daysToSeconds(14), 5, true);
        // await createQuickAsset("Bugatti Veyron", "BVEY-0810", bugattiHash, users.agent0, users.admin0, 1350000, 5000, 100, minsToSeconds(10), minsToSeconds(10), 5, true);
        // await createQuickAsset("Bugatti Veyron", "BVEY-0830", bugattiHash, users.agent0, users.admin0, 1350000, 5000, 100, minsToSeconds(10), minsToSeconds(30), 5, true);
        await createQuickAsset("Ferrari F40", "FF40-88", ferrariF40Hash, users.agent1, users.admin0, 2500000, 8000, 20, yearsToSeconds(3), daysToSeconds(21), 5, true);
        await createQuickAsset("Ferrari F40 - BC Only", "FF40-BitCar", ferrariF40Hash, users.agent1, users.admin0, 2500000, 8000, 100, yearsToSeconds(3), daysToSeconds(21), 5, true);
        // await createQuickAsset("Ferrari F40", "FF40-882", ferrariF40Hash, users.agent1, users.admin0, 2500000, 8000, 20, yearsToSeconds(3), daysToSeconds(21), 5, true);

        // assets listed - available now - not bought yet
        await createQuickAsset("LamborghiniDiabloSE30Jota", "LDJOTA", lamboDiabloHash, users.agent0, users.admin0, 497500, 9000, 20, yearsToSeconds(5), daysToSeconds(14), 5, true);
        await createQuickAsset("Ferrari F50", "FF50-88", ferrariF50Hash, users.agent1, users.admin1, 3900000, 9000, 40, yearsToSeconds(2), daysToSeconds(7), 5, true);
        // await createQuickAsset("Ferrari 599GTO", "F599-11", ferrari599GTOHash, users.agent1, users.admin1, 800000, 9000, 20, yearsToSeconds(2), daysToSeconds(7), 5, true);

        // asset listed - Available in x min
        await createQuickAsset("Lamborghini Centenario", "LCEN-1710", lamborghiniHash, users.agent0, users.admin1, 3599000, 8500, 60, yearsToSeconds(5), daysToSeconds(10), minsToSeconds(10), true);
        // await createQuickAsset("Lamborghini Centenario", "LCEN-1715", lamborghiniHash, users.agent0, users.admin1, 3599000, 8500, 40, yearsToSeconds(5), daysToSeconds(10), minsToSeconds(15), true);
        // await createQuickAsset("Lamborghini Centenario", "LCEN-1730", lamborghiniHash, users.agent0, users.admin1, 3599000, 8500, 40, yearsToSeconds(5), daysToSeconds(10), minsToSeconds(30), true);
        // await createQuickAsset("Lamborghini Centenario", "LCEN-1760", lamborghiniHash, users.agent0, users.admin1, 3599000, 8500, 40, yearsToSeconds(5), daysToSeconds(10), minsToSeconds(60), true);

        // upcoming listing 3 days to go
        await createQuickAsset("Aston Martin DB5", "ASTDB5-64", astonDB5Hash, users.agent1, users.admin1, 995000, 9500, 100, yearsToSeconds(5), daysToSeconds(30), daysToSeconds(3), true);

        // pending admin approval
        await createQuickAsset("McLaren P1", "MCLP1-15", mcLarenHash, users.agent0);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-155", porsche918Hash, users.agent1);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-156", porsche918Hash, users.agent1);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-157", porsche918Hash, users.agent1);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-158", porsche918Hash, users.agent1);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-159", porsche918Hash, users.agent1);

        // approved by Admin - pending Agent Approval
        await createQuickAsset("Porsche 918 Spyder", "P918SP-15", porsche918Hash, users.agent1, users.admin1, 1500000, 5500, 90, yearsToSeconds(5), daysToSeconds(7), minsToSeconds(2), false);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-151", porsche918Hash, users.agent1, users.admin1, 1500000, 5500, 90, yearsToSeconds(5), daysToSeconds(7), minsToSeconds(2), false);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-152", porsche918Hash, users.agent1, users.admin1, 1500000, 5500, 90, yearsToSeconds(5), daysToSeconds(7), minsToSeconds(2), false);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-153", porsche918Hash, users.agent1, users.admin1, 1500000, 5500, 90, yearsToSeconds(5), daysToSeconds(7), minsToSeconds(2), false);
        // await createQuickAsset("Porsche 918 Spyder", "P918SP-154", porsche918Hash, users.agent1, users.admin1, 1500000, 5500, 90, yearsToSeconds(5), daysToSeconds(7), minsToSeconds(2), false);
        
        // if (network === "staging") {
        //     await createQuickAsset("Porsche 918 Spyder", "P918SP-15", porsche918Hash, users.agent1, users.admin1, 1500000, 5500, 20, yearsToSeconds(5), daysToSeconds(7), 5, true);
        //     await createQuickAsset("Ferrari F40", "FF40-88", ferrariF40Hash, users.agent1, users.admin0, 2500000, 8000, 20, yearsToSeconds(3), daysToSeconds(21), 10, true);
        //     await createQuickAsset("Ferrari F50", "FF50-88", ferrariF50Hash, users.agent1, users.admin1, 3900000, 9000, 20, yearsToSeconds(2), daysToSeconds(7), 15, true);
        //     await createQuickAsset("Lamborghini Centenario", "LCEN-1710", lamborghiniHash, users.agent0, users.admin1, 3599000, 8500, 20, yearsToSeconds(5), daysToSeconds(10), 20, true);
        //     // await createQuickAsset("McLaren P1", "MCLP1-15", mcLarenHash, users.agent0, users.admin1, 1350000, 5500, 20, yearsToSeconds(5), daysToSeconds(30), 20, true);
        //     await createQuickAsset("Ferrari 599GTO", "F599-11", ferrari599GTOHash, users.agent1, users.admin1, 600000, 9000, 20, yearsToSeconds(2), daysToSeconds(7), 25, true);
        // }
    });
};