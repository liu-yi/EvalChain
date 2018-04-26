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
    uint public constant maxNumberEvaluatorsPerRing = 500;
    uint public numEvaluatorPerRing;

    uint public evaluatingStartTime;
    uint public evaluatingEndTime;

    uint public minimumPhaseTime = 10;

    /****************************************
                END SETUP DATA
    /****************************************/

    /****************************************
                REGISTRATION DATA
    /****************************************/
    uint public currentRingIdx; 
    mapping(uint => uint256[]) public ring;

    uint256[2][] public evaluators;
    mapping(uint256 => uint) public hashRingToIdx;
    mapping(bytes32 => bool) public registeredKeys;
    mapping(bytes32 => uint) public hashKeyToRingIdx;
    /****************************************
             END REGISTRATION DATA
    /****************************************/


    /****************************************
                    EVAL DATA
    /****************************************/
    mapping(bytes32 => uint) public registeredEvalLink;
    bytes32[] public evalChoices;
    string[] public evalComments;
    /****************************************
                  END VOTE DATA
    /****************************************/

    function Evaluating() public {
        state = State.SETUP;
        currentRingIdx = 1;
    }

    // @dev Sets a contract to debug mode so election times can be ignored.
    // Can only be called by owner.
    function setDebug() public onlyOwner() {
        debug = true;
    }

    function finishSetUp(
        uint _numEvaluatorPerRing,
        uint256[2][] _publicKeys,
        uint _evaluatingStartTime,
        uint _evaluatingEndTime) public inState(State.SETUP) onlyOwner() returns (bool) {

        if(_numEvaluatorPerRing > maxNumberEvaluatorsPerRing) {
            return false;
        }

        if(block.timestamp > _evaluatingStartTime) {
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

        if(ring[currentRingIdx - 1].length / 2 < numEvaluatorPerRing) {
            uint256 closeringHash = RingSignature.hashToInt(ring[currentRingIdx - 1]);
            hashRingToIdx[closeringHash] = currentRingIdx;
            currentRingIdx += 1;
        }

        numEvaluatorPerRing = _numEvaluatorPerRing;
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

        ring[currentRingIdx - 1].push(publicKey[0]);
        ring[currentRingIdx - 1].push(publicKey[1]);
        evaluators.push([publicKey[0], publicKey[1]]);
        registeredKeys[keccak256(publicKey)] = true;
        hashKeyToRingIdx[keccak256(publicKey)] = currentRingIdx;

        if(ring[currentRingIdx - 1].length / 2 == numEvaluatorPerRing) {
            uint256 closeringHash = RingSignature.hashToInt(ring[currentRingIdx - 1]);
            hashRingToIdx[closeringHash] = currentRingIdx;
            currentRingIdx += 1;
        }

        return true;
    }


    function Evaluate(
        bytes32 evalChoice,
        string evalComment,
        uint256[] pubKeys,
        uint256 c_0,
        uint256[] signature,
        uint256[2] link) public inState(State.EVALUATING) returns (bool){ 

        if(block.timestamp > evaluatingEndTime) {
            state = State.FINISHED;
            return false;
        }

        if(registeredEvalLink[keccak256(link)] != 0) {
            return true;
        }

        uint256 ringHash = RingSignature.hashToInt(pubKeys);
        
        if( hashRingToIdx[ringHash] == 0) {
            return false;
        }

        if(RingSignature.verifyRingSignature(uint256(keccak256(evalChoice)^keccak256(evalComment)), pubKeys, c_0, signature, link)) {       
            evalChoices.push(evalChoice);
            evalComments.push(evalComment);
            registeredEvalLink[keccak256(link)] = evalChoices.length;//bool?
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

    function getRingIdx(uint256[2] pubKey) public constant returns (uint) {
        return hashKeyToRingIdx[keccak256(pubKey)];
    }


    function getRingSize(uint ringIdx) public constant returns (uint) {
        return ring[ringIdx].length;
    }
    

    function getNumberEvaluations() public constant returns (uint) {
        return evalChoices.length;
    }


    function getNumRegisterEvaluators() public constant returns (uint) {
        return evaluators.length;
    }

}

    



