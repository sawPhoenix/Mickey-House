import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  filePath: string; // 传入的文件路径
}
import styles from "./index.module.css";
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ filePath }) => {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(filePath);
        if (response.ok) {
          const text = await response.text();
          setMarkdownContent(text);
        } else {
          console.error("Failed to load markdown file");
        }
      } catch (error) {
        console.error("Error fetching markdown file:", error);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  return (
    <div className={styles["markdown-container"]}>
      <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default MarkdownRenderer;
