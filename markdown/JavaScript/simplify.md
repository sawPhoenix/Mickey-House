# 简写

1. 多条件判断：
```
//Longhand
if (x === 'abc' || x === 'def' || x === 'ghi' || x ==='jkl') {
  //logic
}

//Shorthand
if (['abc', 'def', 'ghi', 'jkl'].includes(x)) {
  //logic
}
```
2. Switch简写
```
// Longhand
switch (data) {
  case 1:
    test1();
  break;

  case 2:
    test2();
  break;

  case 3:
    test();
  break;
  // And so on...
}

// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};
```

3. 短函数调用
```
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}

// Shorthand
(test3 === 1? test1:test2)();
```
4. 用Array.find简写
```
const data = [
  {
    type: 'test1',
    name: 'abc'
  },
  {
    type: 'test2',
    name: 'cde'
  },
  {
    type: 'test1',
    name: 'fgh'
  },
]
function findtest1(name) {
  for (let i = 0; i < data.length; ++i) {
    if (data[i].type === 'test1' && data[i].name === name) {
      return data[i];
    }
  }
}

//Shorthand
filteredData = data.find(data => data.type === 'test1' && data.name === 'fgh');
console.log(filteredData); // { type: 'test1', name: 'fgh' }
```

5. indexOf简写
```
//longhand
if(arr.indexOf(item) > -1) { // item found 
}
if(arr.indexOf(item) === -1) { // item not found
}

//shorthand
if(~arr.indexOf(item)) { // item found
}
if(!~arr.indexOf(item)) { // item not found
}
```

6. 双按位简写
```
// Longhand
Math.floor(1.9) === 1 // true

// Shorthand
~~1.9 === 1 // true
```
7. 重复一个字符多次
```
//longhand 
let test = ''; 
for(let i = 0; i < 5; i ++) { 
  test += 'test '; 
} 
console.log(str); // test test test test test 

//shorthand 
'test '.repeat(5);
```