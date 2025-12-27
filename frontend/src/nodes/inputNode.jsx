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
      id={id}
      title="Input"
      icon="📥"
      outputs={[`${id}-value`]}
      headerColor="from-green-500 to-emerald-600"
    >
      <div className="space-y-4">
        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-2">Name</span>
          <input
            className="node-input focus-ring-green"
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            placeholder="Enter input name"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-sm font-semibold text-gray-700 mb-3">Type</span>
          <select
            className="node-select focus-ring-green cursor-pointer"
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
