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

var abi = compiledContractDefinition['contracts']['Evaluating']['abi']
var bin = compiledContractDefinition['contracts']['Evaluating']['bin']

var CONTRACT = {}

export function publish(_publicKeys, _evaluatingStartTime, _evaluatingEndTime) {
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
  deployContract(abi, bin, from, publishEvaluation)
}

function deployContract(contractAbi, contractBin, account, deployCallBack) {
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
  CONTRACT.address = contract.options.address
  CONTRACT.contract = contract
  finishSetup()
}

function finishSetup() {
  CONTRACT.contract.methods.finishSetUp(
    CONTRACT.publicKeys,
    CONTRACT.evaluatingStartTime,
    CONTRACT.evaluatingEndTime
  ).call(
    {
      from: '0xd0D6131360695fD4679484eC988ABf9fDdBF7AC9'
    }
  ).then(
    function(result) {
      if (result) {
        CONTRACT.contract.methods.finishSetUp(
          CONTRACT.publicKeys,
          CONTRACT.evaluatingStartTime,
          CONTRACT.evaluatingEndTime
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
