// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TradeCash
 * @dev Internal settlement token for the TradeMan ecosystem.
 * This ensures dividends are paid in a stable value, not volatile BNB.
 */
contract TradeCash is ERC20 {
    constructor() ERC20("TradeMan Settlement Cash", "TASH") {}

    // Faucet for the hackathon demo so judges/users can get "money" to test
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}