import User from '../models/user'
import xss from 'xss'

var userHelper = {}

userHelper.findById = async (id) => {
  let user = await User.findOne({id})
  return user
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
    emailAddress: xss(user.id + '@mail.sustc.edu.cn'),
    pk: xss(user.pk),
    department: xss(user.department),
    role: 'user'
  })
  user = await user.save()
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

userHelper.canSignup = async (id) => {
  var flag = true
  var user = await User.find({id})
  if (user) {
    flag = false
  }
  return flag
}

export default userHelper
