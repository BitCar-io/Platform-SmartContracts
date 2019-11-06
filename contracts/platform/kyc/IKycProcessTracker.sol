pragma solidity >=0.5.0;


/// @title IKycProcessTracker 
contract IKycProcessTracker {

    /// @notice Get data at Customer level
    function getCustomer(address _customer) 
        public 
        view  
        returns (
        uint8 _status,
        uint256 _region,
        uint256 _membership,
        address _storageAddr,
        uint256 _count);

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
        bytes32 _s);

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
        bytes32 _s);

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
        returns (uint256);

    /// @notice Confirms the document as successfully submitted
    function confirmDocument(address _addr, bytes32 _hash) public;

    /// @notice Updates the Customer status
    function updateCustomerStatus(address _addr, uint8 _status) public;

    /// @notice Updates the Customer storage addr
    function updateCustomerStorageAddr(address _addr, address _storageAddr) public;

    /// @notice Updates the document status
    function updateDocumentStatus(address _addr, bytes32 _hash, uint8 _docStatus) public;

    /// @notice Updates the document submission cost
    function updateDocSubmissionCost(uint256 _newPrice) public;

    /// @notice Updates the funds recipient
    function updateFundsRecipient(address payable _newRecipient) public;

    /// @notice Returns the hot & cold wallets addresses 
    function getWallets(address _wallet) public view returns (address _hotWallet, address _coldWallet);
}
