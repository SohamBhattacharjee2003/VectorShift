// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { parseVariables } from '../utils/parseVariables';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Parse variables whenever text changes
    const extractedVars = parseVariables(currText);
    setVariables(extractedVars);
  }, [currText]);

  useEffect(() => {
    // Auto-resize textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div className="node">
      <div className="node-header">
        <span style={{ fontSize: "12px" }}>📝</span>
        <span>Text</span>
      </div>

      {/* Dynamic input handles based on parsed variables */}
      {variables.map((varName, index) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ 
            top: `${50 + (index * 20)}px`,
            background: '#6366f1'
          }}
        />
      ))}

      <div className="node-body">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontSize: "12px", color: "#6b7280", fontWeight: "500" }}>
            Text
          </div>
          <textarea
            ref={textareaRef}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "8px 10px",
              fontSize: "13px",
              color: "#374151",
              background: "white",
              resize: "none",
              minHeight: "80px",
              maxHeight: "400px",
              overflow: "auto",
              fontFamily: "monospace",
              outline: "none",
              width: "100%"
            }}
            value={currText}
            onChange={handleTextChange}
            onFocus={(e) => e.target.style.borderColor = "#d1d5db"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          {variables.length > 0 && (
            <div style={{ 
              fontSize: "10px", 
              color: "#6366f1", 
              marginTop: "4px",
              padding: "4px 6px",
              background: "#f5f3ff",
              borderRadius: "4px"
            }}>
              Variables: {variables.join(', ')}
            </div>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ top: "50%", background: '#6366f1' }}
      />
    </div>
  );
};
