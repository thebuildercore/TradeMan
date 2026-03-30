// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EquityToken
 * @dev Represents fractionalized shares of a real-world business.
 * Unrestricted transfer version for hackathon MVP demo.
 */
contract EquityToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 100_000 * 10 ** 18; 
    uint256 public constant FOUNDER_ALLOCATION = 30_000 * 10 ** 18; // 30% strictly to founder
    uint256 public constant PUBLIC_ALLOCATION = 70_000 * 10 ** 18;  // 70% to the public

    address public businessFounder;

    constructor(
        string memory name,
        string memory symbol,
        address _founder,
        address _issuerFactory
    ) ERC20(name, symbol) Ownable(_issuerFactory) {
        businessFounder = _founder;

        // Mint allocations immediately upon business listing
        _mint(_founder, FOUNDER_ALLOCATION);
        _mint(_issuerFactory, PUBLIC_ALLOCATION);
    }
}