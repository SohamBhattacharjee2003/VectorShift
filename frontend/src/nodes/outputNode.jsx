import { useState } from 'react';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      inputs={[`${id}-value`]}
      outputs={[{ id: `${id}-output`, label: 'output' }]}
      headerColor="from-red-500 to-pink-600"
    >
      <div className="space-y-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-3">Name</span>
          <input
            className="node-input focus-ring-red"
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="Enter output name"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-3">Type</span>
          <select
            className="node-select focus-ring-red cursor-pointer"
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
