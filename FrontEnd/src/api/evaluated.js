import request from '@/utils/request'

export function getEvaluation(address) {
  return request({
    url: '/api/evaluation/' + address,
    method: 'get'
  })
}
