pragma solidity ^0.4.25;
contract IPFS {

  /* record verifier */
  mapping(string => address) ipfsHashes;
  /* record user address to verified resume hashes */
  mapping(string => string) userHashes;

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
  mapping (address => bool) private subscriberAccess;


  function sendHash(string x, string addr) _is(verifierAccess) public {
    ipfsHashes[x] = msg.sender;
    userHashes[addr] = x;
  }

  function getResume(string addr) _is(subscriberAccess) view public
    returns (string){
    return userHashes[addr];
  }

  function getVerifier(string hash) _is(masterAccess) view public
    returns (address){
    return ipfsHashes[hash];
  }

  function addVerifier(address addr) _is(masterAccess) public {
    verifierAccess[addr] = true;
  }

  function addSubscriber(address addr) _is(masterAccess) public {
    subscriberAccess[addr] = true;
  }

  function() public {
    revert();
  }
}
