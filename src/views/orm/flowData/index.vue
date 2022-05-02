<template>
  <div class="flow-container">
    <FactoryDrawFlow
      @clickNode="clickNode"
      ref="flow"
      :FlowConfig="FlowConfig"
    ></FactoryDrawFlow>
  </div>
</template>

<script>
  export default {
    name: 'Pay',
    data() {
      return {
        node: null,
        FlowConfig: [
          {
            id: "root",
            groupId: null,
            type: "1",
            title: "所有人",
            content: "请选择",
            isRow: true,
            isRoot: true,
            data: {}
          }
        ]
      }
    },
    created() {
      // this.init();
    },
    methods: {
      getData() {
        console.log('getData')
        console.log(this.$refs.flow);
        let res = this.$refs.flow.getResData();
        console.log("这是返回的一维数组", res);
      },
      nodeChange() {
        console.log('nodeChange')
        this.node.content = "nihao";
        console.log(this.node);
        this.$refs.flow.nodeChange(this.node);
      },
      /**
       * 1、创建一个row length 1
       * 2、创建一个col节点
       * 3、创建一组col length 1
       * return [{pid id type}]
       */
      getNodeArr() {
        console.log('getNodeArr')
        this.FlowConfig = this.$refs.flow.getNodeArr();
        return this.FlowConfig;
      },
      // init() {
      //   setTimeout(() => {
      //     //this.FlowConfig = arr;
      //     this.$forceUpdate();
      //   }, 1000);
      //   // this.FlowConfig = this.transform(this.FlowConfig);
      // },
      clickNode(node) {
        console.log('clickNode')
        this.node = node;
        console.log("当前点击节点", node);
      }
    }
  }
</script>
<style lang="scss" scoped>
  #drawProcessDesign {
    background: #f0f2f5;
  }
</style>