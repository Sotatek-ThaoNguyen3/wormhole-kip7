require("dotenv").config({ path: ".env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");

// require('@nomiclabs/hardhat-ethers');
// require("@nomiclabs/hardhat-etherscan")

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    kasBaobab: {
      provider: () => {
        return new HDWalletProvider(process.env.KLAYTN_MNEMONIC, process.env.KLAYTN_PROVIDER)
      },
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice:'25000000000',
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
  },

  compilers: {
    solc: {
      version: "0.8.4",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },

  plugins: ["@chainsafe/truffle-plugin-abigen", "truffle-plugin-verify"],

  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY,
    bscscan: process.env.BSCSCAN_KEY,
  },
};
