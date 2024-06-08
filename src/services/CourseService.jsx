const BASE_URL = "/api/course";

export async function fetchCourses() {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
}

export async function createCourse(formData) {
  const response = await fetch(`${BASE_URL}/create-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function fetchCourseById(courseId) {
  const response = await fetch(`${BASE_URL}/${courseId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch course");
  }
  return response.json();
}

export async function fetchCoursesByDepartment(departmentId) {
  const response = await fetch(`${BASE_URL}/department/${departmentId}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return data;
}

export async function updateCourse(courseId, formData) {
  const response = await fetch(`${BASE_URL}/update/${courseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

export async function deleteCourse(courseId) {
  const response = await fetch(`${BASE_URL}/delete/${courseId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}
