pragma solidity >=0.5.0;


contract ITicker {
    function setUSD(uint256 _usd) public;
    function setBTC(uint256 _btc) public;
    
    function setETH(uint256 _eth) public;

    function getUSD() public view returns (uint256);
    function getETH() public view returns (uint256);
    function getBTC() public view returns (uint256);
    
    function unitsToBase(uint256 _units) public view returns(uint256);
    function baseToUnits(uint256 _units) public view returns (uint256);

    function unitsToUSD(uint256 _units) public view returns (uint256);
    function usdToUnits(uint256 _usd) public view returns (uint256);

    function unitsToETH(uint256 _units) public view returns (uint256);
    function ethToUnits(uint256 _eth) public view returns (uint256);
}