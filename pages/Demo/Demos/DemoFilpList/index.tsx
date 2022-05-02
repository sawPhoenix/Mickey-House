import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "components/PublicComponents/Button";

import List from "../../../../components/FlipList";
function shuffle([...arr]: any[]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m);
    m -= 1;
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

export default () => {
  const [items, setItems] = useState<any[]>([]);
  const handleAddClick = () => {
    const count = items.length + 1;
    setItems([count, ...items]);
  };
  const handleRemoveClick = () => {
    setItems((items) => items.slice(1));
  };
  const handleShuffleClick = () => {
    setItems((items) => shuffle(items));
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff",
          opacity: 0.8,
        }}
      >
        <div
          style={{
            margin: 20,
          }}
        >
          <Button btnType="primary" onClick={handleAddClick}>
            add Item
          </Button>
          <Button btnType="primary" onClick={handleRemoveClick}>
            remove Item
          </Button>
          <Button btnType="primary" onClick={handleShuffleClick}>
            shuffle Item
          </Button>
        </div>
        <div
          // onClick={() => {
          //   history.push("Demo/Demos/DemoFilpList");
          // }}
          style={{ borderRadius: "100px", overflow: "hidden", width: 100 }}
        >
          <List items={items} />
        </div>
      </div>
    </>
  );
};
