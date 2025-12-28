// llmNode.js

import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
    >
      <div style={{
        padding: "8px",
        fontSize: "9px",
        color: "#6b7280",
        textAlign: "center",
        fontStyle: "italic"
      }}>
        This is an LLM node.
      </div>
    </BaseNode>
  );
};
