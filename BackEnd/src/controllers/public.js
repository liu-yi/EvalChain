import userHelper from '../dbhelper/userHelper'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import xss from 'xss'

const secret = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let Login = (ctx, next) => {
  var id = xss(ctx.request.body.id.trim())
  var password = ctx.request.body.password
  const loginInfo = {
    id,
    password
  }
  let user = userHelper.findForLogin(loginInfo)
  if (user) {
    let userToken = {
      id: user.id,
      role: user.role
    }
    const token = jwt.sign(userToken, secret, {expireIn: '1h'})
    ctx.body = {
      message: 'get token successfully',
      code: 1,
      token
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
  var canSignup = await userHelper.isExisted(id)
  if (canSignup) {
    var user = ctx.request.body
    try {
      userHelper.addUser(user)
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
