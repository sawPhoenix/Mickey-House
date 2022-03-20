class unionFind {
  id: number[];
  sz: number[];
  count: number;
  /**
   * 
   * @param {number} N 
   */
  constructor(N: number) {
    this.id = new Array(N).fill(0).map((x, index) => index);
    this.sz = new Array(N).fill(0).map((x, index) => index);
    this.count = N
  }

  countfn() {
    return this.count
  }

  /**
   * 
   * @param {number} p 
   * @param {number} q 
   */
  connected(p: any, q: any) {
    return this.find(p) === this.find(q)
  }

  /** 
   * @param {number} i 
   */
  find(i: any) {
    /**
     * quick-find
     */

    //  return this.id[i]

    /**
     * quick-union 算法
     */

    while (i !== this.id[i]) {
      this.id[i] = this.id[this.id[i]]
      i = this.id[i]
    }
    return i
  }
  /**
   * 
   * @param {number} p 
   * @param {number} q 
   */
  union(p: any, q: any) {
    /*
     quick-find 
    */


    // var pId = this.find(p)
    // var qId = this.find(q)
    // if (pId === qId) return
    // this.id.forEach(i => {
    //   if (this.id[i] === pId) {
    //     this.id[i] = qId
    //   }
    // })
    // this.count--


    /**
     * quick-union
     */

    let pRoot = this.find(p);
    let qRoot = this.find(q);
    if (pRoot === qRoot) return;

    // normal
    // this.id[pRoot] = qRoot;

    // weighted
    if (this.sz[pRoot] < this.sz[qRoot]) {
      this.id[pRoot] = qRoot; 
      this.sz[qRoot] += this.sz[pRoot]
    } else {
      this.id[qRoot] = pRoot; 
      this.sz[pRoot] += this.sz[qRoot]
    }


    this.count--
  }

}
export default unionFind;