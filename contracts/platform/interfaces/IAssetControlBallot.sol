pragma solidity >=0.5.0;

contract IAssetControlBallot {
    function percentSold() public view returns(uint256);

    function hasVoteExpired(bytes32 _voteID) public view returns(bool);

    function createVote(uint256 _category, bytes32 _voteID) external;

    function vote(bytes32 _voteID) external;

    function completeVote(bytes32 _voteID) external;

    function voteInfo(bytes32 _voteID) external view returns(address creator, uint256 minVotes, uint256 numOfVotes, uint256 status);

    function adjustUserVote(address _from, address _to, uint256 _amount) external;

    function canPerformTransfers(address _user) external view returns(bool);
}