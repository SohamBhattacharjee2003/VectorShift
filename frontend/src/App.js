import { PipelineToolbar } from './toolbar';
import { TabbedToolbar } from './components/TabbedToolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="h-screen flex flex-col" style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        animation: 'float 10s ease-in-out infinite',
        animationDelay: '2s',
        zIndex: 0,
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <header className="glass-effect" style={{ 
        background: '#ffffff',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ 
          padding: '1.25rem 2rem',
          maxWidth: '1920px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                animation: 'float 3s ease-in-out infinite'
              }}>⚡</div>
              <div>
                <h1 style={{ 
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
                  fontWeight: '800',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.25rem',
                  color: '#1f2937'
                }}>
                  VectorShift Pipeline Builder
                </h1>
                <p style={{ 
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)', 
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  Design • Analyze • Deploy Data Pipelines
                </p>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
                animation: 'pulseGlow 2s ease-in-out infinite'
              }}></div>
              <span style={{ 
                fontSize: '0.75rem', 
                color: '#10b981',
                fontWeight: '600',
                letterSpacing: '0.05em',
                textTransform: 'uppercase'
              }}>System Online</span>
            </div>
          </div>
        </div>
      </header>

      <TabbedToolbar />

      <main style={{ 
        flex: 1, 
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}>
        <PipelineUI />
      </main>

      {/* Submit Button (Fixed Position) */}
      <SubmitButton />
    </div>
  );
}

export default App;
