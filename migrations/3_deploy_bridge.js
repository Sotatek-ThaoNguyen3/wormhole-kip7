require('dotenv').config({ path: "../.env" });

const TokenBridge = artifacts.require("TokenBridge");
const BridgeImplementation = artifacts.require("BridgeImplementation");
const BridgeSetup = artifacts.require("BridgeSetup");
const TokenImplementation = artifacts.require("TokenImplementation");
const Wormhole = artifacts.require("Wormhole");

const chainId = process.env.BRIDGE_INIT_CHAIN_ID;
const governanceChainId = process.env.BRIDGE_INIT_GOV_CHAIN_ID;
const governanceContract = process.env.BRIDGE_INIT_GOV_CONTRACT; // bytes32
const WETH = process.env.BRIDGE_INIT_WETH;

module.exports = async function (deployer) {
    // deploy token implementation
    await deployer.deploy(TokenImplementation);

    // deploy setup
    await deployer.deploy(BridgeSetup);

    // deploy implementation
    await deployer.deploy(BridgeImplementation);

    const address_wormhole = (await Wormhole.deployed()).address
    console.log("This is address", address_wormhole)

    // encode initialisation data
    const setup = new web3.eth.Contract(BridgeSetup.abi, BridgeSetup.address);
    const initData = setup.methods.setup(
        BridgeImplementation.address,
        chainId,
        address_wormhole,
        governanceChainId,
        governanceContract,
        TokenImplementation.address,
        WETH
    ).encodeABI();

    console.log("Agrument:", BridgeSetup.address, initData)
    // deploy proxy
    await deployer.deploy(TokenBridge, BridgeSetup.address, initData);
};
