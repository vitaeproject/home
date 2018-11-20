pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;
contract IPFS {

  /* record verifier of certain resume result */
  mapping(string => address) ipfsHashes;
  /* record user address to verified resume hashes */
  mapping(string => string) userHashes;
  /* resume hash to be verified => userAddress */
  mapping (string => string) resumesToBeVerified;
  mapping (string => uint) numberOfTimesAResumeIsVerified;
  /* verifierAddress => list of resumes assigned */
  mapping (address => string[]) resumesAssignedToVerifiers;
  mapping (address => uint256) resumesAssignedToVerifiersCurrentIndex;
  /* user address of whom uploaded resumes that need to be verified */
  string[] idOfResumesToBeVerified;
  uint currentIndex = 0;
  address[] verifiers;
  uint verifierReward = 0.01 ether;

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

  function uploadResumeToBeVerified(string x, string uploaderAddress) public {
    resumesToBeVerified[x] = uploaderAddress;
    idOfResumesToBeVerified.push(uploaderAddress);
    for (uint i = currentIndex; i < currentIndex + verifiers.length; i++) {
      resumesAssignedToVerifiers[verifiers[i]].push(x);
    }
  }

  function sendHash(string x, string addr) _is(verifierAccess) public {
    ipfsHashes[x] = msg.sender;
    userHashes[addr] = x;
    resumesAssignedToVerifiersCurrentIndex[msg.sender] += 1;
  }

  function downloadResumes() _is(verifierAccess) public returns (string[]) {
    for (uint256 i = 0; i < resumesAssignedToVerifiersCurrentIndex[msg.sender]; i++) {
      delete resumesAssignedToVerifiers[msg.sender][i];
    }
    return resumesAssignedToVerifiers[msg.sender];
  }

  function getUserAddress(string resumeHash) _is(verifierAccess) public view returns (string) {
    return resumesToBeVerified[resumeHash];
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
