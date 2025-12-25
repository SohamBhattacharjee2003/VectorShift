import { useState } from 'react';
import BaseNode from './BaseNode';

/**
 * BooleanNode - Performs boolean logic operations
 * Demonstrates: Multiple inputs with different configurations
 */
export const BooleanNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'AND');

  return (
    <BaseNode
      title="Boolean Logic"
      icon="🔀"
      inputs={[
        { id: `${id}-inputA`, label: 'A' },
        { id: `${id}-inputB`, label: 'B' }
      ]}
      outputs={[{ id: `${id}-result`, label: 'result' }]}
      headerColor="from-cyan-500 to-blue-600"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Operation</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
            <option value="NOT">NOT</option>
            <option value="XOR">XOR</option>
            <option value="NAND">NAND</option>
          </select>
        </label>
        <div className="text-xs text-gray-500 text-center">
          Performs boolean logic operations
        </div>
      </div>
    </BaseNode>
  );
};

export default BooleanNode;
