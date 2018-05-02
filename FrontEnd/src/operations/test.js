import Web3 from 'web3'
import { compiledContractDefinition } from '@/contracts/Evaluating'
import BN from 'bn.js'
import { verifyRingSignature, ringSign } from './ringSign'
import BigInteger from 'bigi'
import ecurve from 'ecurve'
import web3Utils from 'web3-utils'

var web3
var ecparams = ecurve.getCurveByName('secp256k1')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
}

var from = '0xd0D6131360695fD4679484eC988ABf9fDdBF7AC9'

var abi = compiledContractDefinition['contracts']['Evaluating']['abi']
var bin = compiledContractDefinition['contracts']['Evaluating']['bin']

var CONTRACT = {}
var EVAL = {}

export function deploy() {
  CONTRACT.sk = ['74630864158414132400372319604350739231774566507245756677956990750359654259966',
    '67900115907498252346850307756897069698977682386429704205420628958859765193355',
    '19720977553990558267917791346075615728540318832669053623315771155109133052157',
    '14647062953526312158961893178195767418751187418616613150610320023841260061674',
    '74018910753344261945956914805110543626341595120980734065190627525431398726366'
  ]
  CONTRACT.evaluators = [
    '(13862765966455760429676531480437218611736529351820191364238014342416764253260,21369489617246658463897459160602004413578272288018719099289713537495965982215)',
    '(30431524049632433104932590227004997641935822287987311846070409886512825758980,16879201630014556046880441631046505523025828454951268510632544664534029279109)',
    '(108946621475463191386159840854579944881612205957152784895532428387205392814504,71579526329794413546491945691120662396697043778652529172241080830013965073969)',
    '(103269276882819609828657809210003044884656595036487064711995657849944086164701,90165429341984701191501794543092782999704688099553688879097907032539710845449)',
    '(102472367739113633667999569780283659349063339907142568622125810718643245580025,4526839927898216859591345276788004421075172896095157084597906898248703153673)'
  ]
  var evaluatingStartTime = 1524672000
  var evaluatingEndTime = 1526400000
  publish(CONTRACT.evaluators, evaluatingStartTime, evaluatingEndTime)
}

function publish(_publicKeys, _evaluatingStartTime, _evaluatingEndTime) {
  CONTRACT.publicKeys = _publicKeys.map(
    (item) => {
      return [
        new BN(item.toString().split(',')[0].substring(1)),
        new BN(item.toString().split(',')[1].slice(0, -1))
      ]
    }
  )
  CONTRACT.evaluatingStartTime = _evaluatingStartTime
  CONTRACT.evaluatingEndTime = _evaluatingEndTime
  var contractClass = new web3.eth.Contract(abi)
  contractClass.deploy({
    data: bin
  }).send({
    from,
    gas: 5200000
  }).then(
    (contract) => {
      console.log('contract deploy address: ' + contract.options.address)
      CONTRACT.address = contract.options.address
      CONTRACT.contract = contract
      finishSetup()
    }
  )
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

            generateSignAndPublish()
          }
        )
      } else {
        throw new Error('wrong parameters!')
      }
    }
  )
}

function generateSignAndPublish() {
  var y = CONTRACT.publicKeys.map(
    (item) => {
      return [
        BigInteger(item[0].toString()),
        BigInteger(item[1].toString())
      ]
    }
  )

  var M = {}
  M.evalChoice = '5555555555'
  M.evalComment = 'good'

  // signingKey = BigInteger(signingKey)
  // var [sign, pubKeys] = ringSign(CONTRACT.sk[1], M, y)

  y = y.map(
    (item) => {
      return new ecurve.Point(ecparams, item[0], item[1], BigInteger('1'))
    }
  )

  var sign = {}
  sign.c_0 = BigInteger('34926032507334916017510466312328717807435583612515375314059383587899971139953')
  sign.s = [
    BigInteger('27348332593281204869979234011718181959533461127042647383980803791783038364117'), BigInteger('70122275982324237707887690069589148623207916953991516893837139970721951232488'), BigInteger('75874780334753544891113407524235777312907415075251013581578509619176504941849'), BigInteger('21935743105777823270904665444728376263574302853953647354802416092291791159738'), BigInteger('82745594100480613817700103901086223755852317242762438152109854342952872670447')
  ]
  sign.link = new ecurve.Point(ecparams, BigInteger('44439236105815683735024927446229019065946100965458774417091667346620020190270'), BigInteger('88795170376509137610701965549647894633048008470575561166411530101756006404183'), BigInteger('1'))

  var MDigest = BigInteger.fromHex(web3Utils.soliditySha3(new BN(M.evalChoice.toString())).substring(2)).xor(
    BigInteger.fromHex(web3Utils.keccak256(M.evalComment).substring(2))
  )

  console.log(verifyRingSignature(MDigest, y, sign.c_0, sign.s, sign.link))

  publishEval(M, y, sign)
}

function publishEval(M, _pubKeys, sign) {
  EVAL.contract = CONTRACT.contract
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
  // console.log(EVAL.pubKeys.toString())
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

  EVAL.contract.methods.hashArray(
    EVAL.pubKeys
  ).call().then(
    (res) => {
      console.log(res)
    }
  )
  EVAL.contract.methods.Evaluate(
    EVAL.evalChoice,
    EVAL.evalComment,
    EVAL.pubKeys,
    EVAL.c_0,
    EVAL.s,
    EVAL.link
  ).call().then(
    (res) => {
      console.log(res)
      if (res) {
        EVAL.contract.methods.Evaluate(
          EVAL.evalChoice,
          EVAL.evalComment,
          EVAL.pubKeys,
          EVAL.c_0,
          EVAL.s,
          EVAL.link
        ).send(
          { from: from, gas: 9000000 }
        ).then(
          (res) => {
            console.log(res)
          }
        )
      } else {
        console.log('wrong signature')
      }
    }
  )
}

