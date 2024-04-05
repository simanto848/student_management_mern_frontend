export async function createTeacher(formData) {
  try {
    const res = await fetch("/api/teacher/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to add teacher");
    }
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message || "Failed to add teacher" };
  }
}

export async function fetchTeachers() {
  try {
    const res = await fetch("/api/teacher");
    if (!res.ok) {
      throw new Error("Failed to fetch teachers");
    }
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch teachers");
  }
}

export async function fetchTeacherById(teacherId) {
  try {
    const res = await fetch(`/api/teacher/${teacherId}`);
    if (!res.ok) {
      throw new Error("Failed to fetch teacher");
    }
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed to fetch teacher");
  }
}

export async function updateTeacher(teacherId, formData) {
  try {
    const res = await fetch(`/api/teacher/update/${teacherId}`, {
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
    return { ok: false, message: error.message || "Failed to updated teacher" };
  }
}

export async function deleteTeacher(teacherId) {
  try {
    const res = await fetch(`/api/teacher/delete/${teacherId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to delete teacher");
    }
    return true;
  } catch (error) {
    throw new Error(error.message || "Failed to delete teacher");
  }
}
