import { Handle, Position } from "reactflow";

export default function BaseNode({
  title,
  inputs = [],
  outputs = [],
  children
}) {
  return (
    <div className="node-container">
      <div className="node-header">{title}</div>

      {inputs.map((input) => (
        <Handle
          key={input.id || input}
          type="target"
          position={Position.Left}
          id={input.id || input}
          style={input.style}
        />
      ))}


      <div className="node-body">
        {children}
      </div>

      {outputs.map((output) => (
        <Handle
          key={output}
          type="source"
          position={Position.Right}
          id={output}
        />
      ))}
    </div>
  );
}
