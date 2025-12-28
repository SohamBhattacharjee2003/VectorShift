import { useState } from 'react';
import BaseNode from './BaseNode';
import StaggeredDropDown from '../components/StaggeredDropDown';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || "gpt-4");

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontSize: "8px", color: "#6b7280", marginBottom: "2px" }}>
          Configure the language model for text generation
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontSize: "9px", color: "#374151", fontWeight: "600" }}>
            Model
          </div>
          <StaggeredDropDown
            value={model}
            onChange={(value) => setModel(value)}
            options={[
              "gpt-4",
              "gpt-4-turbo",
              "gpt-3.5-turbo",
              "claude-3-opus",
              "claude-3-sonnet",
              "claude-2",
              "llama-2-70b",
              "mistral-large"
            ]}
          />
        </div>
      </div>
    </BaseNode>
  );
};
