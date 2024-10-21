const BASE_URL = "/api/teacher/result";

export async function addOrUpdateResult(result) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function getResultByStudentId(studentId, courseId) {
  const response = await fetch(`${BASE_URL}/get/${studentId}/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function submitForApproval(batchId) {
  const response = await fetch(`${BASE_URL}/submit-for-approval/${batchId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}
