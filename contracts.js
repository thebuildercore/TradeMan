//Backend
//Routes


const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const Business = require('../models/business'); // MongoDB model
require('dotenv').config();

const shareTokenABI = require('../abi/ShareTokenABI.json');
const marketplaceABI = require('../abi/MarketplaceABI.json');

const provider = new ethers.AlchemyProvider("sepolia", process.env.ALCHEMY_API_KEY);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// const marketplaceAddress = "0xE474A6F728F8eE2D22a686eC52135d21b7AD99Bd";
// const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, wallet);

const marketplaceAddress = process.env.MARKETPLACE_ADDRESS?.trim() || "0xE474A6F728F8eE2D22a686eC52135d21b7AD99Bd";

if (!ethers.isAddress(marketplaceAddress)) {
  throw new Error("Invalid marketplace address");
}

const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, wallet); 

//Route 1.

router.post('/registerBusiness', async (req, res) => {
  try {
    const { name, symbol } = req.body;

    const tx = await marketplace.registerBusiness(name, symbol);
    const receipt = await tx.wait();

    const bricksAddress = receipt.logs.find(log => log.address !== marketplaceAddress).address;

    await Business.create({
      name,
      symbol,
      wallet: wallet.address,
      bricksToken: bricksAddress,
      createdAt: new Date()
    });

    res.json({ success: true, bricksToken: bricksAddress });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Route 2

router.get('/businesses', async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
//Route 3

router.post('/buyFromBusiness', async (req, res) => {
  try {
    const { bricksAddress, amount, price } = req.body;

    const tx = await marketplace.buyFromBusiness(bricksAddress, amount, price);
    await tx.wait();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Route 4

router.post('/listShares', async (req, res) => {
  try {
    const { bricksAddress, amount, pricePerBrick } = req.body;

    const tx = await marketplace.listSharesForSale(bricksAddress, amount, pricePerBrick);
    await tx.wait();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Route 5

router.post('/buyFromInvestor', async (req, res) => {
  try {
    const { bricksAddress, listingIndex } = req.body;

    const tx = await marketplace.buyFromInvestor(bricksAddress, listingIndex);
    await tx.wait();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Route 6

router.post('/businessBuyback', async (req, res) => {
  try {
    const { bricksAddress, amount, price } = req.body;

    const tx = await marketplace.businessBuyback(bricksAddress, amount, price);
    await tx.wait();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

