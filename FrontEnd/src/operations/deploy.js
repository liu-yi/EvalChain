import Web3 from 'web3'
import { compiledContractDefinition } from '@/contracts/Evaluating'
import BN from 'bn.js'

let web3

const from = '0x3e384a5eFe7bB75BBFC921e53faDa0524E1E2dda'

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

const abi = compiledContractDefinition['contracts']['Evaluating']['abi']
const bin = compiledContractDefinition['contracts']['Evaluating']['bin']

const CONTRACT = {}

export async function publish(_publicKeys, _evaluatingStartTime, _evaluatingEndTime) {
  CONTRACT.publicKeys = _publicKeys.map(
    (item) => {
      return [
        new BN(item.toString().split(',')[0].substring(1)),
        new BN(item.toString().split(',')[1].slice(0, -1))
      ]
    }
  )
  CONTRACT.publicKeys = [].concat.apply([], CONTRACT.publicKeys)
  CONTRACT.evaluatingStartTime = _evaluatingStartTime
  CONTRACT.evaluatingEndTime = _evaluatingEndTime

  const contractClass = new web3.eth.Contract(abi)

  const contract = await contractClass.deploy({
    data: bin
  }).send({
    from,
    gas: 5200000
  })

  console.log('contract deploy address: ' + contract.options.address)
  CONTRACT.address = contract.options.address
  CONTRACT.contract = contract

  const testFinishSetup = await CONTRACT.contract.methods.finishSetUp(
    CONTRACT.publicKeys,
    CONTRACT.evaluatingStartTime,
    CONTRACT.evaluatingEndTime
  ).call({ from })

  if (testFinishSetup) {
    const receipt = await CONTRACT.contract.methods.finishSetUp(
      CONTRACT.publicKeys,
      CONTRACT.evaluatingStartTime,
      CONTRACT.evaluatingEndTime
    ).send({ from, gas: 4200000 })
    console.log(receipt)
    return CONTRACT.address
  } else {
    throw new Error('Fail to set up!')
  }
}
