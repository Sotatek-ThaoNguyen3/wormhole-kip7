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
    mainnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://mainnet.infura.io/v3/` + process.env.INFURA_KEY
        ),
      network_id: 1,
      gas: 10000000,
      gasPrice: 101000000000,
      confirmations: 1,
      timeoutBlocks: 200,
      skipDryRun: false,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.ETH_MNEMONIC,
          process.env.ETH_PROVIDER
        ),
      network_id: 4,
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://goerli.infura.io/v3/" + process.env.INFURA_KEY
        );
      },
      network_id: "5",
      gas: 4465030,
      gasPrice: 10000000000,
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://ropsten.infura.io/v3/" + process.env.INFURA_KEY
        );
      },
      network_id: "3",
      gas: 4465030,
      gasPrice: 10000000000,
    },
    binance: {
      provider: () => {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://bsc-dataseed.binance.org/"
        );
      },
      network_id: "56",
      gas: 70000000,
      gasPrice: 8000000000,
    },
    bsc_testnet: {
      provider: () =>
        new HDWalletProvider(
          process.env.BSC_MNEMONIC,
          process.env.BSC_PROVIDER
        ),
      network_id: 97,
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 500,
      skipDryRun: true,
    },
    klaytn: {
      provider: () =>
        new HDWalletProvider(
          process.env.KLAYTN_MNEMONIC,
          process.env.KLAYTN_PROVIDER
        ),
      network_id: 221,
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
