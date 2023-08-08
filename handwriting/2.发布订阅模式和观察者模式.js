class EventBus {
  constructor() {
    // 存储事件
    this.cache = {};
  }
  /**
   * 订阅事件
   * @param name {string} 事件名称
   * @param fn {function} 任务函数
   */
  on(name, fn) {
    // 初始化事件数组
    if (!this.cache[name]) {
      this.cache[name] = [];
    }
    // 更新事件
    this.cache[name].push(fn);
  }
  /**
   * 删除事件
   * @param name {string} 事件名称
   * @param fn {function} 任务函数
   */
  off(name, fn) {
    if (this.cache[name]) {
      // 过滤掉取消绑定的任务
      this.cache[name] = this.cache[name].filter(
        (f) => f !== fn && f.callback !== fn
      );
    }
  }
  /**
   * 派发事件
   * @param name {string} 事件名称
   * @param args {*[]} 参数
   */
  emit(name, ...args) {
    if (this.cache[name]) {
      let tasks = [...this.cache[name]];
      // 遍历调用
      for (let fn of tasks) {
        fn(...args);
      }
    }
  }
  /**
   * 只派发一次后删除
   * @param name
   * @param fn
   */
  once(name, fn) {
    const self = this;
    // 新建一个函数，执行完fn后触发off
    const newFn = function (...args) {
      fn.call(this, ...args);
      self.off(name, newFn);
    };
    // 绑定
    self.on(name, newFn);
  }
}
/*
1.观察者模式维护的是一个单一事件对应多个依赖这个事件的对象之间关系
观察者是: event->[obj1,obj2obj3,....]
2.订阅发布模式维护的是多个主题(事件) 以及依赖于各个主题(事件)的对象之间的关系
订阅发布是:{
event1->[obj1,obj2....],
event2->[obj1,obj2.....],....}
观察者模式中的观察者和被观察者之间还存在耦合，被观察者还是知道观察者的；
发布订阅模式中的发布者和订阅者不需要知道对方的存在，他们通过消息代理来进行通信，解耦彻底。
使用场景：
mobx状态管理使用了观察者模式；redux状态管理使用了发布订阅模式。
*/
// 观察者类
class Observer {
  // 观察的数据发生了变化，触发函数
  update(...args) {
      //...dosomething
      console.log(...args)
  }
}

// 被观察者类
class Subject {
  constructor() {
      this.observerList = []
  }
  add(observer) {
      this.observerList.push(observer)
      this.observerList = [...new Set(this.observerList)]
  }
  remove(observer) {
      this.observerList = this.observerList.filter(item => item != observer)
  }
  notify(...args) {
      this.observerList.forEach(observer => observer.update(...args))
  }
}
// 测试用例
let observer_1 = new Observer()
let observer_2 = new Observer()
let sub = new Subject()
sub.add(observer_1)
sub.add(observer_2)
sub.notify('send msg')

