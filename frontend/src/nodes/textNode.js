import { useEffect, useRef, useState } from "react";
import BaseNode from "./BaseNode";

const VARIABLE_REGEX = /{{\s*([a-zA-Z_$][\w$]*)\s*}}/g;

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  
  // 🔹 Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);

  // 🔹 Extract variables from {{variable}}
  useEffect(() => {
    const matches = [...text.matchAll(VARIABLE_REGEX)];
    const uniqueVars = [...new Set(matches.map(m => m[1]))];
    setVariables(uniqueVars);
  }, [text]);

  return (
    <BaseNode
      title="Text"
      inputs={["input", ...variables.map(v => `${id}-${v}`)]}
      outputs={[`${id}-output`]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text with {{variables}}"
        style={{
          width: "100%",
          resize: "none",
          overflow: "hidden"
        }}
      />
    </BaseNode>
  );
};
