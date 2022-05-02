/* eslint-disable no-unused-vars */
/**
 * @author 肖阳
 * @time 2020-9-10
 * @dec 各种节点类
 */
import { HashCode } from "../../utils";
export class Node {
  nodeId;
  type;
  childNode;
  title = "默认标题";
  content = "content";
  conditionNodes;
  constructor({ id, type, isRow }) {
    if (type === "2") {
      this.title = "审批人";
    }
    this.groupId = id;
    this.id = HashCode();
    this.type = type;
    this.content += "请设置审批人";
    this.isRow = isRow;
  }
}
export class ConditionNode {
  title = "分支标题";
  data = {};
  constructor({ groupId, type, id, isRow }) {
    this.id = HashCode();
    this.groupId = groupId;
    this.type = type;
    this.content += this.id;
    this.groupPid = id;
    this.isRow = isRow;
  }
}
export class RowNode extends Node {
  data = {};
  constructor({ id, type, isRow, title }) {
    super({ id, type, isRow, title });
  }
}
export class CopyNode {
  title = "标题";
  id = HashCode();
  content = "内容";
  data = {};
  constructor({ id, childNode, ...node }) {
    return Object.assign(node, this);
  }
}
