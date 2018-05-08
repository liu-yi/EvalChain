// import xss from 'xss'
import userHelper from '../dbhelper/userHelper'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

export let Post = async (ctx, next) => {

}

export let Put = async (ctx, next) => {

}

export let Get = async (ctx, next) => {
  var token = ctx.query.token
  let id = jwt.verify(token, publicKey).id
  var user = await userHelper.findById(id)
  ctx.body = {
    code: 20000,
    data: {
      roles: user.role,
      name: user.name,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  }
}

export let Delete = async (ctx, next) => {

}
