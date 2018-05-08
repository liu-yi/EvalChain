import Evaluation from '../models/evaluation'
import xss from 'xss'

var evaluationHelper = {}

evaluationHelper.findByAddress = async (address) => {
  var query = Evaluation.find({address})
  var res = null
  await query.exec(function (err, evaluation) {
    if (err) {
      res = {}
    } else {
      res = evaluation
    }
  })
  return res
}

evaluationHelper.findAllEvaluations = async () => {
  var query = Evaluation.find({})
  var res = []
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
    endTimeL: evaluation.endTime,
    isEnd: false,
    participants: evaluation.participants
  })
  evaluation = await evaluation.save()
  return evaluation
}

evaluationHelper.deleteEvaluation = async (evaluation) => {
  var flag = false
  await Evaluation.remove({evaluation}, function (err) {
    if (err) {
      flag = false
    } else {
      flag = true
    }
  })

  return flag
}

export default evaluationHelper
