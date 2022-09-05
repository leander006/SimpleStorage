require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./task/block-count");
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: process.env.GOERLI_RPC_URL || "http:georli.example",
      accounts: [process.env.PRIVATE_KEY] || "x0key",
      chainId: 5,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      //accounts: hardhat is taking care ,
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "key",
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY || "key",
  }
};
