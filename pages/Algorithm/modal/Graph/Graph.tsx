export class Graph {
  V: any[];
  adjList: Map<any, any>;
  constructor() {
    this.V = [];
    this.adjList = new Map();
  }
  addVertex(val: any) {
    this.adjList.set(val, [])
    return this.V.push(val)
  }
  addEdge(left: any, right: any) {
    if (!this.adjList.get(left)) return false;
    if (!this.adjList.get(right)) return false;
    this.adjList.get(left).push(right);
    this.adjList.get(right).push(left);
    return true
  }
  log() {
    let str = '';
    for (let i = this.V.length - 1; i > 0; i--) {
      str += this.V[i] + ':'
    }
  }
  //广度优先搜索
  bfs(callback: any, start: any) {

    //distances、predecessors用于统计最短距离
    let distances: any[] = []; //距离
    let predecessors: any[] = []; //前溯点

    start = start || this.V[0];
    let queue = [];
    queue.push(start)
    let adjList = this.adjList;
    let isTrav = new Map();
    this.V.forEach((v) => {
      isTrav.set(v, 0);
      distances[v] = 0;
      predecessors[v] = null;
    });
    isTrav.set(start, 1);
    while (queue.length > 0) {
      let u = queue.shift();
      let neighhors = adjList.get(u)
      for (let i = 0; i < neighhors.length; i++) {
        let w = neighhors[i];
        if (isTrav.get(w) === 0) {
          isTrav.set(w, 1);
          queue.push(w);
          distances[w] = distances[u] + 1;
          predecessors[w] = u
        }
      }
      isTrav.set(u, 2);
      callback(u)
    }
  }
  //深度优先搜索
  dfs(callback: any, start: any) {
    start = start || this.V[0];
    let isTrav = new Map();
    this.V.forEach((v) => {
      isTrav.set(v, 0)
    });
    this.dfsVisit(start, isTrav, callback)
  }
  dfsVisit(n: any, isTrav: Map<any, any>, callback: any) {
    isTrav.set(n, 1);
    callback(n);
    let neighhors = this.adjList.get(n);
    for (let i = 0; i < neighhors.length; i++) {
      let w = neighhors[i];
      if (isTrav.get(w) == 0) {
        this.dfsVisit(w, isTrav, callback);
      }
    }
    isTrav.set(n, 2)
  }
}

export class Digraph {
  V: any[];
  adjList: Map<any, any>;
  constructor(V: any[]) {
    this.V = V || [];
    this.adjList = new Map();
  }
  addVertex(val: any) {
    this.adjList.set(val, [])
    return this.V.push(val)
  }
  addEdge(left: any, right: any) {
    if (!this.adjList.get(left)) return false;
    if (!this.adjList.get(right)) return false;
    this.adjList.get(left).push(right);
    this.adjList.get(right).push(left);
    return true
  }
  log() {
    let str = '';
    for (let i = this.V.length - 1; i > 0; i--) {
      str += this.V[i] + ':'
    }
  }
  //广度优先搜索
  bfs(callback: (val:any)=> {}, start: any) {

    //distances、predecessors用于统计最短距离
    let distances: any[] = []; //距离
    let predecessors: any[] = []; //前溯点


    start = start || this.V[0];
    let queue = [];
    queue.push(start)
    let adjList = this.adjList;
    let isTrav = new Map();
    this.V.forEach((v) => {
      isTrav.set(v, 0);
      distances[v] = 0;
      predecessors[v] = null;
    });
    isTrav.set(start, 1);
    while (queue.length > 0) {
      let u = queue.shift();
      let neighhors = adjList.get(u)
      for (let i = 0; i < neighhors.length; i++) {
        let w = neighhors[i];
        if (isTrav.get(w) === 0) {
          isTrav.set(w, 1);
          queue.push(w);
          distances[w] = distances[u] + 1;
          predecessors[w] = u
        }
      }
      isTrav.set(u, 2);
      callback(u)
    }
  }
  //深度优先搜索
  dfs(callback: (val:any)=> {}, start: any) {
    start = start || this.V[0];
    let isTrav = new Map();
    this.V.forEach((v) => {
      isTrav.set(v, 0)
    });
    this.dfsVisit(start, isTrav, callback)
  }
  dfsVisit(n: any, isTrav: Map<any, any>, callback: any) {
    isTrav.set(n, 1);
    callback(n);
    let neighhors = this.adjList.get(n);
    for (let i = 0; i < neighhors.length; i++) {
      let w = neighhors[i];
      if (isTrav.get(w) == 0) {
        this.dfsVisit(w, isTrav, callback);
      }
    }
    isTrav.set(n, 2)
  }
}