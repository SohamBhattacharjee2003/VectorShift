import { useState } from 'react';
import BaseNode from './BaseNode';
import StaggeredDropDown from '../components/StaggeredDropDown';

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
        <StaggeredDropDown
          value={operation}
          onChange={(value) => setOperation(value)}
          options={[
            "add",
            "subtract",
            "multiply",
            "divide"
          ]}
        />
      </div>
    </BaseNode>
  );
};