import { useState } from 'react';
import BaseNode from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: "500" }}>
          Condition
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
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
        </select>
      </div>
    </BaseNode>
  );
};