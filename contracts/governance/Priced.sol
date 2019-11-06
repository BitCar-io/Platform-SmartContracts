pragma solidity >=0.5.0;


/// @title Priced
/// @notice Defines basic units of WEI measures and validation functionality
contract Priced {

    ///    1 ether  = 1000000000000000000;  // 10^18 wei
    ///    1 finney = 1000000000000000;     // 10^15 wei
    ///    1 szabo  = 1000000000000;        // 10^12 wei
    ///    1 gwei   = 1000000000;           // 10^9  wei, not available as keyword in solidity
    ///    1 mwei   = 1000000;              // 10^6  wei, not available as keyword in solidity
    ///    1 kwei   = 1000;                 // 10^3  wei, not available as keyword in solidity
    ///    1 wei    = 1;                    // 10^0  wei

    /// @notice Validates that the cost of the operation is fulfilled 
    modifier costs(uint256 price) {
        require(msg.value >= price, "Not enough funds to perform this operation");
        _;
    }
}
