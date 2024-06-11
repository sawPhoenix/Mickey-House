import React, { useState, useEffect } from "react";

import Button from "../../components/PublicComponents/Button";
import ReactMD from "./markdown/JavaScript/React.md";
// import MarkDownRender from "../../components/MarkDownRender";
import Questions from "./markdown/JavaScript/questions.mdx";
import { DailyType } from "./type";
const components = {
  h1: (props: any) => (
    <h1 {...props} style={{ background: "#f66", color: "#ccc" }} />
  ),
  h2: (props: any) => <h1 {...props} style={{ background: "#f66" }} />,
  //   Code: ({ className, ...props }: SyntaxHighlighterType) => {
  //     const match = /language-(\w+)/.exec(className || "");
  //     return match ? (
  //       <SyntaxHighlighter
  //         // style={dark}
  //         {...props}
  //         language={match[1]}
  //         PreTag="div"
  //         showLineNumbers
  //         startingLineNumber={1}
  //         lineNumberStyle={{ color: "#f66", fontSize: 20 }}
  //       />
  //     ) : (
  //       <code className={className} {...props} />
  //     );
  //   },
};
const Daily: React.FC = () => {
  console.log("ReactMD", ReactMD({}));
  // const data = marked.parse()
  return (
    <div style={{ padding: 24, background: "rgba(255,255,255,0.5)" }}>
      <div

      // style={{
      //   backgroundColor: "#fff",
      //   // opacity: 0.8,
      //   padding: 24,
      //   margin: "20px 0",
      // }}
      >
        {/* {marked.parse(ReactMD)} */}
        {/* {ReactMD({})} */}
        {}
        {/* <MarkDownRender>{ReactMD({ components })}</MarkDownRender> */}
      </div>
    </div>
  );
};
export default Daily;
