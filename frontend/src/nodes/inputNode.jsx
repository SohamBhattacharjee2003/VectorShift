import { useState } from "react";
import BaseNode from "./BaseNode";

export default function InputNode({ id, data }) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="⬇️"
      outputs={[`${id}-value`]}
    >
      <div style={{ 
        fontSize: "8px",
        color: "#6b7280",
        marginBottom: "6px",
        lineHeight: "1.5"
      }}>
        Pass data of different types into your workflow
      </div>

      <input
        type="text"
        value={currName}
        onChange={(e) => setCurrName(e.target.value)}
        style={{ 
          background: "#ede9fe", 
          padding: "6px 8px", 
          borderRadius: "4px",
          marginBottom: "6px",
          fontSize: "9px",
          color: "#6366f1",
          fontWeight: "500",
          textAlign: "center",
          border: "1px solid #ddd6fe",
          width: "100%",
          outline: "none"
        }}
      />

      <div style={{ 
        padding: "6px 8px", 
        borderRadius: "4px",
        marginBottom: "6px",
        fontSize: "8px",
        color: "#6366f1",
        border: "1px solid #e0e7ff",
        background: "white"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
          <span style={{ fontSize: "9px" }}>💡</span>
          <div>
            <span style={{ fontWeight: "600" }}>Suggestion:</span>
            <span style={{ fontWeight: "400", color: "#6366f1" }}> Give the node a distinct name</span>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "5px", color: "#374151", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
            Type 
            <span style={{ color: "#9ca3af", fontSize: "5px" }}>ⓘ</span>
          </div>
          <div style={{ fontSize: "5px", color: "#6366f1", fontWeight: "500" }}>
            Dropdown
          </div>
        </div>
        <select
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "9px 12px",
            fontSize: "9px",
            color: "#1f2937",
            background: "white",
            cursor: "pointer",
            width: "100%",
            outline: "none",
            appearance: "none",
            backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%235b21b6%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "9px",
            paddingRight: "28px",
            fontWeight: "400"
          }}
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          onFocus={(e) => {
            e.target.style.borderColor = "#d1d5db";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e5e7eb";
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
          <option value="List of files">List of files</option>
          <option value="List of lists of files">List of lists of files</option>
          <option value="Audio">Audio</option>
          <option value="Image">Image</option>
          <option value="Knowledge Base">Knowledge Base</option>
          <option value="Agent">Agent</option>
        </select>
      </div>
    </BaseNode>
  );
}
