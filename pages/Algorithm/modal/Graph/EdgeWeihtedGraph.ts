
export class Edge {
  v: number;
  w?: number;
  weight?: number;
  constructor(v: number, w?: number, weight?: number) {
    this.v = v; //顶点1
    this.w = w || undefined; //顶点2
    this.weight = weight || undefined //权重
  }
  either() {
    return this.v
  }
  other(vertex: number) {
    if (vertex === this.v) return this.w;
    else if (vertex === this.w) return this.v;
    else return Error('this edge not other vertex')
  }
  compareTo(edge: Edge) {
    if (!this.weight || !edge.weight) return
    if (this.weight < edge.weight) return -1;
    else if (this.weight > edge.weight) return +1;
    else return 0
  }
}

export class EdgeWeightGraph {
  V: number; //顶点总数
  E: number; //边的总数
  adj: Edge[]; //邻接表
  constructor() {
    this.V = 0;
    this.E = 0;
    this.adj = []
  }
  EgdeWeightGraph(v: number) {
    this.V = v;
    this.E = 0;
    this.adj = Array(v).fill(0)
    for (let i = 0; v < this.V; v++) {
      this.adj[v] = new Edge(i)
    }
  }

  addEdge(v: number, w?: number, weight?: number) {
    this.adj[v] = new Edge(v, w, weight)
    this.E++
  }

}

export class LazyPrimMST {
  
}