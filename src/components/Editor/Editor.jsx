import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import "./styles.css";
window.Quill = Quill;
Quill.register("modules/imageResize", ImageResize);

const Editor = ({
  value = "",
  onChange,
  placeholder = "Write something...",
}) => {
  const [editorHtml, setEditorHtml] = useState(value);
  const quillRef = useRef(null);

  const handleChange = useCallback(
    (html) => {
      setEditorHtml(html);
      if (onChange) {
        onChange(html);
      }
    },
    [onChange],
  );

  useEffect(() => {
    if (quillRef.current) {
      const quillEditor = quillRef.current.getEditor();
      quillEditor.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={editorHtml}
      onChange={handleChange}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={"#root"}
      placeholder={placeholder}
    />
  );
};

Editor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: true,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "align",
  "color",
  "background",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default Editor;
