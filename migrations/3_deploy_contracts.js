const chalk = require('chalk')
const { BITCAR_TOKEN_ADDRESSES } = require("./util/helpers.js");

module.exports = function (deployer, network, accounts) {
    deployer.then(async () => {

        if(network === "mainnet") {
            console.log(chalk.red(`Not running ${__filename} as network is mainnet and we have already deployed our contracts!!`));
            return;
        }

        // General Storage of Contracts
        const RegistryContract = artifacts.require('Registry.sol')

        // Role Based Access Control Contracts
        const RBACDataContract = artifacts.require('libs/rbac/RBACData.sol')
        const SudoContract = artifacts.require('governance/Sudo.sol')
        const AdminContract = artifacts.require('governance/Admin.sol')
        const AgentContract = artifacts.require('governance/Agent.sol')
        const TraderContract = artifacts.require('governance/Trader.sol')
        const AssetRoleContract = artifacts.require('governance/AssetRole.sol')

        const TickerContract = artifacts.require("Ticker.sol")
        const TickerDecentralizedContract = artifacts.require("TickerDecentralized.sol")
        const BitcarTokenContract = artifacts.require("PlatformToken.sol")
        const WhitelistContract = artifacts.require("Whitelist.sol")
        const RankTrackerContract = artifacts.require("RankTracker.sol")

        // Factories
        const AssetFactoryContract = artifacts.require("AssetFactory.sol")
        const AssetTokenFactoryContract = artifacts.require("AssetTokenFactory.sol")
        const FeeManagerFactoryContract = artifacts.require("FeeManagerFactory.sol")
        const AssetWhitelistFactoryContract = artifacts.require("AssetWhitelistFactory.sol")
        const AssetRankTrackerFactoryContract = artifacts.require("AssetRankTrackerFactory.sol")
        const AssetControlBallotFactoryContract = artifacts.require("AssetControlBallotFactory.sol")

        // Fee Factories
        const FeeFactoryContract = artifacts.require("FeeFactory.sol")
        const ClaimerFactoryContract = artifacts.require("ClaimerFactory.sol")
        const BEEFactoryContract = artifacts.require("BEEFactory.sol")

        // Kyc process related contracts
        const KycProcessTrackerContract = artifacts.require("platform/kyc/KycProcessTracker.sol")

        console.log(chalk.cyan("\r\n 🚀 🚀 🚀 STARTING DEPLOYMENT"))
        const ownerAddr = accounts[0]
        const admin0 = accounts[3]
        const agent0 = accounts[5]
        const trader0 = accounts[7]

        const userWeiBalance = await web3.eth.getBalance(ownerAddr);
        const userEthBalance = parseFloat(web3.utils.fromWei(userWeiBalance));
        console.log(`${chalk.yellow("Default Deployment Address (OWNER):")} ${chalk.magenta(ownerAddr)} | ETH balance: ${chalk.magenta(userEthBalance)}`);

        // Deploy Registry
        await deployer.deploy(RegistryContract)

        // Deploy RBAC
        await deployer.deploy(RBACDataContract, ownerAddr)

        let Registry = await RegistryContract.deployed()
        let RBACData = await RBACDataContract.deployed()

        await Registry.setAddress("RBACData", RBACData.address)

        // Deploy Groups
        await deployer.deploy(SudoContract, Registry.address)
        await deployer.deploy(AdminContract, Registry.address)
        await deployer.deploy(AgentContract, Registry.address)
        await deployer.deploy(TraderContract, Registry.address)
        await deployer.deploy(AssetRoleContract, Registry.address)

        let SudoAccCtrl = await SudoContract.deployed()
        let AdminAccCtrl = await AdminContract.deployed()
        let AgentAccCtrl = await AgentContract.deployed()
        let TraderAccCtrl = await TraderContract.deployed()
        let AssetRoleAccCtrl = await AssetRoleContract.deployed()

        // Set role addresses in Registry
        await Registry.setAddress("Sudo", SudoAccCtrl.address)
        await Registry.setAddress("Admin", AdminAccCtrl.address)
        await Registry.setAddress("Agent", AgentAccCtrl.address)
        await Registry.setAddress("Trader", TraderAccCtrl.address)
        await Registry.setAddress("AssetRole", AssetRoleAccCtrl.address)

        console.log(chalk.yellow("Granting Access Control Contracts RBACData function execution permissions"))
        await RBACData.registerComponent(SudoAccCtrl.address)
        await RBACData.registerComponent(AdminAccCtrl.address)
        await RBACData.registerComponent(AgentAccCtrl.address)
        await RBACData.registerComponent(TraderAccCtrl.address)
        await RBACData.registerComponent(AssetRoleAccCtrl.address)

        console.log(chalk.yellow("Deploying Ticker and Whitelist"))
        const tickerEpochTime = parseInt(process.env.TICKER_EPOCH_MINUTES);
        await deployer.deploy(TickerContract, "bitcar_usd", tickerEpochTime)
        await deployer.deploy(TickerDecentralizedContract, "json(https://min-api.cryptocompare.com/data/price?fsym=BITCAR&tsyms=USD).USD", 60, {value: 100000000000})

        let Ticker = await TickerContract.deployed()
        let TickerDecentralized = await TickerDecentralizedContract.deployed()

        console.log(chalk.yellow("Deploying Factory Contracts.."))
        await deployer.deploy(AssetFactoryContract, Registry.address)
        await deployer.deploy(AssetTokenFactoryContract, Registry.address)
        await deployer.deploy(FeeManagerFactoryContract, Registry.address)
        await deployer.deploy(FeeFactoryContract, Registry.address)
        await deployer.deploy(ClaimerFactoryContract, Registry.address)
        await deployer.deploy(BEEFactoryContract, Registry.address)
        await deployer.deploy(AssetWhitelistFactoryContract, Registry.address)
        await deployer.deploy(AssetRankTrackerFactoryContract, Registry.address)
        await deployer.deploy(AssetControlBallotFactoryContract, Registry.address)

        let AssetFactory = await AssetFactoryContract.deployed()
        let AssetTokenFactory = await AssetTokenFactoryContract.deployed()
        let FeeManagerFactory = await FeeManagerFactoryContract.deployed()
        let FeeFactory = await FeeFactoryContract.deployed()
        let ClaimerFactory = await ClaimerFactoryContract.deployed()
        let BEEFactory = await BEEFactoryContract.deployed()
        let AssetWhitelistFactory = await AssetWhitelistFactoryContract.deployed()
        let AssetRankTrackerFactory = await AssetRankTrackerFactoryContract.deployed()
        let AssetControlBallotFactory = await AssetControlBallotFactoryContract.deployed()

        console.log(chalk.yellow("Setting Factory storage"))
        await Registry.setAddress("AssetFactory", AssetFactory.address)
        await Registry.setAddress("AssetTokenFactory", AssetTokenFactory.address)
        await Registry.setAddress("FeeManagerFactory", FeeManagerFactory.address)
        await Registry.setAddress("FeeFactory", FeeFactory.address)
        await Registry.setAddress("ClaimerFactory", ClaimerFactory.address)
        await Registry.setAddress("BEEFactory", BEEFactory.address)
        await Registry.setAddress("AssetWhitelistFactory", AssetWhitelistFactory.address)
        await Registry.setAddress("AssetRankTrackerFactory", AssetRankTrackerFactory.address)
        await Registry.setAddress("AssetControlBallotFactory", AssetControlBallotFactory.address)
        await AssetRoleAccCtrl.registerComponent(AssetFactory.address);

        console.log(chalk.yellow("Setting Registry addresses"))
        await Registry.setAddress("Ticker", Ticker.address)
        await Registry.setAddress("TickerDecentralized", TickerDecentralized.address)

        // tickerCoOwner PK = 0c7c9bf5ccd1c435b0227c947baa130145c1fb4ed72521741b9466ade82276bd
        let tickerCoOwner = "0x8B950C8668C8542681C16fdD4a0833D92792Ff72"
        await Ticker.setCoOwner(tickerCoOwner)


        await deployer.deploy(WhitelistContract, Registry.address)
        let Whitelist = await WhitelistContract.deployed()
        await Registry.setAddress("Whitelist", Whitelist.address)
        
        // kycServerWallet PK = 48fab9e75804a7a8ad73680f59624990c4d5194c468855b021f83a82e2ecf552
        let kycServerWallet = "0x4f01346D12A30eE58A41696B5da6Be7Cb3341CD3"
        console.log(chalk.yellow("Deploying KycProcessTracker contract"))
        await deployer.deploy(KycProcessTrackerContract, kycServerWallet, Registry.address)
        let KycProcessTracker = await KycProcessTrackerContract.deployed()
        await Registry.setAddress("KycProcessTracker", KycProcessTracker.address)


        await deployer.deploy(RankTrackerContract, Registry.address)
        let RankTracker = await RankTrackerContract.deployed()
        await Registry.setAddress("RankTracker", RankTracker.address)


        console.log(chalk.yellow("Registering address " + kycServerWallet + " @ KycProcessTracker"))
        await KycProcessTracker.registerComponent(kycServerWallet, { from: ownerAddr })

        console.log(chalk.yellow("Registering address KycProcessTracker.address @ Admin Group"))
        await AdminAccCtrl.addAddressToAdminGroup(KycProcessTracker.address, { from: ownerAddr })
        await AdminAccCtrl.verify(KycProcessTracker.address, true, { from: ownerAddr })

        console.log(chalk.yellow("Funding wallet " + kycServerWallet + " with 1 ETH"))
        web3.eth.sendTransaction({ from: ownerAddr, to: kycServerWallet, value: 1000000000000000000 })

        if(!BITCAR_TOKEN_ADDRESSES[network] || (process.env.REDEPLOY_PLATFORM_TOKEN && process.env.REDEPLOY_PLATFORM_TOKEN.toUpperCase() === "TRUE")) {
            console.log(chalk.yellow(`BitcarToken not found for ${network} network or REDEPLOY_PLATFORM_TOKEN is TRUE, so deploying new`));
            await deployer.deploy(BitcarTokenContract, "Bitcar", "Bitcar", 500000000, { from: ownerAddr });
            const BitCarToken = await BitcarTokenContract.deployed();
            await Registry.setAddress("PlatformToken", BitCarToken.address);
        }
        else {
            console.log(chalk.yellow(`BitcarToken found for ${network} network`));
            await Registry.setAddress("PlatformToken", BITCAR_TOKEN_ADDRESSES[network]);

            console.log(`Successfully set BitcarToken contract address in Registry to:`, BITCAR_TOKEN_ADDRESSES[network]);
        }

        console.log(chalk.yellow("Ticker Addr: " + await Registry.getAddress("Ticker")))
        console.log(chalk.cyan(`Ticker Epoch set to ${tickerEpochTime} minutes.`))

        // Set arbitrary ticker price (bitcar-usd)
        console.log(chalk.yellow("Setting Ticker.setUSD(681660)"))
        await Ticker.setUSD(681660) // Set ticker price, to be used with calculations
        await Ticker.setETH(11288000000) // Set ticker price, to be used with calculations
        console.log("\r\n")
        console.log(chalk.yellow("DEPLOYED PLATFORM: " + new Date()))
        console.log("\r\n")
    })
}
