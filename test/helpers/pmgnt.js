const GenericPortfolio = artifacts.require('portfolio/GenericPortfolio')

const {
    setupBaseContracts
} = require('./general.js')

const {
    oneFinney
} = require('./units.js')

const setupContracts = async (
    owner,
    sudo,
    admin,
    agent,
    trader
) => {
    let stc
    let sud
    let adm
    let agn
    let trd
    let idx
    const contracts = await setupBaseContracts(owner)
    stc = contracts.stc
    sud = contracts.sud
    adm = contracts.adm
    agn = contracts.agn
    trd = contracts.trd
    idx = contracts.idx

    const gpo = await GenericPortfolio.new(stc.address, { from: owner })
    await idx.registerComponent(gpo.address, { from: owner })
    await gpo.registerComponent(admin, { from: owner })
    await gpo.registerComponent(agent, { from: owner })
    await gpo.registerComponent(trader, { from: owner })

    // Adding a Sudo address 
    await sud.addAddressToSudoGroup(sudo, { from: owner })
    // Adding and verifying an Admin address 
    await adm.addAddressToAdminGroup(admin, { from: sudo, value: oneFinney })
    await adm.verify(admin, true, { from: sudo })
    // Adding and verifying an Agent address 
    await agn.addAddressToAgentsGroup(agent, { from: agent, value: oneFinney })
    await agn.verify(agent, true, { from: admin })
    // Adding and verifying a Trader address 
    await trd.addAddressToTradersGroup(trader, { from: trader, value: oneFinney })

    return {
        gpo, 
        idx
    }
}

module.exports = {
    setupContracts
}
