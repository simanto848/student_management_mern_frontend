const BASE_URL = "/api/admin/session";

export async function fetchSessions() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }
  const data = await response.json();
  return data;
}

export async function createSession(sessionName) {
  const response = await fetch(`${BASE_URL}/create-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session: sessionName }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function updateSession(sessionId, sessionName) {
  try {
    const res = await fetch(`${BASE_URL}/update/${sessionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session: sessionName }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Failed to update session");
  }
}

export async function deleteSession(sessionId) {
  const response = await fetch(`${BASE_URL}/delete/${sessionId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}
