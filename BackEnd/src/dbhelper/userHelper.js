import User from '../models/user'
import xss from 'xss'

var userHelper = {}

userHelper.findById = async (id) => {
  var query = User.find({id})
  var res = null
  await query.exec(function (err, user) {
    if (err) {
      res = {}
    } else {
      res = user
    }
  })
  return res
}

userHelper.findAllUser = async () => {
  var query = User.find({})
  var res = []
  await query.exec(function (err, users) {
    if (err) {
      res = []
    } else {
      res = users
    }
  })
  return res
}

userHelper.addUser = async (user) => {
  user = new User({
    id: xss(user.id),
    name: xss(user.name),
    emailAddress: xss(user.emailAddress),
    pk: xss(user.pk),
    password: user.password,
    department: xss(user.department),
    role: 'user'
  })
  user = await user.save()
  return user
}

userHelper.deleteUser = async (id) => {
  var flag = false
  await User.remove({id}, function (err) {
    if (err) {
      flag = false
    } else {
      flag = true
    }
  })
  return flag
}

userHelper.findForLogin = async (loginInfo) => {
  var user = await User.findOne({
    id: loginInfo.id,
    password: loginInfo.password
  })
  return user
}

userHelper.canSignup = async (id) => {
  var flag = true
  var user = await User.find({id})
  if (user) {
    flag = false
  }
  return flag
}

export default userHelper
