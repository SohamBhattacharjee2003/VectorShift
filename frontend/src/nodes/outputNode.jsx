// outputNode.js

import { useState } from 'react';
import BaseNode from './BaseNode';
import StaggeredDropDown from '../components/StaggeredDropDown';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="⬆️"
      inputs={[`${id}-value`]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: "500" }}>
            Name
          </div>
          <input
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "6px 8px",
              fontSize: "9px",
              color: "#374151",
              background: "white"
            }}
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: "500" }}>
            Type
          </div>
          <StaggeredDropDown
            value={outputType}
            onChange={(value) => setOutputType(value)}
            options={[
              "Text",
              "Image"
            ]}
          />
        </label>
      </div>
    </BaseNode>
  );
};
