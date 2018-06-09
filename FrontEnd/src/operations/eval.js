
import Web3 from 'web3'
import BN from 'bn.js'

let web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

const from = '0xd0D6131360695fD4679484eC988ABf9fDdBF7AC9'

const EVAL = {}

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
  // const res = true
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

