const { ethers, run, network } = require("hardhat");

async function main() {
  const simpleFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("Deploying...");
  const simpleStorage = await simpleFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to ${simpleStorage.address}`);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is ${currentValue}`);

  const transactionResponses = await simpleStorage.store(5);
  await transactionResponses.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is ${updatedValue}`);
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
