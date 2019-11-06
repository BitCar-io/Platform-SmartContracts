pragma solidity >=0.5.0;


contract IBEE {

        // TODO: Check security around this method
    function getRatio() public returns (uint256);

    function assetTokensToPlatformTokens(uint256 _amount) public returns (uint256);

    function claimEth() public;

    /**
     * @notice Amount of car tokens to claim and receive bitcar tokens in return
     */
    function claimPlatformTokens() public;

    function claimAssetTokens() public;

    function getPlatformTokenBalance() public view returns (uint256);

    function getAssetTokenBalance() public view returns (uint256);
}