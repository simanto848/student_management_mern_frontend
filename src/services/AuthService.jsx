import Cookies from "js-cookie";
import { message } from "antd";
import { cookieName, setUserCookie } from "./Cookies";

// TODO: Implement Context API for user authentication and authorization
export const login = async (formData, navigate) => {
  if (!formData.email || !formData.password) {
    return message.error("Please fill out all fields.");
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      return message.error(data.message);
    }

    setUserCookie(data.user);

    navigate("/dashboard");
  } catch (error) {
    message.error(error.message);
  }
};

export const studentLogin = async (formData, navigate) => {
  if (!formData.email || !formData.password) {
    return message.error("Please fill out all fields.");
  }

  try {
    const res = await fetch("/api/auth/student-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      return message.error(data.message);
    }

    setUserCookie(data.user);

    navigate("/dashboard");
  } catch (error) {
    message.error(error.message);
  }
};

export const teacherLogin = async (formData, navigate) => {
  if (!formData.email || !formData.password) {
    return message.error("Please fill out all fields.");
  }
  try {
    const res = await fetch("/api/auth/teacher-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      return message.error(data.message);
    }

    setUserCookie(data.user);

    navigate("/dashboard");
  } catch (error) {
    message.error(error.message);
  }
};

export const signOut = async (navigate) => {
  try {
    const res = await fetch("/api/auth/sign-out", {
      method: "GET",
    });
    const data = await res.json();
    if (!res.ok) {
      return message.error(data.message);
    }
    Cookies.remove(cookieName);
    navigate("/");
  } catch (error) {
    return message.error(error.message);
  }
};
