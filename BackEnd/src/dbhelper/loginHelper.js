import Login from '../models/login'
import xss from 'xss'

var loginHelper = {}

loginHelper.findForLogin = async (loginInfo) => {
  let user = await Login.findOne({
    id: loginInfo.id,
    password: loginInfo.password
  })
  return user
}

loginHelper.canSignup = async (id) => {
  let flag = true
  let user = await Login.findOne({id})
  if (user) {
    flag = false
  }
  return flag
}

loginHelper.addUser = async (user) => {
  user = new Login({
    id: xss(user.id),
    password: user.password,
    pk: user.pk,
    role: 'user'
  })
  user = await user.save()
}

export default loginHelper
