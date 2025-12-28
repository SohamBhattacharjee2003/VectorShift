import { useState, useEffect } from "react";
import BaseNode from "./BaseNode";
import StaggeredDropDown from "../components/StaggeredDropDown";
import { useStore } from '../store/store';

export default function InputNode({ id, data }) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );
  
  const updateNodeField = useStore((state) => state.updateNodeField);
  const autoConnectNodes = useStore((state) => state.autoConnectNodes);

  useEffect(() => {
    updateNodeField(id, 'inputName', currName);
    autoConnectNodes();
  }, [currName, id, updateNodeField, autoConnectNodes]);

  return (
    <div style={{ position: 'relative' }}>
      <BaseNode
        id={id}
        title="Input"
        icon="⬇️"
        outputs={[`${id}-value`]}
      >
        <div style={{ fontSize: "8px", color: "#6b7280", marginBottom: "6px", lineHeight: "1.5" }}>
          Pass data of different types into your workflow
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '6px', justifyContent: 'center' }}>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            style={{ 
              background: "#ede9fe", 
              padding: "12px 12px", 
              borderRadius: "6px",
              fontSize: "11px",
              color: "#6366f1",
              fontWeight: "500",
              textAlign: "center",
              border: "1.5px solid #ddd6fe",
              width: 140,
              maxWidth: '90%',
              outline: "none",
              height: 36,
              boxShadow: currName ? '0 2px 8px #ddd6fe55' : 'none',
              transition: 'box-shadow 0.2s, border-color 0.2s',
              letterSpacing: 0.5,
              fontFamily: 'inherit',
              margin: '0 auto',
              display: 'block',
            }}
            onFocus={e => e.target.style.borderColor = '#6366f1'}
            onBlur={e => e.target.style.borderColor = '#ddd6fe'}
          />
        </div>

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
            <div style={{ fontSize: "8px", color: "#374151", fontWeight: "600", display: "flex", alignItems: "center", gap: "2px" }}>
              Type 
              <span style={{ color: "#9ca3af", fontSize: "7px" }}>ⓘ</span>
            </div>
            <div style={{ fontSize: "8px", color: "#6366f1", fontWeight: "500" }}>
              Dropdown
            </div>
          </div>
          <StaggeredDropDown
            value={inputType}
            onChange={(value) => setInputType(value)}
            options={[
              "Text",
              "File",
              "List of files",
              "List of lists of files",
              "Audio",
              "Image",
              "Knowledge Base",
              "Agent"
            ]}
          />
        </div>
      </BaseNode>
    </div>
  );
}
