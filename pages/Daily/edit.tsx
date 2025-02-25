import { useState } from "react";

export default function Editor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("请填写标题和内容");
      return;
    }

    try {
      const response = await fetch("/api/saveNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert("保存成功！");
        setTitle("");
        setContent("");
      } else {
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      alert(`保存失败: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>文章编辑器</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="输入标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            fontSize: "16px",
          }}
        />
        <textarea
          placeholder="输入内容（支持多行）"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            height: "300px",
            padding: "10px",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        保存文章
      </button>
    </div>
  );
}
