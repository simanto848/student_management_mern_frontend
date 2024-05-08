const BASE_URL = "/api/student";

export async function fetchStudents() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }
  const data = await response.json();
  return data;
}

export async function createStudent(student) {
  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function fetchStudentById(studentId) {
  const response = await fetch(`${BASE_URL}/${studentId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }
  const data = await response.json();
  return data;
}

export async function updateStudent(studentId, student) {
  const response = await fetch(`${BASE_URL}/${studentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function deleteStudent(studentId) {
  const response = await fetch(`${BASE_URL}/${studentId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}
