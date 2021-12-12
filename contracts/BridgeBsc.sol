pragma solidity ^0.8.0;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
  constructor(address token) BridgeBase(token) {}

  
  function burn(address to, uint amount, uint nonce, bytes calldata signature) external {
    require(processedNonces[msg.sender][nonce] == false, 'transfer already processed');
    processedNonces[msg.sender][nonce] = true;
    token.burn(msg.sender, amount);
    emit Transfer(
      msg.sender,
      to,
      amount,
      block.timestamp,
      nonce,
      signature,
      Step.Burn
    );
  }

  function mint(
    address from, 
    address to, 
    uint amount, 
    uint nonce,
    bytes calldata signature
  ) external {
    bytes32 message = prefixed(keccak256(abi.encodePacked(
      from, 
      to, 
      amount,
      nonce
    )));
    require(recoverSigner(message, signature) == from , 'wrong signature');
    require(processedNonces[from][nonce] == false, 'transfer already processed');
    processedNonces[from][nonce] = true;
    token.mint(to, amount);
    emit Transfer(
      from,
      to,
      amount,
      block.timestamp,
      nonce,
      signature,
      Step.Mint
    );
  }


}
