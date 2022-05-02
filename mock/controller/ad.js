const data = [
  {
    title: '这个目前是学习阶段',
    url: 'https://www.baidu.com',
  },
  {
    title: '这个目前是学习阶段123123123',
    url: 'https://www.baidu.com',
  },
]
module.exports = [
  {
    url: '/ad/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
]
