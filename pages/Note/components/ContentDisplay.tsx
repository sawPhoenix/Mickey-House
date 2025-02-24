// src/components/ContentDisplay.tsx

import React from "react";
import styles from "../index.module.css";
interface ContentDisplayProps {
  content: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  return (
    <div className={styles[`content-display`]}>
      <h2>展示内容:</h2>
      <p>{content}</p>
    </div>
  );
};

export default ContentDisplay;
