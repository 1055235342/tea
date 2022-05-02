const data = {
  html: '<section class="aui-flexView">' +
  '<section class="aui-scrollView">' +
  '<div class="aui-invitation-head">' +
  '<img src="http://v.bootstrapmb.com/2019/4/h6jkf3865/images/head.jpg" class="aui-invitation-ad" alt="">' +
  '</div>' +
  '<div class="aui-invitation-content"><div class="aui-invitation-item"><div class="aui-invitation-title">' +
  '<h2>{{ list[2].theme_content }}</h2></div><div class="aui-coupon-body"><h2>{{ list[1].theme_content }}<em>元</em></h2></div><div class="aui-coupon-text"><p>{{ list[5].theme_content }}</p><span>{{ list[6].theme_content }}</span>' +
  '</div></div><div class="aui-invitation-item"><div class="aui-invitation-title"><h2>{{ list[3].theme_content }}</h2></div><div class="aui-coin-img"><img src="http://v.bootstrapmb.com/2019/4/h6jkf3865/images/coin.png" alt="">' +
  '</div><div class="aui-coupon-text"><p>{{ list[7].theme_content }}</p><span>{{ list[8].theme_content}}</span></div></div><div class="aui-invitation-item">' +
  '<div class="aui-invitation-title"><h2>{{ list[4].theme_content }}</h2></div><div class="aui-coupon-text aui-coupon-text-top"><p>{{ list[9].theme_content }}</p>' +
  '</div><div class="aui-invitation-table"><table id="jqueryTable"><tbody><tr><th>邀请阶梯</th><th>累计奖励订单</th></tr><tr><td>邀请1人</td><td>1个订单</td></tr><tr><td>邀请2人</td>' +
  '<td>3个订单</td></tr><tr><td>邀请5人</td><td>5个订单</td></tr><tr><td>邀请6人</td><td>6个订单</td></tr><tr><td>邀请8人</td><td>8个订单</td></tr><tr><td>邀请9人</td><td>9个订单</td></tr>' +
  '<tr><td>邀请12人</td><td>12个订单</td></tr><tr><td>邀请14人</td><td>14个订单</td></tr><tr><td>邀请15人</td><td>15个订单</td></tr><tr><td>邀请22人</td><td>22个订单</td></tr></tbody>' +
  '</table></div></div></div></section>' +
  '<footer class="aui-footer aui-footer-fixed"><a href="javascript:;" class="aui-tabBar-item">' +
  '<span class="aui-tabBar-item-text">{{ list[10].theme_content }}</span></a></footer></section>',
  link: 'static/css/theme1.css',
  parameter: {
    list: [
      {
        theme_label: '主题',
        theme_content: '车辆赔偿',
        theme_type: 'text',
      },
      {
        theme_label: '最高返现',
        theme_content: '666',
        theme_type: 'int',
      },
      {
        theme_label: '标题1',
        theme_content: 'NO.1 重礼',
        theme_type: 'text',
      },
      {
        theme_label: '标题2',
        theme_content: 'NO.2 重礼',
        theme_type: 'text',
      },
      {
        theme_label: '标题3',
        theme_content: 'NO.3 重礼',
        theme_type: 'text',
      },
      {
        theme_label: '内容',
        theme_content: '徒弟用户送实时运费劵，首次使用',
        theme_type: 'text',
      },
      {
        theme_label: '内容',
        theme_content: '最高返现888元',
        theme_type: 'text',
      },
      {
        theme_label: '内容',
        theme_content: '徒弟可为每位师傅提供',
        theme_type: 'text',
      },
      {
        theme_label: '内容',
        theme_content: '10元的现金红包',
        theme_type: 'text',
      },
      {
        theme_label: '内容',
        theme_content: '成功邀请好友注册认证信贷款的用户，您可以获得现金红包888元(奖励)',
        theme_type: 'text',
      },
      {
        theme_label: '按钮',
        theme_content: '立即抢购（¥49.90）',
        theme_type: 'text',
      },
    ],
  }
}

module.exports = [
  {
    url: '/theme/1',
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
