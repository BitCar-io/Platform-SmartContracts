pragma solidity >=0.5.0;

import "../platform/Registry.sol";
import "./interfaces/IAssetControlBallot.sol";
import "../token/Asset/IAssetToken.sol";
import "../token/Platform/IPlatformToken.sol";
import "../vendor/SafeMath.sol";
import "../governance/Groups.sol";


contract AssetControlBallot is IAssetControlBallot, Groups {

    using SafeMath for uint256;

    struct Category {
        uint256 minVotePercentage;
        string title;
        bool exists;
    }

    Category[] categories;

    struct Vote {
        address creator;
        uint256 creationTime;
        uint256 category;
        uint256 minVotes;
        uint256 numOfVotes;
        uint256 status;
    }

    mapping(bytes32 => Vote) votes;


    struct Voter {
        bytes32[] votes;
        mapping(bytes32 => uint256) voteAmount;
    }

    mapping(address => Voter) voters;


    Registry internal registry;
    address internal assetAddress;
    IAssetToken internal assetToken;
    IPlatformToken internal platformToken;

    uint256 internal minSoldTokensPercentage;
    uint256 internal defaultMinVotePercentage;
    uint256 internal defaultVoteRunningPeriod;
    bool internal lockTokenTransfers;
    
    // Voting operation costs in platform tokens and related variables
    uint256 internal voteCreationCost = 100 * (10 ** 8);
    uint256 internal voteCastCost = 10 * (10 ** 8);
    uint256 internal voteCancellationCost = 10 * (10 ** 8);
    address internal voteCostReceiverAddress = 0x0000000000000000000000000000000000000000;


    event CategoryCreated(address indexed _creator, uint256 _category, uint256 _minVotePercentage);
    event VoteCreated(address indexed _creator, uint256 _category, bytes32 _voteID, uint256 _minVotes, uint256 _creationTime);
    event VoteCompleted(bytes32 _voteID);
    event VoteCanceled(bytes32 _voteID, address indexed _user);
    event Voted(address indexed _voter, bytes32 _voteID, uint256 _amount, uint256 _numOfVotes, uint256 _status);

    modifier onlyTokenHolder() {
        require(assetToken.balanceOf(msg.sender) > 0, "Only token holders can execute this operation");
        _;
    }

    modifier onlyVoteCreator(bytes32 _voteID) {
        require(votes[_voteID].creator == msg.sender, "Only the vote creator can execute this operation");
        _;
    }

    modifier onlyAssetToken() {
        require(address(assetToken) == msg.sender, "Only the asset token can execute this operation");
        _;
    }

    /**
     * @notice Constructor
     * @param _assetAddress Address of the asset
     * @param _assetTokenAddress Address of the asset token
     * @param _minSoldTokensPercentage Minimum tokens that have to be sold in order to cast votes
     * @param _defaultMinVotePercentage Default minimum percentage that needs to be met in order for a vote to succeed
     * @param _defaultVoteRunningPeriod Default period that a vote can be open for
     */
    constructor(
        address _registry, 
        address _assetAddress, 
        address _assetTokenAddress, 
        uint256 _minSoldTokensPercentage, 
        uint256 _defaultMinVotePercentage,
        uint256 _defaultVoteRunningPeriod) public Groups(_registry) {

        require(_assetAddress != address(0), "Invalid asset address");
        require(_assetTokenAddress != address(0), "Invalid asset token address");
        require(_minSoldTokensPercentage > 0, "Minimum sold tokens percentage cannot be 0");
        require(_defaultMinVotePercentage > 0, "Default minimum vote percentage cannot be 0");
        require(_defaultVoteRunningPeriod > 0, "Default vote running period cannot be 0");

        registry = Registry(_registry);
        assetAddress = _assetAddress;
        assetToken = IAssetToken(_assetTokenAddress);
        platformToken = IPlatformToken(registry.getAddress("PlatformToken"));

        minSoldTokensPercentage = _minSoldTokensPercentage;
        defaultMinVotePercentage = _defaultMinVotePercentage;
        defaultVoteRunningPeriod = _defaultVoteRunningPeriod;
    }

    /**
     * @notice Creates a new vote
     * @param _title Title of the category, eg: Insurance
     * @param _minVotePercentage Minimum percentage that needs to be fulfilled for the votes to pass within this category
     */
    function createCategory(string calldata _title, uint256 _minVotePercentage) external onlyAdmins {
        require(_minVotePercentage >= 0 && _minVotePercentage <= 100, "Invalid minimum vote percentage");

        Category memory category;
        category.minVotePercentage = _minVotePercentage;
        category.title = _title;
        category.exists = true;

        categories.push(category);

        emit CategoryCreated(msg.sender, categories.length, _minVotePercentage);
    }
    
    /**
     * @notice Returns the total size of the categories created
     * @return length of categories array
     */
    function categorySize() external view returns (uint256) {
        return categories.length;
    }

    /**
     * @notice Gets a category at the given index
     * @param _categoryIndex Index of the category to retrieve, fails if does not exist.
     * @return category properties: minVotePercentage, title, exists
     */
    function getCategory(uint256 _categoryIndex) external view returns (uint256 minVotePercentage, string memory title, bool exists) {
        require(categories.length >= _categoryIndex, "category does not exist");

        return (categories[_categoryIndex].minVotePercentage, categories[_categoryIndex].title, categories[_categoryIndex].exists);
    }

    /**
     * @notice Calculates percentage of tokens that have been sold
     * @return Amount of tokens that have been sold
     */
    function percentSold() public view returns(uint256) {
        uint256 oneHundred = 100;
        uint256 assetBalancePercentage = assetToken.balanceOf(assetAddress).mul(100).div(assetToken.totalSupply());

        return oneHundred.sub(assetBalancePercentage);
    }

    /**
     * @notice Checks if a vote has expired 
     * @param _voteID Vote identifier
     * @return True if vote has expired, false otherwise
     */
    function hasVoteExpired(bytes32 _voteID) public view returns(bool) {
        return block.timestamp.sub(votes[_voteID].creationTime) > defaultVoteRunningPeriod;
    }

    /**
     * @notice Checks if a vote has expired 
     * @dev As votes get completed they will still be on the voters list 
     * making this method more "expensive"
     * @param _user Address of the user
     * @return True if vote has expired, false otherwise
     */
    function canPerformTransfers(address _user) external view returns(bool) {
        if (lockTokenTransfers && voters[_user].votes.length > 0) {
            uint256 userVotesSize = voters[_user].votes.length;

            for (uint256 i = 0; i < userVotesSize; i++) {
                bytes32 voteID = voters[_user].votes[i];

                // Check if vote is "open"
                if (votes[voteID].status == 1 && !hasVoteExpired(voteID)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * @notice Checks if a vote has expired 
     * @param _user User address
     * @param _amount Amount to be checked
     * @return True if AssetControlBallot has enough allowance from the specified user, false otherwise
     */
    function checkAllowanceForUser(address _user, uint256 _amount) internal view returns(bool) {
        return platformToken.allowance(_user, address(this)) >= _amount;
    }

    /**
     * @notice Creates a new vote
     * @param _category Index of the category of the vote
     * @param _voteID Vote identifier
     */
    function createVote(uint256 _category, bytes32 _voteID) external onlyTokenHolder {
        require(categories.length > _category && categories[_category].exists, "Invalid category");
        require(votes[_voteID].status == 0, "Vote already exists");
        require(percentSold() >= minSoldTokensPercentage, "Minimum tokens have not been sold in order to create votes");
        require(checkAllowanceForUser(msg.sender, voteCreationCost), "PlatformToken allowance is not enough to cover this operation");

        require(platformToken.transferFrom(msg.sender, voteCostReceiverAddress, voteCreationCost), "Failed to transfer Platform tokens from the user");
        votes[_voteID].creator = msg.sender;
        votes[_voteID].creationTime = block.timestamp;
        votes[_voteID].category = _category;
        votes[_voteID].minVotes = categories[_category].minVotePercentage.mul(assetToken.totalSupply()).div(100);
        votes[_voteID].status = 1;

        emit VoteCreated(msg.sender, _category, _voteID, votes[_voteID].minVotes, votes[_voteID].creationTime);
    }

    /**
     * @notice Vote for a motion
     * @dev TODO: - Change state if vote has expired?
     * @param _voteID Vote identifier
     */
    function vote(bytes32 _voteID) external onlyTokenHolder {
        require(votes[_voteID].status == 1, "Vote does not exist or is not on a pending state");
        require(voters[msg.sender].voteAmount[_voteID] < assetToken.balanceOf(msg.sender), "User has already voted");
        require(!hasVoteExpired(_voteID), "Vote has expired");
        require(checkAllowanceForUser(msg.sender, voteCastCost), "PlatformToken allowance is not enough to cover this operation");

        require(platformToken.transferFrom(msg.sender, voteCostReceiverAddress, voteCastCost), "Failed to transfer Platform tokens from the user");

        // If its the first time the user is voting for this vote add a new entry to the user list
        if (voters[msg.sender].voteAmount[_voteID] == 0) {
            voters[msg.sender].votes.push(_voteID);
        }

        uint256 voteAmount = assetToken.balanceOf(msg.sender).sub(voters[msg.sender].voteAmount[_voteID]);

        voters[msg.sender].voteAmount[_voteID] = voters[msg.sender].voteAmount[_voteID].add(voteAmount);
        votes[_voteID].numOfVotes = votes[_voteID].numOfVotes.add(voteAmount);

        if (votes[_voteID].numOfVotes >= votes[_voteID].minVotes) {
            votes[_voteID].status = 2;
        }

        emit Voted(msg.sender, _voteID, voteAmount, votes[_voteID].numOfVotes, votes[_voteID].status);
    }

    /**
     * @notice Vote for a motion
     * @param _voteID Vote identifier
     */
    function completeVote(bytes32 _voteID) external onlyVoteCreator(_voteID) {
        require(votes[_voteID].status == 2, "Vote cannot be completed has threashold has not been reached");
        require(!hasVoteExpired(_voteID), "Vote has expired");

        votes[_voteID].status = 3;

        emit VoteCompleted(_voteID);
    }

    function getUserVoteIndexByID(address _user, bytes32 _voteID) public view returns(uint256) {
        uint256 userVotesSize = voters[_user].votes.length;

        for (uint256 i = 0; i < userVotesSize; i++) {
            bytes32 voteID = voters[_user].votes[i];

            if (voteID == _voteID) {
                return i;
            }
        }
    }

    /**
     * @notice Cancel a vote
     * @param _voteID Vote identifier
     */
    function cancelVote(bytes32 _voteID) external {
        require(votes[_voteID].status == 1, "Vote is not open");
        require(!hasVoteExpired(_voteID), "Vote has expired");
        require(voters[msg.sender].voteAmount[_voteID] > 0, "User has not voted in this vote");
        require(checkAllowanceForUser(msg.sender, voteCancellationCost), "PlatformToken allowance is not enough to cover this operation");

        require(platformToken.transferFrom(msg.sender, voteCostReceiverAddress, voteCancellationCost), "Failed to transfer Platform tokens from the user");

        // Remove user balance from specified vote
        votes[_voteID].numOfVotes = votes[_voteID].numOfVotes.sub(voters[msg.sender].voteAmount[_voteID]);
        voters[msg.sender].voteAmount[_voteID] = 0;

        // Remove voter entry from voters
        uint256 voteIndex = getUserVoteIndexByID(msg.sender, _voteID);
        
        removeUserVote(msg.sender, voteIndex);
        
        emit VoteCanceled(_voteID, msg.sender);
    }

    /**
     * @notice Removes a vote from user votes array
     * @param _user Address of the user
     * @param _voteIndex ID of the vote to be removed
     */
    function removeUserVote(address _user, uint256 _voteIndex) internal {
        if (voters[_user].votes.length > 1) {
            voters[_user].votes[_voteIndex] = voters[_user].votes[voters[_user].votes.length-1];
        }
        voters[_user].votes.length--;
    }


    /**
     * @notice Adjusts/cancels a user vote based on a ERC20 transfer
     * @param _from From address
     * @param _to To address
     * @param _amount Amount of the transfer
     */
    function adjustUserVote(address _from, address _to, uint256 _amount) external onlyAssetToken() {
        uint256 userVotesSize = voters[_from].votes.length;

        for (uint256 i = 0; i < userVotesSize; i++) {
            bytes32 voteID = voters[_from].votes[i];

            // If a vote is not on a pending vote state just continue iteration
            if (votes[voteID].status != 1) {
                continue;
            }

            if (voters[_from].voteAmount[voteID] > 0) {

                // If _amount is bigger than user voteAmount make voteAmount=_amount
                // This will prevent a buffer underflow causing a revert from SafeMath
                // Eg:  [voteID].numOfVotes = 100
                //      receive 50: balance = 150
                //      send 101
                //      [voteID].numOfVotes -= 101 = -1
                uint256 amount = _amount;

                if (amount > voters[_from].voteAmount[voteID]) {
                    amount = voters[_from].voteAmount[voteID];
                }

                voters[_from].voteAmount[voteID] = voters[_from].voteAmount[voteID].sub(amount);
                votes[voteID].numOfVotes = votes[voteID].numOfVotes.sub(amount);

                // User vote balance became 0, remove user vote
                if (voters[_from].voteAmount[voteID] == 0) {
                    removeUserVote(_from, i);
                }
            }
        }
    }
    
    /**
     * @notice Gets information for a given vote
     * @param _voteID Vote identifier
     * @return The vote creator, minimum votes, number of votes and status
     */
    function voteInfo(bytes32 _voteID) external view returns(address creator, uint256 minVotes, uint256 numOfVotes, uint256 status) {
        return (votes[_voteID].creator, votes[_voteID].minVotes, votes[_voteID].numOfVotes, votes[_voteID].status);
    }

    /**
     * @notice Gets voting cost information for this asset
     * @return The vote creation cost, vote casting cost and vote cancellation cost in BITCAR to 10 * 10^8 (e.g. 10 = 1,000,000,000)
     */
    function voteCosts() external view returns (uint256 _voteCreationCost, uint256 _voteCastCost, uint256 _voteCancellationCost) {
        return (voteCreationCost, voteCastCost, voteCancellationCost);
    }

    /**
     * @notice Gets how many active votes the user has
     * @param _user User
     * @return Voter vote count
     */
    function voterVoteCount(address _user) external view returns(uint256 length) {
        return (voters[_user].votes.length);
    }

    /**
     * @notice Changes the platform token costs to perform vote operations
     * @param _voteCreationCost Platform token cost to create a new vote
     * @param _voteCastCost Platform token cost to cast a vote
     * @param _voteCancellationCost Platform token cost to cancel a vote
     */
    function changeVoteCosts(uint256 _voteCreationCost, uint256 _voteCastCost, uint256 _voteCancellationCost) external onlyAdmins() {
        voteCreationCost = _voteCreationCost;
        voteCastCost = _voteCastCost;
        voteCancellationCost = _voteCancellationCost;
    }

    /**
     * @notice Change the vote receiver address where vote related operation tokens will be sent into
     * @param _voteCostReceiverAddress New vote receiver address
     */
    function changeVoteReceiverAddress(address _voteCostReceiverAddress) external onlyAdmins() {
        voteCostReceiverAddress = _voteCostReceiverAddress;
    }

    /**
     * @notice Changes the lockTokenTransfers flag
     * @param _lockTokenTransfers New lockTokenTransfers flag
     */
    function changeLockTokenTransfers(bool _lockTokenTransfers) external onlyAdmins() {
        lockTokenTransfers = _lockTokenTransfers;
    }
}