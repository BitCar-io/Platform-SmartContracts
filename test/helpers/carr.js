const AssetRankParams = artifacts.require('libs/AssetRankParameters')
const AssetRankFactory = artifacts.require('factories/AssetRankFactory')
const AssetRank = artifacts.require('libs/AssetRank')

const {
    setupBaseContracts
} = require('./general.js')

const {
    oneFinney
} = require('./units.js')

const theUnit = 1000000
const theThreshold = 500000

const setupContracts = async (
    owner,
    sudo,
    extraSudo,
    admin,
    agent
) => {
    let stc
    let sud
    let adm
    let agn
    const contracts = await setupBaseContracts(owner)
    stc = contracts.stc
    sud = contracts.sud
    adm = contracts.adm
    agn = contracts.agn

    // Adding a Sudo address 
    await sud.addAddressToSudoGroup(sudo, { from: owner })
    // Adding an extra Sudo address 
    await sud.addAddressToSudoGroup(extraSudo, { from: sudo })
    // Adding and verifying an Admin address 
    await adm.addAddressToAdminGroup(admin, { from: sudo, value: oneFinney })
    await adm.verify(admin, true, { from: sudo })
    // Adding and verifying an Agent address 
    await agn.addAddressToAgentsGroup(agent, { from: agent, value: oneFinney })
    await agn.verify(agent, true, { from: admin })
    const crp = await AssetRankParams.new(stc.address, { from: sudo })
    await stc.setAddress("AssetRankParameters", crp.address, { from: owner })
    const crf = await AssetRankFactory.new(stc.address, { from: owner })
    await stc.setAddress("AssetRankFactory", crf.address, { from: owner })
    await crf.create({ from: owner })
    const crr = AssetRank.at(await crf.get(0, { from: owner }))
    return {
        crp,
        crr
    }
}

const validateRankingValue = async (
    bigNumObj,
    val,
    aboveThreshold
) => {
    return (bigNumObj["logs"][0]["args"]["_ranking"]["c"][0] === val) &&
        (bigNumObj["logs"][0]["args"]["_aboveThreshold"] === aboveThreshold) &&
        (bigNumObj["logs"][0]["args"]["_threshold"]["c"][0] === theThreshold) && 
        (bigNumObj["logs"][0]["args"]["_unit"]["c"][0] === theUnit)
}

