
BricksToken smart contract 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BricksToken is ERC20, Ownable {
    address public businessWallet;
    uint256 public constant MAX_SUPPLY_PERCENT = 70;

    constructor(
        string memory name,
        string memory symbol,
        address initialOwner,
        address _businessWallet
    ) ERC20(name, symbol) Ownable(initialOwner) {
        businessWallet = _businessWallet;
        _mint(initialOwner, 1000000 * 10 ** decimals()); //Give all share to business
    }

    function mintShares(uint256 totalSupply, uint256 issueAmount) external onlyOwner {
        require(issueAmount <= (totalSupply * MAX_SUPPLY_PERCENT) / 100, "Exceeds 70% limit");
        _mint(businessWallet, issueAmount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function transferToBusinessWallet(uint256 amount) external {
        _transfer(msg.sender, businessWallet, amount);
    }
}
