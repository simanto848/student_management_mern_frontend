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

export async function enrollStudent(studentId, formData) {
  try {
    const res = await fetch(`/api/student/enroll/${studentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: error.message || "Failed to enroll student" };
  }
}

export async function updateStudentEnrollment(enrollmentId, formData) {
  try {
    const res = await fetch(`/api/student/enrollment/update/${enrollmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }
    return { ok: true, data };
  } catch (error) {
    return {
      ok: false,
      message: error.message || "Failed to update enrollment",
    };
  }
}

export async function deleteStudentEnrollment(enrollmentId) {
  try {
    const res = await fetch(`/api/student/enrollment/delete/${enrollmentId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete enrollment");
    }
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete enrollment");
  }
}
