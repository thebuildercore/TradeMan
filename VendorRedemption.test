const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VendorRedemption", function () {
  let shareToken;
  let bricksToken;
  let vendorRedemption;
  let owner, vendor;

  beforeEach(async function () {
    [owner, vendor] = await ethers.getSigners();

    const ShareToken = await ethers.getContractFactory("ShareToken");
    shareToken = await ShareToken.deploy("ShareToken", "STK", owner.address);
    await shareToken.waitForDeployment();
    const shareTokenAddress = await shareToken.getAddress();

    const BricksToken = await ethers.getContractFactory("BricksToken");
    bricksToken = await BricksToken.deploy("BricksToken", "BRK", owner.address);
    await bricksToken.waitForDeployment();

    const VendorRedemption = await ethers.getContractFactory("VendorRedemption");
    // Pass TWO arguments as constructor expects: shareToken address and owner address
    vendorRedemption = await VendorRedemption.deploy(shareTokenAddress, owner.address);
    await vendorRedemption.waitForDeployment();
  });
    it("should register and unregister a vendor", async function () {
    expect(await vendorRedemption.isRegisteredVendor(vendor.address)).to.equal(false);

    await vendorRedemption.registerVendor(vendor.address);
    expect(await vendorRedemption.isRegisteredVendor(vendor.address)).to.equal(true);

    await vendorRedemption.unregisterVendor(vendor.address);
    expect(await vendorRedemption.isRegisteredVendor(vendor.address)).to.equal(false);
  });

  it("should allow registered vendor to redeem tokens", async function () {
    await vendorRedemption.registerVendor(vendor.address);
    await shareToken.mint(vendor.address, 100);
    await shareToken.connect(vendor).approve(vendorRedemption.target, 50);

    await expect(vendorRedemption.connect(vendor).redeemTokens(50))
      .to.emit(vendorRedemption, "TokensRedeemed")
      .withArgs(vendor.address, 50);
  });

  it("should not allow unregistered vendor to redeem tokens", async function () {
    await shareToken.mint(vendor.address, 100);
    await shareToken.connect(vendor).approve(vendorRedemption.target, 50);

    await expect(vendorRedemption.connect(vendor).redeemTokens(50))
      .to.be.revertedWith("Not a registered vendor");
  });

  it("should fail redeem if vendor balance is insufficient", async function () {
    await vendorRedemption.registerVendor(vendor.address);
    await shareToken.connect(vendor).approve(vendorRedemption.target, 50);

    await expect(vendorRedemption.connect(vendor).redeemTokens(50))
      .to.be.revertedWith("Insufficient token balance");
  });
});
