pragma solidity >=0.5.0;


contract IRankTracker {

    function setGlobalLimit(uint256 _rank, uint256 _limit) public;

    function getGlobalLimit(uint256 _rank) external view returns (uint256);

    function setUserRank(address _user, uint256 _rank) public;

    function getUserRank(address _user) public view returns (uint256);

    function validateGlobalLimits(address _from, address _to, uint256 _amount) external returns (bool);

    function getUserGlobalUsage(address _user) external view returns (uint256);
}