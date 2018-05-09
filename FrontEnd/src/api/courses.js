import request from '@/utils/request'

export function getCourses(isEnd) {
  return request({
    url: '/api/evaluations/',
    method: 'get',
    params: { isEnd }
  })
}
