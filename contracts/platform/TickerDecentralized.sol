pragma solidity >=0.5.0;
import "../vendor/usingOraclize.sol";
import "../vendor/SafeMath.sol";


contract TickerDecentralized is usingOraclize {

    using SafeMath for uint256;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner is allowed to call this function");
        _;
    }

    modifier isValidTicker() {
        require(value > 0 && lastQuery > 0 && lastQuery + minEpoch >= block.timestamp, "Invalid ticker");
        _;
    }

    address private owner;
    string private url;
    uint256 private delay;
    uint256 private lastQuery;
    uint256 private value;
    bool private enabled;
    uint256 private decimals = 8;
    uint256 private minEpoch = 5 * 60; // min epoch that is considered valid

    event LogInfo(string description);

    /**
     * @notice Constructor
     * @dev _url needs to be a valid "url" endpoint with the appropriate json
     * query following the Oraclize standard, eg:
     * json(https://api.coinbase.com/v2/prices/ETH-USD/spot).data.amount
     * @param _url Ticker url
     * @param _delay Delay in seconds. The endpoint will be queried every _delay seconds
     * until the contract runs out of ETH
     */
    constructor(string memory _url, uint256 _delay) payable public {
        require(bytes(_url).length > 0, "Invalid url");
        require(_delay >= 60, "Delay needs to be at least 60 seconds");

        owner = msg.sender;
        url = _url;
        delay = _delay;

        // TODO: Remove in production
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);

        //oraclize_setProof(proofType_TLSNotary | proofStorage_IPFS);
    }

    /**
     * @notice Sets the current state of the contract
     * @dev If "_state" is set to "true" the update method will trigger immediately
     * @param _state State/Enabled flag
     */
    function setState(bool _state) public onlyOwner {
        enabled = _state;

        if (enabled) {
            update();
        }
    }

    /**
     * @notice Gets the last ticker
     * @return The last value returned from the endpoint
     */
    function getTicker() public view isValidTicker returns (uint256) {
        return value;
    }

    /**
     * @notice Gets the last ticker timestamp
     * @return The last query timestamp
     */
    function getLastQuery() public view returns (uint256) {
        return lastQuery;
    }

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
        return baseToUnits(_units.mul(value));
    }
    
    /**
     * @notice Converts USD to units
     * @dev TODO: Remove, method added to ensure backwards compatibility
     * @return Converted USD to units
     */
    function usdToUnits(uint256 _usd) public view returns (uint256) {
        return unitsToBase(_usd).div(value);
    }

    /**
     * @notice Callback called from the Oraclize service
     * @param id ID of the query
     * @param result Result of the query
     * @param proof TLS proof of the query
     */
    function __callback(bytes32 id, string memory result, bytes memory proof) public {
        require(msg.sender == oraclize_cbAddress(), "Invalid oraclize address");

        value = parseInt(result, decimals);
        lastQuery = block.timestamp;

        if (enabled) {
            update();
        }
    }

    /**
     * @notice Performs an oraclize query
     * @dev TODO: Make this method internal?
     */
    function update() public payable {
        // Check if we have enough remaining funds
        if (oraclize_getPrice("URL") > address(this).balance) {
            emit LogInfo("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogInfo("Oraclize query was sent, standing by for the answer..");

            // Using XPath to to fetch the right element in the JSON response
            oraclize_query(delay, "URL", url);
        }
    }
}