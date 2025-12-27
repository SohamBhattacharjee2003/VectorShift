import { useState } from 'react';
import BaseNode from './BaseNode';

/**
 * FilterNode - Filters data based on conditions
 * Demonstrates: Complex configuration with multiple options
 */
export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      inputs={[{ id: `${id}-input`, label: 'input' }]}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      headerColor="from-pink-500 to-rose-600"
      minWidth="110px"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Condition</span>
          <select
            className="node-select focus-ring-pink"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="contains">Contains</option>
            <option value="equals">Equals</option>
            <option value="startsWith">Starts With</option>
            <option value="endsWith">Ends With</option>
            <option value="regex">Regex Match</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Value</span>
          <input
            className="node-input focus-ring-pink"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Filter value..."
          />
        </label>
      </div>
    </BaseNode>
  );
};

export default FilterNode;
