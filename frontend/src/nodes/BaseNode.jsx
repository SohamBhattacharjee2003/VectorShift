import { Handle, Position } from "reactflow";
import { useStore } from "../store/store";

export default function BaseNode({
  id,
  title,
  icon = "📦",
  inputs = [],
  outputs = [],
  children,
}) {
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div className="node">
      <div className="node-header">
        <span style={{ fontSize: "12px" }}>{icon}</span>
        <span>{title}</span>
        {id && (
          <button
            onClick={() => deleteNode(id)}
            style={{
              marginLeft: "auto",
              background: "transparent",
              border: "none",
              color: "#ef4444",
              cursor: "pointer",
              fontSize: "12px",
              padding: "0 4px",
              borderRadius: "3px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#fee2e2";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "scale(1)";
            }}
            title="Delete node"
          >
            ✕
          </button>
        )}
      </div>

      {inputs.map((id) => (
        <Handle
          key={id}
          type="target"
          position={Position.Left}
          id={id}
          style={{ top: "50%" }}
        />
      ))}

      <div className="node-body">{children}</div>

      {outputs.map((id) => (
        <Handle
          key={id}
          type="source"
          position={Position.Right}
          id={id}
          style={{ top: "50%" }}
        />
      ))}
    </div>
  );
}
