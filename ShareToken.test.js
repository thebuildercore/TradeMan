const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ShareToken", function () {
  let ShareToken, shareToken;
  let owner, addr1, reserve;

  beforeEach(async function () {
    [owner, addr1, reserve] = await ethers.getSigners();

    ShareToken = await ethers.getContractFactory("ShareToken");
    shareToken = await ShareToken.deploy(owner.address);
  });

  it("Should set the correct owner", async function () {
    expect(await shareToken.owner()).to.equal(owner.address);
  });

  it("Should set reserve wallet", async function () {
    await shareToken.setReserveWallet(reserve.address);
    expect(await shareToken.reserveWallet()).to.equal(reserve.address);
  });

  it("Should mint tokens", async function () {
    await shareToken.mint(addr1.address, ethers.parseEther("100"));
    const balance = await shareToken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseEther("100"));
  });

  it("Should burn tokens", async function () {
    await shareToken.mint(addr1.address, ethers.parseEther("50"));
    await shareToken.burn(addr1.address, ethers.parseEther("20"));
    const balance = await shareToken.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.parseEther("30"));
  });

  it("Should transfer to reserve wallet", async function () {
    await shareToken.setReserveWallet(reserve.address);
    await shareToken.mint(addr1.address, ethers.parseEther("10"));
    await shareToken.collectToReserve(addr1.address, ethers.parseEther("5"));
    const reserveBalance = await shareToken.balanceOf(reserve.address);
    expect(reserveBalance).to.equal(ethers.parseEther("5"));
  });
});
