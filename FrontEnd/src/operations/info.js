import Web3 from 'web3'
import { compiledContractDefinition } from '@/contracts/Evaluating'

var web3

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

var abi = compiledContractDefinition['contracts']['Evaluating']['abi']

// export default function EVALUATION(address) {
//   this.address = address
//   this.contract = new web3.eth.Contract(abi, address)
//   this.contract.methods.evaluatingStartTime().call().then(
//     (res) => {
//       this.evaluatingStartTime = res
//     }
//   )
//   this.contract.methods.evaluatingEndTime().call().then(
//     (res) => {
//       this.evaluatingEndTime = res
//     }
//   )
//   this.contract.methods.getEvaluators().call().then(
//     (res) => {
//       this.evaluators = []
//       for (let i = 0; i < res.length; i += 2) {
//         this.evaluators.push(res.slice(i, i + 2))
//       }
//     }
//   )
//   this.contract.methods.getEvalChoices().call().then(
//     (res) => {
//       this.evalChoices = res
//     })
//   this.contract.methods.getEvalComments().call().then(
//     (res) => {
//       this.evalComments = res
//     }).catch(
//     new Error('get Comments fail')
//   )
// }

export default async function EVALUATION(address) {
  this.address = address
  this.contract = new web3.eth.Contract(abi, address)
  this.evaluatingStartTime = await this.contract.methods.evaluatingStartTime().call()
  this.evaluatingEndTime = await this.contract.methods.evaluatingEndTime().call()
  this.evaluators = []
  const evaluatorSet = await this.contract.methods.getEvaluators().call()
  for (let i = 0; i < evaluatorSet.length; i += 2) {
    this.evaluators.push(evaluatorSet.slice(i, i + 2))
  }
  this.evalChoices = await this.contract.methods.getEvalChoices().call()
  this.evalComments = await this.contract.methods.getEvalComments().call()
  return this
}

