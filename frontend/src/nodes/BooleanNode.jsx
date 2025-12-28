import { useState } from 'react';
import BaseNode from './BaseNode';

export const BooleanNode = ({ id, data }) => {
  const [value, setValue] = useState(data?.value || false);

  return (
    <BaseNode
      id={id}
      title="Boolean"
      icon="✅"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
          style={{ width: "14px", height: "14px", cursor: "pointer" }}
        />
        <span style={{ fontSize: "9px", color: "#374151", fontWeight: "500" }}>
          {value ? 'True' : 'False'}
        </span>
      </div>
    </BaseNode>
  );
};