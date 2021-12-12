// Create Eth account (initial tokens (10000) will mint in this)
`node .\scripts\generate-addresses.js ETH random_eth_password`

// Create BSC account (initial tokens (10000) will mint in this)
`node .\scripts\generate-addresses.js BSC random_bsc_password`

// Transfer tokens from eth to bsc
`truffle exec .\scripts\eth-bsc-transfer.js --network ethTestnet`

// Receive tokens on BSC after transfer from Ethereum
`node .\scripts\eth-bsc-bridge.js`

// Check token balance on ethereum
`truffle exec .\scripts\eth-token-balance.js --network ethTestnet`

// Check token balance on BSC
`truffle exec .\scripts\bsc-token-balance.js --network bscTestnet`

// Transfer tokens from bsc to eth
`truffle exec .\scripts\bsc-eth-transfer.js --network bscTestnet`

// Receive tokens on BSC after transfer from Ethereum
`node .\scripts\eth-bsc-bridge.js`