const BigNumber = require('bignumber.js')
const crypto = require('crypto')
const truffleAssert = require('truffle-assertions')

const {
    setupContracts,
    getSignature
} = require('./helpers/kyc.js')

const {
    oneEther
} = require('./helpers/units.js')

const binFilePath = __dirname + '/resources/bin-file.jpg'
const txtFilePath = __dirname + '/resources/text-file.txt'

describe('Document Signature generation and validation tests', () => {
    contract('KycProcessTracker', (accounts) => {
        let owner = accounts[0]
        let notOwner = accounts[1]
        let anotherOwner = accounts[2]
        let anotherNotOwner = accounts[3]
        let admin = accounts[4]
        let fundsRecipient = "0x" + crypto.randomBytes(20).toString('hex')
        let kpt
        let rndData
        let rndDataSig
        let rndDataSig2
        let binData
        let binDataSig
        let binDataSig2
        let txtData
        let txtDataSig
        let txtDataSig2
        let storageAddr
        before('setup contracts & inputs', async () => {
            const requirements = await setupContracts(
                owner,
                admin,
                fundsRecipient,
                binFilePath,
                txtFilePath
            )
            kpt = requirements.kpt
            rndData = requirements.rnd
            binData = requirements.bin
            txtData = requirements.txt
            rndDataSig = await getSignature(owner, rndData)
            binDataSig = await getSignature(owner, binData)
            txtDataSig = await getSignature(owner, txtData)
            rndDataSig2 = await getSignature(anotherOwner, rndData)
            binDataSig2 = await getSignature(anotherOwner, binData)
            txtDataSig2 = await getSignature(anotherOwner, txtData)
        })

        it('ecrecover address from signed random data and compare it with the OWNER address', async () => {
            let result = await kpt.validateSignature(owner, rndDataSig.h, rndDataSig.v, rndDataSig.r, rndDataSig.s)
            assert.isTrue(result)
        })
        it('ecrecover address from signed random data and compare it with a NOT OWNER address', async () => {
            let result = await kpt.validateSignature(notOwner, rndDataSig.h, rndDataSig.v, rndDataSig.r, rndDataSig.s)
            assert.isFalse(result)
        })
        it('ecrecover address from signed random data and compare it with ANOTHER OWNER address', async () => {
            let result = await kpt.validateSignature(anotherOwner, rndDataSig2.h, rndDataSig2.v, rndDataSig2.r, rndDataSig2.s)
            assert.isTrue(result)
        })
        it('ecrecover address from signed random data and compare it with ANOTHER NOT OWNER address', async () => {
            let result = await kpt.validateSignature(anotherNotOwner, rndDataSig2.h, rndDataSig2.v, rndDataSig2.r, rndDataSig2.s)
            assert.isFalse(result)
        })

        it('ecrecover address from signed binData (from binary file) and compare it with the OWNER address', async () => {
            let result = await kpt.validateSignature(owner, binDataSig.h, binDataSig.v, binDataSig.r, binDataSig.s)
            assert.isTrue(result)
        })
        it('ecrecover address from signed binData (from binary file) and compare it with a NOT OWNER address', async () => {
            let result = await kpt.validateSignature(notOwner, binDataSig.h, binDataSig.v, binDataSig.r, binDataSig.s)
            assert.isFalse(result)
        })
        it('ecrecover address from signed binData data and compare it with ANOTHER OWNER address', async () => {
            let result = await kpt.validateSignature(anotherOwner, binDataSig2.h, binDataSig2.v, binDataSig2.r, binDataSig2.s)
            assert.isTrue(result)
        })
        it('ecrecover address from signed binData data and compare it with ANOTHER NOT OWNER address', async () => {
            let result = await kpt.validateSignature(anotherNotOwner, binDataSig2.h, binDataSig2.v, binDataSig2.r, binDataSig2.s)
            assert.isFalse(result)
        })

        it('ecrecover address from signed txtData (from text file) and compare it with the OWNER address', async () => {
            let result = await kpt.validateSignature(owner, txtDataSig.h, txtDataSig.v, txtDataSig.r, txtDataSig.s)
            assert.isTrue(result)
        })
        it('ecrecover address from signed txtData (from text file) and compare it with a NOT OWNER address', async () => {
            let result = await kpt.validateSignature(notOwner, txtDataSig.h, txtDataSig.v, txtDataSig.r, txtDataSig.s)
            assert.isFalse(result)
        })
        it('ecrecover address from signed txtData data and compare it with ANOTHER OWNER address', async () => {
            let result = await kpt.validateSignature(anotherOwner, txtDataSig2.h, txtDataSig2.v, txtDataSig2.r, txtDataSig2.s)
            assert.isTrue(result)
        })
        it('ecrecover address from signed txtData data and compare it with ANOTHER NOT OWNER address', async () => {
            let result = await kpt.validateSignature(anotherNotOwner, txtDataSig2.h, txtDataSig2.v, txtDataSig2.r, txtDataSig2.s)
            assert.isFalse(result)
        })

        it('Adding information about the generated random data to KycProcessTracker contract', async () => {
            storageAddr = "0x" + crypto.randomBytes(20).toString('hex')
            let result = await kpt.submitDocumentDigestAndSignature(
                67,             // uint256 _region
                87,             // uint8 _membership
                storageAddr,    // address _storageAddr
                77,             // uint8 _docType
                rndDataSig.h,   // bytes32 _hash
                rndDataSig.v,   // uint8 _v
                rndDataSig.r,   // bytes32 _r
                rndDataSig.s,   // bytes32 _s
                { from: owner })
            assert.isTrue(result.tx.length === 66)

            result = await kpt.getCustomer(owner)
            assert.isTrue(BigNumber(result._count).toString() === "1")
            assert.isTrue(result._storageAddr.toString().toLowerCase() === storageAddr)

            result = await kpt.getDocumentByHash(owner, rndDataSig.h, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "0")
            assert.isTrue(BigNumber(result._docType).toString() === "77")
            assert.isTrue(result._validSignature)
            assert.isFalse(result._submissionConfirmed)
            assert.isTrue(BigNumber(result._idx).toString() === "0")
            assert.isTrue(BigNumber(result._v).toString() === rndDataSig.v.toString())
            assert.isTrue(result._r === rndDataSig.r.toString())
            assert.isTrue(result._s === rndDataSig.s.toString())
        })

        it('Adding information about the binary file to KycProcessTracker contract', async () => {
            let tmpStorageAddr = "0x" + crypto.randomBytes(20).toString('hex')
            let result = await kpt.submitDocumentDigestAndSignature(
                68,                 // uint256 _region
                88,                 // uint8 _membership
                tmpStorageAddr,     // address _storageAddr, shouln't change 
                78,                 // uint8 _docType
                binDataSig.h,       // bytes32 _hash
                binDataSig.v,       // uint8 _v
                binDataSig.r,       // bytes32 _r
                binDataSig.s,       // bytes32 _s
                { from: owner })
            assert.isTrue(result.tx.length === 66)

            let wallets = await kpt.getWallets(storageAddr)
            assert.isTrue(wallets._hotWallet.toString().toLowerCase() === owner.toString().toLowerCase())
            wallets = await kpt.getWallets(owner)
            assert.isTrue(wallets._coldWallet.toString().toLowerCase() === storageAddr.toString().toLowerCase())
            wallets = await kpt.getWallets(tmpStorageAddr)
            assert.isTrue(wallets._hotWallet.toString().toLowerCase() === "0x0000000000000000000000000000000000000000")
            assert.isTrue(wallets._coldWallet.toString().toLowerCase() === "0x0000000000000000000000000000000000000000")

            result = await kpt.getCustomer(owner)
            assert.isTrue(BigNumber(result._count).toString() === "2")
            assert.isTrue(result._storageAddr.toString().toLowerCase() === storageAddr)
            assert.isTrue(BigNumber(result._region).toString() === "67")

            result = await kpt.getDocumentByHash(owner, binDataSig.h, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "0")
            assert.isTrue(BigNumber(result._docType).toString() === "78")
            assert.isTrue(result._validSignature)
            assert.isFalse(result._submissionConfirmed)
            assert.isTrue(BigNumber(result._idx).toString() === "1")
            assert.isTrue(BigNumber(result._v).toString() === binDataSig.v.toString())
            assert.isTrue(result._r === binDataSig.r.toString())
            assert.isTrue(result._s === binDataSig.s.toString())
        })
        it('Adding information about the text file to KycProcessTracker contract (using a cost > 0)', async () => {
            let tx = await kpt.updateDocSubmissionCost(BigNumber(oneEther), { from: admin })
            assert.isTrue(tx.tx.length === 66)
            let balance = await web3.eth.getBalance(fundsRecipient)
            assert.isTrue(BigNumber(balance).toString() === "0")

            let tmpStorageAddr = "0x0000000000000000000000000000000000000000"
            let result = await kpt.submitDocumentDigestAndSignature(
                69,                 // uint256 _region
                89,                 // uint8 _membership
                tmpStorageAddr,     // address _storageAddr
                79,                 // uint8 _docType
                txtDataSig.h,       // bytes32 _hash
                txtDataSig.v,       // uint8 _v
                txtDataSig.r,       // bytes32 _r
                txtDataSig.s,       // bytes32 _s
                { from: owner, value: oneEther })
            assert.isTrue(result.tx.length === 66)

            let wallets = await kpt.getWallets(storageAddr)
            assert.isTrue(wallets._hotWallet.toString().toLowerCase() === owner.toString().toLowerCase())
            wallets = await kpt.getWallets(owner)
            assert.isTrue(wallets._coldWallet.toString().toLowerCase() === storageAddr.toString().toLowerCase())
            wallets = await kpt.getWallets("0x" + crypto.randomBytes(20).toString('hex'))
            assert.isTrue(wallets._hotWallet.toString().toLowerCase() === "0x0000000000000000000000000000000000000000")
            assert.isTrue(wallets._coldWallet.toString().toLowerCase() === "0x0000000000000000000000000000000000000000")

            balance = await web3.eth.getBalance(fundsRecipient)
            assert.isTrue(BigNumber(balance).toString() === BigNumber(oneEther).toString())

            result = await kpt.getCustomer(owner)
            assert.isTrue(BigNumber(result._count).toString() === "3")
            assert.isTrue(result._storageAddr.toString().toLowerCase() === storageAddr)
            assert.isTrue(BigNumber(result._region).toString() === "67")

            result = await kpt.getDocumentByHash(owner, txtDataSig.h, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "0")
            assert.isTrue(BigNumber(result._docType).toString() === "79")
            assert.isTrue(result._validSignature)
            assert.isFalse(result._submissionConfirmed)
            assert.isTrue(BigNumber(result._idx).toString() === "2")
            assert.isTrue(BigNumber(result._v).toString() === txtDataSig.v.toString())
            assert.isTrue(result._r === txtDataSig.r.toString())
            assert.isTrue(result._s === txtDataSig.s.toString())
        })
        it('Confirm document for the randomly generated data', async () => {
            let result = await kpt.confirmDocument(
                owner,
                rndDataSig.h,
                { from: owner })
            assert.isTrue(result.tx.length === 66)

            result = await kpt.getCustomer(owner)
            assert.isTrue(BigNumber(result._count).toString() === "3")

            result = await kpt.getDocumentByHash(owner, rndDataSig.h, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "1")
            assert.isTrue(BigNumber(result._docType).toString() === "77")
            assert.isTrue(result._validSignature)
            assert.isTrue(result._submissionConfirmed)
            assert.isTrue(BigNumber(result._idx).toString() === "0")
            assert.isTrue(BigNumber(result._v).toString() === rndDataSig.v.toString())
            assert.isTrue(result._r === rndDataSig.r.toString())
            assert.isTrue(result._s === rndDataSig.s.toString())

            result = await kpt.getDocumentByIdx(owner, 0, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "1")
            assert.isTrue(BigNumber(result._docType).toString() === "77")
            assert.isTrue(result._validSignature)
            assert.isTrue(result._submissionConfirmed)
            assert.isTrue(result._digest === rndDataSig.h.toString())
            assert.isTrue(BigNumber(result._idx_r).toString() === "0")
            assert.isTrue(BigNumber(result._v).toString() === rndDataSig.v.toString())
            assert.isTrue(result._r === rndDataSig.r.toString())
            assert.isTrue(result._s === rndDataSig.s.toString())
        })
        it('Confirm document for the binary data file', async () => {
            let result = await kpt.confirmDocument(
                owner,
                binDataSig.h,
                { from: owner })
            assert.isTrue(result.tx.length === 66)

            result = await kpt.getCustomer(owner)
            assert.isTrue(BigNumber(result._count).toString() === "3")

            result = await kpt.getDocumentByHash(owner, binDataSig.h, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "1")
            assert.isTrue(BigNumber(result._docType).toString() === "78")
            assert.isTrue(result._validSignature)
            assert.isTrue(result._submissionConfirmed)
            assert.isTrue(BigNumber(result._idx).toString() === "1")
            assert.isTrue(BigNumber(result._v).toString() === binDataSig.v.toString())
            assert.isTrue(result._r === binDataSig.r.toString())
            assert.isTrue(result._s === binDataSig.s.toString())

            result = await kpt.getDocumentByIdx(owner, 1, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "1")
            assert.isTrue(BigNumber(result._docType).toString() === "78")
            assert.isTrue(result._validSignature)
            assert.isTrue(result._submissionConfirmed)
            assert.isTrue(result._digest === binDataSig.h.toString())
            assert.isTrue(BigNumber(result._idx_r).toString() === "1")
            assert.isTrue(BigNumber(result._v).toString() === binDataSig.v.toString())
            assert.isTrue(result._r === binDataSig.r.toString())
            assert.isTrue(result._s === binDataSig.s.toString())
        })
        it('Trying to update document (text file) status before confirmation, it should fail', async () => {
            await truffleAssert.fails(
                kpt.updateDocumentStatus(owner, txtDataSig.h, 2, { from: admin }),
                truffleAssert.ErrorType.REVERT,
                "Document must be confirmed first"
            )
        })
        it('Confirm document for the text file data', async () => {
            let result = await kpt.confirmDocument(
                owner,
                txtDataSig.h,
                { from: owner })
            assert.isTrue(result.tx.length === 66)

            result = await kpt.getCustomer(owner)
            assert.isTrue(BigNumber(result._count).toString() === "3")

            result = await kpt.getDocumentByHash(owner, txtDataSig.h, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "1")
            assert.isTrue(BigNumber(result._docType).toString() === "79")
            assert.isTrue(result._validSignature)
            assert.isTrue(result._submissionConfirmed)
            assert.isTrue(BigNumber(result._idx).toString() === "2")
            assert.isTrue(BigNumber(result._v).toString() === txtDataSig.v.toString())
            assert.isTrue(result._r === txtDataSig.r.toString())
            assert.isTrue(result._s === txtDataSig.s.toString())

            await kpt.updateDocumentStatus(owner, txtDataSig.h, 2, { from: admin })

            result = await kpt.getDocumentByIdx(owner, 2, { from: owner })
            assert.isTrue(BigNumber(result._docStatus).toString() === "2")
            assert.isTrue(BigNumber(result._docType).toString() === "79") 
            assert.isTrue(result._validSignature)
            assert.isTrue(result._submissionConfirmed)
            assert.isTrue(result._digest === txtDataSig.h.toString())
            assert.isTrue(BigNumber(result._idx_r).toString() === "2")
            assert.isTrue(BigNumber(result._v).toString() === txtDataSig.v.toString())
            assert.isTrue(result._r === txtDataSig.r.toString())
            assert.isTrue(result._s === txtDataSig.s.toString())
        })
        it('Update Customer status', async () => {
            await kpt.updateCustomerStatus(owner, 2, { from: admin })
            let customerStatus = await kpt.getCustomer(owner)
            assert.isTrue(customerStatus._status.toString() === "2")
        })
        it('Update Customer Storage Addr', async () => {
            let storageAddr = "0x" + crypto.randomBytes(20).toString('hex')
            await kpt.updateCustomerStorageAddr(owner, storageAddr, { from: admin })
            let customer = await kpt.getCustomer(owner)
            assert.isTrue(customer._storageAddr.toString().toLowerCase() === storageAddr)
        })
    })
})
