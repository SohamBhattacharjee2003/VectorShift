import { useState } from 'react';
import BaseNode from './BaseNode';
import StaggeredDropDown from '../components/StaggeredDropDown';

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
        <StaggeredDropDown
          value={condition}
          onChange={(value) => setCondition(value)}
          options={[
            "contains",
            "equals",
            "startsWith",
            "endsWith"
          ]}
        />
      </div>
    </BaseNode>
  );
};