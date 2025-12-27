import { useState } from 'react';
import BaseNode from './BaseNode';

/**
 * DelayNode - Adds a time delay in the pipeline
 * Demonstrates: Simple node with numeric input configuration
 */
export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon="⏱️"
      inputs={[{ id: `${id}-input`, label: 'input' }]}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      headerColor="from-amber-500 to-orange-600"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">
            Delay (ms)
          </span>
          <input
            className="node-input focus-ring-amber"
            type="number"
            min="0"
            step="100"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            placeholder="1000"
          />
        </label>
        <div className="text-xs text-gray-500 text-center">
          Delays execution by {delay}ms
        </div>
      </div>
    </BaseNode>
  );
};

export default DelayNode;
