// 节流
function throttle(func, delay) {
  let timeoutId; // 用于存储定时器的ID
  let lastExecutedTime = 0; // 上次执行的时间戳
  // 返回一个新的函数作为节流函数
  return function (...args) {
    const currentTime = Date.now(); // 当前时间戳
    // 计算距离上次执行的时间间隔
    const elapsedTime = currentTime - lastExecutedTime;
    // 如果距离上次执行的时间间隔大于等于延迟时间，则执行函数
    if (elapsedTime >= delay) {
      func.apply(this, args);
      lastExecutedTime = currentTime; // 更新上次执行的时间戳
    } else {
      // 如果距离上次执行的时间间隔小于延迟时间，则设置定时器延迟执行函数
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        lastExecutedTime = Date.now(); // 更新上次执行的时间戳
      }, delay - elapsedTime);
    }
  };
}
// 防抖
function debounce(func, delay) {
  let timeoutId; // 用于存储定时器的ID
  // 返回一个新的函数作为防抖函数
  return function (...args) {
    // 如果已经设置了定时器，则清除它
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // 设置新的定时器，延迟执行目标函数
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
