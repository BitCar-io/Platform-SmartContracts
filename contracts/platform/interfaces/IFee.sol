pragma solidity >=0.5.0;

import "../Registry.sol";


contract IFee {
    function claimEth() public;
    function claimPlatformTokens() public;
    function claimAssetTokens() public;

    function getPlatformTokenBalance() public view returns (uint256);
    function getAssetTokenBalance() public view returns (uint256);
}