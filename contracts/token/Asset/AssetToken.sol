pragma solidity >=0.5.0;

import "./BaseAssetToken.sol";


contract AssetToken is BaseAssetToken {

    struct Ballot {
        uint256 sellTheAssetCount;
        uint256 sellCycle;
        uint256 keepTheAssetCount;
        uint256 keepCycle;
        uint256 minOwnershipPercentage;
        mapping (address => uint256) votersAndCycles;
    }
    Ballot private assetBallot;

    event SellTheAssetVote(address indexed _voter, uint256 _cycle);
    event KeepTheAssetVote(address indexed _voter, uint256 _cycle);
    event StartAssetAuction(uint256 _cycle, uint256 _minOwnership, uint256 _sellCount, uint256 _keepCount);

    /**
     * @dev Checks if msg.sender is a token holder and if it has already voted.
     */
    modifier onlyTokenHolders() {
        bool isTokenHolder = balances[msg.sender] > 0;
        bool firstVoteAttempt = assetBallot.votersAndCycles[msg.sender] != getCycle();
        require(isTokenHolder && firstVoteAttempt, "Is not a Token Holders or it has already voted.");
        _;
    }

    //// Public functions ////
    /**
     * @dev TOOD: Check security around "owner"
     * @param _owner The owner of the contract (Will have initial total supply)
     * @param _name The name given to the token
     * @param _symbol The symbol given to the token
     * @param _totalTokens The total amount of tokens issued
     * @param _minOwnershipPercentage The minimum quorum
     * @param _tradingPeriod The period (in seconds) that trading will be allowed
     * @param _votingPeriod The period (in seconds) that voting will be allowed
     * @param _maxCycles Number of maximum cycles allow for the asset (see waves: CyclicPausable.sol)
     * @param _config From Groups contract. References to AccessControl contracts.
     */
    constructor(
        address _owner,
        string memory _name, 
        string memory _symbol, 
        uint256 _totalTokens, 
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod, 
        uint8 _maxCycles,
        address _config) 
            public 
            BaseAssetToken(
                _owner,
                _name, 
                _symbol, 
                _totalTokens, 
                _minOwnershipPercentage, 
                _tradingPeriod, 
                _votingPeriod, 
                _maxCycles,
                _config) {
        assetBallot.sellTheAssetCount = 0;
        assetBallot.sellCycle = 0;
        assetBallot.keepTheAssetCount = 0;
        assetBallot.keepCycle = 0;
        assetBallot.minOwnershipPercentage = _minOwnershipPercentage.mul(totalSupply()).div(100);
    }

    /**
     * @notice The balance of msg.sender is counted as Selling the Asset Vote.
     */
    function voteForSellingTheAsset() 
            public 
            onlyTokenHolders
            whenNotPaused
            whileIsInLowerWave
            isNotLastCycle 
            {
        if (assetBallot.sellCycle != getCycle()) {
            assetBallot.sellTheAssetCount = 0;
            assetBallot.sellCycle = getCycle();
        }
        assetBallot.sellTheAssetCount += balances[msg.sender];
        assetBallot.votersAndCycles[msg.sender] = assetBallot.sellCycle;
        emit SellTheAssetVote(msg.sender, assetBallot.sellCycle);

        // Contract is Paused because token holders decided to sell the asset
        if (assetBallot.sellTheAssetCount >= assetBallot.minOwnershipPercentage) {
            paused = true;  // Using Pausable contract capabilities
            claimsEnabled = true;
            emit StartAssetAuction(
                assetBallot.sellCycle, 
                assetBallot.minOwnershipPercentage, 
                assetBallot.sellTheAssetCount, 
                assetBallot.keepTheAssetCount
            );
        }
    }

    /**
     * @notice The balance of msg.sender is counted as Keeping the Asset Vote.
     */
    function voteForKeepingTheAsset() 
            public 
            onlyTokenHolders
            whenNotPaused
            whileIsInLowerWave
            isNotLastCycle 
            {
        if (assetBallot.keepCycle != getCycle()) {
            assetBallot.keepTheAssetCount = 0;
            assetBallot.keepCycle = getCycle();
        }
        assetBallot.keepTheAssetCount += balances[msg.sender];
        assetBallot.votersAndCycles[msg.sender] = assetBallot.keepCycle;
        emit KeepTheAssetVote(msg.sender, assetBallot.keepCycle);
    }
}
