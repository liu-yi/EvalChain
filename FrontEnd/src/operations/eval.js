
import Web3 from 'web3'
import { ringSign } from '@/operations/ringSign'
import BN from 'bn.js'

var web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

var from = '0x3e384a5eFe7bB75BBFC921e53faDa0524E1E2dda'

var EVAL = {}

export async function publishEval(contract, M, _pubKeys, sign) {
  EVAL.contract = contract
  EVAL.evalChoice = new BN(M.evalChoice.toString())
  EVAL.evalComment = M.evalComment
  EVAL.pubKeys = _pubKeys.map(
    (item) => {
      return [
        new BN(item.toString().split(',')[0].substring(1)),
        new BN(item.toString().split(',')[1].slice(0, -1))
      ]
    }
  )
  EVAL.pubKeys = [].concat.apply([], EVAL.pubKeys)
  EVAL.c_0 = new BN(sign.c_0.toString())
  EVAL.s = sign.s.map(
    (item) => {
      return new BN(item.toString())
    }
  )
  EVAL.link = [
    new BN(sign.link.toString().split(',')[0].substring(1)),
    new BN(sign.link.toString().split(',')[1].slice(0, -1))
  ]

  const res = await EVAL.contract.methods.Evaluate(
    EVAL.evalChoice,
    EVAL.evalComment,
    EVAL.pubKeys,
    EVAL.c_0,
    EVAL.s,
    EVAL.link
  ).call()

  console.log(res)
  if (res) {
    const tx = await EVAL.contract.methods.Evaluate(
      EVAL.evalChoice,
      EVAL.evalComment,
      EVAL.pubKeys,
      EVAL.c_0,
      EVAL.s,
      EVAL.link
    ).send(
      { from: from, gas: 90000000 }
    )
    console.log(tx)
    return true
  } else {
    return false
  }
}

export function generateSignAndPublish(evaluation, M, signingKey) {
  console.log(this)
  var [sign, pubKeys] = ringSign(signingKey, M, evaluation.evaluators)
  this.percentage = 30
  return publishEval(evaluation.contract, M, pubKeys, sign)
}
