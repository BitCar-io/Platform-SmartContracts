pragma solidity >=0.5.0;

import "../platform/Registry.sol";

import "../factories/ClaimerFactory.sol";
import "./interfaces/IClaimer.sol";

import "../factories/BEEFactory.sol";
import "./interfaces/IBEE.sol";

import "../factories/FeeFactory.sol";

import "./Asset.sol";

import "../governance/AccessControl.sol";

import "./interfaces/IFeeManager.sol";


contract FeeManager is IFeeManager {
    Registry internal config;

    FeeFactory internal feeFactory;
    ClaimerFactory internal claimerFactory;
    BEEFactory internal beeFactory;

    Asset internal asset;

    struct Fees {
        address fee;
        uint256 amount;
        bool created;
    }

    mapping(string => Fees) internal fees;

    bool internal defaultFeesCreated = false;

    event DefaultFeesCreated(uint256 feeBEE, uint256 feeMSI, uint256 feePAF, uint256 feePTF);

    /**
     * @notice Constructor
     * @dev TODO: Validate arguments
     * @param _config The Registry address
     */
    constructor(address _config, address _asset) public {
        require(_config != address(0), "Invalid registry address");
        require(_asset != address(0), "Invalid asset address");
        
        config = Registry(_config);

        feeFactory = FeeFactory(config.getAddress("FeeFactory"));

        claimerFactory = ClaimerFactory(config.getAddress("ClaimerFactory"));
        beeFactory = BEEFactory(config.getAddress("BEEFactory"));

        asset = Asset(_asset);
    }

    /**
     * @notice Creates the default fee contracts
     * @param _feeBEE BEE (former escrow) fee - BitCar Extension Escrow
     * @param _feeMSI MSI fee (Maintenance Storage and Insurance)
     * @param _feePAF Platform Access Fee
     * @param _feePTF Platform Transaction Fee
     */
    function createDefaultFees(uint256 _feeBEE, uint256 _feeMSI, uint256 _feePAF, uint256 _feePTF) public {
        require(!defaultFeesCreated, "Default fees are already created");

        AccessControl sudoAccCtrl = AccessControl(address(uint160(config.getAddress("Sudo"))));
        address payable platformOwner = sudoAccCtrl.getOwnerAddress();

        createClaimer("CLAIMER", asset.getTokenAddress(), 0);
        createBEE("BEE", asset.getTokenAddress(), _feeBEE);

        createFee(
            "MSI", 
            asset.getAgent(), 
            asset.getTokenAddress(), 
            _feeMSI);
        
        createFee(
            "PAF", 
            platformOwner, 
            asset.getTokenAddress(), 
            _feePAF);

        createFee(
            "PTF", 
            platformOwner, 
            asset.getTokenAddress(), 
            _feePTF);

        defaultFeesCreated = true;
        emit DefaultFeesCreated(
            _feeBEE, 
            _feeMSI, 
            _feePAF,
            _feePTF);
    }
    
    /**
     * @notice Creates a Claimer type fee
     * @dev Validate amounts?
     * @param _feeName Name of the fee
     * @param _token Address of the AssetToken
     * @param _amount Fee amount
     */
    function createClaimer(string memory _feeName, address _token, uint256 _amount) internal {
        require(!fees[_feeName].created, "Fee already exists");
        require(_token != address(0), "Invalid token address");

        fees[_feeName].fee = address(claimerFactory.create(_token));
        fees[_feeName].amount = _amount;
        fees[_feeName].created = true;
    }

    /**
     * @notice Creates a BEE type fee
     * @dev Validate amounts?
     * @param _feeName Name of the fee
     * @param _token Address of the AssetToken
     * @param _amount Fee amount
     */
    function createBEE(string memory _feeName, address _token, uint256 _amount) internal {
        require(!fees[_feeName].created, "Fee already exists");
        require(_token != address(0), "Invalid token address");
    
        fees[_feeName].fee = address(beeFactory.create(_token, _amount));
        fees[_feeName].amount = _amount;
        fees[_feeName].created = true;
    }

    /**
     * @notice Creates a general type fee
     * @dev Validate amounts?
     * @param _feeName Name of the fee
     * @param _claimer Address of who can claim this fee
     * @param _token Address of the AssetToken
     * @param _amount Fee amount
     */
    function createFee(string memory _feeName, address payable _claimer, address _token, uint256 _amount) internal {
        require(!fees[_feeName].created, "Fee already exists");
        require(_claimer != address(0), "Invalid claimer address");
        require(_token != address(0), "Invalid token address");

        fees[_feeName].fee = address(feeFactory.create(_claimer, _token));
        fees[_feeName].amount = _amount;
        fees[_feeName].created = true;
    }

    /**
     * @notice Gets the address of the specified fee
     * @param _feeName Name of the fee
     * @return Address of the fee
     */
    function getAddress(string memory _feeName) public view returns(address) {
        return fees[_feeName].fee;
    }

    /**
     * @notice Gets the amount specified when the fee was created
     * @param _feeName Name of the fee
     * @return Amount of the fee
     */
    function getAmount(string memory _feeName) public view returns(uint256) {
        return fees[_feeName].amount;
    }

    /**
     * @notice Gets the default fees created flag
     * @return true if default fees were created, false otherwise
     */
    function hasDefaultFees() public view returns(bool) {
        return defaultFeesCreated;
    }
}