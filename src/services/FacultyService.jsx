export const fetchFaculties = async () => {
  try {
    const res = await fetch("/api/faculty");
    if (!res.ok) {
      throw new Error("Failed to fetch faculties");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch faculties");
  }
};

export const addFaculty = async (name) => {
  try {
    const res = await fetch("/api/faculty/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data.faculty;
  } catch (error) {
    throw new Error("Failed to add faculty");
  }
};

export const updateFaculty = async (facultyId, name) => {
  try {
    const res = await fetch(`/api/faculty/update/${facultyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    throw new Error("Failed to update faculty");
  }
};

export const deleteFaculty = async (facultyId) => {
  try {
    const res = await fetch(`/api/faculty/delete/${facultyId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    throw new Error("Failed to delete faculty");
  }
};
