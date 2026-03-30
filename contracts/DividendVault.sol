// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DividendVault {
    IERC20 public businessStock; // The EquityToken (e.g., $SMC)
    IERC20 public stablecoin;    // The USDT token
    
    uint256 public totalDividendsDeposited;
    mapping(address => uint256) public claimedDividends;

    event DividendsDeposited(uint256 amount);
    event DividendsClaimed(address indexed investor, uint256 amount);

    constructor(address _businessStock, address _stablecoin) {
        businessStock = IERC20(_businessStock);
        stablecoin = IERC20(_stablecoin);
    }

    // The business owner (or API) calls this to deposit the monthly fiat profit
    function depositProfit(uint256 amount) external {
        require(stablecoin.transferFrom(msg.sender, address(this), amount), "Deposit failed");
        totalDividendsDeposited += amount;
        emit DividendsDeposited(amount);
    }

    // Retail investors call this to get their cut of the profits
    function claimDividends() external {
        uint256 userBalance = businessStock.balanceOf(msg.sender);
        require(userBalance > 0, "You do not own shares in this business");

        uint256 totalSupply = businessStock.totalSupply();
        
        // Calculate the user's total historical entitlement based on their share %
        uint256 totalEntitlement = (totalDividendsDeposited * userBalance) / totalSupply;
        
        // Subtract what they have already claimed in the past
        uint256 claimableAmount = totalEntitlement - claimedDividends[msg.sender];
        require(claimableAmount > 0, "No new dividends to claim");

        claimedDividends[msg.sender] += claimableAmount;
        
        require(stablecoin.transfer(msg.sender, claimableAmount), "Transfer failed");
        emit DividendsClaimed(msg.sender, claimableAmount);
    }
}