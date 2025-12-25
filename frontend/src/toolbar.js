// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="glass-effect" style={{ 
            background: 'rgba(10, 10, 15, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(139, 92, 246, 0.15)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{ 
                padding: '0.75rem 1.25rem',
                maxWidth: '1920px',
                margin: '0 auto'
            }}>
                <h2 style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '700',
                    color: '#e2e8f0',
                    marginBottom: '0.625rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                }}>
                    <span style={{ 
                        fontSize: '0.875rem',
                        filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.6))'
                    }}>🛠️</span>
                    <span>Nodes</span>
                    <div style={{
                        flex: 1,
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.5) 0%, transparent 100%)',
                        borderRadius: '2px',
                        marginLeft: '0.5rem'
                    }}></div>
                </h2>
                
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '0.625rem',
                    width: '100%'
                }}>
                    {/* Input/Output Nodes */}
                    <div className="futuristic-card" style={{
                        background: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '6px',
                        padding: '0.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.5625rem',
                            fontWeight: '700',
                            color: '#10b981',
                            marginBottom: '0.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            <span style={{ fontSize: '0.75rem' }}>📥</span>
                            <span>I/O</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                            <DraggableNode type='customInput' label='Input' color='green' />
                            <DraggableNode type='customOutput' label='Output' color='green' />
                        </div>
                    </div>
                    
                    {/* Processing Nodes */}
                    <div className="futuristic-card" style={{
                        background: 'rgba(139, 92, 246, 0.08)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        borderRadius: '6px',
                        padding: '0.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.5625rem',
                            fontWeight: '700',
                            color: '#a78bfa',
                            marginBottom: '0.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            <span style={{ fontSize: '0.75rem' }}>🔮</span>
                            <span>Process</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                            <DraggableNode type='text' label='Text' color='purple' />
                            <DraggableNode type='llm' label='LLM' color='purple' />
                        </div>
                    </div>
                    
                    {/* Logic Nodes */}
                    <div className="futuristic-card" style={{
                        background: 'rgba(6, 182, 212, 0.08)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        borderRadius: '6px',
                        padding: '0.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.5625rem',
                            fontWeight: '700',
                            color: '#22d3ee',
                            marginBottom: '0.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            <span style={{ fontSize: '0.75rem' }}>🧮</span>
                            <span>Logic</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                            <DraggableNode type='boolean' label='Bool' color='cyan' />
                            <DraggableNode type='math' label='Math' color='cyan' />
                            <DraggableNode type='filter' label='Filter' color='cyan' />
                        </div>
                    </div>
                    
                    {/* Utility Nodes */}
                    <div className="futuristic-card" style={{
                        background: 'rgba(245, 158, 11, 0.08)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        borderRadius: '6px',
                        padding: '0.5rem'
                    }}>
                        <div style={{
                            fontSize: '0.5625rem',
                            fontWeight: '700',
                            color: '#fbbf24',
                            marginBottom: '0.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            <span style={{ fontSize: '0.75rem' }}>⚙️</span>
                            <span>Utility</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                            <DraggableNode type='delay' label='Delay' color='amber' />
                            <DraggableNode type='merge' label='Merge' color='amber' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
