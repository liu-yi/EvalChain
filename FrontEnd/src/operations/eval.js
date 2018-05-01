
import Web3 from 'web3'
import compiledContractDefinition from '@/contracts/Evaluating'
import ringSign from '@/operations/ringSign'
import BN from 'bn.js'

var web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

var from = web3.eth.accounts[0]
var passcode = ''

var abi = compiledContractDefinition['contracts']['Evaluating']['abi']
var EVAL

export function publishEval(contractAddress, _evalChoice, _evalComment, _pubKeys, _c_0, _s, _link) {
  EVAL.contract = web3.eth.contract(abi).at(contractAddress)
  EVAL.evalChoice = new BN(_evalChoice.toString())
  EVAL.evalComment = _evalComment
  EVAL.pubKeys = _pubKeys.forEach(
    (item) => {
      return [
        new BN(item.toString().split(',')[0].substring(1)),
        new BN(item.toString().split(',')[1].slice(0, -1))
      ]
    }
  )
  EVAL.c_0 = new BN(_c_0.toString())
  EVAL.s = _s.forEach(
    (item) => {
      return new BN(item.toString())
    }
  )
  EVAL.link = [
    new BN(_link.toString().split(',')[0].substring(1)),
    new BN(_link.toString().split(',')[1].slice(0, -1))
  ]
  var validEval = EVAL.contract.evaluate.call(
    EVAL.evalChoice,
    EVAL.evalComment,
    EVAL.pubKeys,
    EVAL.c_0,
    EVAL.s,
    EVAL.link
  )
  if (validEval) {
    web3.personal.unlockAccount(from, passcode)

    var txHash = EVAL.contract.evaluate.sendTransaction(
      EVAL.evalChoice,
      EVAL.evalComment,
      EVAL.pubKeys,
      EVAL.c_0,
      EVAL.s,
      EVAL.link,
      { from: from, gas: 9000000 }
    )
    console.log(txHash)
    return txHash
  } else {
    throw new Error('wrong eval')
  }
}

export function generateSignAndPublish(contractAddress, M, signingKey, y) {
  var [sign, pubKeys] = ringSign(signingKey, M, y)
  var txHash = publishEval(contractAddress, M.evalChoice, M.evalComment, pubKeys, sign.c_0, sign.s, sign.link)
  return txHash
}
