import { ethers } from "hardhat";
async function main() {
  const fakeCoin2 = await ethers.deployContract(
    "FakeCoin2", 
    [
      "0x5d8fA05F194f85Db5eC361Cc98666213DFdB8848",
      1000 * 10 ** 6
    ]
  );

  await fakeCoin2.waitForDeployment();

  console.log(
    `FakeCoin2 Contract deployed to ${fakeCoin2.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});