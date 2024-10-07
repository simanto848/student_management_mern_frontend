const BASE_URL = "/api/teacher/course";

// Get all courses of a teacher
export async function fetchCourses() {
  const response = await fetch(BASE_URL + "/get-all");
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  const data = await response.json();
  return data;
}

// Add a course to a teacher
export async function createCourse(course) {
  const response = await fetch(BASE_URL + "/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

// Get all batches of a course
export async function fetchBatches(courseId) {
  const response = await fetch(`${BASE_URL}/batches?courseId=${courseId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch batches");
  }
  const data = await response.json();
  return data;
}

// Get batch students
export async function fetchBatchStudents(batchId) {
  const response = await fetch(`${BASE_URL}/batch-students/${batchId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch batch students");
  }
  const data = await response.json();
  return data;
}

// Store attendence
export async function storeAttendence(courseId, studentId, present) {
  const response = await fetch(
    `${BASE_URL}/attendence/${courseId}/${studentId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present }),
    }
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return response.json();
}

// Get attendence
export async function getAllAttendenceOfBatch(courseId) {
  const response = await fetch(`${BASE_URL}/attendence/${courseId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch attendence");
  }
  const data = await response.json();
  return data;
}
