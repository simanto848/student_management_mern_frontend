const BASE_URL = "/api/admin/session-courses";

export async function fetchSessionCoursesBySessionId(sessionId) {
  try {
    const response = await fetch(`${BASE_URL}/${sessionId}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    return [];
  }
}

export async function fetchSessionCoursesByDepartment(sessionId, departmentId) {
  try {
    const response = await fetch(
      `${BASE_URL}/${sessionId}/department/${departmentId}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data.length > 0 ? data : [];
  } catch (error) {
    return [];
  }
}

export async function createSessionCourse(sessionId, departmentId, courseIds) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionId, departmentId, courseIds }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { message: error.message };
  }
}

export async function updateSessionCourse(sessionCourseId, teacherId) {
  try {
    const response = await fetch(`${BASE_URL}/${sessionCourseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teacherId }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { message: error.message };
  }
}
