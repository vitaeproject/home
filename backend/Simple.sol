pragma solidity ^0.4.25;
contract Simple {
 string ipfsHash;

 function sendHash(string x) public {
   ipfsHash = x;
 }

 function getHash() public view returns (string x) {
   return ipfsHash;
 }
}
