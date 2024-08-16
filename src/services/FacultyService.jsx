const BASE_URL = "/api/admin/faculty";

export const fetchFaculties = async () => {
  try {
    const res = await fetch(BASE_URL);
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
    const res = await fetch(`${BASE_URL}/create`, {
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
    const res = await fetch(`${BASE_URL}/update/${facultyId}`, {
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
    const res = await fetch(`${BASE_URL}/delete/${facultyId}`, {
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
