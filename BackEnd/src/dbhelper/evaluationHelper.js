import Evaluation from '../models/evaluation'
import xss from 'xss'

let evaluationHelper = {}

evaluationHelper.findByAddress = async (address) => {
  let evaluation = await Evaluation.findOne({address})
  return evaluation
}

evaluationHelper.findAllEvaluations = async () => {
  let query = Evaluation.find({})
  let res = []
  await query.exec(function (err, evaluations) {
    if (err) {
      res = []
    } else {
      res = evaluations
    }
  })
  return res
}

evaluationHelper.addEvaluation = async (evaluation) => {
  evaluation = new Evaluation({
    address: xss(evaluation.address),
    name: xss(evaluation.name),
    instructor: xss(evaluation.instructor),
    avatar: xss(evaluation.avatar),
    startTime: evaluation.startTime,
    endTime: evaluation.endTime,
    isEnd: Date.now() > evaluation.endTime,
    pkSet: evaluation.pkSet,
    idSet: evaluation.idSet
  })
  evaluation = await evaluation.save()
  return evaluation
}

evaluationHelper.deleteEvaluation = async (evaluation) => {
  let flag = false
  await Evaluation.remove({evaluation}, function (err) {
    if (err) {
      flag = false
    } else {
      flag = true
    }
  })

  return flag
}

evaluationHelper.setEnd = async (address) => {
  await Evaluation.update({address}, {
    $set: {
      isEnd: true
    }
  })
}

export default evaluationHelper
