// draggableNode.js

import { useState, useEffect } from 'react';

const colorSchemes = {
  purple: {
    background: '#f5f3ff',
    border: '#e9d5ff',
    color: '#7c3aed',
    hover: '#ede9fe'
  },
  green: {
    background: '#f0fdf4',
    border: '#dcfce7',
    color: '#16a34a',
    hover: '#dcfce7'
  },
  cyan: {
    background: '#ecfeff',
    border: '#cffafe',
    color: '#0891b2',
    hover: '#cffafe'
  },
  amber: {
    background: '#fffbeb',
    border: '#fef3c7',
    color: '#d97706',
    hover: '#fef3c7'
  },
  pink: {
    background: '#fdf2f8',
    border: '#fce7f3',
    color: '#db2777',
    hover: '#fce7f3'
  }
};

const draggedTypes = new Set();
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const addDraggedType = (type) => {
  draggedTypes.add(type);
  notifyListeners();
};

export const removeDraggedType = (type) => {
  draggedTypes.delete(type);
  notifyListeners();
};

export const clearDraggedTypes = () => {
  draggedTypes.clear();
  notifyListeners();
};

export const hasDraggedType = (type) => {
  return draggedTypes.has(type);
};

export const DraggableNode = ({ type, label, color = 'purple' }) => {
    const scheme = colorSchemes[color] || colorSchemes.purple;
    const [isActive, setIsActive] = useState(() => draggedTypes.has(type));
    
    useEffect(() => {
      const updateActive = () => {
        setIsActive(draggedTypes.has(type));
      };
      
      listeners.add(updateActive);
      
      return () => {
        listeners.delete(updateActive);
      };
    }, [type]);
    
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      addDraggedType(nodeType);
      setIsActive(true);
      
      event.target.style.cursor = 'grabbing';
      event.target.style.transition = 'none';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
    
    const onDragEnd = (event) => {
      event.target.style.cursor = 'grab';
      event.target.style.transition = 'all 0.2s ease';
      event.target.style.transform = 'scale(1)';
    };
    
    const activeStyle = isActive ? {
      background: 'linear-gradient(135deg, #ddd6fe, #c4b5fd)',
      color: '#7c3aed',
      border: '2px solid #c4b5fd',
      boxShadow: '0 4px 12px rgba(196, 181, 253, 0.4)',
      fontWeight: '700'
    } : {};
  
    return (
      <div
        className="futuristic-button"
        style={{ 
          background: scheme.background,
          color: scheme.color,
          padding: '8px 16px',
          borderRadius: '8px',
          border: `1px solid ${scheme.border}`,
          cursor: 'grab',
          userSelect: 'none',
          transition: 'all 0.2s ease',
          fontSize: '13px',
          fontWeight: '600',
          whiteSpace: 'nowrap',
          ...activeStyle
        }}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = scheme.hover;
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = scheme.background;
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
        draggable
      >
        {label}
      </div>
    );
};