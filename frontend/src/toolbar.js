import { DraggableNode } from './draggableNode';
import { useStore } from './store/store';

export const PipelineToolbar = () => {
    const clearAll = useStore((state) => state.clearAll);
    const nodes = useStore((state) => state.nodes);

    return (
        <div className="glass-effect" style={{ 
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{ 
                padding: '20px 32px',
                maxWidth: '1920px',
                margin: '0 auto'
            }}>
                <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h2 style={{ 
                        fontSize: '13px', 
                        fontWeight: '600',
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase'
                    }}>
                        <span>Nodes</span>
                    </h2>
                    
                    {nodes.length > 0 && (
                        <button
                            onClick={clearAll}
                            style={{
                                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '6px 14px',
                                fontSize: '11px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 4px 8px rgba(239, 68, 68, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 2px 4px rgba(239, 68, 68, 0.3)';
                            }}
                        >
                            🗑️ Clear All
                        </button>
                    )}
                </div>
                
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    width: '100%'
                }}>
                    {/* Input/Output Nodes */}
                    <div className="futuristic-card">
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            I/O
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <DraggableNode type='customInput' label='Input' color='green' />
                            <DraggableNode type='customOutput' label='Output' color='green' />
                        </div>
                    </div>
                    
                    {/* Processing Nodes */}
                    <div className="futuristic-card">
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Process
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <DraggableNode type='text' label='Text' color='purple' />
                            <DraggableNode type='llm' label='LLM' color='purple' />
                        </div>
                    </div>
                    
                    {/* Logic Nodes */}
                    <div className="futuristic-card">
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Logic
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <DraggableNode type='boolean' label='Bool' color='cyan' />
                            <DraggableNode type='math' label='Math' color='cyan' />
                            <DraggableNode type='filter' label='Filter' color='cyan' />
                        </div>
                    </div>
                    
                    {/* Utility Nodes */}
                    <div className="futuristic-card">
                        <div style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#6b7280',
                            marginBottom: '10px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Utility
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <DraggableNode type='delay' label='Delay' color='amber' />
                            <DraggableNode type='merge' label='Merge' color='amber' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
