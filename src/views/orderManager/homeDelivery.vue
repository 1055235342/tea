<template>
  <div>
    <el-tabs class="tabNav" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="tabNav_value" :key="item.value" v-for="item in tabNav" :label="item.label" :name="item.value"/>
    </el-tabs>
    <el-card class="box-card">
      搜索
    </el-card>
    <el-card class="box-card table-title">
      <el-row class="title">
        <el-col :span="8">商品信息</el-col>
        <el-col :span="3">单价</el-col>
        <el-col :span="3">数量</el-col>
        <el-col :span="3">买家信息</el-col>
        <el-col :span="3">实收款</el-col>
        <el-col :span="4">操作</el-col>
      </el-row>
    </el-card>
    <div>
      <el-card class="box-card table-title">
        <el-row class="title_header">
          <el-col :span="8">
            <el-row class="title_baseInfo">
              <el-col :span="24">
                <el-row style="padding: 5px 15px;">
                  <el-col :span="8">订单号：123456789</el-col>
                  <el-col :span="8">订单类型：普通订单</el-col>
                  <el-col :span="8">创建时间：2022-2-2 15:04</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="leftInfo">
            <el-row>
              <el-col :span="2">
                <el-checkbox v-model="checked" class="checkBox"></el-checkbox>
              </el-col>
              <el-col :span="3">
                <img src="https://img.zcool.cn/community/017d745b582e6fa801206a3563ec20.jpeg@80w_80h_1c_1e_1o_100sh.jpg" width="50" height="50"/>
              </el-col>
              <el-col :span="14">
                <p>红茶</p>
                <p>红茶+绿茶</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <p>19.9</p>
          </el-col>
          <el-col :span="3">
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>幸福的人</p>
            <p>19689797978</p>
          </el-col>
          <el-col :span="3">
            <p>￥19.9</p>
            <p>含运费：12.00</p>
          </el-col>
          <el-col :span="4">
            <p>详情</p>
            <el-button type="primary">发货</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card table-title">
        <el-row class="title_header">
          <el-col :span="8">
            <el-row class="title_baseInfo">
              <el-col :span="24">
                <el-row style="padding: 5px 15px;">
                  <el-col :span="8">订单号：123456789</el-col>
                  <el-col :span="8">订单类型：普通订单</el-col>
                  <el-col :span="8">创建时间：2022-2-2 15:04</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="leftInfo">
            <el-row>
              <el-col :span="2">
                <el-checkbox v-model="checked" class="checkBox"></el-checkbox>
              </el-col>
              <el-col :span="3">
                <img src="https://img.zcool.cn/community/017d745b582e6fa801206a3563ec20.jpeg@80w_80h_1c_1e_1o_100sh.jpg" width="50" height="50"/>
              </el-col>
              <el-col :span="14">
                <p>红茶</p>
                <p>红茶+绿茶</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <p>19.9</p>
          </el-col>
          <el-col :span="3">
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>幸福的人</p>
            <p>19689797978</p>
          </el-col>
          <el-col :span="3">
            <p>￥19.9</p>
            <p>含运费：12.00</p>
          </el-col>
          <el-col :span="4">
            <p>详情</p>
            <el-button type="primary">发货</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card table-title">
        <el-row class="title_header">
          <el-col :span="8">
            <el-row class="title_baseInfo">
              <el-col :span="24">
                <el-row style="padding: 5px 15px;">
                  <el-col :span="8">订单号：123456789</el-col>
                  <el-col :span="8">订单类型：普通订单</el-col>
                  <el-col :span="8">创建时间：2022-2-2 15:04</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="leftInfo">
            <el-row>
              <el-col :span="2">
                <el-checkbox v-model="checked" class="checkBox"></el-checkbox>
              </el-col>
              <el-col :span="3">
                <img src="https://img.zcool.cn/community/017d745b582e6fa801206a3563ec20.jpeg@80w_80h_1c_1e_1o_100sh.jpg" width="50" height="50"/>
              </el-col>
              <el-col :span="14">
                <p>红茶</p>
                <p>红茶+绿茶</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <p>19.9</p>
          </el-col>
          <el-col :span="3">
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>幸福的人</p>
            <p>19689797978</p>
          </el-col>
          <el-col :span="3">
            <p>￥19.9</p>
            <p>含运费：12.00</p>
          </el-col>
          <el-col :span="4">
            <p>详情</p>
            <el-button type="primary">发货</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card table-title">
        <el-row class="title_header">
          <el-col :span="8">
            <el-row class="title_baseInfo">
              <el-col :span="24">
                <el-row style="padding: 5px 15px;">
                  <el-col :span="8">订单号：123456789</el-col>
                  <el-col :span="8">订单类型：普通订单</el-col>
                  <el-col :span="8">创建时间：2022-2-2 15:04</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="leftInfo">
            <el-row>
              <el-col :span="2">
                <el-checkbox v-model="checked" class="checkBox"></el-checkbox>
              </el-col>
              <el-col :span="3">
                <img src="https://img.zcool.cn/community/017d745b582e6fa801206a3563ec20.jpeg@80w_80h_1c_1e_1o_100sh.jpg" width="50" height="50"/>
              </el-col>
              <el-col :span="14">
                <p>红茶</p>
                <p>红茶+绿茶</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <p>19.9</p>
          </el-col>
          <el-col :span="3">
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>幸福的人</p>
            <p>19689797978</p>
          </el-col>
          <el-col :span="3">
            <p>￥19.9</p>
            <p>含运费：12.00</p>
          </el-col>
          <el-col :span="4">
            <p>详情</p>
            <el-button type="primary">发货</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card table-title">
        <el-row class="title_header">
          <el-col :span="8">
            <el-row class="title_baseInfo">
              <el-col :span="24">
                <el-row style="padding: 5px 15px;">
                  <el-col :span="8">订单号：123456789</el-col>
                  <el-col :span="8">订单类型：普通订单</el-col>
                  <el-col :span="8">创建时间：2022-2-2 15:04</el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" class="leftInfo">
            <el-row>
              <el-col :span="2">
                <el-checkbox v-model="checked" class="checkBox"></el-checkbox>
              </el-col>
              <el-col :span="3">
                <img src="https://img.zcool.cn/community/017d745b582e6fa801206a3563ec20.jpeg@80w_80h_1c_1e_1o_100sh.jpg" width="50" height="50"/>
              </el-col>
              <el-col :span="14">
                <p>红茶</p>
                <p>红茶+绿茶</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="3">
            <p>19.9</p>
          </el-col>
          <el-col :span="3">
            <p>1</p>
          </el-col>
          <el-col :span="3">
            <p>幸福的人</p>
            <p>19689797978</p>
          </el-col>
          <el-col :span="3">
            <p>￥19.9</p>
            <p>含运费：12.00</p>
          </el-col>
          <el-col :span="4">
            <p>详情</p>
            <el-button type="primary">发货</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'homeDelivery',
    data() {
      return { 
        tabNav: [
          {
            value: '1',
            label: '待付款'
          },
          {
            value: '2',
            label: '等待发货'
          },
          {
            value: '3',
            label: '已发货'
          },
          {
            value: '4',
            label: '已完成'
          },
          {
            value: '5',
            label: '已关闭'
          },
        ],
        activeName: '1'
      }
    },
    created() {},
    mounted() {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  }
</script>
<style lang="scss">
  .app-main-container {
    background: #f4f6f7 !important;
  }
  .tabNav {
    display: inline-block;
    .tabNav_value {
    }
  }
  .table-title {
    text-align: center;
    .title_header{
      background: #fafafa;
    }
    .title_baseInfo{
      text-align: left;
      color: #919191;
      font-size: 12px;
      padding: 4px 10px;
    }
    .el-card__body{
      padding: 0;
    }
    .title{
      padding: 20px;
    }
    .leftInfo{
      text-align: left;
      .checkBox{
        margin: 24px 30px;
      }
      img{
        margin: 10px;
      }
    }
  }
</style>