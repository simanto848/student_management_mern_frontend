const BASE_URL = "/api/admin/student-enrollment";

export async function createEnrollment(enrollment, studentId) {
  const response = await fetch(`${BASE_URL}/${studentId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollment),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export async function fetchEnrollmentsByStudentId(studentId) {
  const response = await fetch(`${BASE_URL}/${studentId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch enrollments");
  }
  return response.json();
}

export async function updateEnrollment(enrollmentId, enrollment) {
  const response = await fetch(`${BASE_URL}/${enrollmentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enrollment),
  });
  if (!response.ok) {
    throw new Error("Failed to update enrollment");
  }
  return response.json();
}

export async function deleteEnrollment(enrollmentId) {
  const response = await fetch(`${BASE_URL}/${enrollmentId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete enrollment");
  }
  return response.json();
}
