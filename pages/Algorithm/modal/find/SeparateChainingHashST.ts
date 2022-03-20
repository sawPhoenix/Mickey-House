function getPrime(n:number) {
  if (n <= 3) {
    return n;
  }
  let isPrime = false;
  while (!isPrime) {
    isPrime = true;
    var sqrt = Math.ceil(Math.sqrt(n));
    for (let i = 2; i <=sqrt; i++) {
      if (n % i === 0) {
        isPrime = false
        --n;
        break;
      }
    }
  }
  return n
}

export class SeparateChainingHashST {
  N: number;
  M: number;
  ST: any[];
  HashNode: () => { value: null; key: null; next: null; };
  constructor(M: number) {
    this.N = 0;
    this.M = M;
    this.HashNode = () => {
      return {
        value: null,
        key: null,
        next: null
      }
    };

    this.ST = Array(M).fill(this.HashNode());
  }
  hash(key: number) {
    let length = this.ST.length;
    let p = getPrime(length)
    return key % p 
  }
  put(key:number,value: any) {
    this.ST[this.hash(key)].put(key,value)
  }
  get (key:number) {
    return (
      this.ST[this.hash(key)].get(key)
    )
  }
}