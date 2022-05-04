import React, { useState, useEffect } from "react";

import MarkDown from "../../components/MarkDownRender";

import Button from "../../components/PublicComponents/Button";
import ReactMD from "./markdown/JavaScript/React.md";
import Questions from "./markdown/JavaScript/questions.mdx";
import { DailyType } from "./type";

const Daily: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <div
        style={{
          backgroundColor: "#fff",
          // opacity: 0.8,
          padding: 24,
          margin: "20px 0",
        }}
      >
        <MarkDown>
          <Questions
          // components={{
          //   h1: (props: any) => (
          //     <h1 {...props} style={{ background: "#f66" }} />
          //   ),
          //   h2: (props: any) => (
          //     <h1 {...props} style={{ background: "#f66" }} />
          //   ),
          // }}
          />
        </MarkDown>
      </div>
    </div>
  );
};
export default Daily;
