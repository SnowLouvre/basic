// 工具函数
let _toString = Object.prototype.toString;
let map = {
  array: "Array",
  object: "Object",
  function: "Function",
  string: "String",
  null: "Null",
  undefined: "Undefined",
  boolean: "Boolean",
  number: "Number",
};
let getType = (item) => {
  return _toString.call(item).slice(8, -1);
};
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item);
};
// 深度优先
let DFSdeepClone = (obj, visitedArr = []) => {
  let _obj = {};
  if (isTypeOf(obj, "array") || isTypeOf(obj, "object")) {
    let index = visitedArr.indexOf(obj);
    console.log(index, "index", visitedArr, obj);
    _obj = isTypeOf(obj, "array") ? [] : {};
    if (~index) {
      // 判断环状数据 ~-1 == 0 一个骚操作而已 index !== -1
      _obj = visitedArr[index];
    } else {
      visitedArr.push(obj);
      for (let item in obj) {
        _obj[item] = DFSdeepClone(obj[item], visitedArr);
      }
    }
  } else if (isTypeOf(obj, "function")) {
    _obj = eval("(" + obj.toString() + ")");
  } else {
    _obj = obj;
  }
  return _obj;
};

let BFSdeepClone = (obj) => {
  let origin = [obj],
    copyObj = {},
    copy = [copyObj];
  // 去除环状数据
  let visitedQueue = [],
    visitedCopyQueue = [];
  while (origin.length > 0) {
    let items = origin.shift(),
      _obj = copy.shift();
    visitedQueue.push(items);
    if (isTypeOf(items, "object") || isTypeOf(items, "array")) {
      for (let item in items) {
        let val = items[item];
        if (isTypeOf(val, "object")) {
          let index = visitedQueue.indexOf(val);
          if (!~index) {
            _obj[item] = {};
            //下次while循环使用给空对象提供数据
            origin.push(val);
            // 推入引用对象
            copy.push(_obj[item]);
          } else {
            _obj[item] = visitedCopyQueue[index];
            visitedQueue.push(_obj);
          }
        } else if (isTypeOf(val, "array")) {
          // 数组类型在这里创建了一个空数组
          _obj[item] = [];
          origin.push(val);
          copy.push(_obj[item]);
        } else if (isTypeOf(val, "function")) {
          _obj[item] = eval("(" + val.toString() + ")");
        } else {
          _obj[item] = val;
        }
      }
      // 将已经处理过的对象数据推入数组 给环状数据使用
      visitedCopyQueue.push(_obj);
    } else if (isTypeOf(items, "function")) {
      copyObj = eval("(" + items.toString() + ")");
    } else {
      copyObj = obj;
    }
  }
  return copyObj;
};

console.log(
  DFSdeepClone({
    ...map,
    a: [1, 2, 3],
    b: function () {
      console.log("a");
    },
  }),
  1
);

console.log(
  BFSdeepClone({
    ...map,
    a: [1, 2, 3],
    b: function () {
      console.log("a");
    },
  }),
  2
);

//  <!--工具函数-->
// const _toString = Object.prototype.toString
// function getType(obj) {
//   return _toString.call(obj).slice(8, -1)
// }

// <!--深度优先-->
function DFSDeepClone(obj, vistied = new Set(), level = 0) {
  let res = {};

  if (getType(obj) === "Object" || getType(obj) === "Array") {
    if (vistied.has(obj)) {
      // 处理环状结构
      res = obj;
    } else {
      vistied[level] = obj;
      vistied.add(obj);
      res = getType(obj) === "Object" ? {} : [];
      Object.keys(obj).forEach((k) => {
        res[k] = DFSDeepClone(obj[k], vistied, level + 1);
      });
    }
  } else if (typeof obj === "function") {
    res = eval(`(${obj.toString()})`);
  } else {
    res = obj;
  }

  return res;
}

// <!--广度优先-->
function BFSDeepClone(obj) {
  if (getType(obj) !== "Object" && getType(obj) !== "Array") {
    if (typeof obj === "function") {
      obj = eval(`(${obj.toString()})`);
    }
    return obj;
  }

  let res = {};
  const origin = [obj];
  const copy = [res];
  const vistied = new Set([obj]);

  while (origin.length) {
    const _obj = origin.shift();
    const copyObj = copy.shift();

    Object.keys(_obj).forEach((k) => {
      const item = _obj[k];
      if (getType(item) === "Object" || getType(item) === "Array") {
        if (vistied.has(item)) {
          copyObj[k] = item;
        } else {
          vistied.add(item);
          copyObj[k] = getType(item) === "Object" ? {} : [];
          origin.push(item);
          copy.push(copyObj[k]);
        }
      } else if (typeof item === "function") {
        copyObj[k] = eval(`(${item.toString()})`);
      } else {
        copyObj[k] = item;
      }
    });
  }

  return res;
}
