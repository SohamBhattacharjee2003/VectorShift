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
      title="Math Operation"
      icon="🔢"
      inputs={[
        { id: `${id}-a`, label: 'a' },
        { id: `${id}-b`, label: 'b' }
      ]}
      outputs={[{ id: `${id}-result`, label: 'result' }]}
      headerColor="from-teal-500 to-green-600"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Operation</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (−)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
            <option value="power">Power (^)</option>
            <option value="modulo">Modulo (%)</option>
          </select>
        </label>
        <div className="text-xs text-gray-500 text-center">
          Computes: a {operation === 'add' ? '+' : operation === 'subtract' ? '−' : operation === 'multiply' ? '×' : operation === 'divide' ? '÷' : operation === 'power' ? '^' : '%'} b
        </div>
      </div>
    </BaseNode>
  );
};

export default MathNode;
