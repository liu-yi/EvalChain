import request from '@/utils/request'

export function getEvaluation(address) {
  return request({
    url: '/api/evaluations/' + address,
    method: 'get'
  })
}

export function postComment(address, comment) {
  return request({
    url: '/api/evaluations/' + address,
    method: 'post',
    data: {
      address,
      comment
    }
  })
}

