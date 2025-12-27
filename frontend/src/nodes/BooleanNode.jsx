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
      id={id}
      title="Boolean Logic"
      icon="🔀"
      inputs={[
        { id: `${id}-inputA`, label: 'A' },
        { id: `${id}-inputB`, label: 'B' }
      ]}
      outputs={[{ id: `${id}-result`, label: 'result' }]}
      headerColor="from-cyan-500 to-blue-600"
      minWidth="100px"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Gate Type</span>
          <select
            className="node-select focus-ring-cyan"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="AND">AND - Both true</option>
            <option value="OR">OR - Either true</option>
            <option value="NOT">NOT - Inverse</option>
            <option value="XOR">XOR - Exclusive or</option>
            <option value="NAND">NAND - Not both</option>
          </select>
        </label>
        <div className="text-xs text-gray-500 text-center">
          Logic gate operation
        </div>
      </div>
    </BaseNode>
  );
};

export default BooleanNode;
