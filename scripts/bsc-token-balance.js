const TokenBsc = artifacts.require('./TokenBsc.sol');
const BscBridge = artifacts.require('./BridgeBsc.sol');
const { ETH_SENDER, BSC_RECEIVER } = require('../const');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
  const tokenBsc = await TokenBsc.deployed();
  const bscBridge = await BscBridge.deployed();
  
  const totalSuply = await tokenBsc.totalSupply()
  console.log('Token total supply: ', totalSuply.toString());

  const balanceOfBridge = await tokenBsc.balanceOf(bscBridge.address);
  console.log('Tokens locked in bridge contract: ', balanceOfBridge.toString());

  const balance2 = await tokenBsc.balanceOf(BSC_RECEIVER.address);
  console.log('receiver token balance ', balance2.toString());

  done();
}
