import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/public/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function signup(data) {
  return request({
    url: '/public/signup',
    method: 'post',
    data: data
  })
}
