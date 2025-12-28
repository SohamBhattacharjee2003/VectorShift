import { useState } from 'react';
import BaseNode from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="🧮"
      inputs={[`${id}-a`, `${id}-b`]}
      outputs={[`${id}-result`]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: "500" }}>
          Operation
        </div>
        <select
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            padding: "6px 8px",
            fontSize: "9px",
            color: "#374151",
            background: "white",
            cursor: "pointer"
          }}
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </div>
    </BaseNode>
  );
};