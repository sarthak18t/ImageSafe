const hre = require("hardhat");

async function main() {
   const contract = await hre.ethers.getContractFactory("Drive");
   const deployedContract = await contract.deploy();

   console.log("Contract deployed at address : " , await deployedContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
