import { useState } from 'react';
import BaseNode from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon="⏱️"
      inputs={[`${id}-input`]}
      outputs={[`${id}-output`]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: "500" }}>
          Delay (ms)
        </div>
        <input
          type="number"
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            padding: "6px 8px",
            fontSize: "9px",
            color: "#374151",
            background: "white",
            outline: "none"
          }}
          value={delay}
          onChange={(e) => setDelay(parseInt(e.target.value))}
          onFocus={(e) => e.target.style.borderColor = "#d1d5db"}
          onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          min="0"
        />
      </div>
    </BaseNode>
  );
};