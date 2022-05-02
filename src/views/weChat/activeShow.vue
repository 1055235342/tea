<template>
  <div class="config-container">
    <div id="contentHtml"></div>
  </div>
</template>
<script>
  import { getTheme } from '@/api/theme'
  import Vue from 'vue'
  export default {
    name: 'WeChat',
    data() {
      return {
        form: null,
        contentModel: null,
        contentHtml: '',
        headerTitle: '',
      }
    },
    metaInfo() {
      return {
        title: this.headerTitle,
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=2,user-scalable=yes' }
        ]
      }
    },
    created() {
      this.loadHtml()
    },
    mounted() {
      
    },
    methods: {
      loadHtml() {
        this.timeTip = []
        getTheme(1).then(resp => {
          this.loadStyle(resp.data.link)
          var html = '<div id="contentHtml" class="back">' + resp.data.html + '</div>'
          var content = Vue.extend({
            template: html,
            data: function() {
              return resp.data.parameter
            }
          })
          this.contentModel = new content().$mount('#contentHtml')
          this.headerTitle = this.contentModel.list[0].theme_content
        })
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
</style>
