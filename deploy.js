const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const tenantAddress = deployer.address;
  const rentAmount = ethers.parseEther("1");      // ✅ Ethers v6 syntax
  const depositAmount = ethers.parseEther("2");   // ✅ Ethers v6 syntax
  const leaseStart = Math.floor(Date.now() / 1000);
  const leaseEnd = leaseStart + 60 *  2 ;

  const ContractFactory = await ethers.getContractFactory("RentalAgreement");

  const contract = await ContractFactory.deploy(
    tenantAddress,
    rentAmount,
    depositAmount,
    leaseStart,
    leaseEnd
  );

  await contract.waitForDeployment(); // ✅ Replaces .deployed() in Ethers v6

  console.log("Contract deployed to:", contract.target); // ✅ .target instead of .address
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
