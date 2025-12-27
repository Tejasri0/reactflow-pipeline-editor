ReactFlow Pipeline Editor
Overview

This project is a visual pipeline editor built using React Flow on the frontend and FastAPI on the backend.
It allows users to create pipelines by dragging and connecting nodes, submit the pipeline, and validate whether the resulting graph is a Directed Acyclic Graph (DAG).

The application also provides visual feedback by distinguishing forward and backward connections.

Features

      Drag-and-drop pipeline editor
      
      Custom nodes: Input, Text, LLM, Output
      
      Animated edges
      
      Visual distinction:
      
          Forward connections shown in green
          
          Backward / cyclic connections shown in red
          
      Backend validation of pipelines
      
      DAG (cycle) detection
      
      Node and edge count on submission

Technology Stack
    
  Frontend
      
      React
      
      React Flow
      
      Zustand (state management)
      
  Backend
      
      FastAPI

      Python
      
      CORS middleware

Project Structure 

reactflow-pipeline-editor/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   ├── ui.js
│   │   ├── toolbar.js
│   │   ├── SubmitButton.js
│   │   └── store.js
│   ├── public/
│   └── package.json
│
├── backend/
│   └── main.py
│
└── README.md


Backend Set Up 

cd backend
uvicorn main:app --reload


Frontend Set Up

cd frontend
npm install
npm start


Usage

  Open the application in the browser
  
  Drag nodes from the toolbar onto the canvas
  
  Connect nodes to form a pipeline
  
  Forward connections appear in green
  
  Backward or cyclic connections appear in red
  
  Click the Submit button
  
  View the popup showing:

    Number of nodes
    
    Number of edges
    
    Whether the pipeline is a DAG


DAG Validation

The backend validates pipelines using topological sorting (Kahn’s algorithm):

  If all nodes are visited, the graph is a DAG
  
  If not, a cycle exists



