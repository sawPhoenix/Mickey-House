import { myReduce, deepClone } from './DemoMethods';

export default function () {
  let arr = [1, 2, 3, 4, 5];
  let deepTest = {
    name: '1',
    arr: [1, 2, 3],
    obj: {
      name: 1,
      arr: [
        {
          name: 2,
        },
      ],
    },
  };
  Array.prototype.myReduce = function (cb, initialValue) {
    var _arr = this;
    const _len = _arr.length;
    var _arg3 = arguments[2] || window;
    var _item;
    console.log('arg3', _arg3);
    for (var i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      console.log(_arg3);
      initialValue = cb.apply(_arg3, [initialValue, _item, i, _arr]);
    }
    console.log(initialValue);
    return initialValue;
  };
  const newArr = arr.myReduce(function (prev, item) {
    console.log(item);
    return prev + item;
  });
  console.log(newArr);
  const newdeep = deepClone(arr);
  console.log(arr);
  console.log(newdeep);

  return <div></div>;
}
