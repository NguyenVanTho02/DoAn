import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddTextEditor = ({ handleValueText, editorHtmlProp }) => {
  const [html, setHtml] = useState(editorHtmlProp);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "image",
  ];

  const handleChange = (value) => {
    setHtml(value);
    handleValueText(value);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={html}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default AddTextEditor;
