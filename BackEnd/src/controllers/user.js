// import xss from 'xss'
import userHelper from '../dbhelper/userHelper'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import loginHelper from '../dbhelper/loginHelper'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let Post = async (ctx, next) => {

}

export let Put = async (ctx, next) => {

}

export let Get = async (ctx, next) => {
  if (ctx.query.token) {
    await GetInfo(ctx)
    next()
  } else if (ctx.params.id === undefined) {
    await GetAll(ctx)
    next()
  } else {
    await GetOne(ctx)
    next()
  }
}

export let Delete = async (ctx, next) => {

}

let GetOne = async (ctx) => {
  let id = ctx.params.id
  let user = await userHelper.findById(id)
  ctx.body = {
    code: 20000,
    data: user
  }
}

let GetAll = async (ctx) => {
  let users = await userHelper.findAllUser()
  ctx.body = {
    code: 20000,
    data: users
  }
}

let GetInfo = async (ctx) => {
  let token = ctx.query.token
  let id = jwt.verify(token, publicKey).id
  let user = await userHelper.findById(id)
  let sk = await loginHelper.findForSk(id)
  ctx.body = {
    code: 20000,
    data: {
      roles: user.role,
      name: user.name,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      sk
    }
  }
}
