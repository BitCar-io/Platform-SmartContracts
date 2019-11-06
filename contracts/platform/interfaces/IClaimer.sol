pragma solidity >=0.5.0;


contract IClaimer {
    
    function assetTokensToPlatformTokens(uint256 _amount) public view returns (uint256);

    function claimerFunded() public;

    function claim() public;
}