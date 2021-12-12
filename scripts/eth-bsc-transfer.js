const BridgeEth = require('../build/contracts/BridgeEth.json');
// const BridgeEth = artifacts.require('./BridgeEth.sol');
const { ETH_SENDER, BSC_RECEIVER } = require('../const')

const privKey = ETH_SENDER.privateKey;

module.exports = async done => {

  const bridgeEth = new web3.eth.Contract(
    BridgeEth.abi,
    BridgeEth.networks['4'].address
  );
  const nonce = 5; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  console.log("ACCOUNTS ", accounts)
  // const bridgeEth = await BridgeEth.deployed();
  const amount = 100;
  const message = web3.utils.soliditySha3(
    { t: 'address', v: ETH_SENDER.address },
    { t: 'address', v: BSC_RECEIVER.address },
    { t: 'uint256', v: amount },
    { t: 'uint256', v: nonce },
  ).toString('hex');
  const { signature } = web3.eth.accounts.sign(
    message,
    privKey
  );
  console.log("signature ", signature)
  console.log("message ", message)
  console.log("bridgeEth.options.address ", bridgeEth.options.address)
  try {
    const tx = bridgeEth.methods.burn(BSC_RECEIVER.address, amount, nonce, signature);
    console.log("tx ", tx)

    const [gasPrice, gasCost] = await Promise.all([
      web3.eth.getGasPrice(),
      tx.estimateGas({ from: ETH_SENDER.address }),
    ]);
    const data = tx.encodeABI();
    console.log("data ", data)
    const txData = {
      from: ETH_SENDER.address,
      to: bridgeEth.options.address,
      data,
      gas: gasCost,
      gasPrice
    };

    const acc = await web3.eth.accounts.privateKeyToAccount(privKey);
    console.log("acc ", acc)
    const signedTx = await web3.eth.accounts.signTransaction(txData, privKey);
    // const signedTx = await acc.signTransaction(txData, ETH_SENDER.address);
    console.log("signedTx ", signedTx)
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // const receipt = await web3.eth.sendTransaction(signedTx);
    console.log(`Transaction hash: ${receipt.transactionHash}`);

    // const acc = await web3.eth.accounts.privateKeyToAccount(privKey);
    // const accounts2 = await web3.eth.getAccounts()
    // console.log("ACCOUNTS ", accounts2, acc)
    // await bridgeEth.burn(ETH_SENDER.address, amount, nonce, signature, { from: acc.address });
  } catch (err) {
    console.log("err ", err.message)
  }
  done();
}
