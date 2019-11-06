pragma solidity >=0.5.0;


contract IFeeManager {
    function createDefaultFees(uint256 _feeBEE, uint256 _feeMSI, uint256 _feePAF, uint256 _feePTF) public;
    function getAddress(string memory _feeName) public view returns(address);
    function getAmount(string memory _feeName) public view returns(uint256);
    function hasDefaultFees() public view returns(bool);
}