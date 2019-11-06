pragma solidity >=0.5.0;


contract IAssetRankTracker {
    
    function setRank(
        uint256 _rank, 
        uint256 _period, 
        uint256 _periodLimit, 
        uint256 _periodUserLimit) 
        public;
    
    function validatePeriod(address _user, uint256 _amount) internal returns (bool);
    
    function validateUser(address _user, uint256 _amount) internal returns (bool);
    
    function validate(address _user, uint256 _amount) public returns (bool);
}