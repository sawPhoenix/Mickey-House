class MyPromise {
  state: "pending" | "fulfilled" | "rejected";
  value: any;
  reason: string | null;
  callbacks: { fulfilled: Function; rejected: Function }[];
  constructor(executor: Function) {
    this.state = "pending";
    this.value = null;
    this.reason = null;
    this.callbacks = [];
    const resolve = (value: any) => {
      if (this.state !== "pending") {
        return;
      }
      this.state = "fulfilled";
      this.value = value;
      this.callbacks.forEach((callback) => callback.fulfilled());
    };
    const reject = (reason: string) => {
      if (this.state !== "pending") {
        return;
      }
      this.state = "rejected";
      this.reason = reason;
      this.callbacks.forEach((callback) => callback.rejected());
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err as string);
    }
  }
  then(onFulfilled: Function, onRejected: Function) {
    // 判断  onFulfilled和onRejected是否是函数，如果不是，则将其转化为函数
    // 由于then是链式调用，切前面的then如果不传值，后续then也能拿到值，所以需要then穿透
    if (typeof onFulfilled !== "function") onFulfilled = (value: any) => value;
    if (typeof onRejected !== "function")
      onRejected = (reason: string) => {
        throw reason;
      };
    // promise 链式调用
    let promise = new MyPromise((resolve: Function, reject: Function) => {
      if (this.state === "fulfilled") {
        resolve(onFulfilled(this.value));
      }
      if (this.state === "rejected") {
        reject(onRejected(this.reason));
      }
      if (this.state === "pending") {
        this.callbacks.push({
          fulfilled: () => {
            setTimeout(() => {
              // then异常时，需要走reject
              try {
                resolve(onFulfilled(this.value));
                this.resolvedPromise(
                  promise,
                  onFulfilled(this.value),
                  resolve,
                  reject
                );
              } catch (err) {
                reject(err);
              }
            });
          },
          rejected: () => {
            setTimeout(() => {
              try {
                resolve(onRejected(this.reason));
                this.resolvedPromise(
                  promise,
                  onRejected(this.reason),
                  resolve,
                  reject
                );
              } catch (err) {
                reject(err);
              }
            });
          },
        });
      }
    });
    return promise;
  }
  // 处理 then 中的 onResolved retrun一个promise对象的情况，即promise嵌套调用
  resolvedPromise(
    promise: MyPromise,
    result: any,
    resolve: Function,
    reject: Function
  ) {
    if (promise === result) {
      reject(new TypeError("Chaining cycle detected for promise"));
    }

    if (
      (result && typeof result === "object") ||
      typeof result === "function"
    ) {
      let called: boolean;
      try {
        let then = result.then;
        if (typeof then === "function") {
          then.call(result, (value: any) => {
            if (called) return;
            called = true;
            this.resolvedPromise(promise, value, resolve, reject);
          });
        } else {
          if (called) return;
          called = true;
          reject(result);
        }
      } catch (err) {
        if (called) return;
        called = true;
        reject(err);
      }
    } else {
      resolve(result);
    }
  }
}
// MyPromise.defer = MyPromise.deferred = function () {
//   let dfd = {};
//   dfd.promise = new MyPromise((resolve, reject) => {
//     dfd.resolve = resolve;
//     dfd.reject = reject;
//   });
//   return dfd;
// };
// module.exports = MyPromise;

const a = new MyPromise((res, rej) => {
  console.log(1);
  res(2);
}).then((res) => {
  console.log("res:", res);
});
