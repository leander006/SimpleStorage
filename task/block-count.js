const { task } = require("hardhat/config");

task("block-count", "Provie count of current block").setAction(
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Block number is ${blockNumber}`);
  }
);

module.exports = {};
