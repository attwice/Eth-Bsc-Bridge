const TokenEth = artifacts.require('./TokenEth.sol');
const EthBridge = artifacts.require('./BridgeEth.sol');
const { ETH_SENDER, BSC_RECEIVER } = require('../const')

module.exports = async done => {
  const [sender, _] = await web3.eth.getAccounts();
  const tokenEth = await TokenEth.deployed();
  const ethBridge = await EthBridge.deployed();

  const totalSuply = await tokenEth.totalSupply()
  console.log('Token total supply: ', totalSuply.toString());

  const balanceOfBridge = await tokenEth.balanceOf(ethBridge.address);
  console.log('Tokens locked in bridge contract: ', balanceOfBridge.toString());

  const balance2 = await tokenEth.balanceOf(ETH_SENDER.address);
  console.log('sender token balance ', balance2.toString());

  done();
}
