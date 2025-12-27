import { useState } from 'react';
import BaseNode from './BaseNode';

/**
 * MathNode - Performs mathematical operations
 * Demonstrates: Dropdown configuration with multiple inputs
 */
export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  return (
    <BaseNode
      id={id}
      title="Math Operation"
      icon="🔢"
      inputs={[
        { id: `${id}-a`, label: 'a' },
        { id: `${id}-b`, label: 'b' }
      ]}
      outputs={[{ id: `${id}-result`, label: 'result' }]}
      headerColor="from-teal-500 to-green-600"
      minWidth="100px"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Operation</span>
          <select
            className="node-select focus-ring-teal"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="add">+ Add</option>
            <option value="subtract">− Subtract</option>
            <option value="multiply">× Multiply</option>
            <option value="divide">÷ Divide</option>
            <option value="power">^ Power</option>
            <option value="modulo">% Modulo</option>
          </select>
        </label>
        <div className="text-xs text-gray-500 text-center">
          Math operation
        </div>
      </div>
    </BaseNode>
  );
};

export default MathNode;
