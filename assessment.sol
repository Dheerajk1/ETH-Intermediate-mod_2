// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event BuyHoodie(uint256 amount);
    event BuyTShirt(uint256 amount);
    event BuyPants(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    // Function to buy a hoodie
    function buyHoodie() public {
        uint256 hoodiePrice = 500; // Cost of a hoodie
        require(msg.sender == owner, "You are not the owner of this account");
        if (balance < hoodiePrice) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: hoodiePrice
            });
        }
        balance -= hoodiePrice;
        emit BuyHoodie(hoodiePrice);
    }

    // Function to buy a t-shirt
    function buyTShirt() public {
        uint256 tshirtPrice = 300; // Cost of a t-shirt
        require(msg.sender == owner, "You are not the owner of this account");
        if (balance < tshirtPrice) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: tshirtPrice
            });
        }
        balance -= tshirtPrice;
        emit BuyTShirt(tshirtPrice);
    }

    // Function to buy pants
    function buyPants() public {
        uint256 pantsPrice = 400; // Cost of pants
        require(msg.sender == owner, "You are not the owner of this account");
        if (balance < pantsPrice) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: pantsPrice
            });
        }
        balance -= pantsPrice;
        emit BuyPants(pantsPrice);
    }
}
