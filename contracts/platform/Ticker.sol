// TODO: - Check uint256 overflow/underflow (implement safemath)
//       - Have checks around numbers smaller than 0.9 as they will return 0

pragma solidity >=0.5.0;

import "./interfaces/ITicker.sol";

import "../vendor/SafeMath.sol";


contract Ticker is ITicker {

    using SafeMath for uint256;

    address owner;
    address coOwner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this function");
        _;
    }

    modifier onlyOwnerOrCoOwner() {
        require(msg.sender == owner || msg.sender == coOwner, "Only the owner or coOwner can perform this function");
        _;
    }

    modifier isValidTicker(uint256 _ticker, uint256 _tickerEpoch) {
        require(_ticker > 0 && _tickerEpoch > 0 && _tickerEpoch + minEpoch >= block.timestamp, "Invalid ticker");
        _;
    }

    string private name;

    uint256 private usd; // ticker usd price
    uint256 private usdEpoch; // ticker last updated time

    uint256 private btc; // ticker btc price
    uint256 private btcEpoch; // ticker last updated time

    uint256 private eth; // ticker eth price
    uint256 private ethEpoch; // ticker last updated time
    
    uint256 private decimals = 8;
    uint256 private minEpoch; // min epoch that is considered valid

    event RateChange(string currency, uint256 value);
    
    constructor(string memory _name, uint256 _minEpochMinutes) public {
        require(_minEpochMinutes > 0, "Min Epoch must be greater than 0");
        owner = msg.sender;
        name = _name;
        minEpoch = _minEpochMinutes * 60;
    }

    function setUSD(uint256 _usd) public onlyOwnerOrCoOwner {
        usd = _usd;
        usdEpoch = block.timestamp;
        emit RateChange("USD", _usd);
    }

    function setBTC(uint256 _btc) public onlyOwnerOrCoOwner {
        btc = _btc;
        btcEpoch = block.timestamp;
        emit RateChange("BTC", _btc);
    }

    function setETH(uint256 _eth) public onlyOwnerOrCoOwner {
        eth = _eth;
        ethEpoch = block.timestamp;
        emit RateChange("ETH", _eth);
    }

    function getUSD() public view isValidTicker(usd, usdEpoch) returns (uint256) { return usd; }
    function getETH() public view isValidTicker(eth, ethEpoch) returns (uint256) { return eth; }
    function getBTC() public view isValidTicker(btc, btcEpoch) returns (uint256) { return btc; }
    
/**
     * @notice Converts units into the smallest unit
     * @return The units in the smallest denomination possible
     */
    function unitsToBase(uint256 _units) public view returns(uint256) {
        return _units.mul(10 ** decimals);
    }
    
    /**
     * @notice Converts units from the smallest denomination possible into the
     * base unit
     * @return Units converted to base unit
     */
    function baseToUnits(uint256 _units) public view returns (uint256) {
        return _units.div(10 ** decimals);
    }

    /**
     * @notice Converts units to USD
     * @dev TODO: Remove, method added to ensure backwards compatibility
     * @return Converted units in USD
     */
    function unitsToUSD(uint256 _units) public view returns (uint256) {
        return baseToUnits(_units.mul(getUSD()));
    }
    
    /**
     * @notice Converts USD to units
     * @dev TODO: Remove, method added to ensure backwards compatibility
     * @return Converted USD to units
     */
    function usdToUnits(uint256 _usd) public view returns (uint256) {
        return unitsToBase(_usd).div(getUSD());
    }


    /**
     * @notice Converts units to USD
     * @dev TODO: Remove, method added to ensure backwards compatibility
     * @return Converted units in USD
     */
    function unitsToETH(uint256 _units) public view returns (uint256) {
        return baseToUnits(_units.mul(getETH()));
    }
    
    /**
     * @notice Converts USD to units
     * @dev TODO: Remove, method added to ensure backwards compatibility
     * @return Converted USD to units
     */
    function ethToUnits(uint256 _eth) public view returns (uint256) {
        return unitsToBase(_eth).div(getETH());
    }

    
    function test() public view returns (uint256) {
        return block.timestamp;
    }

    /**
     * @notice Sets the coOwner address for the contract
     */
    function setCoOwner(address _coOwner) public onlyOwner() {
        coOwner = _coOwner;
    }
}