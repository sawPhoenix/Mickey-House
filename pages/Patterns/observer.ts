class Observer {
  observers: Map<string, any>;
  constructor() {
    this.observers = new Map();
  }
  addObserver(key: string, fn: any) {
    if (!this.observers.has(key)) {
      this.observers.set(key, []);
    }
    this.observers.get(key).push(fn);
  }
  removeObserver(key: string, fn: any) {
    if (!this.observers.has(key)) {
      return;
    }
  }
  notify(key: string, ...args: any) {
    if (!this.observers.has(key)) {
      return;
    }
  }
}
