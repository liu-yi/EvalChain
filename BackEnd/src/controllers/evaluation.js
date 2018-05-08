import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import xss from 'xss'
import evaluationHelper from '../dbhelper/evaluationHelper'

const secret = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let Post = async (ctx, next) => {
  let token = ctx.request.header.authorization
  let userToken = await jwt.verify(token.substr(7), secret)
  if (userToken.userRole === 'admin') {
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
  } else {
    ctx.body = {
      success: false
    }
  }
}

export let Get = async (ctx, next) => {
  var address = xss(ctx.params.address)
  var evaluation = evaluationHelper.findByAddress(address)
  ctx.body = evaluation
}

// need deploy in the future
let deployEvaluation = async (evaluation) => {
  evaluationHelper.addEvaluation(evaluation)
}
