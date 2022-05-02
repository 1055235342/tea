const { mock } = require('mockjs')
const { handleRandomImage } = require('../utils')

const List = []
const count = 100
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      title: '龙井茶',
      price: '399.90',
      type: '普通商品',
      category: '居家-出现-红茶',
      inventory: '320',
      sales: '39',
      shipping: '杭州十里坡有限公司',
      pageViews: '@integer(300, 5000)',
      img: handleRandomImage(200, 200),
      smallImg: handleRandomImage(40, 40),
      switch: '@boolean',
      percent: '@integer(80,99)',
    })
  )
}

module.exports = [
  {
    url: '/table/getList',
    type: 'post',
    response(config) {
      if (!config.body) {
        return {
          code: 200,
          msg: 'success',
          totalCount: count,
          data: mock({
            'data|50': [
              {
                id: '@id',
                title: '@csentence(1, 2)',
                'status|1': ['published', 'draft', 'deleted'],
                author: '@cname',
                datetime: '@datetime',
                pageViews: '@integer(300, 5000)',
                img: handleRandomImage(200, 200),
                smallImg: handleRandomImage(40, 40),
                switch: '@boolean',
                percent: '@integer(80,99)',
              },
            ],
          }).data,
        }
      }
      const { title = '', pageNo = 1, pageSize = 20 } = config.body
      let mockList = List.filter((item) => {
        return !(title && item.title.indexOf(title) < 0)
      })
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        totalCount: count,
        data: pageList,
      }
    },
  },
  {
    url: '/table/doEdit',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/table/doDelete',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
