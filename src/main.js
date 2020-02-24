import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

/* 
let data = [
  { "id": 2, "pid": 1, "type": 1, "updateTime": 1582419780000, "userName": "21" },
  { "id": 3, "pid": 0, "type": 1, "updateTime": 1582420356000, "userName": "21" },
  { "id": 4, "pid": 0, "type": 1, "updateTime": 1582420390000, "userName": "21" },
  { "id": 5, "pid": 5, "type": 1, "updateTime": 1582423317000, "userName": "21" },
  { "id": 6, "pid": 5, "type": 1, "updateTime": 1582420499000, "userName": "21" }
]


function arrayToTree(
  array = [],
  options = { id: "id", pid: "pid", children: "children" },
) {
  let array_ = []; // 创建储存剔除叶子节点后的骨架节点数组
  let unique = {}; // 创建盒子辅助本轮children合并去重
  let root_pid = [
    0,
    "0",
    undefined,
    "undefined",
    null,
    "null",
    "00000000-0000-0000-0000-000000000000"
  ]; // 可能存在的根节点pid形式
  array.forEach(item => {
    console.log(item,1)
    // 筛选可以插入当前节点的所有子节点
    let children_array = array.filter(
      it => it[options.pid] === item[options.id]
    );
    if (item[options.children] && item[options.children] instanceof Array && item[options.children].length > 0) {
      // 去重合并数组
      item[options.children].map(i => (unique[i[options.id]] = 1));
      item[options.children].push(
        ...children_array.filter(i => unique[i[options.id]] !== 1)
      );
    } else {
      item[options.children] = children_array;
    }
    // 当children_array有数据时插入下一轮array_，当无数据时将最后留下来的根节点树形插入数组
    let has_children = children_array.length > 0;
    if (
      has_children ||
      (!has_children && root_pid.includes(item[options.pid]))
    ) {
      array_.push(item);
    }
  });
  // 当数组内仅有根节点时退出，否组继续处理 最终递归深度次
  if (!array_.every(item => root_pid.includes(item[options.pid]))) {
    return arrayToTree(array_, options);
  } else {
    return array_;
  }
}

console.log(arrayToTree(data, { id: 'id', pid: 'pid', children: "children" })) */