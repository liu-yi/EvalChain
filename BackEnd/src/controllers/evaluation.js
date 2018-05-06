import xss from 'xss'
import evaluationHelper from '../dbhelper/evaluationHelper'

const secret = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let Post = async (ctx, next) => {
  let decoded = jwt.verify(token.substr(7), secret)
  if (decoded.userInfo) {
  var evaluation = ctx.request.body
  try {
    await deployEvaluation(evaluation)
    ctx.body = {
      success: true
    }
  } catch (e) {
    ctx.body = {
      success: false
    }
  }
}

export let Get = async (ctx, next) => {

}

// need deploy in the future
let deployEvaluation = async (evaluation) => {
  evaluationHelper.addEvaluation(evaluation)
}
