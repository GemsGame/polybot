const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const config = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      forking: {
        url: "https://rpc.ankr.com/polygon",
      },
    },
    polygon: {
      url: "https://rpc.ankr.com/polygon",
      accounts: [process.env.PRIVATE_KEY],
      network_id: 137,
      gasPrice: "auto",
    },
  },
};

module.exports = config;

