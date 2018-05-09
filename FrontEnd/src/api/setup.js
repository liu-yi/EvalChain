import request from '@/utils/request'

export function setup(evaluation) {
  return request({
    url: '/api/evaluations/',
    method: 'post',
    data: evaluation
  })
}

export function getAll() {
  return request({
    url: '/api/users',
    method: 'get'
  })
}
