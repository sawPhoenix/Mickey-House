import React, { useEffect, useState } from "react";
import MarkdownRender from "components/MarkDownRender";

// 数据

import basic from "./markdown/Brower/basic.md";
import computerBase from "./markdown/computerBase.md";
import prettier from "./markdown/config/prettier.md";
import Docker from "./markdown/Docker.md";
import httpBasic from "./markdown/Http/httpBasic.md";
import ES6 from "./markdown/JavaScript/basic/ES6.md";
import jsBase from "./markdown/JavaScript/basic/jsBase.md";
import jsScope from "./markdown/JavaScript/basic/jsScope.md";
import jsThis from "./markdown/JavaScript/basic/jsThis.md";
import questions from "./markdown/JavaScript/questions.md";
import ReactNote from "./markdown/JavaScript/ReactNote.md";
import readme from "./markdown/Node.js/readme.md";
import webpack from "./markdown/webpack/webpack.md";

import styles from "./index.module.css";
// ... existing imports ...

const MarkdownPathMap = new Map<string, any>([
  ["basic", basic],
  ["computerBase", computerBase],
  ["prettier", prettier],
  ["Docker", Docker],
  ["httpBasic", httpBasic],
  ["ES6", ES6],
  ["jsBase", jsBase],
  ["jsScope", jsScope],
  ["jsThis", jsThis],
  ["questions", questions],
  ["ReactNote", ReactNote],
  ["readme", readme],
  ["webpack", webpack],
]);

interface MarkdownRendererProps {
  fileKey: string; // 传入的文件路径
}
const MarkdownRendererWithNote: React.FC<MarkdownRendererProps> = ({
  fileKey,
}) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    setMarkdownContent(fileKey);
  }, [fileKey]);

  return (
    <div className={styles["markdown-container"]}>
      <MarkdownRender fileKey={fileKey} MarkdownPathMap={MarkdownPathMap} />
    </div>
  );
};

export default MarkdownRendererWithNote;
