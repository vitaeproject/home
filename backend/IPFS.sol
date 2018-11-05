pragma solidity ^0.4.25;
contract IPFS {
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  mapping(string => address) ipfsHashes;
  mapping(string => string) userHashes;
  mapping(address => uint) paid;

  /* Constructor function */
  constructor() public {
    masterAccess[msg.sender] = true;
  }

  /* modifier to only allow function calls if caller is authorized in list */
  modifier _is(mapping (address => bool) list) {
    require(list[msg.sender] == true
    || masterAccess[msg.sender] == true);
    _;
  }

  mapping (address => bool) private masterAccess;
  mapping (address => bool) private verifierAccess;

  function sendHash(string x, string addr) _is(verifierAccess) public {
    ipfsHashes[x] = msg.sender;
    userHashes[addr] = x;
  }

  function uploadResumeFees() payable public returns (uint) {
    paid[msg.sender] = paid[msg.sender] + msg.value;
    return paid[msg.sender];
  }

  function getVerifier(string hash) _is(masterAccess) view public
    returns (address){
    return ipfsHashes[hash];
  }

  function getResume(string addr) _is(masterAccess) view public
    returns (string){
    return userHashes[addr];
  }
}
