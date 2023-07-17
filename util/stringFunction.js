/* 字符串原生方法实现 */
/**
 * 实现字符串原型方法 trim()
 * @author freddy
 * @return {string}
 */
function trim() {
  const str = this;
  // ^ -> 匹配输入的开始
  // $ -> 匹配输入的结束
  // \s -> 匹配一个空白字符，包括空格、制表符、换页符和换行符
  // A|B -> 匹配‘A’或者‘B’
  return str.replace(/^\s*|\s*$/g, "");
}
console.log(" 5 5 ".trim());
/**
 * 实现字符串原型方法 slice
 * @author freddy
 * @param beginIndex {number}
 * @param endIndex {number}
 * @return {string}
 * start 可选
  提取起始处的索引（从 0 开始），会转换为整数。
  如果索引是负数，则从数组末尾开始计算——如果 start < 0，则使用 start + array.length。
  如果 start < -array.length 或者省略了 start，则使用 0。
  如果 start >= array.length，则不提取任何元素。
  end 可选
  提取终止处的索引（从 0 开始），会转换为整数。slice() 会提取到但不包括 end 的位置。
  如果索引是负数，则从数组末尾开始计算——如果 end < 0，则使用 end + array.length。
  如果 end < -array.length，则使用 0。
  如果 end >= array.length 或者省略了 end，则使用 array.length，提取所有元素直到末尾。
  如果 end 在规范化后小于或等于 start，则不提取任何元素。
 */
function slice(beginIndex, endIndex) {
  const str = this;
  // 处理 beginIndex 小于零情况
  beginIndex = beginIndex < 0 ? str.length + beginIndex : beginIndex;
  // 处理 endIndex 为没有传的情况
  endIndex =
    endIndex === undefined
      ? str.length
      : endIndex < 0 /* 判断 endIndex 是不是小于0 */
      ? str.length + endIndex
      : endIndex;

  // 当 beginIndex 大于等于 endIndex 时，则返回空字符串
  if (beginIndex >= endIndex) return "";
  let result = "";
  // 遍历拼接结果
  for (let i = beginIndex; i < endIndex; i++) {
    result += str[i];
  }
  return result;
}
const animals = ["ant", "bison", "camel", "duck", "elephant"];
console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]
console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]
console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]
console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]
console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]
