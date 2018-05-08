import xss from 'xss'
// import mongoose from 'mongoose'
// import uuid from 'uuid'
import userHelper from '../dbhelper/userHelper'
// import User from '../models/user'
// var User = mongoose.model('user')

export let Post = async (ctx, next) => {

}

export let Put = async (ctx, next) => {

}

export let Get = async (ctx, next) => {
  var id = xss(ctx.params.id)
  var user = userHelper.findById(id)
  ctx.body = user
}

export let Delete = async (ctx, next) => {

}
