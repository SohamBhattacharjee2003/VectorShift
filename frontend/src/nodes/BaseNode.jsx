import { Handle, Position } from "reactflow";

/**
 * BaseNode - A flexible, reusable node abstraction component
 * 
 * Features:
 * - Dynamic handle positioning (evenly distributed)
 * - Support for custom handle configurations
 * - Flexible styling through props
 * - Icon support for visual identification
 * - Consistent design patterns across all nodes
 */
export default function BaseNode({
  title,
  icon,
  inputs = [],
  outputs = [],
  children,
  className = "",
  headerColor = "from-blue-500 to-indigo-600",
  minWidth = "90px",
  minHeight = "auto",
}) {
  // Calculate handle positions to distribute them evenly
  const getHandleStyle = (index, total) => {
    if (total === 1) return { top: "50%" };
    return { top: `${((index + 1) / (total + 1)) * 100}%` };
  };

  return (
    <div
      className="futuristic-card"
      style={{ 
        minWidth, 
        minHeight,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '4px',
        boxShadow: '0 1px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(139, 92, 246, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(139, 92, 246, 0.2)';
      }}
    >
      {/* Glow effect at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.8), transparent)',
        filter: 'blur(2px)',
        pointerEvents: 'none'
      }}></div>

      {/* Node Header */}
      <div 
        style={{ 
          background: headerColor.includes('blue') ? 'linear-gradient(135deg, #3b82f6, #2563eb)' :
                     headerColor.includes('green') ? 'linear-gradient(135deg, #10b981, #059669)' :
                     headerColor.includes('purple') ? 'linear-gradient(135deg, #a855f7, #7c3aed)' :
                     headerColor.includes('amber') ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                     headerColor.includes('indigo') ? 'linear-gradient(135deg, #6366f1, #4f46e5)' :
                     headerColor.includes('red') ? 'linear-gradient(135deg, #ef4444, #dc2626)' :
                     headerColor.includes('cyan') ? 'linear-gradient(135deg, #06b6d4, #0891b2)' :
                     headerColor.includes('pink') ? 'linear-gradient(135deg, #ec4899, #db2777)' :
                     'linear-gradient(135deg, #6366f1, #4f46e5)',
          color: 'white',
          padding: '0.15rem 0.25rem',
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          fontWeight: '600',
          fontSize: '0.4375rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.1rem',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          letterSpacing: '0.025em'
        }}
      >
        {/* Header shimmer effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          animation: 'shimmer 3s infinite',
          pointerEvents: 'none'
        }}></div>
        
        {icon && <span style={{ 
          fontSize: '0.5rem',
          position: 'relative',
          zIndex: 1
        }}>{icon}</span>}
        <span style={{ position: 'relative', zIndex: 1 }}>{title}</span>
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => {
        const handleId = typeof input === "string" ? input : input.id;
        const handleLabel = typeof input === "object" ? input.label : null;
        const style = typeof input === "object" && input.style 
          ? input.style 
          : getHandleStyle(index, inputs.length);

        return (
          <div key={handleId}>
            <Handle
              type="target"
              position={Position.Left}
              id={handleId}
              style={{ 
                ...style, 
                width: '5px', 
                height: '5px', 
                backgroundColor: '#3b82f6', 
                border: '1px solid rgba(15, 23, 42, 0.9)',
                boxShadow: '0 0 3px rgba(59, 130, 246, 0.5)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'crosshair'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.3)';
                e.target.style.boxShadow = '0 0 12px rgba(59, 130, 246, 0.8), 0 0 24px rgba(59, 130, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 0 8px rgba(59, 130, 246, 0.6), 0 0 16px rgba(59, 130, 246, 0.3)';
              }}
            />
            {handleLabel && (
              <div
                style={{ 
                  left: "10px", 
                  ...style, 
                  transform: "translateY(-50%)", 
                  fontSize: '0.5rem', 
                  color: '#94a3b8', 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  padding: '0.05rem 0.15rem', 
                  borderRadius: '2px', 
                  position: 'absolute',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  fontWeight: '600',
                  letterSpacing: '0.025em',
                  whiteSpace: 'nowrap'
                }}
              >
                {handleLabel}
              </div>
            )}
          </div>
        );
      })}

      {/* Node Body */}
      <div style={{ 
        padding: '0.2rem',
        background: 'rgba(10, 10, 15, 0.3)',
        fontSize: '0.5rem',
        lineHeight: '1.15'
      }}>{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => {
        const handleId = typeof output === "string" ? output : output.id;
        const handleLabel = typeof output === "object" ? output.label : null;
        const style = typeof output === "object" && output.style 
          ? output.style 
          : getHandleStyle(index, outputs.length);

        return (
          <div key={handleId}>
            <Handle
              type="source"
              position={Position.Right}
              id={handleId}
              style={{ 
                ...style, 
                width: '5px', 
                height: '5px', 
                backgroundColor: '#10b981', 
                border: '1px solid rgba(15, 23, 42, 0.9)',
                boxShadow: '0 0 3px rgba(16, 185, 129, 0.5)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'crosshair'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.3)';
                e.target.style.boxShadow = '0 0 12px rgba(16, 185, 129, 0.8), 0 0 24px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 0 8px rgba(16, 185, 129, 0.6), 0 0 16px rgba(16, 185, 129, 0.3)';
              }}
            />
            {handleLabel && (
              <div
                style={{ 
                  right: "10px", 
                  ...style, 
                  transform: "translateY(-50%)", 
                  fontSize: '0.5rem', 
                  color: '#94a3b8', 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  padding: '0.05rem 0.15rem', 
                  borderRadius: '2px', 
                  position: 'absolute',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontWeight: '600',
                  letterSpacing: '0.025em',
                  whiteSpace: 'nowrap'
                }}
              >
                {handleLabel}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
