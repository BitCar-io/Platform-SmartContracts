const assetTkn = artifacts.require('test/AssetTokenTest')

const truffleAssert = require('truffle-assertions')

const {
    setupBaseContracts,
} = require('./helpers/general.js')

const {
    cryptoRandomNumber,
    truncateDecimals
} = require('./helpers/utils.js')

const {
    errTypes,
    tryCatch
} = require('./helpers/excpHandling.js')

const chalk = require('chalk')

describe('Asset Ballot Tests', () => {
    contract('AssetToken', accounts => {
        const owner = accounts[0]
        const sudo = accounts[1]
        let stc
        let sud
        let atkn
        before('setup contracts', async () => {
            const contracts = await setupBaseContracts(owner)
            stc = contracts.stc
            sud = contracts.sud
            await sud.addAddressToSudoGroup(sudo, { from: owner })
        })
        it("Asset Ballot Lifecycle", async () => {
            console.log(chalk.cyan("\r\n🚀 EXECUTING: Asset Ballot Lifecycle"))

            let maxAccNum = 10
            let maxCyclesPossible = 3
            for (let M = 1; M <= maxCyclesPossible; M++) {
                console.log("")
                console.log(chalk.green("\r\n\tSell the car Voting takes place in Cycle: " + M))
                console.log(chalk.green("\t==========================================="))
                atkn = await assetTkn.new(
                    owner,
                    "Asset Token",
                    "AST",
                    90,
                    70,
                    5,
                    5,
                    maxCyclesPossible,
                    stc.address)

                await atkn.activate(0, { from: owner })

                console.log("\r\n\tDistribute evenly the funds 💰💰💰 among wallets ... ➡️ ")
                for (let i = 1; i < maxAccNum - 1; i++) { 
                    await atkn.transfer(accounts[i], 10, { from: owner })
                }
                for (let i = 0; i < maxAccNum - 1; i++) { 
                    console.log(chalk.magenta("\tToken holder: " + accounts[i] + ", balance: " + (await atkn.balanceOf(accounts[i]))))
                }

                let mxC = (await atkn.maxCycles())
                let votingPeriodCount = 0
                let votingPeriodMax = M
                let tradingSw = true
                let votingSw = true

                while ((await atkn.isWithinLifespan()) && !(await atkn.paused())) {

                    var trading = (await atkn.isInUpperWave())

                    if (trading && (await atkn.isWithinLifespan())) {   // Trading period 

                        if (tradingSw) {
                            tradingSw = false
                            votingSw = true
                            console.log("\r\n\r\n\t\tTrading period opened ... ")
                            console.log("\t\tTesting transfers")
                            result = (await atkn.transfer(accounts[1], 5, { from: accounts[0] }))
                            assert.isTrue(result.tx.length === 66)
                            result = (await atkn.transfer(accounts[0], 5, { from: accounts[1] }))
                            assert.isTrue(result.tx.length === 66)
                            console.log("\r\t\tIs the contract Paused?: " + (await atkn.paused()))
                        }

                    } else {                                            // Voting period 

                        if (votingSw && (await atkn.isWithinLifespan())) {
                            votingPeriodCount++
                            tradingSw = true
                            votingSw = false
                            console.log("\r\n\r\n\t\tVoting period opened ... (votingPeriodCount: " + votingPeriodCount + ")")

                            if (votingPeriodCount < votingPeriodMax) {

                                console.log("\t\tVoting that does NOT pause the contract")
                                let sell = cryptoRandomNumber(1, 4)
                                for (let i = sell; i < 9; i++) { 
                                    await atkn.voteForKeepingTheAsset({ from: accounts[i] })
                                }
                                for (let i = 0; i < sell; i++) { 
                                    await atkn.voteForSellingTheAsset({ from: accounts[i] })
                                }

                                console.log("\t\tTrying to vote (SELL) as a NON TOKEN HOLDER, it should fail ⚠️ - 1")
                                //result = await tryCatch(atkn.voteForSellingTheAsset({ from: accounts[9] }), errTypes.revert)
                                //assert.isTrue(result === undefined)
                                await truffleAssert.fails(
                                    atkn.voteForSellingTheAsset({ from: accounts[9] }),
                                    truffleAssert.ErrorType.REVERT,
                                    "Is not a Token Holders or it has already voted."
                                )

                                console.log("\t\tTrying to vote (KEEP) as a NON TOKEN HOLDER, it should fail ⚠️ - 1")
                                await truffleAssert.fails(
                                    atkn.voteForKeepingTheAsset({ from: accounts[9] }),
                                    truffleAssert.ErrorType.REVERT,
                                    "Is not a Token Holders or it has already voted."
                                )

                                console.log("\t\tTrying to trade in voting period, it should fail ⚠️ - 1")
                                await truffleAssert.fails(
                                    atkn.transfer(accounts[1], 5, { from: accounts[0] }),
                                    truffleAssert.ErrorType.REVERT,
                                    "Execution only allowed in UpperWave."
                                )

                                console.log("\t\tTrying to vote twice (SELL), it should fail ⚠️ - 1")
                                await truffleAssert.fails(
                                    atkn.voteForSellingTheAsset({ from: accounts[0] }),
                                    truffleAssert.ErrorType.REVERT,
                                    "Is not a Token Holders or it has already voted."
                                )

                                console.log("\t\tTrying to vote twice (KEEP), it should fail ⚠️ - 1")
                                await truffleAssert.fails(
                                    atkn.voteForKeepingTheAsset({ from: accounts[0] }),
                                    truffleAssert.ErrorType.REVERT,
                                    "Is not a Token Holders or it has already voted."
                                )

                            } else {

                                if (votingPeriodMax < maxCyclesPossible) {
                                    console.log("\t\tVoting that DOES pause the contract")
                                    for (let i = 7; i < 9; i++) { 
                                        await atkn.voteForKeepingTheAsset({ from: accounts[i] })
                                    }
                                    for (let i = 0; i < 7; i++) { 
                                        await atkn.voteForSellingTheAsset({ from: accounts[i] })
                                    }
                                    console.log("\t\tTrying to vote (SELL) as a NON TOKEN HOLDER, it should fail ⚠️ - 2")
                                    await truffleAssert.fails(
                                        atkn.voteForSellingTheAsset({ from: accounts[9] }),
                                        truffleAssert.ErrorType.REVERT,
                                        "Is not a Token Holders or it has already voted."
                                    )

                                    console.log("\t\tTrying to vote (KEEP) as a NON TOKEN HOLDER, it should fail ⚠️ - 2")
                                    await truffleAssert.fails(
                                        atkn.voteForKeepingTheAsset({ from: accounts[9] }),
                                        truffleAssert.ErrorType.REVERT,
                                        "Is not a Token Holders or it has already voted."
                                    )

                                    console.log("\t\tTrying to trade in voting period, it should fail ⚠️ - 2")
                                    await truffleAssert.fails(
                                        atkn.transfer(accounts[1], 5, { from: accounts[0] }),
                                        truffleAssert.ErrorType.REVERT,
                                        "Contract is paused"
                                    )
                                } else {
                                    console.log("\t\tTrying to vote (SELL) in the last cycle, it should fail ⚠️")
                                    await truffleAssert.fails(
                                        atkn.voteForSellingTheAsset({ from: accounts[0] }),
                                        truffleAssert.ErrorType.REVERT,
                                        "It is the last cycle."
                                    )

                                    console.log("\t\tTrying to vote (KEEP) in the last cycle, it should fail ⚠️")
                                    await truffleAssert.fails(
                                        atkn.voteForKeepingTheAsset({ from: accounts[0] }),
                                        truffleAssert.ErrorType.REVERT,
                                        "It is the last cycle."
                                    )
                                }

                            }
                            console.log("\r\t\tIs the contract Paused?: " + (await atkn.paused()))
                        }
                    }

                    let currCl = (await atkn.getCycle())
                    var wLifespan = (await atkn.isWithinLifespan())
                    process.stdout.write(chalk.yellow("\r\t" +
                        "Lifespan Progress: " + ((wLifespan) ? (await truncateDecimals(100 * (currCl / mxC))) : ("--")) + ", " +
                        "CycleProgress: " + (await atkn.getCycleProgress()) + ", " +
                        "Trading Period: " + trading + ", " +
                        "Voting Period: " + !trading + ", " +
                        "Cycle: " + currCl + ", " +
                        "MaxCycles: " + mxC + ", " +
                        "isWithinLifespan: " + wLifespan + "\t\t\t"
                    ))
                }
                console.log("\r\n\r\n")
                console.log("\tOverall status of the contract (M=" + M + "):")
                console.log("\t\tisWithinLifespan: " + (await atkn.isWithinLifespan()) + (((await atkn.isWithinLifespan())) ? ("") : (" (stopper)")))
                console.log("\t\tPaused: " + (await atkn.paused()) + (((await atkn.paused())) ? (" (stopper)") : ("")))
                console.log("\t\tCycle: " + (await atkn.getCycle()))
            }
            console.log(chalk.red("\r\n\tEnd of Asset Ballot Tests"))
        })
        after('After', async () => { })
    })
})
