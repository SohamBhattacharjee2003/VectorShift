import { useState } from "react";
import BaseNode from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  return (
    <BaseNode
      title="Input"
      icon="📥"
      outputs={[`${id}-value`]}
      headerColor="from-green-500 to-emerald-600"
    >
      <div className="space-y-3">
        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Name</span>
          <input
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="Enter input name"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs font-medium text-gray-600 mb-1">Type</span>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
            value={inputType}
            onChange={(e) => setInputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
}

export default InputNode;
