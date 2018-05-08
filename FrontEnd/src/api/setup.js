import request from '@/utils/request'

export function setup(evaluation) {
  return request({
    url: '/api/evaluation/',
    method: 'post',
    data: evaluation
  })
}
