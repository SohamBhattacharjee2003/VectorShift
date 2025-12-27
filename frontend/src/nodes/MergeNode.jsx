import { useState } from 'react';
import BaseNode from './BaseNode';

/**
 * MergeNode - Merges multiple inputs into one output
 * Demonstrates: Multiple inputs with dynamic configuration
 */
export const MergeNode = ({ id, data }) => {
  const [mergeStrategy, setMergeStrategy] = useState(data?.mergeStrategy || 'concatenate');
  const [separator, setSeparator] = useState(data?.separator || ', ');

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔗"
      inputs={[
        { id: `${id}-input1`, label: 'input 1' },
        { id: `${id}-input2`, label: 'input 2' },
        { id: `${id}-input3`, label: 'input 3' }
      ]}
      outputs={[{ id: `${id}-output`, label: 'merged' }]}
      headerColor="from-violet-500 to-purple-600"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Strategy</span>
          <select
            className="node-select focus-ring-violet"
            value={mergeStrategy}
            onChange={(e) => setMergeStrategy(e.target.value)}
          >
            <option value="concatenate">Concatenate</option>
            <option value="merge">Merge Objects</option>
            <option value="array">Create Array</option>
            <option value="json">JSON Merge</option>
          </select>
        </label>
        {mergeStrategy === 'concatenate' && (
          <label className="flex flex-col">
            <span className="text-xs font-medium text-gray-600 mb-1">Separator</span>
            <input
              className="node-input focus-ring-violet"
              type="text"
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              placeholder="Separator..."
            />
          </label>
        )}
        <div className="text-xs text-gray-500 text-center">
          Combines multiple inputs
        </div>
      </div>
    </BaseNode>
  );
};

export default MergeNode;
