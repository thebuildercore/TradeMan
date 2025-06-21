
ShareToken contract file
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShareToken is ERC20, Ownable {
    address public reserveWallet;

    constructor(address initialOwner)
        ERC20("ShareToken", "STK")
        Ownable(initialOwner)
    {}

    function setReserveWallet(address _reserveWallet) external onlyOwner {
        reserveWallet = _reserveWallet;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    function collectToReserve(address from, uint256 amount) external onlyOwner {
        require(reserveWallet != address(0), "Reserve wallet not set");
        _transfer(from, reserveWallet, amount);
    }
}
