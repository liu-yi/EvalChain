import loginHelper from '../dbhelper/loginHelper'
import userHelper from '../dbhelper/userHelper'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import xss from 'xss'

const secret = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let Login = async (ctx, next) => {
  var username = xss(ctx.request.body.username.trim())
  var password = ctx.request.body.password
  const loginInfo = {
    id: username,
    password
  }
  console.log(loginInfo)
  let user = await loginHelper.findForLogin(loginInfo)
  if (user) {
    let userToken = {
      id: user.id,
      role: user.role
    }
    const token = jwt.sign(userToken, secret, {expiresIn: '1h'})
    ctx.body = {
      message: 'get token successfully',
      code: 20000,
      data: {
        token
      }
    }
  } else {
    ctx.body = {
      message: 'wrong login information',
      code: -1
    }
  }
}

export let Signup = async (ctx, next) => {
  var id = xss(ctx.request.body.id.trim())
  console.log(ctx.request.body)
  var canSignup = await loginHelper.canSignup(id)
  if (canSignup) {
    var user = ctx.request.body
    try {
      await loginHelper.addUser(user)
      await userHelper.addUser(user)
      ctx.body = {
        code: 20000,
        success: true
      }
    } catch (e) {
      ctx.body = {
        success: false,
        message: 'Database wrong in signup phase'
      }
    }
  } else {
    ctx.body = {
      success: false,
      message: 'The id is existed'
    }
  }
}
