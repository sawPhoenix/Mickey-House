import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "components/PublicComponents/Button";

import List from "../../../../components/FilpList";
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
  const [items, setItems] = useState<string[]>([]);
  const handleAddClick = () => {
    setItems((items) => ["1233123", ...items]);
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
          <Button onClick={handleAddClick}>add Item</Button>
          <Button onClick={handleRemoveClick}>remove Item</Button>
          <Button onClick={handleShuffleClick}>shuffle Item</Button>
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
