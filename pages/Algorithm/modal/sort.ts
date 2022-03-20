
 class Example {
    constructor() {

    }

    sort() {

    }

    main() {

    }

    less(v:number,w:number) {
      return v - w < 0;
    }
    compareTo(v:number,w:number) {
      return v - w;
    }
    exch(a:number[], i:number, j:number) {
      let t = a[i];
      a[i] = a[j];
      a[j] = t;
      
    }
    show(a: number[]) {
      for (let i = 0; i < a.length; i++) {
         console.log(a[i]);
      }
    }
    isSorted(a: number[]) {
      for (let i = 1; i < a.length; i++) {
        if (this.less(a[i],a[i-1])) return false

      }
      return true
    }

 }

 export default Example;
