pragma solidity >=0.5.0;

import "./IKycProcessTracker.sol";
import "../../libs/ownership/Ownable.sol";
import "../../libs/ECVerify.sol";
import "../../governance/Groups.sol";
import "../../governance/Trader.sol";
import "../../governance/Priced.sol";
import "../../whitelist/Whitelist.sol";
import "../../libs/ReentrancyLock.sol";
import "../../libs/ownership/Ownable.sol";


/// @title KycProcessTracker 
contract KycProcessTracker is IKycProcessTracker, Ownable, Groups, ECVerify, Priced, ReentrancyLock {

    struct Document {
        uint8 docStatus;            // the status of the doc
        uint8 docType;              // the type of doc
        bool validSignature;        // if the signature has already been validated
        bool submissionConfirmed;   // if the document was successfully submitted
        uint256 idx;                // index of the document
        uint8 v;                    // V component of the digital signature 
        bytes32 r;                  // R component of the digital signature
        bytes32 s;                  // S component of the digital signature 
    }
    struct Customer {
        bool updated;
        uint8 status;               // customer status
        uint256 region;             // the region
        uint256 membership;         // the membership 
        address storageAddr;        // An additional address provided by the Customer
        uint256 count;              // document count
        //         hash => document
        mapping(bytes32 => Document) doc;
        //        index => hash (sha3 of the document)
        mapping(uint256 => bytes32) idx;
    }
    mapping(address => Customer) internal customer;
    mapping(address => address) internal coldToHotAddr;

    event DocumentSubmitted(address indexed _addr, bytes32 _hash);
    event DocumentConfirmed(address indexed _addr, bytes32 _hash);
    event DocumentStatusUpdated(address indexed _addr, bytes32 _hash, uint8 _docStatus);
    event CustomerStatusUpdated(address indexed _addr, uint8 _status);
    event CustomerStorageAddrUpdated(address indexed _addr, address _storageAddr);
    event DocsSubmissionCostUpdated(uint256 _newPrice);
    event FundsDeposited(address indexed _destination, uint256 _amount);
    event FundsRecipientUpdated(address indexed _newRecipient);

    address payable private fundsRecipient;
    uint256 private docSubmissionCost = 0;
    Trader private tradersGroup;
    Whitelist private regionsWhitelist;

    /// @param _config From Groups contract. References to AccessControl contracts.
    constructor(address payable _fundsRecipient, address _config) public Groups(_config) {
        fundsRecipient = _fundsRecipient;
        tradersGroup = Trader(address(uint160(Registry(_config).getAddress("Trader"))));
        regionsWhitelist = Whitelist(Registry(_config).getAddress("Whitelist"));
    }

    /// @notice Get data at Customer level
    function getCustomer(address _customer) 
            public 
            view  
            returns (
                uint8 _status,
                uint256 _region,
                uint256 _membership,
                address _storageAddr,
                uint256 _count) 
                {
        _status = customer[_customer].status;
        _region = customer[_customer].region;
        _membership = customer[_customer].membership;
        _storageAddr = customer[_customer].storageAddr;
        _count = customer[_customer].count;
    }

    /// @notice Gets the status of the submitted documents
    /// @param _addr The wallet that corresponds to the user submitting the documents
    /// @param _hash The hash (sha3) of the document
    function getDocumentByHash(address _addr, bytes32 _hash) 
            public 
            view 
            returns (
                uint8 _docStatus,
                uint8 _docType,
                bool _validSignature,
                bool _submissionConfirmed,
                uint256 _idx,
                uint8 _v,
                bytes32 _r,
                bytes32 _s) 
                {
        _docStatus = customer[_addr].doc[_hash].docStatus;
        _docType = customer[_addr].doc[_hash].docType;
        _validSignature = customer[_addr].doc[_hash].validSignature;
        _submissionConfirmed = customer[_addr].doc[_hash].submissionConfirmed;
        _idx = customer[_addr].doc[_hash].idx;
        _v = customer[_addr].doc[_hash].v;
        _r = customer[_addr].doc[_hash].r;
        _s = customer[_addr].doc[_hash].s;
    }

    /// @notice Gets the status of the submitted documents
    /// @param _addr The wallet that corresponds to the user submitting the documents
    /// @param _idx The index of the document
    function getDocumentByIdx(address _addr, uint256 _idx) 
            public 
            view 
            returns (
                uint8 _docStatus,
                uint8 _docType,
                bool _validSignature,
                bool _submissionConfirmed,
                bytes32 _digest,
                uint256 _idx_r,
                uint8 _v,
                bytes32 _r,
                bytes32 _s) 
                {
        bytes32 h = customer[_addr].idx[_idx];
        _docStatus = customer[_addr].doc[h].docStatus;
        _docType = customer[_addr].doc[h].docType;
        _validSignature = customer[_addr].doc[h].validSignature;
        _submissionConfirmed = customer[_addr].doc[h].submissionConfirmed;
        _digest = h;
        _idx_r = customer[_addr].doc[h].idx;
        _v = customer[_addr].doc[h].v;
        _r = customer[_addr].doc[h].r;
        _s = customer[_addr].doc[h].s;
    }

    /// @notice Submitts document digest and signature
    /// param _region The region that is going to be added to the whitelist
    /// param _membership The membership: Bronze, Silver or Gold
    /// param _storageAddr The additional wallet provided by the customer
    /// param _docType The document type
    /// param _hash The hash of the document
    /// param _v Component V of the signature
    /// param _r Component R of the signature
    /// param _s Component S of the signature
    function submitDocumentDigestAndSignature(
        uint256 _region, 
        uint8 _membership,
        address _storageAddr, 
        uint8 _docType,
        bytes32 _hash, 
        uint8 _v, 
        bytes32 _r, 
        bytes32 _s) 
            external 
            payable 
            nonReentrant
            costs(docSubmissionCost)
            returns (uint256) 
            {
        require(address(msg.sender) != _storageAddr, "The sender and the storage wallet can not be the same");
        require(coldToHotAddr[address(msg.sender)] == address(0), "Storage wallet can not be used to submit documents");
        require(validateSignature(msg.sender, _hash, _v, _r, _s), "Sender address does not match signature");
        require(customer[msg.sender].doc[_hash].validSignature == false, "Document already submitted");

        if (customer[msg.sender].region == 0) {customer[msg.sender].region = _region;}
        customer[msg.sender].membership = _membership;
        if (customer[msg.sender].updated == false) {
            customer[msg.sender].updated = true;
            customer[msg.sender].storageAddr = _storageAddr;
            coldToHotAddr[_storageAddr] = msg.sender;
        }
        customer[msg.sender].doc[_hash].docType = _docType;
        customer[msg.sender].doc[_hash].validSignature = true;
        customer[msg.sender].doc[_hash].idx = customer[msg.sender].count;
        customer[msg.sender].doc[_hash].v = _v;
        customer[msg.sender].doc[_hash].r = _r;
        customer[msg.sender].doc[_hash].s = _s;
        customer[msg.sender].idx[customer[msg.sender].count] = _hash;
        customer[msg.sender].count = customer[msg.sender].count + 1;
        emit DocumentSubmitted(msg.sender, _hash);
        if (docSubmissionCost > 0) {
            fundsRecipient.transfer(msg.value);
            emit FundsDeposited(fundsRecipient, msg.value);
        }
        return customer[msg.sender].doc[_hash].idx;
    }

    /// @notice Confirms the document as successfully submitted
    function confirmDocument(address _addr, bytes32 _hash) public onlyImmediateOwnerOrWhitelisted {
        require(customer[_addr].doc[_hash].validSignature, "Document signature must be validated first");
        require(customer[_addr].doc[_hash].submissionConfirmed == false, "Document already confirmed");
        customer[_addr].doc[_hash].submissionConfirmed = true;
        customer[_addr].doc[_hash].docStatus = 1;
        // Add Customer to Traders Group
        tradersGroup.addAddressToTradersGroup(_addr);
        // Add customer to regionsWhitelist
        regionsWhitelist.add(_addr, customer[_addr].region);
        // Add customer additional wallet to regionsWhitelist
        regionsWhitelist.add(customer[_addr].storageAddr, customer[_addr].region);
        emit DocumentConfirmed(_addr, _hash);
    }

    /// @notice Updates the Customer status
    function updateCustomerStatus(address _addr, uint8 _status) public onlyAdmins {
        customer[_addr].status = _status;
        emit CustomerStatusUpdated(_addr, _status);
    }

    /// @notice Updates the Customer storage addr
    function updateCustomerStorageAddr(address _addr, address _storageAddr) public onlyAdmins {
        // Removing current storage address from whitelist
        regionsWhitelist.remove(customer[_addr].storageAddr, customer[_addr].region);
        // Updating storage address
        customer[_addr].storageAddr = _storageAddr;
        // Updating coldToHotAddr mapping 
        coldToHotAddr[_storageAddr] = _addr;
        // Adding new storage address to whitelist
        regionsWhitelist.add(_storageAddr, customer[_addr].region);
        emit CustomerStorageAddrUpdated(_addr, _storageAddr);
    }

    /// @notice Updates the document status
    function updateDocumentStatus(address _addr, bytes32 _hash, uint8 _docStatus) public onlyAdmins {
        require(customer[_addr].doc[_hash].submissionConfirmed, "Document must be confirmed first");
        customer[_addr].doc[_hash].docStatus = _docStatus;
        emit DocumentStatusUpdated(_addr, _hash, _docStatus);
    }

    /// @notice Updates the document submission cost
    function updateDocSubmissionCost(uint256 _newPrice) public onlyAdmins {
        docSubmissionCost = _newPrice;
        emit DocsSubmissionCostUpdated(_newPrice);
    }

    /// @notice Updates the funds recipient
    function updateFundsRecipient(address payable _newRecipient) public onlyAdmins {
        fundsRecipient = _newRecipient;
        emit FundsRecipientUpdated(_newRecipient);
    }

    /// @notice Returns the hot & cold wallets addresses 
    function getWallets(address _addr) public view returns (address _hotWallet, address _coldWallet) {
        if (_addr == address(0)) {
            _hotWallet = address(0);
            _coldWallet = address(0);
        } else if (customer[_addr].updated) {
            // _addr is a hot wallet
            _hotWallet = _addr;
            _coldWallet = customer[_addr].storageAddr;
        } else {
            // _addr is NOT hot wallet, let's assume it is a cold wallet
            _hotWallet = coldToHotAddr[_addr];
            _coldWallet = _addr;
            if (_hotWallet == address(0)) {
                // There is no hot wallet associated with _addr
                _coldWallet = address(0);
            }
        }
    }
}
