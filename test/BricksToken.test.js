//BricksToken test file
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BricksToken", function () {
  let bricksToken;
  let owner, investor;

  beforeEach(async function () {
    [owner, investor] = await ethers.getSigners();

    const BricksToken = await ethers.getContractFactory("BricksToken");
    bricksToken = await BricksToken.deploy(
      "MyBusiness",
      "BRK",
      owner.address,
      owner.address
    );
    await bricksToken.waitForDeployment();
  });

  it("should mint and transfer Bricks", async function () {
    // Mint 1000 total, 700 issued (within 70% cap)
    await bricksToken.connect(owner).mintShares(
      ethers.parseEther("1000"),
      ethers.parseEther("700")
    );

    // Transfer 100 to investor
    await bricksToken.connect(owner).transfer(investor.address, ethers.parseEther("100"));

    const balance = await bricksToken.balanceOf(investor.address);
    expect(balance).to.equal(ethers.parseEther("100")); 
  });

  it("should not allow minting beyond 70% cap", async function () {
    // Try to mint 701 when total is 1000 (over 70%)
    await expect(
      bricksToken.connect(owner).mintShares(
        ethers.parseEther("1000"),
        ethers.parseEther("701")
      )
    ).to.be.revertedWith("Exceeds 70% limit");
  });
});
