pragma solidity >=0.5.0;


contract IAsset {
    function createAssetToken(
        string memory _name, 
        string memory _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
        public;

    function createFeeManager() public;
    function createWhitelist() public;
    function setMinTokenPercentage(uint256 _minTokenPercentage) public;
    function setPurchasePercentages(uint256 _tokenPercentage, uint256 _ethPercentage) public;
    function getFeeForAmount(uint256 _buyAmount, uint256 _fee) public view returns (uint256);
    function canBuyAssetTokens(uint256 _amount, uint256 _tokenAmount) public view returns (bool);
    function buyAssetTokens(uint256 _amount) public payable;

    function setDataHash(string memory _hash) public;
    function agentApproveData(string memory _optionalHash) public;
    function adminApproveData(bool _approved, uint256 _adminApprovalDelta) public;
    function approveContractCreation(bool _approved) public;

    function setState(uint256 _state) internal;
    function getTokenAddress() public view returns (address);
    function getFeeManagerAddress() public view returns (address);
    function getAssetControlBallotAddress() public view returns (address);
    function getAgent() public view returns (address);
}
