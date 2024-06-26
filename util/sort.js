//二分查找非递归 O(logn)
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);  // mid = left + ((right - left) >> 1);
    if (nums[mid] === target) {
      return mid;
    } else if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
};

// 快速排序
function quickSort(array) {
  return _quickSort(array, 0, array.length - 1);
  /**
   * 快速排序
   * @param array {number[]}
   * @param left {number}
   * @param right {number}
   * @return {number[]}
   * @private
   */
  function _quickSort(array, left, right) {
    if (left < right) {
      // 进行分区，获取基准点
      const partitionIndex = partition(array, left, right);
      // 以基准值为中心，左右各种再递归调用快速排序
      _quickSort(array, left, partitionIndex - 1);
      _quickSort(array, partitionIndex + 1, right);
    }
    return array;
  }
  /**
   * 分区操作
   * @param array {number[]}
   * @param left {number}
   * @param right {number}
   * @return {number}
   */
  function partition(array, left, right) {
    const pivot = left; // 基准
    let idx = pivot + 1; // 定位到等于array[pivot]的下标
    // 将小于基准值的与array[idx]调换顺序
    for (let i = idx; i <= right; i++) {
      if (array[i] < array[pivot]) {
        [array[i], array[idx]] = [array[idx], array[i]];
        idx++;
      }
    }
    // 调换array[pivot]至array[idx - 1]处
    // 形成小于基准值的在基准值的左边，大于基准值的在基准值的右边
    [array[pivot], array[idx - 1]] = [array[idx - 1], array[pivot]];
    return idx - 1;
  }
}

const createNonSortedArray = (size) => {
  var array = new Array();
  for (var i = size; i > 0; i--) {
    //array.push(parseInt(Math.random()*100));
    array.push(i * (100 / size));
    array.sort(function () {
      return 0.5 - Math.random();
    });
  }
  console.log(array, 'array')
  return array;
};

var arr = createNonSortedArray(20);
quickSort(arr);
console.log(arr); //[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
