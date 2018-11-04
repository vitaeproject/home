pragma solidity ^0.4.25;
contract Contract {
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  *  ==============================INIT=============================
  *  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

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
}
