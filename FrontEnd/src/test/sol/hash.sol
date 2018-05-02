pragma experimental ABIEncoderV2;

contract hash {
    function keccakuint256(uint256 x) public returns (bytes32){
        return keccak256(x);
    }

    function keccakstring(string x) public returns (bytes32) {
        return keccak256(x);
    }

    function keccakM(uint256 evalChoice, string evalComment) {
        uint256(keccak256(evalChoice))^uint256(keccak256(evalComment);
    }
}