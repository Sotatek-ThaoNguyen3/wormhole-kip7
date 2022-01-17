const MockWETH9 = artifacts.require("MockWETH9");
module.exports = async function (deployer) {
   // deploy setup
   await deployer.deploy(MockWETH9);
};
