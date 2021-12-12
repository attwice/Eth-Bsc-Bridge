pragma solidity ^0.8.0;

interface IToken {
  function mint(address to, uint amount) external;
  function burn(address owner, uint amount) external;
  function bridgeTransfer(address sender, address receiver, uint amount) external;
  function balanceOf(address user) external returns(uint);
}
