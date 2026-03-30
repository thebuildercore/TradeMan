import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Connecting with account:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  
  // Ethers v6 uses formatEther directly from the top level or via ethers.utils in older versions
  // but with the Hardhat plugin, we use ethers.formatEther
  console.log("Account balance:", ethers.formatEther(balance), "tBNB");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});