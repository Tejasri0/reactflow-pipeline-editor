export async function submitPipeline(nodes, edges) {
  try {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nodes, edges })
    });

    const data = await response.json();

    alert(
      `Pipeline Summary:\n\n` +
      `Nodes: ${data.num_nodes}\n` +
      `Edges: ${data.num_edges}\n` +
      `Is DAG: ${data.is_dag}`
    );
  } catch (error) {
    alert("Failed to submit pipeline");
    console.error(error);
  }
}
