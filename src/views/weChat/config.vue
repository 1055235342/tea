<template>
  <div class="config-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <iphone class="phone-template" :title="contentModel.list[0].theme_content"/>
        <!-- <img class="phone-template" :src="phoneImg"> -->
        <!-- <div class="back" id="contentHtml"></div> -->
      </el-col>
      <el-col :span="15" :offset="1">
        <el-form ref="form" :model="form" label-width="80px">
          <div v-for="(item, index) in contentModel['list']" :key="index">
            <el-form-item :label="item.theme_label">
              <el-input v-model="item.theme_content"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="onShow">预览</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Iphone from '@/components/Iphone'
  import Vue from 'vue'
  import phone from '@/assets/phone.png'
  import { getTheme } from '@/api/theme'
  export default {
    name: 'weChat',
    components: {
      Iphone,
    },
    data() {
      return {
        form: null,
        contentModel: '',
        contentHtml: '',
        phoneImg: phone,
        iphoneTitle: '',
      }
    },
    created() {},
    mounted() {
      this.loadHtml()
    },
    methods: {
      onShow() {
        this.$router.push('/activeTheme/show')
      },
      loadHtml() {
        this.timeTip = []
        getTheme(1).then(resp => {
          this.contentHtml = resp.data.html
          this.loadStyle(resp.data.link)
          var html = '<div id="contentHtml" class="back">' + resp.data.html + '</div>'
          var content = Vue.extend({
            template: html,
            data: function() {
              return resp.data.parameter
            }
          })
          this.contentModel = new content().$mount('#contentHtml')
          this.form = this.contentModel
          this.iphoneTitle = this.contentModel.list[0].theme_content
        })
        //console.log(this.timeTip)
      },
      //动态加载css
      loadStyle(url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url; //css链接
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
      }
    },
  }
</script>
<style lang="scss">
  .phone-template {
    z-index: 1000;
  }
  .back {
    z-index: 999;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
