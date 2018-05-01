pragma solidity ^0.4.10;

contract owned {
    address public owner;

    /* Initialise contract creator as owner */
    function owned() public {
        owner = msg.sender;
    }

    /* Function to dictate that only the designated owner can call a function */
    modifier onlyOwner {
        if(owner != msg.sender) revert();
        _;
    }

    /* Transfer ownership of this contract to someone else */
    function transferOwnership(address newOwner) onlyOwner() public {
        owner = newOwner;
    }


    /*function kill() onlyOwner() {
        selfdestruct(owner);
    }*/
}