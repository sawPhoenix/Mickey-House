import { useRouter } from "next/router";
import Image from "next/image";
import Button from "components/PublicComponents/Button";
import { getTop3Dom } from "./JavaScriptDemo/FurryCode";
import ExpressionAST from "./JavaScriptDemo/AST/ExpressionAST";
import Trie from "./JavaScriptDemo/String/Trie";
import KMP from "./JavaScriptDemo/String/KMP";
import Map from "./Demos/Map";
import React from "react";
import one from "assets/background/1.jpg";
import { compile } from "sass";
import compiler from "./tiny-compiler";
export default function Demo() {
  const history = useRouter();
  // React.useEffect(() => {
  //   const top3Dom = getTop3Dom();
  //   console.log(top3Dom);
  // });
  // const STYLE = 1;
  // const CLASS = 1 << 1;
  // const CHILDREN = 1 << 2;
  // console.log(STYLE, CLASS, CHILDREN);
  // let vnodeType = STYLE | CLASS;
  // console.log(vnodeType);
  // console.log(vnodeType & STYLE);
  // console.log(vnodeType & CLASS);
  // console.log(vnodeType & CHILDREN);
  // vnodeType = vnodeType ^ CLASS;
  // const expers11s = "10 + 2 * 2 - 1";
  // const asttest = ExpressionAST(expers11s);
  // console.log("asttest", asttest);
  // console.log("asttest");
  // function randomWord(length: number) {
  //   var s = "";
  //   for (let i = 0; i < length; i++) {
  //     s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
  //   }
  //   return s;
  // }
  // let trie = new Trie();
  // for (let i = 0; i < 100000; i++) {
  //   trie.insert(randomWord(4));
  // }
  // trie.most();
  // console.log(trie);
  // const res = KMP("abaabbabac", "bac");
  // console.log(res);
  // let object = { a: 1, b: 2 };
  // let po = reactive(object);
  // function reactive(object: Object) {
  //   return new Proxy(object, {
  //     set(obj, prop, val) {
  //       obj[prop] = val;
  //       console.log("set", obj, prop, val);
  //       return obj[prop];
  //     },
  //     get(obj, prop, val) {
  //       console.log("get", obj, prop, val);
  //       return obj[prop];
  //     },
  //   });
  // }
  // po.a = 33;
  // console.log(po, object);

  compiler("(add 2 (subtract 4 2))");

  // const myReduce = <T extends unknown, U extends unknown>(
  //   cb: (acc: T, cur: T, i: number, arr: T[]) => U,
  //   initialValue: U
  // ) => {
  //   let arr = this;
  //   let len = arr.length;
  //   let _item;
  //   let value = initialValue || arr[0];
  //   let startIndex = initialValue ? 0 : 1;
  //   for (let i = startIndex; i < len; i++) {
  //     _item = arr[i];
  //     value = cb(value, _item, i, arr);
  //   }
  //   return value;
  // };－

  function myMap(cb: (item: any, index: number, arr: any[]) => any) {
    let arr = this;
    let len = arr.length;
    let _item;
    let result = [];
    for (let i = 0; i < len; i++) {
      _item = arr[i];
      result.push(cb(_item, i, arr));
    }
    return result;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          margin: 20,
        }}
      >
        <Button
          btnType="primary"
          onClick={() => history.push("/Demo/Demos/ButtonType")}
        >
          Button Type
        </Button>
        <Button
          btnType="primary"
          onClick={() => history.push("/Demo/Demos/LazyMan")}
        >
          梅花效果
        </Button>
        <Button
          btnType="primary"
          onClick={() => history.push("/Demo/Demos/MineSweeper")}
        >
          扫雷
        </Button>
        <Button
          btnType="primary"
          onClick={() => history.push("/Demo/Demos/Map")}
        >
          地图
        </Button>
      </div>
      <div
        onClick={() => {
          history.push("Demo/Demos/DemoFilpList");
        }}
        style={{ borderRadius: "100px", overflow: "hidden", width: 100 }}
      >
        <Image layout="responsive" width={200} height={200} src={one} alt="" />
      </div>
    </div>
  );
}
