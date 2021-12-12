const Wallet = require('ethereumjs-wallet');
const CryptoJS = require('crypto-js')
const fs = require("fs");
try {
    if (process.argv.length !== 4) {
        console.log("No parameters passed")
        return
    }
    else {
        const EthWallet = Wallet.default.generate();
        if (process.argv[2] === 'BSC') {
            var encrypted = CryptoJS.AES.encrypt(EthWallet.getPrivateKeyString(), process.argv[3]);
            console.log("encrypted", encrypted.toString())

            var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), process.argv[3]);
            var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

            console.log("decrypted", decryptedData, decryptedData === EthWallet.getPrivateKeyString())

            const data = {
                chain: "BSC",
                network: "Testnet",
                address: EthWallet.getAddressString(),
                encryptedPk: encrypted.toString(),
                passphrase: process.argv[3]
            }

            fs.writeFileSync(`bsc_account.json`, JSON.stringify(data), { flag: 'wx' });

            console.log("success");
            return

        } else if (process.argv[2] === 'ETH') {
            var encrypted = CryptoJS.AES.encrypt(EthWallet.getPrivateKeyString(), process.argv[3]);
            console.log("encrypted", encrypted.toString())

            var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), process.argv[3]);
            var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

            console.log("decrypted", decryptedData, decryptedData === EthWallet.getPrivateKeyString())
            const data = {
                chain: "ETH",
                network: "Rinkeby",
                address: EthWallet.getAddressString(),
                encryptedPk: encrypted.toString(),
                passphrase: process.argv[3]
            }
            fs.writeFileSync(`eth_account.json`, JSON.stringify(data), { flag: 'wx' });
            console.log("success");
            return
        } else {
            console.log("Wrong parameters");
            return;
        }
    }
} catch (err) {
    console.log("Error: ", err.message)
    return
}
// });