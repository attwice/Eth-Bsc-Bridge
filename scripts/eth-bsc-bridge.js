const Web3 = require('web3');
const BridgeEth = require('../build/contracts/BridgeEth.json');
const BridgeBsc = require('../build/contracts/BridgeBsc.json');
const { NETWORK, CONTRACT_ADMIN } = require('../const')

const web3Eth = new Web3(NETWORK.ETH_RINKEBY_WSS);
const web3EthHttp = new Web3(NETWORK.ETH_RINKEBY_HTTPS);
// const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const web3Bsc = new Web3(NETWORK.BSC_TESTNET_WSS);
const adminPrivKey = CONTRACT_ADMIN.privateKey;
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);
const { address: admin_eth } = web3Eth.eth.accounts.wallet.add(adminPrivKey);

console.log("admin ", admin, CONTRACT_ADMIN.address, admin === CONTRACT_ADMIN.address)

const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks['4'].address
);

const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks['97'].address
);

bridgeEth.events.Transfer(
  { fromBlock: 0, step: 0 }
)
  .on('data', async event => {
    try {
      console.log("EVENT in bridge from eth to bsc")
      const { from, to, amount, date, nonce, signature } = event.returnValues;
      const tx = bridgeBsc.methods.mint(from, to, amount, nonce, signature);
      const [gasPrice, gasCost] = await Promise.all([
        web3Bsc.eth.getGasPrice(),
        tx.estimateGas({ from: admin }),
      ]);
      const data = tx.encodeABI();
      const txData = {
        from: admin,
        to: bridgeBsc.options.address,
        data,
        gas: gasCost,
        gasPrice
      };
      const receipt = await web3Bsc.eth.sendTransaction(txData);
      console.log("\nTransaction from eth -> bsc\n-----")
      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(`Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
    `);
      console.log("-----")
    } catch (err) {
      console.log("err in eth -> bsc | ", err.message)
    }
  });

bridgeBsc.events.Transfer(
  { fromBlock: 0, step: 0 }
)
  .on('data', async event => {
    try {
      console.log("EVENT in bridge from bsc to eth")
      const { from, to, amount, date, nonce, signature } = event.returnValues;

      const tx = bridgeEth.methods.mint(from, to, amount, nonce, signature);
      const [gasPrice, gasCost] = await Promise.all([
        web3Eth.eth.getGasPrice(),
        tx.estimateGas({ from: admin_eth }),
      ]);
      const data = tx.encodeABI();
      const txData = {
        from: admin_eth,
        to: bridgeEth.options.address,
        data,
        gas: gasCost,
        gasPrice
      };
      const receipt = await web3Eth.eth.sendTransaction(txData);
      console.log("\nTransaction from bsc -> eth\n-----")
      console.log(`Transaction hash: ${receipt.transactionHash}`);
      console.log(`Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
  `);
      console.log("-----")
    } catch (err) {
      console.log("err in bsc -> eth | ", err.message)
    }
  });
