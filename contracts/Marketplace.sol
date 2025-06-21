
Marketplace smart contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ShareToken.sol";
import "./BricksToken.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    ShareToken public shareToken;

    struct Business {
        BricksToken bricks;
        address wallet;
        uint256 totalIssued;
    }

    struct Listing {
        address seller;
        uint256 amount;
        uint256 pricePerBrick;
    }

    mapping(address => Business) public businesses;
    mapping(address => Listing[]) public marketplaceListings;

    event SharesPurchased(address indexed buyer, address indexed business, uint256 amount, uint256 price);
    event SharesSold(address indexed seller, address indexed buyer, address indexed business, uint256 amount);
    event Buyback(address indexed business, address indexed seller, uint256 amount);

   constructor(address _shareTokenAddress) {
    shareToken = ShareToken(_shareTokenAddress);
}
    // Register business and deploy BricksToken
    function registerBusiness(string memory name, string memory symbol) external {
        BricksToken newToken = new BricksToken(name, symbol, msg.sender, msg.sender);
        businesses[address(newToken)] = Business({
            bricks: newToken,
            wallet: msg.sender,
            totalIssued: 0
        });
    }

    // Primary Market: Business sells Bricks for ShareTokens
    function buyFromBusiness(address bricksAddress, uint256 amount, uint256 price) external nonReentrant {
        Business memory biz = businesses[bricksAddress];
        require(biz.wallet != address(0), "Business not found");

        uint256 totalCost = amount * price;
        shareToken.transferFrom(msg.sender, biz.wallet, totalCost);
        BricksToken(bricksAddress).transferFrom(biz.wallet, msg.sender, amount);

        emit SharesPurchased(msg.sender, bricksAddress, amount, price);
    }

    // Secondary Market: List shares for resale
    function listSharesForSale(address bricksAddress, uint256 amount, uint256 pricePerBrick) external {
        BricksToken token = BricksToken(bricksAddress);
        require(token.balanceOf(msg.sender) >= amount, "Not enough Bricks");

        marketplaceListings[bricksAddress].push(Listing({
            seller: msg.sender,
            amount: amount,
            pricePerBrick: pricePerBrick
        }));

        token.transferFrom(msg.sender, address(this), amount);
    }

    // Buy shares from a listing
    function buyFromInvestor(address bricksAddress, uint256 listingIndex) external nonReentrant {
        Listing storage listing = marketplaceListings[bricksAddress][listingIndex];
        uint256 totalCost = listing.amount * listing.pricePerBrick;

        shareToken.transferFrom(msg.sender, listing.seller, totalCost);
        BricksToken(bricksAddress).transfer(msg.sender, listing.amount);

        emit SharesSold(listing.seller, msg.sender, bricksAddress, listing.amount);

        // Remove listing
        delete marketplaceListings[bricksAddress][listingIndex];
    }

    // Business buyback
    function businessBuyback(address bricksAddress, uint256 amount, uint256 price) external nonReentrant {
        Business memory biz = businesses[bricksAddress];
        require(msg.sender == biz.wallet, "Only business can buy back");

        uint256 totalCost = amount * price;

        shareToken.transferFrom(msg.sender, address(this), totalCost); // Business sends tokens
        BricksToken(bricksAddress).transferFrom(msg.sender, biz.wallet, amount); // Bricks go to business wallet

        emit Buyback(bricksAddress, msg.sender, amount);
    }

    // Vendor redemption can be handled off-chain with KYC registration.
}
