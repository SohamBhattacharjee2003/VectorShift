import { useState, useEffect, useRef } from 'react';
import BaseNode from './BaseNode';
import { parseVariables } from '../utils/parseVariables';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 250, height: 'auto' });
  const textareaRef = useRef(null);

  // Parse variables whenever text changes
  useEffect(() => {
    const parsedVars = parseVariables(currText);
    setVariables(parsedVars);
  }, [currText]);

  // Auto-resize textarea and node based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to calculate new scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
      
      // Calculate width based on content (with max and min constraints)
      const scrollWidth = textareaRef.current.scrollWidth;
      const minWidth = 250;
      const maxWidth = 500;
      const calculatedWidth = Math.min(maxWidth, Math.max(minWidth, scrollWidth + 40));
      
      setDimensions({
        width: calculatedWidth,
        height: 'auto'
      });
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create dynamic input handles for each variable
  const dynamicInputs = variables.map((variable) => ({
    id: `${id}-${variable}`,
    label: variable,
  }));

  return (
    <BaseNode
      title="Text"
      icon="📝"
      inputs={dynamicInputs}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      headerColor="from-yellow-500 to-orange-600"
      minWidth={`${dimensions.width}px`}
      minHeight={dimensions.height}
    >
      <div style={{ width: '100%' }}>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            fontSize: '0.5rem', 
            fontWeight: '600', 
            color: '#6b7280', 
            marginBottom: '0.15rem' 
          }}>
            Text Content
          </span>
          <textarea
            ref={textareaRef}
            style={{
              width: '100%',
              border: '1px solid #d1d5db',
              borderRadius: '0.25rem',
              padding: '0.25rem 0.375rem',
              fontSize: '0.5rem',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              minHeight: '30px',
              transition: 'all 0.2s',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#e2e8f0'
            }}
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text with {{variables}}..."
            rows={2}
          />
        </label>
        
        {variables.length > 0 && (
          <div style={{ 
            fontSize: '0.4375rem', 
            color: '#94a3b8', 
            marginTop: '0.25rem' 
          }}>
            <span style={{ fontWeight: '600' }}>Variables:</span>{' '}
            {variables.map((v) => (
              <span 
                key={v} 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  color: '#fbbf24',
                  padding: '0.05rem 0.15rem',
                  borderRadius: '0.15rem',
                  marginRight: '0.15rem',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  fontSize: '0.4375rem'
                }}
              >
                {v}
              </span>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  );
};
