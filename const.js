const { decrypt } = require('./scripts/decrypt-key')
const fs = require("fs");

const bscRaw = fs.readFileSync('bsc_account.json');
const ethRaw = fs.readFileSync('eth_account.json');

const bscAccountDetails = JSON.parse(bscRaw)
const ethAccountDetails = JSON.parse(ethRaw)

const MNEMONIC = 'company shine first craft flash upon exact combine off gain arrange liar';
const NETWORK = {
    ETH_RINKEBY_WSS: 'wss://rinkeby.infura.io/ws/v3/5583a1ce54604375b02d6246936d9d53',
    ETH_RINKEBY_HTTPS: 'https://rinkeby.infura.io/v3/5583a1ce54604375b02d6246936d9d53',
    BSC_MAINNET: `https://bsc-dataseed1.binance.org`, // changfe network to 56
    BSC_TESTNET: 'https://data-seed-prebsc-1-s1.binance.org:8545', // changfe network to 97
    // BSC_TESTNET: 'https://speedy-nodes-nyc.moralis.io/7ffce73e1006cbb3dbfcbef6/bsc/testnet', // changfe network to 97
    BSC_TESTNET_WSS: 'wss://speedy-nodes-nyc.moralis.io/7ffce73e1006cbb3dbfcbef6/bsc/testnet/ws'
}

const CONTRACT_ADMIN = {
    address: '0x231b2db250E56aC3Ba8AbF1Fa9b943eBEaf431fb',
    privateKey: 'dc5f3f141a50f1ad21079467bedec558c205ad70d9f3beedaa709aaabecfd074'
}

const ETH_SENDER = {
    address: ethAccountDetails.address,
    privateKey: decrypt(ethAccountDetails.encryptedPk, ethAccountDetails.passphrase),
}

const BSC_RECEIVER = {
    address: bscAccountDetails.address,
    privateKey: decrypt(bscAccountDetails.encryptedPk, bscAccountDetails.passphrase),
}

module.exports = {
    MNEMONIC,
    NETWORK,
    CONTRACT_ADMIN,
    ETH_SENDER,
    BSC_RECEIVER
}