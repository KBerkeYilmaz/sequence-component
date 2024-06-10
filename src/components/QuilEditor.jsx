import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "highlight.js/styles/atom-one-dark.css";
import hljs from "highlight.js";
import katex from "katex";
import "katex/dist/katex.min.css";
import parse from "html-react-parser";
import QuillResizeImage from 'quill-resize-image';

// Ensure hljs and katex are available globally
window.hljs = hljs;
window.katex = katex;

const QuillEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const quillInstance = new Quill(editorRef.current, {
      modules: {
        syntax: { hljs }, // Syntax highlighting
        toolbar: [
          [{ font: [] }, { size: [] }],
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ direction: "rtl" }],
          ["link", "image", "video", "formula"],
          ["clean"],
        ],
      },
      placeholder: "Compose an epic...",
      theme: "snow",
    });
  }, []);

  return (
    <div>
      <div
        id="toolbar-container"
        style={{ borderTopRightRadius: "24px" }}
      ></div>
      <div
        id="editor"
        ref={editorRef}
        className="w-full max-w-[1020px] text-ellipsis"
        style={{
          height: "500px",
          overflowY: "auto",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      ></div>
    </div>
  );
};

export default QuillEditor;
