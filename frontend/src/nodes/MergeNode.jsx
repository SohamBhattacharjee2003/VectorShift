import BaseNode from './BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode      id={id}      title="Merge"
      icon="🔀"
      inputs={[`${id}-input1`, `${id}-input2`]}
      outputs={[`${id}-output`]}
    >
      <div style={{
        padding: "8px",
        fontSize: "9px",
        color: "#6b7280",
        textAlign: "center",
        fontStyle: "italic"
      }}>
        Merges two inputs
      </div>
    </BaseNode>
  );
};