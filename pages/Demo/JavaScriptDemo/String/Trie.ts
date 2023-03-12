export default class Trie {
  private $ = Symbol("$");
  root: any;
  constructor() {
    this.root = Object.create(null);
  }
  insert(word: string) {
    let node = this.root;
    for (let c of word) {
      if (!node[c]) {
        node[c] = Object.create(null);
      }
      node = node[c];
    }
    if (!(this.$ in node)) {
      node[this.$] = 0;
    }
    node[this.$]++;
  }
  most() {
    let max = 0;
    let maxWord = null;
    let visit = (node: any, word: string) => {
      if (node[this.$] && node[this.$] > max) {
        max = node[this.$];
        maxWord = word;
      }
      for (let p in node) {
        visit(node[p], word + p);
      }
    };
    visit(this.root, "");
    console.log(maxWord, max);
  }
}
