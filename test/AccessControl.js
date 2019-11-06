const truffleAssert = require('truffle-assertions')

const {
    setupBaseContracts
} = require('./helpers/general.js')

describe('Sudo Access Control tests group 2: Using Admin Role Tests', () => {
    contract('AccessControl', accounts => {
        const owner = accounts[0]
        const sudo = accounts[1]
        const extraSudo = accounts[2]
        const admin = accounts[3]
        let sud
        before('setup contracts', async () => {
            const contracts = await setupBaseContracts(owner)
            sud = contracts.sud
            await sud.addAddressToSudoGroup(sudo, { from: owner })
            await sud.addAddressToSudoGroup(extraSudo, { from: sudo })
        })
        it('Trying to add an Admin to Sudo Group using an Admin address', async () => {
            await truffleAssert.fails(
                sud.addAddressToSudoGroup(admin, { from: admin }),
                truffleAssert.ErrorType.REVERT,
                "Only a Sudo Member or Owner can execute this function."
            )
        })
        it('Adding an Admin using a Sudo address', async () => {
            let result = await sud.addAddressToSudoGroup(admin, { from: sudo })
            assert.isTrue(result.tx.length === 66)
        })
        it('Removal of Admin from Sudo Group', async () => {
            let result = await sud.removeAddressFromSudoGroup(admin, { from: owner })
            assert.isTrue(result.tx.length === 66)
        })
        after('After', async () => { })
    })
})

describe('Sudo Access Control tests group 2: Using Agent Role Tests', () => {
    contract('AccessControl', accounts => {
        const owner = accounts[0]
        const sudo = accounts[1]
        const extraSudo = accounts[2]
        const agent = accounts[4]
        let sud
        before('setup contracts', async () => {
            const contracts = await setupBaseContracts(owner)
            sud = contracts.sud
            await sud.addAddressToSudoGroup(sudo, { from: owner })
            await sud.addAddressToSudoGroup(extraSudo, { from: sudo })
        })
        it('Trying to add an Agent to Sudo Group using an Agent address', async () => {
            await truffleAssert.fails(
                sud.addAddressToSudoGroup(agent, { from: agent }),
                truffleAssert.ErrorType.REVERT,
                "Only a Sudo Member or Owner can execute this function."
            )
        })
        it('Adding an Agent using a Sudo address', async () => {
            let result = await sud.addAddressToSudoGroup(agent, { from: sudo })
            assert.isTrue(result.tx.length === 66)
        })
        it('Removal of Agent from Sudo Group', async () => {
            let result = await sud.removeAddressFromSudoGroup(agent, { from: owner })
            assert.isTrue(result.tx.length === 66)
        })
        after('After', async () => { })
    })
})

describe('Sudo Access Control tests group 2: Using Trader Role Tests', () => {
    contract('AccessControl', accounts => {
        const owner = accounts[0]
        const sudo = accounts[1]
        const extraSudo = accounts[2]
        const trader = accounts[5]
        let sud
        before('setup contracts', async () => {
            const contracts = await setupBaseContracts(owner)
            sud = contracts.sud
            await sud.addAddressToSudoGroup(sudo, { from: owner })
            await sud.addAddressToSudoGroup(extraSudo, { from: sudo })
        })
        it('Trying to add an Trader to Sudo Group using an Trader address', async () => {
            await truffleAssert.fails(
                sud.addAddressToSudoGroup(trader, { from: trader }),
                truffleAssert.ErrorType.REVERT,
                "Only a Sudo Member or Owner can execute this function."
            )
        })
        it('Adding an Trader using a Sudo address', async () => {
            let result = await sud.addAddressToSudoGroup(trader, { from: sudo })
            assert.isTrue(result.tx.length === 66)
        })
        it('Removal of Trader from Sudo Group', async () => {
            let result = await sud.removeAddressFromSudoGroup(trader, { from: owner })
            assert.isTrue(result.tx.length === 66)
        })
        after('After', async () => { })
    })
})
