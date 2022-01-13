require('dotenv').config({ path: "../.env" });

const Setup = artifacts.require("Setup");
const Implementation = artifacts.require("Implementation");
const Wormhole = artifacts.require("Wormhole");

// CONFIG
const initialSigners = JSON.parse(process.env.INIT_SIGNERS);
const chainId = process.env.INIT_CHAIN_ID;
const governanceChainId = process.env.INIT_GOV_CHAIN_ID;
const governanceContract = process.env.INIT_GOV_CONTRACT; // bytes32

module.exports = async function (deployer) {
    // deploy setup
    await deployer.deploy(Setup);

    // deploy implementation
    await deployer.deploy(Implementation);

    // encode initialisation data
    const setup = new web3.eth.Contract(Setup.abi, Setup.address);
    const initData = setup.methods.setup(
        Implementation.address,
        initialSigners,
        chainId,
        governanceChainId,
        governanceContract
    ).encodeABI();

    console.log("Agrument:", Setup.address, initData)
    // deploy proxy
    await deployer.deploy(Wormhole,  Setup.address, initData);
};
