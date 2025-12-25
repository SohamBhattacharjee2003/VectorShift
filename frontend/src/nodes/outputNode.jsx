import { useState } from 'react';
import BaseNode from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  return (
    <BaseNode
      title="Output"
      icon="📤"
      inputs={[`${id}-value`]}
      headerColor="from-red-500 to-pink-600"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Name</span>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="Enter output name"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Type</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
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
