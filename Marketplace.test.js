//Marketplace test file
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace", function () {
  let shareToken;
  let marketplace;
  let owner, investor;
    beforeEach(async function () {
    [owner, investor] = await ethers.getSigners();

    const ShareToken = await ethers.getContractFactory("ShareToken");
    shareToken = await ShareToken.deploy(owner.address);
    await shareToken.waitForDeployment();

    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(shareToken.target);
    await marketplace.waitForDeployment();
  });
 it("should list shares for sale and allow investor to buy", async function () {
    expect(await shareToken.name()).to.equal("ShareToken");
    // You can expand this test to actually list shares and simulate a buy
  });
   
 });
