/*
 * 1.将数组转化为树结构
 */
const data = [
  { id: "01", name: "张大大", pid: "", job: "项目经理" },
  { id: "02", name: "小亮", pid: "01", job: "产品leader" },
  { id: "03", name: "小美", pid: "01", job: "UIleader" },
  { id: "04", name: "老马", pid: "01", job: "技术leader" },
  { id: "05", name: "老王", pid: "01", job: "测试leader" },
  { id: "06", name: "老李", pid: "01", job: "运维leader" },
  { id: "07", name: "小丽", pid: "02", job: "产品经理" },
  { id: "08", name: "大光", pid: "02", job: "产品经理" },
  { id: "09", name: "小高", pid: "03", job: "UI设计师" },
  { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
  { id: "11", name: "小华", pid: "04", job: "后端工程师" },
  { id: "12", name: "小李", pid: "04", job: "后端工程师" },
  { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
  { id: "14", name: "小强", pid: "05", job: "测试工程师" },
  { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
];

const treeData = arrToTree(data);
console.log(treeData);

function arrToTree(data) {
  // tree来保存树形数组
  let tree = [];
  if (!Array.isArray(data)) {
    return tree;
  }
  data.forEach((ele) => {
    if (ele.pid === "") return tree.push(nodeObj(ele)); // 在树形数组上查找ele的父级节点对象
    const obj = getElementById(tree, ele.pid); // 如果找到了，添加到这个节点的children属性中
    console.log(obj, 'obj', ele.pid, ele)
    obj && obj.children.push(nodeObj(ele));
  });

  return tree;
}

// 根据扁平数组对象生成树形数组中的节点对象
function nodeObj(obj) {
  return {
    id: obj.id,
    label: obj.name,
    children: [],
    job: obj.job,
  };
}

// 通过ID，递归查找树形结构中的元素
function getElementById(arr, id) {
  for (const ele of arr) {
    if (ele.id === id) {
      return ele;
    } else if (ele.children.length > 0) {
      const temp = getElementById(ele.children, id);
      if (temp) {
        return temp;
      } else {
        continue;
      }
    }
  }
}
/*
 * 2.实现 getValue 函数来获取path对应的值
 * var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
 * var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'
 * function getValue(target, valuePath, defaultValue) {}
 * console.log(getValue(object, "a[0].b.c", 0)); // 输出3
 * console.log(getValue(array, "[0].a.b[0]", 12)); // 输出 1
 * console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出 12
 */
function getValue(target, valuePath = "", defaultValue) {
  const paths = valuePath.split(".");
  const attr = paths.shift();
  let result = "";
  // 正则表达式，用于匹配三种不同情况和分组取值
  // 对 path 进行分类，可分为三种请情况
  // 对象的 key: 'a'、'aaa'
  // 数组的 index: '[0]' '[2]'
  // 对象 key + index：aa:[0]
  // 'a'、'aaa'
  // /^(\[\])$/
  const reg1 = /^([a-zA-Z]+)$/;
  // '[0]' '[2]'
  const reg2 = /^(\[\d+\])$/;
  // aa:[0]
  const reg3 = /^([a-zA-Z]+)(\[\d+\])$/;
  console.log(target, attr, "attr");
  // 根据每一层的 `path` 获取对应的值
  const _getValue = (paths, val) => {
    if (paths.length > 0 && (val !== null || val !== undefined)) {
      // 根据剩余的 path 继续执行查找
      result = getValue(val, paths.join(".")) || defaultValue;
      console.log(paths, val, result, "result");
    }
  };
  if (reg1.test(attr)) {
    // 获取第一层的值
    result = target[attr];
    console.log("第一层", attr, target[attr]);
    // 继续执行深层次的查找
    _getValue(paths, result);
  } else if (reg2.test(attr)) {
    const index = attr.substring(1, attr.length - 1);
    result = target[index];
    console.log("第二层", index, target[index]);
    // 继续执行深层次的查找
    _getValue(paths, result);
  } else if (reg3.test(attr)) {
    const { $1, $2 } = RegExp;
    let parentVal = target[$1];
    const index = $2.substring(1, $2.length - 1);
    result = parentVal[index];
    console.log("第三层", index, parentVal, parentVal[index], $1, $2);
    // 继续执行深层次的查找
    _getValue(paths, result);
  }
  return result;
}

// var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
// var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'
// console.log(getValue(object, "a[0].b.c", 0)); // 输出3
// console.log(getValue(array, "[0].a.b[0]", 12)); // 输出 1
// console.log(getValue(array, "[0].a.b[0].c", 12)); // 输出 12


// 设计一个sum函数，使其满足以下要求
// sum(1, 2).sumOf() // 返回 3
// sum(1, 2)(3).sumOf() // 返回 6
function sum(...args) {
  let total = args.reduce((acc, cur) => acc + cur, 0);

  function innerSum(...nextArgs) {
      total += nextArgs.reduce((acc, cur) => acc + cur, 0);
      return innerSum;
  }

  innerSum.sumOf = () => total;
  return innerSum;
}

console.log(sum(1, 2).sumOf()); // 输出 3
console.log(sum(1, 2)(3).sumOf()); // 输出 6