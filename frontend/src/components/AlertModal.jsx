import React from 'react';

/**
 * AlertModal - A futuristic modal dialog component for displaying pipeline analysis results
 */
export const AlertModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const { num_nodes, num_edges, is_dag } = data || {};

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(10, 10, 15, 0.9)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        className="futuristic-card"
        style={{ 
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '1.5rem', 
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.2)',
          maxWidth: '32rem', 
          width: '90%',
          margin: '0 1rem',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          animation: 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect at top */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #8b5cf6, #06b6d4, transparent)',
          filter: 'blur(2px)'
        }}></div>

        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          color: 'white', 
          padding: '1.5rem 2rem', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Header shimmer */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            animation: 'shimmer 3s infinite'
          }}></div>
          
          <h2 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
            fontWeight: '800', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            position: 'relative',
            zIndex: 1,
            letterSpacing: '-0.02em'
          }}>
            <span style={{ 
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))'
            }}>📊</span>
            Pipeline Analysis
          </h2>
          <p style={{
            fontSize: '0.875rem',
            opacity: 0.9,
            marginTop: '0.5rem',
            position: 'relative',
            zIndex: 1
          }}>
            Comprehensive analysis results
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }}>
          {/* Statistics Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '12px', 
              padding: '1.25rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '80px',
                height: '80px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}></div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#94a3b8', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>Nodes</div>
              <div style={{ 
                fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
                fontWeight: '800', 
                color: '#10b981',
                textShadow: '0 0 20px rgba(16, 185, 129, 0.5)',
                position: 'relative',
                zIndex: 1
              }}>{num_nodes}</div>
            </div>
            
            <div style={{ 
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '12px', 
              padding: '1.25rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '80px',
                height: '80px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}></div>
              <div style={{ 
                fontSize: '0.75rem', 
                color: '#94a3b8', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}>Edges</div>
              <div style={{ 
                fontSize: 'clamp(2rem, 5vw, 2.5rem)', 
                fontWeight: '800', 
                color: '#06b6d4',
                textShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
                position: 'relative',
                zIndex: 1
              }}>{num_edges}</div>
            </div>
          </div>

          {/* DAG Status */}
          <div style={{ 
            border: `2px solid ${is_dag ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`,
            borderRadius: '12px', 
            padding: '1.25rem',
            backgroundColor: is_dag ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            marginBottom: '1.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: is_dag 
                ? 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.15) 0%, transparent 50%)'
                : 'radial-gradient(circle at top right, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
              <span style={{ 
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                filter: 'drop-shadow(0 0 10px currentColor)',
                animation: is_dag ? 'float 3s ease-in-out infinite' : 'none'
              }}>
                {is_dag ? '✅' : '❌'}
              </span>
              <div>
                <div style={{ 
                  fontWeight: '700', 
                  color: '#e2e8f0',
                  fontSize: '1.125rem',
                  marginBottom: '0.5rem'
                }}>
                  {is_dag ? 'Valid DAG Structure' : 'Not a DAG'}
                </div>
                <div style={{ 
                  fontSize: '0.875rem', 
                  color: '#94a3b8',
                  lineHeight: '1.5'
                }}>
                  {is_dag 
                    ? 'Your pipeline is a valid Directed Acyclic Graph. No cycles detected!' 
                    : 'Warning: Your pipeline contains cycles. This is not a valid DAG.'}
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div style={{ 
            background: 'rgba(139, 92, 246, 0.08)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '12px', 
            padding: '1.25rem'
          }}>
            <div style={{ fontSize: '0.8125rem', color: '#cbd5e1' }}>
              <p style={{ 
                fontWeight: '700', 
                marginBottom: '0.75rem',
                color: '#e2e8f0',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>📋 Pipeline Summary</p>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#8b5cf6' }}>▸</span>
                  Total nodes in pipeline: <span style={{ fontWeight: '700', color: '#e2e8f0' }}>{num_nodes}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#06b6d4' }}>▸</span>
                  Total connections: <span style={{ fontWeight: '700', color: '#e2e8f0' }}>{num_edges}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: is_dag ? '#10b981' : '#ef4444' }}>▸</span>
                  Graph validity: <span style={{ 
                    fontWeight: '700', 
                    color: is_dag ? '#10b981' : '#ef4444'
                  }}>
                    {is_dag ? 'Valid' : 'Invalid (contains cycles)'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '1.25rem 2rem 1.75rem', 
          background: 'rgba(10, 10, 15, 0.5)',
          display: 'flex', 
          justifyContent: 'flex-end',
          borderTop: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <button
            onClick={onClose}
            className="futuristic-button"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '0.75rem',
              fontWeight: '700',
              fontSize: '0.9375rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              letterSpacing: '0.025em'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AlertModal;
