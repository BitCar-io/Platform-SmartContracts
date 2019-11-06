const timePaus = artifacts.require('lifecycle/TimePausable')
const cyclicPaus = artifacts.require('lifecycle/CyclicPausable')

const {
    setupBaseContracts,
} = require('./helpers/general.js')

const {
    truncateDecimals
} = require('./helpers/utils.js')

const {
    oneFinney
} = require('./helpers/units.js')

const {
    activationMechanismTest
} = require('./helpers/psb.js')

const {
    printGasContract
} = require('./helpers/debugging.js')

const chalk = require('chalk')

describe('Pausable Mechanisms Tests', () => {
    contract('*Pausable', accounts => {
        const owner = accounts[0]
        const sudo = accounts[1]
        const extraSudo = accounts[2]
        const admin = accounts[3]
        const agent = accounts[4]
        let stc
        let sud
        let adm
        let agn
        before('setup contracts', async () => {
            const contracts = await setupBaseContracts(owner)
            stc = contracts.stc
            sud = contracts.sud
            adm = contracts.adm
            agn = contracts.agn
            await sud.addAddressToSudoGroup(sudo, { from: owner })
            await sud.addAddressToSudoGroup(extraSudo, { from: sudo })
            await adm.addAddressToAdminGroup(admin, { from: sudo })
            await adm.verify(admin, true, { from: sudo })
            await agn.addAddressToAgentsGroup(agent, { from: admin })
            await agn.verify(agent, true, { from: admin })
        })

        it("Validating TimePasuable Contracts functionality", async () => {
            console.log(chalk.cyan("\r\n🚀 EXECUTING: Validating TimePasuable Contracts functionality"))
            let tpaus = await timePaus.new(10, stc.address, { from: owner })
            await printGasContract("Gas Used creating TimePausable: ", tpaus.transactionHash)
            await activationMechanismTest(tpaus, owner, admin, agent)
            console.log("\r\n")
            let cc = await Date.now()
            while (!(await tpaus.hasExpired()) && !(await tpaus.disabled())) {
                process.stdout.write(chalk.yellow("\r\t" + 
                    "mSecond: " + (await Date.now() - cc) + ", " +
                    "hasExpired: " + (await tpaus.hasExpired()) + ", " +
                    "isTimeValDisabled: " + (await tpaus.disabled())
                ))
            }
            console.log("\r\n")
        })

        it("Validating CyclicPausable Contracts functionality: Non-zero MaxCycles test", async () => {
            console.log(chalk.cyan("\r\n🚀 EXECUTING: Non-zero MaxCycles test"))
            let cpaus = await cyclicPaus.new(12, 8, 3, stc.address)
            await printGasContract("Gas Used creating CyclicPausable: ", cpaus.transactionHash)
            await activationMechanismTest(cpaus, owner, admin, agent)
            let sw = (await cpaus.isInUpperWave())
            let mxC = (await cpaus.maxCycles())
            do {
                if (sw != (await cpaus.isInUpperWave())) { 
                    console.log(""); 
                    sw = (await cpaus.isInUpperWave()) 
                }
                let currCl = (await cpaus.getCycle())
                var wLifespan = (await cpaus.isWithinLifespan())
                process.stdout.write(chalk.yellow("\r\t" +
                    "Lifespan Progress: " + ((wLifespan) ? (await truncateDecimals(100 * (currCl / mxC))) : ("--")) + ", " +
                    "CycleProgress: " + (await cpaus.getCycleProgress()) + ", " +
                    "UpperWv: " + sw + ", " +
                    "LowerWv: " + !sw + ", " +
                    "Cycle: " + currCl + ", " +
                    "MaxCycles: " + mxC + ", " +
                    "isWithinLifespan: " + wLifespan + "\t\t\t"
                ))
            } while (wLifespan && !(await cpaus.disabled()))
            console.log("\r\n")
        })

        it("Validating CyclicPausable Contracts functionality: Zero MaxCycles test (infinite cycles)", async () => {
            console.log(chalk.cyan("\r\n🚀 EXECUTING: Zero MaxCycles test (infinite cycles)"))
            let cpaus = await cyclicPaus.new(12, 8, 0, stc.address)
            await activationMechanismTest(cpaus, owner, admin, agent)
            let sw = (await cpaus.isInUpperWave())
            for (let i = 0; i < 1000; i++) {
                if (sw != (await cpaus.isInUpperWave())) { 
                    console.log(""); 
                    sw = (await cpaus.isInUpperWave()) 
                }
                let currCl = (await cpaus.getCycle())
                process.stdout.write(chalk.yellow("\r\t" +
                    "Iterations: " + i + " of 1000, " +
                    "CycleProgress: " + (await cpaus.getCycleProgress()) + ", " +
                    "UpperWv: " + sw + ", " +
                    "LowerWv: " + !sw + ", " +
                    "Cycle: " + currCl + ", " +
                    "MaxCycles: 0, " +
                    "isWithinLifespan: " + (await cpaus.isWithinLifespan()) + "\t\t\t"
                ))
            }
            console.log("\r\n")
        })

        after('After', async () => { })
    })
})
