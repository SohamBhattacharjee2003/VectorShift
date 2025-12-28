import { useState } from 'react';
import { DraggableNode } from '../draggableNode';
import { useStore } from '../store/store';

const categories = {
  'VectorShift': [
    { type: 'customInput', label: 'Input', color: 'green', icon: '⬇️' },
    { type: 'customOutput', label: 'Output', color: 'green', icon: '⬆️' },
    { type: 'text', label: 'Text', color: 'green', icon: '📝' },
    { type: 'llm', label: 'LLM', color: 'green', icon: '🤖' },
  ],
  'AI': [
    { type: 'llm', label: 'OpenAI', color: 'blue', icon: '🔮' },
    { type: 'llm', label: 'Anthropic', color: 'blue', icon: 'A' },
    { type: 'llm', label: 'Google', color: 'blue', icon: 'G' },
    { type: 'llm', label: 'Cohere', color: 'blue', icon: '🎯' },
  ],
  'Logic': [
    { type: 'boolean', label: 'Condition', color: 'orange', icon: '⇄' },
    { type: 'filter', label: 'Filter', color: 'orange', icon: '🔍' },
    { type: 'math', label: 'Math', color: 'orange', icon: '🧮' },
    { type: 'merge', label: 'Merge', color: 'orange', icon: '→' },
  ],
  'Data': [
    { type: 'text', label: 'API', color: 'yellow', icon: '🔌' },
    { type: 'text', label: 'WebSearch', color: 'yellow', icon: '🌐' },
    { type: 'text', label: 'File', color: 'yellow', icon: '📄' },
    { type: 'delay', label: 'Time', color: 'yellow', icon: '🕐' },
  ],
  'Integrations': [
    { type: 'text', label: 'Airtable', color: 'pink', icon: '📊' },
    { type: 'text', label: 'Discord', color: 'pink', icon: '💬' },
    { type: 'text', label: 'Dropbox', color: 'pink', icon: '📦' },
    { type: 'text', label: 'AWS', color: 'pink', icon: '☁️' },
  ]
};

export const TabbedToolbar = () => {
  const [activeTab, setActiveTab] = useState('VectorShift');
  const [searchQuery, setSearchQuery] = useState('');
  const clearAll = useStore((state) => state.clearAll);
  const nodes = useStore((state) => state.nodes);

  const filteredNodes = categories[activeTab]?.filter(node =>
    node.label.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{
        padding: '16px 24px',
        maxWidth: '1920px',
        margin: '0 auto'
      }}>
        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '16px'
        }}>
          <div style={{
            position: 'relative',
            flex: '0 0 280px'
          }}>
            <input
              type="text"
              placeholder="Search Nodes"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 38px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                color: '#6b7280',
                outline: 'none',
                background: 'white'
              }}
              onFocus={(e) => e.target.style.borderColor = '#d1d5db'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '16px',
              color: '#9ca3af'
            }}>🔍</span>
          </div>

          {/* Clear All Button */}
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
                letterSpacing: '0.05em',
                marginLeft: 'auto'
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

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '32px',
          marginBottom: '20px',
          borderBottom: '1px solid #f3f4f6',
          paddingBottom: '0'
        }}>
          {Object.keys(categories).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                fontSize: '14px',
                fontWeight: '500',
                color: activeTab === tab ? '#6366f1' : '#6b7280',
                cursor: 'pointer',
                position: 'relative',
                transition: 'color 0.2s',
                borderBottom: activeTab === tab ? '2px solid #6366f1' : '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) e.target.style.color = '#6b7280';
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Node Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '12px',
          padding: '8px 0'
        }}>
          {filteredNodes.map((node, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <DraggableNode
                type={node.type}
                label={node.label}
                color={node.color}
              />
            </div>
          ))}
        </div>

        {filteredNodes.length === 0 && searchQuery && (
          <div style={{
            textAlign: 'center',
            padding: '32px',
            color: '#9ca3af',
            fontSize: '13px'
          }}>
            No nodes found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
