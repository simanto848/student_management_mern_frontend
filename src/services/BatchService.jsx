const BASE_URL = "/api/batch";

export async function fetchBatches() {
  const respose = await fetch(BASE_URL);
  if (!respose.ok) {
    throw new Error("Failed to fetch batches");
  }
  const data = await respose.json();
  return data;
}

export async function createBatch(batch) {
  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(batch),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function fetchBatchById(batchId) {
  const response = await fetch(`${BASE_URL}/${batchId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch batch");
  }
  const data = await response.json();
  return data;
}

export async function fetchBatchBySessionId(sessionId) {
  const response = await fetch(`${BASE_URL}/session/${sessionId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch batch");
  }
  const data = await response.json();
  return data;
}

export async function updateBatch(batchId, batch) {
  const response = await fetch(`${BASE_URL}/${batchId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(batch),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function deleteBatch(batchId) {
  const response = await fetch(`${BASE_URL}/${batchId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}
