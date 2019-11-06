const {
    sleep
} = require('./general.js')

const truffleAssert = require('truffle-assertions')

const chalk = require('chalk')

const activationMechanismTest = async (
    tpaus, 
    owner,
    admin,
    agent
) => {
    console.log(chalk.white("\r\tTesting Activation mechanism"))
    console.log(chalk.white("\tSleeping for 3 seconds before activating the contract"))
    let sec = 0
    let result
    let couldGetBirthDate
    let couldGetTimeValidation
    let isDeltaExpired
    while (sec < 3) {
        sec++
        result = await tpaus.birth({ from: owner })
        couldGetBirthDate = (result != undefined)
        
        await truffleAssert.fails(
            tpaus.hasExpired({ from: owner }),
            truffleAssert.ErrorType.REVERT,
            "Contract is set to be activated in the future"
        )

        couldGetTimeValidation = (result != undefined)
        result = await tpaus.activated({ from: owner })
        console.log(chalk.white("\r\t\t" +
            " Sec: " + sec +
            ", couldGetBirthDate: " + couldGetBirthDate +   
            ", couldGetHasExpiredValue: " + couldGetTimeValidation +
            ", isActivated: " + result))
        await sleep(1000)
    }
    console.log("\r\tActivating the contract with delta = 9s ...")
    result = await tpaus.activate(9, { from: owner })
    console.log("\r\tActivation tx request ok?: " + (result.tx.length === 66))

    result = await tpaus.activated({ from: owner })
    console.log("\r\tContract activated: " + result)

    result = await tpaus.hasDeltaExpired({ from: owner })
    sec = 0
    console.log(chalk.white("\r\tWaiting <delta> sec ..."))
    while (result === false) {
        sec++
        result = await tpaus.hasDeltaExpired({ from: owner })
        console.log(chalk.white("\r\t\t" +
            "Sec: " + sec + 
            ", hasDeltaExpired: " + result))
        await sleep(1000)
    }
    result = await tpaus.birth({ from: owner })
    couldGetBirthDate = result
    result = await tpaus.disabled({ from: owner })
    couldGetTimeValidation = result
    result = await tpaus.hasDeltaExpired({ from: owner })
    isDeltaExpired = result
    result = await tpaus.activated({ from: owner })
    console.log(chalk.white("\r\t" +
        "BirthDate: " + couldGetBirthDate +
        ", TimeValidationDisabled: " + couldGetTimeValidation +
        ", hasDeltaExpired: " + isDeltaExpired +
        ", isActivated: " + result))
}

module.exports = {
    activationMechanismTest
}
