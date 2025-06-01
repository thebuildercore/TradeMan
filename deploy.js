//Depoyment File
  async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Deploy ShareToken
  const ShareToken = await ethers.getContractFactory("ShareToken");
  const shareToken = await ShareToken.deploy(deployer.address);
  await shareToken.waitForDeployment();
  console.log("ShareToken deployed at:", shareToken.target);

  // Deploy BricksToken
  const BricksToken = await ethers.getContractFactory("BricksToken");
  const bricksToken = await BricksToken.deploy(
    "BricksToken",
    "BRK",
    deployer.address,
    deployer.address // business wallet 
  );
  await bricksToken.waitForDeployment();
  console.log("BricksToken deployed at:", bricksToken.target);

  // Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(shareToken.target);
  await marketplace.waitForDeployment();
  console.log("Marketplace deployed at:", marketplace.target);

  // Add other contracts later if needed
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
