import { Panel, useReactFlow } from "reactflow";
import { submitPipeline } from "./submit";

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = () => {
    const nodes = getNodes();
    const edges = getEdges();
    submitPipeline(nodes, edges);
  };

  return (
    <Panel position="top-left">
      <button
        onClick={handleSubmit}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
    </Panel>
  );
};
