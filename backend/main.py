from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from collections import defaultdict, deque

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(payload: dict):
    nodes = payload.get("nodes", [])
    edges = payload.get("edges", [])

    is_dag = check_dag(nodes, edges)

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag
    }

# REAL DAG CHECK (Kahn’s Algorithm)
def check_dag(nodes, edges):
    graph = defaultdict(list)
    indegree = {}

    # Initialize nodes
    for node in nodes:
        indegree[node["id"]] = 0

    # Build graph
    for edge in edges:
        source = edge["source"]
        target = edge["target"]
        graph[source].append(target)
        indegree[target] += 1

    queue = deque([n for n in indegree if indegree[n] == 0])
    visited = 0

    while queue:
        curr = queue.popleft()
        visited += 1
        for nxt in graph[curr]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)

    return visited == len(nodes)
