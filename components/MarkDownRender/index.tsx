import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";
const components = {
  // h1: (props: any) => <h1 {...props} style={{ background: "#f66" }} />,
  // h2: (props: any) => <h1 {...props} style={{ background: "#f66" }} />,
  Code: ({ className, ...props }: SyntaxHighlighterType) => {
    const match = /language-(\w+)/.exec(className || "");

    return match ? (
      <SyntaxHighlighter
        // style={dark}

        {...props}
        language={match[1]}
        PreTag="div"
        showLineNumbers
        startingLineNumber={1}
        lineNumberStyle={{ color: "#f66", fontSize: 20 }}
      />
    ) : (
      <code className={className} {...props} />
    );
  },
};

import remarkGfm from "remark-gfm";
type MDXProviderType = React.ComponentProps<typeof MDXProvider>;
type SyntaxHighlighterType = React.ComponentProps<typeof SyntaxHighlighter>;
type MarkDownType = Omit<MDXProviderType, "components">;
const MarkDown: React.FC<MarkDownType> = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};
export default MarkDown;
