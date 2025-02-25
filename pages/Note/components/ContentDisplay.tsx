// src/components/ContentDisplay.tsx

import React from "react";
import styles from "../index.module.css";
import MarkdownRenderer from "../MarkdownRenderer";
interface ContentDisplayProps {
  selectedKey: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ selectedKey }) => {
  return (
    <div className={styles[`content-display`]}>
      <MarkdownRenderer fileKey={selectedKey} />
    </div>
  );
};

export default ContentDisplay;