const inputParams = [[  // 01
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        theUnit,        // Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 02
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        500000,         		// Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 03
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        500000,         		// Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        500000,         		// Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 04
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        0,              // Manufacturer racing pedigree
        theUnit,        // Year of production, Price when New, Prive Now
        0,              // Manual or Automatic
        0,              // Original Accesories
        0,              // Is the car a limited edition version?
        0,              // Has the chassis or engine been signed by the individual who manufactured it
        0,              // Does the car have a significant chassis number
        0,              // Was the car driven or owned by a celebrity
        0,              // Is it the original paint
        250000,         // V12, V10 or V8
        750000,         // Storage conditions of the car
        0,              // Has the car been transported overseas via air/ship?
        0               // Has the car been transported locally via air/ship/train/truck?
    ], [                // 05
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        0,              // Manufacturer racing pedigree
        500000,         // Year of production, Price when New, Prive Now
        0,              // Manual or Automatic
        0,              // Original Accesories
        0,              // Is the car a limited edition version?
        0,              // Has the chassis or engine been signed by the individual who manufactured it
        0,              // Does the car have a significant chassis number
        0,              // Was the car driven or owned by a celebrity
        0,              // Is it the original paint
        250000,         // V12, V10 or V8
        500000,         // Storage conditions of the car
        0,              // Has the car been transported overseas via air/ship?
        0               // Has the car been transported locally via air/ship/train/truck?
    ], [                // 06
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        0,              // Manufacturer racing pedigree
        0,              // Year of production, Price when New, Prive Now
        0,              // Manual or Automatic
        0,              // Original Accesories
        0,              // Is the car a limited edition version?
        0,              // Has the chassis or engine been signed by the individual who manufactured it
        0,              // Does the car have a significant chassis number
        0,              // Was the car driven or owned by a celebrity
        0,              // Is it the original paint
        250000,         // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        0,              // Has the car been transported overseas via air/ship?
        0               // Has the car been transported locally via air/ship/train/truck?
    ], [                // 07
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        0,              // Manufacturer racing pedigree
        0,              // Year of production, Price when New, Prive Now
        0,              // Manual or Automatic
        0,              // Original Accesories
        0,              // Is the car a limited edition version?
        0,              // Has the chassis or engine been signed by the individual who manufactured it
        0,              // Does the car have a significant chassis number
        0,              // Was the car driven or owned by a celebrity
        0,              // Is it the original paint
        250000,         // V12, V10 or V8
        0,              // Storage conditions of the car
        0,              // Has the car been transported overseas via air/ship?
        0               // Has the car been transported locally via air/ship/train/truck?
    ], [                // 08
        0,              // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        theUnit,        // Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 09
        theUnit,        // Manufacturer
        0,              // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        theUnit,        // Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 10
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        0,              // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        theUnit,        // Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 11
        0,              // Manufacturer
        0,              // Chassis Number
        0,              // Number of Miles Driven
        0,              // Number of previous owners
        0,              // Has the car been in an accident
        0,              // Service history records
        0,              // Insurance records
        0,              // Original sales invoice
        0,              // Certificate of authenticity
        0,              // Mechanic report about the general state of the Exotic
        0,              // Have the tires been maintained
        0,              // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        theUnit,        // Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 12
        0,              // Manufacturer
        0,              // Chassis Number
        0,              // Number of Miles Driven
        0,              // Number of previous owners
        0,              // Has the car been in an accident
        0,              // Service history records
        0,              // Insurance records
        0,              // Original sales invoice
        0,              // Certificate of authenticity
        0,              // Mechanic report about the general state of the Exotic
        0,              // Have the tires been maintained
        0,              // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        0,              // Manufacturer racing pedigree
        0,              // Year of production, Price when New, Prive Now
        0,              // Manual or Automatic
        0,              // Original Accesories
        0,              // Is the car a limited edition version?
        0,              // Has the chassis or engine been signed by the individual who manufactured it
        0,              // Does the car have a significant chassis number
        0,              // Was the car driven or owned by a celebrity
        0,              // Is it the original paint
        0,              // V12, V10 or V8
        0,              // Storage conditions of the car
        0,              // Has the car been transported overseas via air/ship?
        0               // Has the car been transported locally via air/ship/train/truck?
    ], [                // 13
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        0,              // Manufacturer racing pedigree
        theUnit,        // Year of production, Price when New, Prive Now
        theUnit,        // Manual or Automatic
        theUnit,        // Original Accesories
        theUnit,        // Is the car a limited edition version?
        theUnit,        // Has the chassis or engine been signed by the individual who manufactured it
        theUnit,        // Does the car have a significant chassis number
        theUnit,        // Was the car driven or owned by a celebrity
        theUnit,        // Is it the original paint
        theUnit,        // V12, V10 or V8
        theUnit,        // Storage conditions of the car
        theUnit,        // Has the car been transported overseas via air/ship?
        theUnit         // Has the car been transported locally via air/ship/train/truck?
    ], [                // 14
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        500000,         // Manufacturer racing pedigree
        0,              // Year of production, Price when New, Prive Now
        0,              // Manual or Automatic
        0,              // Original Accesories
        0,              // Is the car a limited edition version?
        0,              // Has the chassis or engine been signed by the individual who manufactured it
        0,              // Does the car have a significant chassis number
        0,              // Was the car driven or owned by a celebrity
        0,              // Is it the original paint
        0,              // V12, V10 or V8
        0,              // Storage conditions of the car
        0,              // Has the car been transported overseas via air/ship?
        0               // Has the car been transported locally via air/ship/train/truck?
    ], [                // 15
        theUnit,        // Manufacturer
        theUnit,        // Chassis Number
        theUnit,        // Number of Miles Driven
        theUnit,        // Number of previous owners
        theUnit,        // Has the car been in an accident
        theUnit,        // Service history records
        theUnit,        // Insurance records
        theUnit,        // Original sales invoice
        theUnit,        // Certificate of authenticity
        theUnit,        // Mechanic report about the general state of the Exotic
        theUnit,        // Have the tires been maintained
        theUnit,        // Can the car be serviced locally
        /* OPTIONAL PARAMETERS */
        theUnit,        // Manufacturer racing pedigree
        0,              // Year of production, Price when New, Prive Now
        0,              // Manual or Automatic
        0,              // Original Accesories
        0,              // Is the car a limited edition version?
        0,              // Has the chassis or engine been signed by the individual who manufactured it
        0,              // Does the car have a significant chassis number
        0,              // Was the car driven or owned by a celebrity
        0,              // Is it the original paint
        0,              // V12, V10 or V8
        0,              // Storage conditions of the car
        0,              // Has the car been transported overseas via air/ship?
        0               // Has the car been transported locally via air/ship/train/truck?
    ]
]

const newWeights = [
    theUnit,        // Manufacturer
    theUnit,        // Chassis Number
    theUnit,        // Number of Miles Driven
    theUnit,        // Number of previous owners
    theUnit,        // Has the car been in an accident
    theUnit,        // Service history records
    theUnit,        // Insurance records
    theUnit,        // Original sales invoice
    theUnit,        // Certificate of authenticity
    theUnit,        // Mechanic report about the general state of the Exotic
    theUnit,        // Have the tires been maintained
    theUnit,        // Can the car be serviced locally
    /* OPTIONAL PARAMETERS */
    theUnit,        // Manufacturer racing pedigree
    0,              // Year of production, Price when New, Prive Now
    0,              // Manual or Automatic
    0,              // Original Accesories
    0,              // Is the car a limited edition version?
    0,              // Has the chassis or engine been signed by the individual who manufactured it
    0,              // Does the car have a significant chassis number
    0,              // Was the car driven or owned by a celebrity
    0,              // Is it the original paint
    0,              // V12, V10 or V8
    0,              // Storage conditions of the car
    0,              // Has the car been transported overseas via air/ship?
    0               // Has the car been transported locally via air/ship/train/truck?
]

module.exports = {
    setupContracts,
    inputParams,
    newWeights,
    theUnit,
    theThreshold,
    validateRankingValue
}
