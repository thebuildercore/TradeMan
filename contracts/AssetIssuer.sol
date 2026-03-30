// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./EquityToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AssetIssuer
 * @dev The master factory contract. Deploys new EquityTokens for local businesses.
 */
contract AssetIssuer is Ownable {
    address[] public deployedAssets;

    event AssetListed(address indexed businessToken, string name, string symbol, address indexed founder);

    constructor() Ownable(msg.sender) {}

    function listBusiness(string memory name, string memory symbol, address founder) external onlyOwner returns (address) {
        EquityToken newAsset = new EquityToken(name, symbol, founder, address(this));
        
        deployedAssets.push(address(newAsset));
        emit AssetListed(address(newAsset), name, symbol, founder);
        
        return address(newAsset);
    }

    function getDeployedAssets() external view returns (address[] memory) {
        return deployedAssets;
    }
}