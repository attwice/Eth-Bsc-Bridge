const Wallet = require('ethereumjs-wallet');
const CryptoJS = require('crypto-js')
const fs = require("fs");

function decrypt(encryptedKey, passphrase) {
    var decrypted = CryptoJS.AES.decrypt(encryptedKey, passphrase);
    var decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedData
}

module.exports = {
    decrypt
}