import request from '@/utils/request'

export function login(id, password) {
  return request({
    url: '/public/login',
    method: 'post',
    data: {
      id,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
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
