import { useState, useEffect, useRef } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store/store';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4');
  const [temperature, setTemperature] = useState(data?.temperature || 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens || 1000);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const updateNodeField = useStore((state) => state.updateNodeField);

  const models = [
    { value: 'gpt-4', label: 'GPT-4', icon: '🚀', color: '#10b981' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo', icon: '⚡', color: '#3b82f6' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', icon: '💨', color: '#06b6d4' },
    { value: 'claude-3-opus', label: 'Claude 3 Opus', icon: '🎭', color: '#8b5cf6' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet', icon: '🎨', color: '#a855f7' },
    { value: 'gemini-pro', label: 'Gemini Pro', icon: '💎', color: '#ec4899' }
  ];

  const selectedModel = models.find(m => m.value === model);

  // Update store when values change
  useEffect(() => {
    updateNodeField(id, 'model', model);
  }, [model, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'temperature', temperature);
  }, [temperature, id, updateNodeField]);

  useEffect(() => {
    updateNodeField(id, 'maxTokens', maxTokens);
  }, [maxTokens, id, updateNodeField]);

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[
        { id: `${id}-system`, label: 'system' },
        { id: `${id}-prompt`, label: 'prompt' }
      ]}
      outputs={[{ id: `${id}-response`, label: 'response' }]}
      headerColor="from-purple-500 to-indigo-600"
      minWidth="140px"
      style={{ overflow: 'visible' }}
    >
      <div style={{ width: '100%', padding: '0.15rem' }}>
        {/* Model Selection - Custom Futuristic Dropdown */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', marginBottom: '0.25rem' }}>
          <span style={{ 
            fontSize: '0.4rem', 
            fontWeight: '700', 
            color: '#a855f7',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '0.05rem'
          }}>
            AI Model
          </span>
          
          {/* Custom Dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            {/* Dropdown Button */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${selectedModel?.color}15, ${selectedModel?.color}25)`,
                border: `1px solid ${selectedModel?.color}40`,
                borderRadius: '0.3rem',
                padding: '0.25rem 0.4rem',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: isDropdownOpen ? `0 0 8px ${selectedModel?.color}40` : `0 2px 4px rgba(0,0,0,0.1)`,
                backdropFilter: 'blur(8px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = selectedModel?.color;
                e.currentTarget.style.boxShadow = `0 0 12px ${selectedModel?.color}50`;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${selectedModel?.color}40`;
                e.currentTarget.style.boxShadow = isDropdownOpen ? `0 0 8px ${selectedModel?.color}40` : `0 2px 4px rgba(0,0,0,0.1)`;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Animated background gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '200%',
                height: '100%',
                background: `linear-gradient(90deg, transparent, ${selectedModel?.color}20, transparent)`,
                animation: 'shimmer 2s infinite',
                pointerEvents: 'none'
              }} />
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ fontSize: '0.6rem' }}>{selectedModel?.icon}</span>
                  <span style={{ 
                    fontSize: '0.45rem', 
                    fontWeight: '700',
                    color: selectedModel?.color,
                    textShadow: `0 0 8px ${selectedModel?.color}40`
                  }}>
                    {selectedModel?.label}
                  </span>
                </div>
                <span style={{ 
                  fontSize: '0.4rem',
                  color: selectedModel?.color,
                  transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  display: 'inline-block'
                }}>
                  ▼
                </span>
              </div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.2rem)',
                left: 0,
                right: 0,
                background: 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '0.3rem',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(168, 85, 247, 0.1)',
                zIndex: 9999,
                overflow: 'visible',
                animation: 'dropdownSlide 0.2s ease-out',
                maxHeight: 'none'
              }}>
                {models.map((m, index) => (
                  <div
                    key={m.value}
                    onClick={() => {
                      setModel(m.value);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      padding: '0.3rem 0.4rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: model === m.value ? `linear-gradient(90deg, ${m.color}20, ${m.color}10)` : 'transparent',
                      borderLeft: model === m.value ? `2px solid ${m.color}` : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `fadeIn 0.2s ease-out ${index * 0.03}s backwards`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(90deg, ${m.color}30, ${m.color}15)`;
                      e.currentTarget.style.borderLeftColor = m.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = model === m.value ? `linear-gradient(90deg, ${m.color}20, ${m.color}10)` : 'transparent';
                      e.currentTarget.style.borderLeftColor = model === m.value ? m.color : 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '0.6rem' }}>{m.icon}</span>
                    <span style={{ 
                      fontSize: '0.45rem',
                      fontWeight: model === m.value ? '700' : '500',
                      color: model === m.value ? m.color : '#e5e7eb',
                      textShadow: model === m.value ? `0 0 6px ${m.color}30` : 'none',
                      flex: 1
                    }}>
                      {m.label}
                    </span>
                    {model === m.value && (
                      <span style={{ 
                        fontSize: '0.5rem',
                        color: m.color,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}>
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </label>

        {/* Add keyframe animations */}
        <style>{`
          @keyframes dropdownSlide {
            from {
              opacity: 0;
              transform: translateY(-0.5rem);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(-0.5rem);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
          }
        `}</style>

        {/* Temperature */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', marginBottom: '0.25rem' }}>
          <span style={{ 
            fontSize: '0.4rem', 
            fontWeight: '600', 
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Temperature: {temperature}
          </span>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            style={{
              width: '100%',
              cursor: 'pointer',
              accentColor: '#a855f7'
            }}
          />
        </label>

        {/* Max Tokens */}
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <span style={{ 
            fontSize: '0.4rem', 
            fontWeight: '600', 
            color: '#6b7280',
            textAlign: 'center'
          }}>
            Max Tokens
          </span>
          <input
            type="number"
            min="1"
            max="4000"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value) || 1000)}
            style={{
              width: '100%',
              border: '1px solid #d1d5db',
              borderRadius: '0.2rem',
              padding: '0.2rem 0.3rem',
              fontSize: '0.4rem',
              outline: 'none',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#e2e8f0',
              textAlign: 'center'
            }}
            onFocus={(e) => e.target.style.borderColor = '#a855f7'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </label>

        <div style={{ 
          fontSize: '0.35rem', 
          color: '#9ca3af', 
          textAlign: 'center',
          marginTop: '0.2rem'
        }}>
          AI text generation
        </div>
      </div>
    </BaseNode>
  );
};
