import request from '@/utils/request'

export function getTheme(data) {
  return request({
    url: '/theme/'+data,
    method: 'get',
    data,
  })
}
