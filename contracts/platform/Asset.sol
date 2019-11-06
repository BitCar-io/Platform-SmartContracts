pragma solidity >=0.5.0;

import "../platform/Registry.sol";

import "../platform/Registry.sol";
import "../token/Platform/IPlatformToken.sol";

import "../factories/AssetTokenFactory.sol";
import "../token/Asset/IAssetToken.sol";

import "../factories/FeeManagerFactory.sol";
import "./interfaces/IFeeManager.sol";

import "../factories/AssetWhitelistFactory.sol";
import "./interfaces/IAssetWhitelist.sol";

import "../factories/AssetRankTrackerFactory.sol";
import "./interfaces/IAssetRankTracker.sol";

import "../factories/AssetControlBallotFactory.sol";
import "./interfaces/IAssetControlBallot.sol";

import "../governance/Groups.sol";

import "../governance/AssetRole.sol";

import "../vendor/SafeMath.sol";


contract Asset is Groups {

    using SafeMath for uint256;

    modifier onlyAgent() {
        require(msg.sender == agent, "Not a valid agent");
        _;
    }

    Registry internal config;

    IPlatformToken internal platformToken;
    IAssetToken internal assetToken;
    IFeeManager internal feeManager;
    IAssetWhitelist internal assetWhitelist;
    IAssetRankTracker internal assetRankTracker;
    IAssetControlBallot internal assetControlBallot;
    ITicker internal ticker;

    /* SETTINGS */
    string public dataHash;

    address internal owner;
    address payable public agent;

    uint256 public minPurchaseAmount = 50 * (10 ** 8);

    uint256 public minTokenPercentage;
    uint256 public tokenPercentage;
    uint256 internal ethPercentage;

    /* STATE */
    uint256 internal PENDING_AGENT_DATA_APPROVAL = 0;
    uint256 internal PENDING_ADMIN_DATA_APPROVAL = 1;
    uint256 internal PENDING_AGENT_CONTRACT_APPROVAL = 2;
    uint256 internal LIVE = 3;

    uint256 public state = PENDING_AGENT_DATA_APPROVAL;
    uint256 public agentRejections = 0;
    uint256 public adminRejections = 0;
    uint256 internal adminApprovalDelta;
    uint256 internal agentApprovalEpoch;


    event Log(string msg);
    event LogInt(string msg, uint256 val);

    event LogIII(uint256, uint256, uint256);

    event BoughtAssetTokens(address indexed user, uint256 tokenAmount, uint256 tokenCostBitcar, uint256 costWei, uint256 beeCost, uint256 msiCost, uint256 pafCost, uint256 ptfCost);
    event StateChanged(uint256 currentState);
    event BitCarPercentChanged(uint256 bitCarPercent);
    event MinPurchaseChanged(uint256 minPurchaseAmount);

    /**
     * @notice Constructor
     * @param _config The Registry address
     * @param _agent Address of the user that wants to create a new asset
     */
    constructor(address _config, address payable _agent) 
            public 
            Groups(_config) {

        require(_config != address(0), "Invalid registry address");
        require(_agent != address(0), "Invalid agent address");

        config = Registry(_config);

        require(isVerifiedAgent(_agent), "Agent is not verified");

        agent = _agent;

        platformToken = IPlatformToken(config.getAddress("PlatformToken"));
        ticker = ITicker(config.getAddress("Ticker"));
    }

    /**
     * @notice Sets the minimum number of asset tokens that can be purchased from the platform for each transaction
     * @param _minPurchaseAmt Quantity of tokens for minimum purchase to factor of 10^8 (e.g. 40 = 4000000000)
     */
    function setMinPurchaseAmount(uint256 _minPurchaseAmt) external onlyAdmins {
        minPurchaseAmount = _minPurchaseAmt;
        emit MinPurchaseChanged(_minPurchaseAmt);
    }

    /* TOKEN */

    // ASSET FUNCTIONS
    /**
     * @notice Creates a new token for this asset
     * @dev TODO: This method is not safe!! A validation needs to happen before actually
     *            making the newly created ERC20 live. The values entered are not validated
     *          As per new onboarding changes Whitelist can be created multiple times
     * @param _name Name of the token
     * @param _symbol Symbol of the new asset token
     * @param _totalSupply The total cost of the asset (in the smallest unit)
     * @param _minOwnershipPercentage Minimum ownership required to own and therefore lock the asset
     * @param _tradingPeriod Allowed trading duration period
     * @param _votingPeriod Allowed voting duration period, after tradingPeriod is over (see waves: CyclicPausable.sol)
     * @param _maxCycles Number of maximum cycles allow for the asset (see waves: CyclicPausable.sol)
     */
    function createAssetToken(
        string memory _name, 
        string memory _symbol, 
        uint256 _totalSupply,
        uint256 _minOwnershipPercentage, 
        uint256 _tradingPeriod, 
        uint256 _votingPeriod,
        uint8 _maxCycles) 
            public onlyAdmins 
            {
        
        require(state == PENDING_ADMIN_DATA_APPROVAL, "Cannot create asset token in this state");

        AssetTokenFactory assetTokenFactory = AssetTokenFactory(config.getAddress("AssetTokenFactory"));
        assetToken = assetTokenFactory.create(
            address(this),
            _name, 
            _symbol, 
            _totalSupply,
            _minOwnershipPercentage, 
            _tradingPeriod, 
            _votingPeriod, 
            _maxCycles);

        AssetRole(address(assetAccCtrl)).addAddressToAssetsGroup(address(assetToken));
    }

    /**
     * @notice Creates a new fee manager for this asset
     * @dev As per new onboarding changes Whitelist can be created multiple times
     */
    function createFeeManager() public onlyAdmins {
        require(state == PENDING_ADMIN_DATA_APPROVAL, "Cannot create fee manager in this state");
        require(address(assetToken) != address(0), "The AssetToken needs to be deployed before the whitelist");

        FeeManagerFactory feeManagerFactory = FeeManagerFactory(config.getAddress("FeeManagerFactory"));
        feeManager = feeManagerFactory.create(address(this));
    }

    /**
     * @notice Creates a new AssetWhitelist and attaches it to the AssetToken
     * @dev As per new onboarding changes Whitelist can be created multiple times
     */
    function createWhitelist() public onlyAdmins {
        require(state == PENDING_ADMIN_DATA_APPROVAL, "Cannot create whitelist in this state");
        require(address(assetToken) != address(0), "The AssetToken needs to be deployed before the whitelist");
        require(feeManager.hasDefaultFees(), "The FeeManager needs to be deployed before the whitelist");
        require(address(feeManager) != address(0), "The FeeManager needs to be deployed before the whitelist");

        AssetWhitelistFactory assetWhitelistFactory = AssetWhitelistFactory(config.getAddress("AssetWhitelistFactory"));
        assetWhitelist = assetWhitelistFactory.create(address(this), feeManager.getAddress("CLAIMER"));
        assetToken.setAssetWhitelist(address(assetWhitelist));
    }

    /**
     * @notice Creates a new assetRankTracker and attaches it to the AssetToken
     * @dev As per new onboarding changes assetRankTracker can be created multiple times
     */
    function createRankTracker() public onlyAdmins {
        require(state == PENDING_ADMIN_DATA_APPROVAL, "Cannot create assetRankTracker in this state");
        require(address(assetToken) != address(0), "The AssetToken needs to be deployed before the assetRankTracker");

        AssetRankTrackerFactory assetRankTrackerFactory = AssetRankTrackerFactory(config.getAddress("AssetRankTrackerFactory"));
        assetRankTracker = assetRankTrackerFactory.create(address(this));
    }

    /**
     * @notice Creates a new asset ballot and attaches it to the AssetToken
     */
    function createAssetBallot(uint256 _minSoldTokensPercentage, uint256 _defaultMinVotePercentage, uint256 _defaultVoteRunningPeriod) public onlyAdmins {
        require(state == PENDING_ADMIN_DATA_APPROVAL, "Cannot create asset ballot in this state");
        require(address(assetToken) != address(0), "The AssetToken needs to be deployed before the assetRankTracker");

        AssetControlBallotFactory assetControlBallotFactory = AssetControlBallotFactory(config.getAddress("AssetControlBallotFactory"));
        assetControlBallot = assetControlBallotFactory.create(address(this), address(assetToken), _minSoldTokensPercentage, _defaultMinVotePercentage, _defaultVoteRunningPeriod);
        assetToken.setAssetControlBallot(address(assetControlBallot));
    }

    /**
     * @notice Sets the minimum token percentage to be used with setPurchasePercentages
     * @dev TODO: Need to test functionality
     * @param _minTokenPercentage Token percentage
     */
    function setMinTokenPercentage(uint256 _minTokenPercentage) public onlySudo {
        require(_minTokenPercentage <= 100, "Invalid minimum token percentage");

        minTokenPercentage = _minTokenPercentage;
    }

    /**
     * @notice Sets the Token/Eth percentage accepted as payment
     * @dev Percentages need to add up to 100%
     * @param _tokenPercentage Token percentage
     * @param _ethPercentage Eth percentage
     */
    function setPurchasePercentages(uint256 _tokenPercentage, uint256 _ethPercentage) public onlyAdmins {
        require(state == PENDING_ADMIN_DATA_APPROVAL, "Cannot change percentages in this state");
        require(_tokenPercentage <= 100 && _tokenPercentage >= minTokenPercentage, "Invalid token percentage");
        require(_ethPercentage <= 100, "Invalid Eth percentage");
        require(_tokenPercentage.add(_ethPercentage) == 100, "Percentages need to add to 100%");

        tokenPercentage = _tokenPercentage;
        ethPercentage = _ethPercentage;

        emit BitCarPercentChanged(_tokenPercentage);
    }

    /**
     * @notice Calculates the required fee for a given amount based on what percentage the
     *         amount corresponds to the total asset supply
     * @dev TODO: Port to FeeManager
     * @param _buyAmount The amount of asset tokens
     * @return Fee cost (smallest unit)
     */
    function getFeeForAmount(uint256 _buyAmount, uint256 _fee) public view returns (uint256) {
        return (_buyAmount.mul(_fee)).div(assetToken.totalSupply());
    }

     /**
     * @notice Checks if the sender is allowed to purchase asset tokens
     * @param _amount The amount of asset tokens
     * @param _tokenAmount The correspondent amount of platform (BitCar) tokens
     * @return true if user can purchase tokens, false otherwise
     */
    function canBuyAssetTokens(uint256 _amount, uint256 _tokenAmount) public view returns (bool) {
        // Check if asset still has tokens available for purchase
        if ( assetToken.balanceOf(address(this)) < _amount ) {
            return false;
        }

        // Check User BitCar ERC20 balance
        if ( platformToken.balanceOf(msg.sender) < _tokenAmount ) {
            return false;
        }

        // Check User BitCar ERC20 allowance
        if ( platformToken.allowance(msg.sender, address(this)) < _tokenAmount ) {
            return false;
        }

        if ( tokenPercentage.add(ethPercentage) != 100 ) {
            return false;
        }

        return true;
    }

    /**
     * @notice Performs an asset token purchase in exchange for platform tokens
     * @dev     TODO: 
     *               - Check if car exists, agent, validate params
     *          DONE - Implement MSI
     *          DONE - Check if user allowance is enough
     *          DONE - Check if user wants to buy more tokens than available for purchase ("Asset" balance)
     *          DONE - Convert BitCar tokens to smallest unit
     *          DONE - Check user BitCar token balance before performing transaction
     *          DONE - Check valid ticker price
     *               - Check security around Asset transfer functions
     *               - Validate Maths
     *          DONE - Make sure that the Fees are created
     *
     *       Transfers Workflow: 
     *             1 - BitcarTokens(User->Agent)
     *             2 - BitcarTokens(User->FeeManager)
     *             3 - CarTokens(Asset->User)
     * @param _amount Total amount of asset tokens the user wants to purchase (smallest unit)
     */
    function buyAssetTokens(uint256 _amount) public onlyTraders payable {

        emit LogIII(agentApprovalEpoch, adminApprovalDelta, block.timestamp);

        require(state == LIVE, "Purchases are not allowed");
        require(agentApprovalEpoch + adminApprovalDelta <= block.timestamp, "Purchase time has not been reached");

        uint256 remainingBalance = assetToken.balanceOf(address(this));
        require(_amount >= minPurchaseAmount || 
            (minPurchaseAmount > remainingBalance && _amount == remainingBalance), "Min purchase amount not met");

        require(assetRankTracker.validate(msg.sender, _amount), "assetRankTracker conditions not met");
        
        // Convert USD amount to BitCar tokens
        uint256 tokenAmount = ticker.usdToUnits(_amount.mul(tokenPercentage).div(100));
        uint256 weiAmount = ticker.ethToUnits(_amount.mul(ethPercentage).div(100)).mul(10**10); // Convert to Wei
        
        // Get fee cost based on USD amount
        uint256 feeBEE = getFeeForAmount(_amount, ticker.usdToUnits(feeManager.getAmount("BEE")));
        uint256 feeMSI = getFeeForAmount(_amount, ticker.usdToUnits(feeManager.getAmount("MSI")));
        uint256 feePAF = getFeeForAmount(_amount, ticker.usdToUnits(feeManager.getAmount("PAF")));
        uint256 feePTF = getFeeForAmount(_amount, ticker.usdToUnits(feeManager.getAmount("PTF")));

        // Does sender have enough platform tokens to cover tokenPercentage+fees?
        require(canBuyAssetTokens(_amount, tokenAmount.add(feeBEE).add(feeMSI).add(feePAF).add(feePTF)), "Conditions to buy tokens not met");

        // Does sender sent enough eth to cover ethPercentage?
        require(msg.value >= weiAmount, "Not enough ETH was sent to cover this asset's cost");

        // Transfer bitcar tokens from sender to "Agent"
        require(platformToken.transferFrom(msg.sender, agent, tokenAmount), "Unsuccessful BitCar tokens transaction from User to Agent");

        // Transfer ETH to the agent
        if (msg.value > 0) {
            agent.transfer(msg.value);
        }
        
        // Transfer bitcar tokens from sender to Fee handlers
        if (feeBEE > 0) {
            require(platformToken.transferFrom(msg.sender, feeManager.getAddress("BEE"), feeBEE), "Failed to transfer BitCar tokens to BEE");
        }
        if (feePAF > 0) {
            require(platformToken.transferFrom(msg.sender, feeManager.getAddress("PAF"), feePAF), "Failed to transfer BitCar tokens to PAF");
        }
        if (feePTF > 0) {
            require(platformToken.transferFrom(msg.sender, feeManager.getAddress("PTF"), feePTF), "Failed to transfer BitCar tokens to PTF");
        }
        if (feeMSI > 0) {
            require(platformToken.transferFrom(msg.sender, feeManager.getAddress("MSI"), feeMSI), "Failed to transfer BitCar tokens to MSI");
        }

        // Transfer Asset tokens from "Asset" to sender
        // TODO: Sending gas with the transaction (agent.transfer), how to handle it?
        require(assetToken.transfer(msg.sender, _amount), "Unsuccessful Asset tokens transaction from Asset to User");

        emit BoughtAssetTokens(msg.sender, _amount, tokenAmount, weiAmount, feeBEE, feeMSI, feePAF, feePTF);
    }

    function setDataHash(string memory _hash) public onlyAgent {
        require(state == PENDING_AGENT_DATA_APPROVAL, "Changing the data hash is not allowed for this state");
        require(bytes(_hash).length > 0, "Invalid data hash");

        dataHash = _hash;
    }

    /* APPROVAL */

    /**
     * @notice Agent approves that the data hash is correctly set.
     * @dev Current state will be changed
     */
    function agentApproveData(string memory _optionalHash) public onlyAgent {
        require(state == PENDING_AGENT_DATA_APPROVAL, "Changing the data hash is not allowed for this state");

        if (bytes(_optionalHash).length > 0) {
            dataHash = _optionalHash;
        }

        require(bytes(dataHash).length > 0, "Invalid data hash");

        setState(PENDING_ADMIN_DATA_APPROVAL);
    }

    /**
     * @notice Admin approves that the data hash is correctly set.
     * @dev In case of an approval the admin needs to create token/fees/whitelist contracts first
     *      FeeManager validation needs to happend here due to deployment costs
     * @param _approved Approved flag
     * @param _adminApprovalDelta After the agent approval purchases will be available after "delta" has passed
     * @return false in case of rejection
     */
    function adminApproveData(bool _approved, uint256 _adminApprovalDelta) public onlyAdmins {
        require(state == PENDING_ADMIN_DATA_APPROVAL, "Approval not allowed for this state");
        require(_adminApprovalDelta > 0, "Approval delta needs to be bigger 0");

        if (!_approved) {
            setState(PENDING_AGENT_DATA_APPROVAL);
            adminRejections++;
            return;
        }

        require(address(assetToken) != address(0), "The AssetToken needs to be deployed before approving purchases");
        require(address(feeManager) != address(0), "The FeeManager needs to be deployed before approving purchases");
        require(feeManager.hasDefaultFees(), "Default fees are not created for the FeeManager");
        require(address(assetWhitelist) != address(0), "AssetWhitelist needs to by deployed before approving purchases");
        require(address(assetRankTracker) != address(0), "AssetRankTracker needs to by deployed before approving purchases");
        require(address(assetControlBallot) != address(0), "AssetControlBallot needs to by deployed before approving purchases");

        setState(PENDING_AGENT_CONTRACT_APPROVAL);
        adminApprovalDelta = _adminApprovalDelta;
    }

    /**
     * @notice Agent approves contracts created by admin.
     * @param _approved Approved flag
     * @return false in case of rejection
     */
    function approveContractCreation(bool _approved) public onlyAgent {
        require(state == PENDING_AGENT_CONTRACT_APPROVAL, "Approval not allowed for this state");

        if (!_approved) {
            setState(PENDING_AGENT_DATA_APPROVAL);
            agentRejections++;
            return;
        }

        setState(LIVE);
        agentApprovalEpoch = block.timestamp;

        assetToken.activate(adminApprovalDelta);
    }

    function setState(uint256 _state) internal {
        state = _state;
        emit StateChanged(_state);
    }

    /* GETTERS */

    /**
     * @notice Gets the asset token(ERC20) address
     * @return ERC20 address
     */
    function getTokenAddress() public view returns (address) {
        return address(assetToken);
    }
    
    /**
     * @notice Gets the FeeManager address for this asset
     * @return FeeManager address
     */
    function getFeeManagerAddress() public view returns (address) {
        return address(feeManager);
    }
    
    /**
     * @notice Gets the Agent address
     * @return Agent address
     */
    function getAgent() public view returns (address payable) {
        return agent;
    }
    
    /**
     * @notice Gets the AssetRankTracker address for this asset
     * @return AssetRankTracker address
     */
    function getAssetRankTrackerAddress() public view returns (address) {
        return address(assetRankTracker);
    }
    
    /**
     * @notice Gets the Whitelist address for this asset
     * @return Whitelist address
     */
    function getWhitelistAddress() public view returns (address) {
        return address(assetWhitelist);
    }

    /**
     * @notice Gets the AssetControlBallot address for this asset
     * @return AssetControlBallot address
     */
    function getAssetControlBallotAddress() public view returns (address) {
        return address(assetControlBallot);
    }
}
