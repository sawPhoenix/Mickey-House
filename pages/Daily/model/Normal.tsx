import React, { useState } from "react";
import { DailyDataType } from "../type";
interface NormalProps {
  data: DailyDataType;
}
const Normal: React.FC<NormalProps> = ({ data }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        opacity: 0.8,
        padding: 24,
        margin: "20px 0",
      }}
    >
      <div>
        <h2> {data.title} </h2>
        <div>{data.date}</div>
        {data.content.map((item: string) => (
          <p style={{ textIndent: "2em" }} key={item}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};
export default Normal;
