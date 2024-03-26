const hre = require("hardhat");

async function main() {
  const Degen = await hre.ethers.getContractFactory("DegenToken");
  const degen = await Degen.deploy("Degen", "DGN", 1000); // Deploy with name "Degen", symbol "DGN", and initial supply of 1000

  await degen.deployed();

  console.log("Degen token deployed to:", degen.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});