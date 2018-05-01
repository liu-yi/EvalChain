pragma solidity ^0.4.10;

import "./SECP256k1.sol";
import "./RingSignature.sol";
import "./Owned.sol";

contract Evaluating is owned{

    enum State { SETUP, EVALUATING, FINISHED }
    State public state;

    modifier inState(State s) {
        if(state != s) {
            revert();
        }
        _;
    }

    bool public debug = false;

    /****************************************
                    SETUP DATA
    /****************************************/
    uint public constant maxNumberEvaluatorsPerRing = 800;
    uint public evaluatingStartTime;
    uint public evaluatingEndTime;
    uint public minimumPhaseTime = 10;

    /****************************************
                END SETUP DATA
    /****************************************/

    /****************************************
                REGISTRATION DATA
    /****************************************/
    // uint256[] public ring;
    uint256[2][] public evaluators;
    mapping(bytes32 => bool) public registeredKeys;
    /****************************************
             END REGISTRATION DATA
    /****************************************/


    /****************************************
                    EVAL DATA
    /****************************************/
    mapping(bytes32 => bool) public registeredEvalLink;
    uint[] public evalChoices;
    string[] public evalComments;
    /****************************************
                  END VOTE DATA
    /****************************************/

    function Evaluating() public {
        state = State.SETUP;
    }

    // @dev Sets a contract to debug mode so election times can be ignored.
    // Can only be called by owner.
    function setDebug() public onlyOwner() {
        debug = true;
    }

    function finishSetUp(
        uint256[2][] _publicKeys,
        uint _evaluatingStartTime,
        uint _evaluatingEndTime) public inState(State.SETUP) onlyOwner() returns (bool) {

        if(_publicKeys.length > maxNumberEvaluatorsPerRing) {
            return false;
        }

        if(block.timestamp + minimumPhaseTime > _evaluatingEndTime) {
            return false;
        }

        if(_evaluatingStartTime + minimumPhaseTime > _evaluatingEndTime) {
            return false;
        }

        for(uint i = 0; i < _publicKeys.length; i++) {
            if(!registerEvaluator(_publicKeys[i])) {
                return false;
            }
        }

        evaluatingStartTime = _evaluatingStartTime;
        evaluatingEndTime = _evaluatingEndTime;

        state = State.EVALUATING;
        
        return true;
    }

    function registerEvaluator(uint256[2] publicKey) internal inState(State.SETUP) onlyOwner returns (bool){
        
        if(!Secp256k1.isPubKey(publicKey)) {
            return false;
        }

        if(registeredKeys[keccak256(publicKey)]) {
            return false;
        }

        evaluators.push([publicKey[0], publicKey[1]]);
        registeredKeys[keccak256(publicKey)] = true;

        return true;
    }


    function Evaluate(
        uint256 evalChoice,
        string evalComment,
        uint256[2][] pubKeys,
        uint256 c_0,
        uint256[] s,
        uint256[2] link) public inState(State.EVALUATING) returns (bool){ 

        if(block.timestamp > evaluatingEndTime) {
            return false;
        }

        if(registeredEvalLink[keccak256(link)]) {
            return false;
        } 

        for(uint i = 0; i < pubKeys.length; i++){
            if(!registeredKeys[keccak256(pubKeys[i])]) {
                return false;
            }
        }

        if(RingSignature.verifyRingSignature(uint256(keccak256(evalChoice))^uint256(keccak256(evalComment)), pubKeys, c_0, s, link)) {       
            evalChoices.push(evalChoice);
            evalComments.push(evalComment);
            registeredEvalLink[keccak256(link)] = true;
            return true;
        }

        return false;
    }

    function endEvaluatingPhase() public inState(State.EVALUATING) onlyOwner returns (bool) {
        if(!debug){
            if(block.timestamp < evaluatingEndTime) {
                return false;
            }
        }

        state = State.FINISHED;

        return true;
        
    }

    function getNumberEvaluations() public constant returns (uint) {
        return evalChoices.length;
    }

    function getNumRegisterEvaluators() public constant returns (uint) {
        return evaluators.length;
    }

    function queryLink(uint256[2] link) public constant returns (bool) {
        if(registeredEvalLink[keccak256(link)]) {
            return true;
        }else{
            return false;
        }
    }

}

    



