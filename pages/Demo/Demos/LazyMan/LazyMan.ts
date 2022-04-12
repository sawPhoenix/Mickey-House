/**
 * 链式调用
 */
export default class LazyManClass {
  taskList: Function[];
  constructor(name: string) {
    console.log(`Hi I am ${name}`);
    this.taskList = [];
    setTimeout(() => {
      this.next();
    }, 0);
  }

  eat(name: string) {
    const that = this;
    const fn = ((n) => {
      return function () {
        console.log(`I am eating ${n}`);
        that.next();
      };
    })(name);
    this.taskList.push(fn);
    return this;
  }

  sleep(time: number) {
    const that = this;
    const fn = ((t) => {
      return () => {
        setTimeout(() => {
          console.log(`等待了${t}秒...`);
          that.next();
        }, t * 1000);
      };
    })(time);
    this.taskList.push(fn);
    return this;
  }

  sleepFirst(time: number) {
    const that = this;
    const fn = ((t) => {
      return () => {
        setTimeout(() => {
          console.log(`等待了${t}秒...`);
          that.next();
        }, t * 1000);
      };
    })(time);
    this.taskList.unshift(fn);
    return this;
  }
  next() {
    const fn = this.taskList.shift();
    fn && fn();
  }
}
