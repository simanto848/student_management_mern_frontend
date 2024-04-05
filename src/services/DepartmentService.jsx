import { message } from "antd";

export async function createDepartment(formData) {
  try {
    const res = await fetch("/api/department/create", {
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
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.message || "Failed to add department" };
  }
}

export async function fetchDepartments() {
  try {
    const res = await fetch("/api/department");
    if (!res.ok) {
      message.error("Failed to fetch departments");
      return [];
    }
    const data = await res.json();
    return data;
  } catch (error) {
    message.error("Failed to fetch departments");
    return [];
  }
}

export async function deleteDepartment(departmentId) {
  try {
    const res = await fetch(`/api/department/delete/${departmentId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      message.error(data.message);
      return false;
    }
    return true;
  } catch (error) {
    message.error("Failed to delete department");
    return false;
  }
}

export async function fetchDepartmentDetails(departmentId) {
  try {
    const res = await fetch(`/api/department/${departmentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch department details");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    message.error(error.message);
    return null;
  }
}

export async function updateDepartment(departmentId, formData) {
  try {
    const res = await fetch(`/api/department/update/${departmentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to update department");
    }
    return data;
  } catch (error) {
    message.error(error.message);
    return null;
  }
}

export async function fetchDepartmentsByFaculty(facultyId) {
  try {
    const res = await fetch(`/api/department/faculty/${facultyId}`);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return { ok: true, data };
  } catch (error) {
    message.error("Failed to fetch departments");
    return [];
  }
}
