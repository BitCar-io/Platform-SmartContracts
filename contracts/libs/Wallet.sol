pragma solidity >=0.5.0;

import "./ownership/Ownable.sol";


/// @title Wallet
contract Wallet is Ownable {

    event FundsWithdrawn(address indexed _destination, uint256 _amount);
    event FundsDeposited(address indexed _origin, uint256 _amount);

    /// @notice Log every deposit of ETH sent to this contract
    function () external payable {
        emit FundsDeposited(msg.sender, msg.value);
    }

    /// @notice Transfers the funds from the contract to _destination
    /// @param _destination The address to send the funds to
    /// @param _amount The amount of funds to be transfered
    function withdraw(address payable _destination, uint256 _amount) public onlyImmediateOwnerOrWhitelisted {
        require(address(this).balance >= _amount, "Can not withdraw that amount");
        _destination.transfer(_amount);
        emit FundsWithdrawn(_destination, _amount);
    }

    /// @notice Returns the balance held by this contract
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
