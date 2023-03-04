import { useRouter } from "next/router";
import Image from "next/image";
import Button from "components/PublicComponents/Button";
import { getTop3Dom } from "./JavaScriptDemo/FurryCode";
import Map from "./Demos/Map";
import React from "react";
import one from "assets/background/1.jpg";
export default function Demo() {
  const history = useRouter();
  React.useEffect(() => {
    const top3Dom = getTop3Dom();
    console.log(top3Dom);
  });
  const STYLE = 1;
  const CLASS = 1 << 1;
  const CHILDREN = 1 << 2;
  console.log(STYLE, CLASS, CHILDREN);
  let vnodeType = STYLE | CLASS;
  console.log(vnodeType);
  console.log(vnodeType & STYLE);
  console.log(vnodeType & CLASS);
  console.log(vnodeType & CHILDREN);
  vnodeType = vnodeType ^ CLASS;

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
