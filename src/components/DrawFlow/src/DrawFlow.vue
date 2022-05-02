<!--
* @author 肖阳
* @time 2020-9-10
* @dec 生成流程绘制 基本节点(审批 抄送)组装逻辑
*  组装
-->
<script>
import AddNodeBtn from "@/components/DrawFlow/src/components/AddNodeBtn";
import RowFactory from "@/components/DrawFlow/src/components/DrawRow/FactoryRow";
// import EventBus from "@/components/ApprovalProcess/ProcessDesign/components/EventBus/EventBus";

import {
  RowNode,
  ConditionNode,
  CopyNode
} from "./components/NodeConfigFactory/NodeFactory";
// import { deepClone } from "@/common/utils";
import FlowFactory from "./components/factory";
import { HashCode, transToTreeDat } from "./utils";
import FlowNode from "@/components/DrawFlow/src/components/DrawRow/FlowNode";
export default {
  name: "FactoryDrawFlow",
  components: {
    AddNodeBtn,
    FlowNode
  },
  created() {
    this.init();
    // this.creatBusNodeChange();  // 可用事件派发
  },
  props: {
    FlowConfig: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    FlowConfig: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  data() {
    return {
      rectTypeDic: {
        1: "审批节点",
        2: "规则节点",
        3: "抄送人",
        4: "开始节点"
      },
      isColList: ["3", "5"],
      selfConfig: null,
      currentNode: null,
      //缓存数据
      cacheData: null
    };
  },
  methods: {
    // 节点数据变化事件
    nodeChange(node) {
      this.currentNode.title = node.title;
      this.currentNode.content = node.content;
      this.selfConfig.forEach(i => {
        if (i.id === this.currentNode.id) {
          i.data = node.data;
          i.content = node.content;
          i.title = node.title;
        }
      });
      this.$forceUpdate();
    },
    /**
     * 添加条件框
     */
    addBranch(node) {
      let newNode = new CopyNode(node[0]);
      this.selfConfig = this.selfConfig.concat([newNode]);
    },
    creatBusNodeChange() {
      // EventBus.$on("nodeChange", this.nodeChange);
    },
    /**
     * 获取传参数据结构
     */
    getResData() {
      let list = JSON.parse(JSON.stringify(this.selfConfig));
      this.transformTree(list);
      list.forEach(i => {
        if (i.isRow) {
          delete i.childNode;
        }
      });
      return list;
    },
    /**
     * 初始化 数据私有化
     */
    init() {
      this.selfConfig = JSON.parse(JSON.stringify(this.FlowConfig));
    },
    /**
     *  @param data  源数组一维数组
     *  @requires  tree 二维数组
     */
    transformTree(data) {
      return transToTreeDat(data);
    },
    clickSelectBox(nextNode) {
      let { node, selfConfig } = this.getNodeFactory(nextNode);
      console.log(node, nextNode);
      this.selfConfig = selfConfig.concat(node);
    },
    /**
     * 根据isRow去判断row或者rol
     */
    getNodeFactory(nextNode) {
      if (!nextNode.isRow) {
        let { node, selfConfig } = this.getColNode(nextNode);
        return { node, selfConfig };
      } else {
        let { node, selfConfig } = this.getRowNode(nextNode);
        return { node, selfConfig };
      }
    },
    /**
     * 获取row节点
     */
    getRowNode(nextNode) {
      let node = [new RowNode(nextNode)];
      let selfConfig = this.repickArr(node[0]);
      // this.clickNode(node[0]);
      return { node, selfConfig };
    },
    /**
     * 获取col节点
     */
    getColNode(nextNode) {
      let groupId = HashCode();
      let node = [
        new ConditionNode({ groupId, ...nextNode }),
        new ConditionNode({ groupId, ...nextNode })
      ];
      let repickConfig = {
        groupId: node[0].groupPid,
        id: node[0].id
      };
      let selfConfig = this.repickArr(repickConfig);
      this.locationScroll();
      return { node, selfConfig };
    },
    /**
     * 定位滚动条
     */
    locationScroll() {
      // window.location.hash = ".bottom-right-cover-line";
      let el = document.getElementsByClassName("dingflow-design")[0];
      setTimeout(() => {
        el.scrollLeft = el.scrollWidth - el.clientWidth + 340;
      }, 0);
    },
    /**
     * 重定位数组
     */
    repickArr(repickConfig) {
      let selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
      selfConfig.forEach(i => {
        if (i.isRow) {
          if (i.groupId === repickConfig.groupId) {
            i.groupId = repickConfig.id;
          }
        } else {
          if (i.groupPid === repickConfig.groupId) {
            i.groupPid = repickConfig.id;
          }
        }
      });
      return selfConfig;
    },
    // 点击节点
    clickNode(nodeConfig) {
      this.currentNode = nodeConfig;
      this.$emit("clickNode", nodeConfig);
    },
    //点击关闭节点
    closeNode(node) {
      let repickConfig = {};
      if (node.isRow) {
        repickConfig.groupId = node.groupId;
        repickConfig.id = node.id;
        let selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
        console.log("selfConfigselfConfigselfConfig", selfConfig);
        this.selfConfig = this.deleteNode(selfConfig, node);
        this.repickDeleteArr(repickConfig);
      } else {
        this.deleteColNode(node);
      }
    },
    // 删除节点
    deleteNode(selfConfig, node) {
      selfConfig = selfConfig.map(i => i.id !== node.id && i).filter(Boolean);
      return selfConfig;
    },
    //单独删除col下node
    deleteColNode(node) {
      let selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
      let nodeArr = selfConfig.filter(
        i => i.groupId === node.groupId && !i.isRow
      );
      let deleteArr = [];
      let repickConfig;
      if (nodeArr.length > 2) {
        //递归删除所有关联子节点
        deleteArr = [node];
        this.deleteLoop(selfConfig, node, deleteArr);
        repickConfig = {
          id: node.id,
          groupId: node.groupId
        };
      } else {
        //删除整个group
        let allCol = selfConfig
          .map(i => i.groupId === node.groupId && !i.isRow && i)
          .filter(Boolean);
        deleteArr = allCol;
        allCol.forEach(i => {
          this.deleteLoop(selfConfig, i, deleteArr);
        });
        repickConfig = {
          id: node.groupId,
          groupId: node.groupPid
        };
      }
      deleteArr.forEach(i => {
        selfConfig = this.deleteNode(selfConfig, i);
      });
      this.selfConfig = selfConfig;
      this.repickDeleteArr(repickConfig);
      return selfConfig;
    },
    // 循环遍历删除组下关联节点
    deleteLoop(selfConfig, node, deleteArr) {
      console.log(selfConfig, node, "selfConfig");
      let currentDeleteArr = selfConfig.filter(i => {
        if (i.isRow) {
          return i.groupId === node.id;
        } else {
          return i.groupPid === node.id;
        }
      });
      if (currentDeleteArr.length) {
        currentDeleteArr.forEach(i => {
          deleteArr.push(i);
          this.deleteLoop(selfConfig, i, deleteArr);
        });
      } else {
        return;
      }
    },
    //判断是否是row
    judgeNodeIsRow(node) {
      return node.isRow;
    },
    //删除后重组数组
    repickDeleteArr(repickConfig) {
      let selfConfig = JSON.parse(JSON.stringify(this.selfConfig));
      selfConfig.forEach(i => {
        if (i.isRow && i.groupId === repickConfig.id) {
          i.groupId = repickConfig.groupId;
        } else if (!i.isRow && i.groupPid === repickConfig.id) {
          i.groupPid = repickConfig.groupId;
        }
      });
      this.selfConfig = selfConfig;
      console.log(selfConfig, repickConfig, "groupPid");
    },
    //绘制body
    drawBody(h, node) {
      if (node.childNode) {
        return FlowFactory.getFactory.bind(this, h, node.childNode)();
      } else {
        return <div></div>;
      }
    }
  },
  destroyed() {
    // EventBus.$off("nodeChange");
  },
  render(h) {
    // this.init();
    let FlowConfig = JSON.parse(JSON.stringify(this.selfConfig));
    FlowConfig = this.transformTree(FlowConfig);
    this.cacheData = FlowConfig;
    const root = JSON.parse(JSON.stringify(this.selfConfig[0]));
    return (
      <div class="design-engine">
        <div class="dingflow-design">
          <div class="ie-polyfill-container">
            <div class="box-scale" id="box-scale">
              {RowFactory.nodeWrapRender.bind(this, h, root)()}
              {this.drawBody(h, FlowConfig[0])}
              <div class="end-node">
                <div class="end-node-circle"></div>
                <div class="end-node-text">流程结束</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
</script>

<style scoped lang="scss">
.design-engine {
  position: relative;
  height: 100%;
  .dingflow-design {
    width: 100%;
    // background-color: #f5f5f7;
    overflow: auto;
    height: 100%;
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    ::v-deep .ant-popover-arrow {
      display: none !important;
    }
    .ie-polyfill-container {
      display: -ms-grid;
      -ms-grid-columns: min-content;
      .box-scale {
        transform: scale(1);
        display: inline-block;
        position: relative;
        width: 100%;
        padding: 54.5px 0;
        -webkit-box-align: start;
        -ms-flex-align: start;
        align-items: flex-start;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        min-width: -webkit-min-content;
        min-width: -moz-min-content;
        min-width: min-content;
        // background-color: #f5f5f7;
        -webkit-transform-origin: 0 0 0;
        transform-origin: 50% 0px 0px;
        .end-node {
          border-radius: 50%;
          font-size: 14px;
          color: rgba(25, 31, 37, 0.4);
          text-align: left;
          .end-node-circle {
            width: 10px;
            height: 10px;
            margin: auto;
            border-radius: 50%;
            background: #dbdcdc;
          }
          .end-node-text {
            margin-top: 5px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
