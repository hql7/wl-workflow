<template>
  <div class="wl-workflow">
    <!-- 流程图区 -->
    <div id="wl-workflow" class="wl-workflow-convas"></div>
    <!-- 操作区 -->
    <div class="wl-workflow-handle">
      <h3 class="handle-title">画布</h3>
      <el-scrollbar class="handle-scroll">
        <ul class="handle-ul">
          <li class="handle-li">
            <label class="handle-label">人员：</label>
            <el-input
              placeholder="请填写人员"
              size="small"
              v-model="handle_form.name"
            ></el-input>
          </li>
          <li class="handle-li">
            <label class="handle-label">描述：</label>
            <el-input
              placeholder="请填描述信息"
              size="small"
              v-model="handle_form.des"
            ></el-input>
          </li>
        </ul>
      </el-scrollbar>
      <div class="handle-btn-box">
        <el-button size="small" type="primary" plain @click="addTask()">添加</el-button>
        <el-button size="small" type="danger" plain>删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "WlWorkflow",
  props:{
    // 流程数据
    data: Object
  },
  data() {
    return {
      handle_form: {
        name: "",
        des: ""
      }, // 操作区表单
      workflow_box: {
        dom: null,
        width: 500,
        height: 500
      },
      workflow: null
    };
  },
  computed:{
    selfData(){
      return this.data;
    }
  },
  watch: {
    selfData(val){
      this.updateDate(val);
    }
  },
  mounted() {
    this.workflow_box.dom = document.getElementById("wl-workflow");
    this.workflow_box.width = this.workflow_box.dom.scrollWidth;
    this.workflow_box.height = this.workflow_box.dom.scrollHeight || 500;
    this.workflowInit();
  },
  methods: {
    // ---------------------------------------g6 api--------------------------------
    // 初始化工作流
    workflowInit() {
      this.workflow = new G6.Graph({
        container: "wl-workflow",
        width: this.workflow_box.width,
        height: this.workflow_box.height,
        fitView: true,
        modes: {
          default: ["drag-canvas", "drag-node", "activate-relations"]
        },
        layout: {
          type: "dagre",
          rankdir: "LR",
          align: "DL",
          nodesepFunc: () => {
            return 1;
          },
          ranksepFunc: () => {
            return 1;
          }
        },
        defaultNode: {
          size: [30, 20],
          type: "rect",
          style: {
            lineWidth: 2,
            stroke: "#5B8FF9",
            fill: "#C6E5FF"
          },
          labelCfg: {
            style: {
              // fontSize: 6,
            }
          }
        },
        nodeStateStyles: {
          hover: {
            // hover 状态为 true 时的样式
            fill: "#d3adf7"
          },
          running: {
            // running 状态为 true 时的样式
            stroke: "steelblue"
          }
        },
        defaultEdge: {
          size: 1,
          color: "#e2e2e2",
          labelCfg: {
            style: {
              // fontSize: 4,
            }
          },
          style: {
            endArrow: {
              path: "M 4,0 L -4,-4 L -4,4 Z",
              d: 4
            }
          }
        }
      });
      /* this.workflow.on("click", ev => {
        const shape = ev.target;
        const item = ev.item;
        console.log(shape);
        if (item) {
          const type = item.getType();
          console.log(type);
        }
      }); */
      this.workflow.on("node:click", ev => {
        const shape = ev.target;
        const node = ev.item;
        console.log(shape);
        console.log(node);
      });
      this.workflowRender();
    },
    // 渲染工作流
    workflowRender() {
      this.workflow.data(this.selfData);
      this.workflow.render();
    },
    // 更新数据
    updateDate(data) {
      this.workflow.changeData(data);
    },
    // 新增节点
    addItem(type, model) {
      this.workflow.addItem(type, model);
    },
    // 更新节点
    updateItem(id, model) {
      let item = this.workflow.findById(id);
      this.workflow.updateItem(item, model);
    },
    // 删除节点
    removeItem(id) {
      const item = this.workflow.findById(id);
      this.workflow.removeItem(item);
    },
    // 更新视图
    refresh() {
      this.workflow.refresh();
    },
    // --------------------------------------内置操作事件--------------------------------
    addTask(){
      let model = {
        id: 'node',
        type: 'rect',
        label: this.handle_form.name,
        x: 100,
        y: 100,
        style: {
            lineWidth: 2,
            stroke: "#5B8FF9",
            fill: "#C6E5FF"
          },
      };
      this.addItem('node', model);
      this.refresh()
    }
  }
};
</script>

<style lang="scss">
@import "../assets/clear.css";

.wl-workflow {
  background: #f6f6f6;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
}
.wl-workflow-convas {
  flex: 1;
  height: 100%;
}
.wl-workflow-handle {
  width: 240px;
  height: 100%;
  background: #f0f0f0;
  box-sizing: border-box;
  color: #333;

  > .handle-title {
    padding: 8px 15px;
    height: 40px;
    line-height: 24px;
    box-sizing: border-box;
    background: #e6e6e6;
  }

  > .handle-scroll {
    max-height: calc(100% - 80px);
  }
  .handle-ul {
    padding: 5px 15px;

    >.handle-li{
      padding: 5px 0;
    }
  }
  .handle-btn-box{
    padding: 0 15px;
  }
}
</style>