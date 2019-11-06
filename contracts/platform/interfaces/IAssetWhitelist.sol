pragma solidity >=0.5.0;


contract IAssetWhitelist {
    function addCountry(uint256 _country) public;
    
    function removeCountry(uint256 _country) public;

    function allowTransaction(address _from, address _to) public view returns (bool);
}