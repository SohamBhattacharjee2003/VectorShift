// draggableNode.js

const colorSchemes = {
  purple: {
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    glow: '0 4px 15px rgba(139, 92, 246, 0.4)',
    hoverGlow: '0 6px 20px rgba(139, 92, 246, 0.6)'
  },
  green: {
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    glow: '0 4px 15px rgba(16, 185, 129, 0.4)',
    hoverGlow: '0 6px 20px rgba(16, 185, 129, 0.6)'
  },
  cyan: {
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    glow: '0 4px 15px rgba(6, 182, 212, 0.4)',
    hoverGlow: '0 6px 20px rgba(6, 182, 212, 0.6)'
  },
  amber: {
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    glow: '0 4px 15px rgba(245, 158, 11, 0.4)',
    hoverGlow: '0 6px 20px rgba(245, 158, 11, 0.6)'
  },
  pink: {
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    glow: '0 4px 15px rgba(236, 72, 153, 0.4)',
    hoverGlow: '0 6px 20px rgba(236, 72, 153, 0.6)'
  }
};

export const DraggableNode = ({ type, label, color = 'purple' }) => {
    const scheme = colorSchemes[color] || colorSchemes.purple;
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.target.style.transform = 'scale(0.95)';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
    
    const onDragEnd = (event) => {
      event.target.style.cursor = 'grab';
      event.target.style.transform = 'scale(1)';
    };
  
    return (
      <div
        className="futuristic-button"
        style={{ 
          background: scheme.gradient,
          color: 'white',
          padding: '0.4rem 0.75rem',
          borderRadius: '6px',
          boxShadow: scheme.glow,
          cursor: 'grab',
          userSelect: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          fontSize: '0.75rem',
          fontWeight: '600',
          letterSpacing: '0.025em',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap'
        }}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = scheme.hoverGlow;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = scheme.glow;
        }}
        draggable
      >
        {/* Shimmer effect overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          pointerEvents: 'none'
        }} className="shimmer-overlay"></div>
        
        <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
      </div>
    );
};