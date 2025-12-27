// submit.js

import { useState } from 'react';
import { useStore } from './store/store';
import { AlertModal } from './components/AlertModal';

export const SubmitButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            // Prepare the pipeline data
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    data: node.data
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target
                }))
            };

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setAnalysisData(data);
            setIsModalOpen(true);
        } catch (err) {
            console.error('Error submitting pipeline:', err);
            // Show error in modal format
            setAnalysisData({
                num_nodes: 0,
                num_edges: 0,
                is_dag: false,
                error: `Failed to analyze pipeline: ${err.message}`
            });
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div style={{ 
                position: 'fixed', 
                bottom: '1.5rem', 
                left: '50%', 
                transform: 'translateX(-50%)',
                zIndex: 50 
            }}>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="futuristic-button pulse-glow"
                    style={{ 
                        background: isLoading 
                            ? 'linear-gradient(135deg, #6b7280, #4b5563)'
                            : 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.75rem',
                        fontWeight: '700',
                        fontSize: '0.875rem',
                        boxShadow: isLoading 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                            : '0 4px 12px rgba(16, 185, 129, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        position: 'relative',
                        overflow: 'hidden',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        letterSpacing: '0.025em'
                    }}
                    onMouseEnter={(e) => {
                        if (!isLoading) {
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.6)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = isLoading 
                            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                            : '0 4px 12px rgba(16, 185, 129, 0.5)';
                    }}
                >
                    {/* Animated background pulse */}
                    {!isLoading && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '200%',
                            height: '200%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                            animation: 'pulseScale 2s ease-in-out infinite',
                            pointerEvents: 'none'
                        }}></div>
                    )}
                    
                    {isLoading ? (
                        <>
                            <div className="spinner" style={{
                                width: '14px',
                                height: '14px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderTopColor: 'white',
                                borderRadius: '50%'
                            }}></div>
                            <span style={{ position: 'relative', zIndex: 1 }}>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <span style={{ 
                                fontSize: '0.875rem',
                                filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.5))',
                                position: 'relative',
                                zIndex: 1
                            }}>🚀</span>
                            <span style={{ position: 'relative', zIndex: 1 }}>Submit</span>
                        </>
                    )}
                </button>
            </div>

            <AlertModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={analysisData}
            />
            
            {/* Add keyframe for pulse animation */}
            <style>{`
                @keyframes pulseScale {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
                }
            `}</style>
        </>
    );
};
