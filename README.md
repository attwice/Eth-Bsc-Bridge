# Eth-bsc-bridge

This project is a bridge between Ethereum and Binance smart chain to transfer token between these two chains.

## Instructions

Before you start, this is a node project and you will be required to have node and npm installed on you system.<br>
After installing npm, run the command `npm i -g truffle` to install truffle suite globally on you system. 

Once the above requirements are fulfilled, follow the below steps to initialize the project and swap test tokens between 2 chains.

1.  Clone the repository and install the required dependencies using `npm i`

2.  We will be required to create ethereum and bsc addresses which will be used to hold and transfer the tokens.
    To create the accounts, run the following command:

    > Ethereum: `node .\scripts\generate-addresses.js ETH <password_to_encrypt_key>`<br>
    > BSC: `node .\scripts\generate-addresses.js BSC <password_to_encrypt_key>`

    These commands will store the account details in the json format with the filename as `eth_account.json` and `bsc_account.json` respectively.

3.  After creating the accounts, we need to add test faucets.

**Note:** The accounts are already created and funded with faucets so we can skip steps 2 and 3.

4. We will deploy the smart contracts on ethereum and bsc using the following command

   > Ethereum: `truffle migrate --reset --network ethTestnet`<br>
   > BSC: `truffle migrate --reset --network bscTestnet`

   These scripts will deploy the token and bridge contracts on the respective networks and will mint 10000 tokens on Ethereum in the above created account.

5. In a different terminal, run the command

   > `node .\scripts\eth-bsc-bridge.js`

   This will start and event listener and whenever there will be a transfer event, it will call the contract function on the other chain to mint or burn the tokens as per the requirements.<br> Keep this script running to have live feeds on token transfers.

6. To transfer tokens from ethereum to bsc, use the following command

   > `truffle exec .\scripts\eth-bsc-transfer.js --network ethTestnet`

7. To transfer tokens from bsc to ethereum, use the following command

   > `truffle exec .\scripts\bsc-eth-transfer.js --network bscTestnet`

8. To check token balance for the account on respective networks and total token supply, use the following commands
   > Ethereum: `truffle exec .\scripts\eth-token-balance.js --network ethTestnet`<br>
   > BSC: `truffle exec .\scripts\bsc-token-balance.js --network bscTestnet`

## Notes

1. No new tokens are minted or burnt on the ethereum chain while transfering tokens to BSC.<br>The sent tokens are stored on the ethereum bridge contract and hence the total suppy of the tokens on ethereum network is fixed to 10000 tokens.

2. When tokens are transferred from BSC to ethereum chain, the tokens are burnt on BSC chain but only the tokens which are locked inside the bridge contract on Ethereum are released and sent to the appropriate user hence preventing further minting of the tokens.

3. The locked token on the ethereum bridge contract can only be accessed by and tranferred the admin of the contract (who deploys the contract) [though this function will make the network instable and should not be used]. 

***Note**: The build details are also available in the repo so to try out the transfer functionality, you can skip the first 4 steps and directly start from step 5.*
