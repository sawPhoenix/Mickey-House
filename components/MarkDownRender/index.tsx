import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  fileKey: string; // 传入的文件路径
  MarkdownPathMap: Map<string, any>;
}
import styles from "./index.module.css";
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  fileKey,
  MarkdownPathMap,
}) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    setMarkdownContent(fileKey);
  }, [fileKey]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {MarkdownPathMap.get(markdownContent)}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
