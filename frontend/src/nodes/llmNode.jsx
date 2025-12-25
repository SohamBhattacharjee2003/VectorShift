import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      icon="🤖"
      inputs={[
        { id: `${id}-system`, label: 'system' },
        { id: `${id}-prompt`, label: 'prompt' }
      ]}
      outputs={[{ id: `${id}-response`, label: 'response' }]}
      headerColor="from-purple-500 to-indigo-600"
    >
      <div className="py-2">
        <p className="text-sm text-gray-600 text-center">
          This is an LLM node.
        </p>
        <p className="text-xs text-gray-500 text-center mt-1">
          Connect system and prompt inputs
        </p>
      </div>
    </BaseNode>
  );
};
