import Web3 from 'web3'
import { compiledContractDefinition } from '@/contracts/Evaluating'
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
var bin = compiledContractDefinition['contracts']['Evaluating']['bin']

var EVALUATION = {}

export function publish(_publicKeys, _evaluatingStartTime, _evaluatingEndTime) {
  EVALUATION.publicKeys = _publicKeys.map(
    (item) => {
      return [
        new BN(item.toString().split(',')[0].substring(1)),
        new BN(item.toString().split(',')[1].slice(0, -1))
      ]
    }
  )
  EVALUATION.evaluatingStartTime = _evaluatingStartTime
  EVALUATION.evaluatingEndTime = _evaluatingEndTime
  deployContract(abi, bin, from, passcode, publishEvaluation)
}

function deployContract(contractAbi, contractBin, account, passcode, deployCallBack) {
  var contractClass = new web3.eth.Contract(contractAbi)

  return contractClass.deploy({
    data: contractBin
  }).send({
    from: '0xd0D6131360695fD4679484eC988ABf9fDdBF7AC9',
    gas: 5200000
  }).then(deployCallBack)
}

function publishEvaluation(contract) {
  console.log('contract deploy address: ' + contract.options.address)
  EVALUATION.address = contract.options.address
  EVALUATION.contract = contract
  finishSetup()
}

function finishSetup() {
  EVALUATION.contract.methods.finishSetUp(
    EVALUATION.publicKeys,
    EVALUATION.evaluatingStartTime,
    EVALUATION.evaluatingEndTime
  ).call(
    {
      from: '0xd0D6131360695fD4679484eC988ABf9fDdBF7AC9'
    }
  ).then(
    function(result) {
      if (result) {
        EVALUATION.contract.methods.finishSetUp(
          EVALUATION.publicKeys,
          EVALUATION.evaluatingStartTime,
          EVALUATION.evaluatingEndTime
        ).send(
          {
            from: '0xd0D6131360695fD4679484eC988ABf9fDdBF7AC9',
            gas: 4200000
          }
        ).then(
          function(receipt) {
            console.log(receipt)
          }
        )
      } else {
        throw new Error('wrong parameters!')
      }
    }
  )
}
