pragma solidity ^0.4.25;
contract IPFS {

  uint nonce = 0;

  function random() internal returns (uint) {
  uint random = uint(keccak256(now, msg.sender, nonce)) % 100;
  nonce++;
  return random;
  }

  function getRandom() view returns (uint) {
      return random();
  }

  uint verifierReward = 0.01 ether;

  /* record verifier of certain resume result */
  mapping(string => address) ipfsHashes;
  /* record user address to verified resume hashes */
  mapping(string => string) userHashes;
  /* userAddress => resume hash to be verified */
  mapping (string => string) resumesToBeVerified;
  mapping (string => uint) numberOfTimesAResumeIsVerified;
  /* verifierAddress => list of resumes assigned */
  mapping (address => string[]) resumesAssignedToVerifiers;
  mapping (address => uint) resumesAssignedToVerifiersCurrentIndex;
  /* user address of whom uploaded resumes that need to be verified */
  string[] idOfResumesToBeVerified;
  uint currentIndex = 0;
  address[] verifiers;

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

  function getThreeVerifiers() private returns (uint[3]) {
    uint[3] result;
    for (int i = 0; i < 3; i++) {
      result[i]  = getRandom() % verifiers.length;
    }
    return result;
  }

  function uploadResumeToBeVerified(string x, string uploaderAddress) public {
    resumesToBeVerified[uploaderAddress] = x;
    idOfResumesToBeVerified.push(uploaderAddress);
    uint[3] assignedVerifiers = getThreeVerifiers();
    for (int i = 0; i < 3; i++) {
      resumesAssignedToVerifiers[verifiers[assignedVerifiers[i]]].push(x);
    }
  }

  function sendHash(string x, string addr) _is(verifierAccess) public {
    ipfsHashes[x] = msg.sender;
    userHashes[addr] = x;
    delete resumesAssignedToVerifiers[resumesAssignedToVerifiersCurrentIndex[msg.sender]];
    resumesAssignedToVerifiersCurrentIndex[msg.sender] += 1;
    if (numberOfTimesAResumeIsVerified[resumesToBeVerified[addr]] >= 3) {
      delete idOfResumesToBeVerified[currentIndex];
      currentIndex += 1;
      numberOfTimesAResumeIsVerified[resumesToBeVerified[addr]] = 0;
      resumesToBeVerified[addr] = '';
    }
    msg.sender.send(verifierReward);
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
    verifiers.push(addr);
  }

  function addSubscriber(address addr) _is(masterAccess) public {
    subscriberAccess[addr] = true;
  }

  function() public {
    revert();
  }
}
