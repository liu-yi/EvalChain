import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import xss from 'xss'
import evaluationHelper from '../dbhelper/evaluationHelper'
import userHelper from '../dbhelper/userHelper'

const secret = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let Post = async (ctx, next) => {
  if (ctx.params.address === undefined) {
    await deploy(ctx)
    next()
  } else {
    await postComment(ctx)
    next()
  }
}

let postComment = async (ctx) => {
  let comment = ctx.request.body.comment
  let address = ctx.request.body.address
  // ctx.body = {
  //   code: 20000,
  //   success: true
  // }
  try {
    await evaluationHelper.addComment(address, comment)
    ctx.body = {
      code: 20000,
      success: true
    }
  } catch (e) {
    ctx.body = {
      success: false,
      message: 'fail to add comment'
    }
  }
}

let deploy = async (ctx) => {
  let token = ctx.request.header.authorization
  let userToken = await jwt.verify(token.substr(7), secret)
  console.log(userToken)
  if (userToken.role === 'admin') {
    let evaluation = ctx.request.body
    try {
      await deployEvaluation(evaluation)
      ctx.body = {
        code: 20000,
        success: true
      }
    } catch (e) {
      ctx.body = {
        success: false,
        message: 'deploy contract fail'
      }
    }
  } else {
    ctx.body = {
      success: false,
      message: 'Users cannot deploy contract'
    }
  }
}

// need deploy in the future
let deployEvaluation = async (evaluation) => {
  evaluationHelper.addEvaluation(evaluation)
  for (let i = 0; i < evaluation.idSet.length; i++) {
    console.log(evaluation.idSet[i])
    userHelper.addEvaluation(evaluation.idSet[i], evaluation.address)
  }
}

export let Get = async (ctx, next) => {
  if (ctx.query.isEnd === 'false') {
    await GetForUser(ctx, false)
    next()
  } else if (ctx.query.isEnd === 'true') {
    await GetForUser(ctx, true)
    next()
  } else {
    let address = xss(ctx.params.address)
    let evaluation = await evaluationHelper.findByAddress(address)
    ctx.body = {
      code: 20000,
      data: evaluation
    }
    next()
  }
}

let GetForUser = async (ctx, isEnd) => {
  let token = ctx.request.header.authorization
  let userToken = await jwt.verify(token.substr(7), secret)
  let id = userToken.id
  let user = await userHelper.findById(id)
  let address = user.evaluations
  console.log(address)
  let evaluations = []
  for (let i = 0; i < address.length; i++) {
    let evaluation = await evaluationHelper.findByAddress(address[i])
    if (!evaluation.isEnd && evaluation.endTime < new Date()) {
      await evaluationHelper.setEnd(address[i])
      evaluation.isEnd = true
    }
    if (isEnd && evaluation.isEnd) {
      evaluations.push(
        {
          address: evaluation.address,
          name: evaluation.name,
          instructor: evaluation.instructor,
          avatar: evaluation.avatar,
          startTime: evaluation.startTime,
          endTime: evaluation.endTime,
          pic: evaluation.pic
        }
      )
    } else if (!isEnd && !evaluation.isEnd) {
      evaluations.push(
        {
          address: evaluation.address,
          name: evaluation.name,
          instructor: evaluation.instructor,
          avatar: evaluation.avatar,
          startTime: evaluation.startTime,
          endTime: evaluation.endTime,
          pic: evaluation.pic
        }
      )
    }
  }
  ctx.body = {
    code: 20000,
    data: evaluations
  }
}
