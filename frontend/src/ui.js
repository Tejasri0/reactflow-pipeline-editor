// ui.js
// Displays the drag-and-drop UI with colored edges
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  MiniMap
} from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
import { SubmitButton } from "./SubmitButton";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
};

// Zustand selector
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

// 🔥 EDGE COLOR LOGIC
const getEdgeStyle = (edge) => {
  const isForward =
    edge.sourceHandle?.includes("output") ||
    edge.sourceHandle?.includes("value") ||
    edge.sourceHandle?.includes("response");

  return {
    style: {
      stroke: isForward ? "#22c55e" : "#ef4444", // green / red
      strokeWidth: 2,
      strokeDasharray: "6 4", // both dashed
    },
    animated: true, // both animated
  };
};



export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);



  const getInitNodeData = (nodeID, type) => {
    return { id: nodeID, nodeType: type };
  };

  // Drag & Drop
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = event.dataTransfer.getData("application/reactflow");

      if (!data || !reactFlowInstance) return;

      const { nodeType } = JSON.parse(data);

      const position = reactFlowInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const nodeID = getNodeID(nodeType);

      addNode({
        id: nodeID,
        type: nodeType,
        position,
        data: getInitNodeData(nodeID, nodeType),
      });
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: "100vw", height: "70vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges.map((edge) => {
          const { style, animated } = getEdgeStyle(edge);
          return {
            ...edge,
            style,
            animated,
          };
        })}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        proOptions={proOptions}
        fitView
      >
        <Background color="#d1d5db" gap={gridSize} />
        <Controls />
        <MiniMap />
        <SubmitButton />
      </ReactFlow>
    </div>
  );
};
