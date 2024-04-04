import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { cookieName, setUserCookie } from "./Cookies";

export const login = async (formData, navigate) => {
  if (!formData.email || !formData.password) {
    return toast.error("Please fill out all fields.");
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.message);
    }

    setUserCookie(data.user);

    navigate("/dashboard");
  } catch (error) {
    toast.error(error.message);
  }
};

export const signOut = async (navigate) => {
  try {
    const res = await fetch("/api/auth/sign-out", {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.message);
    }
    Cookies.remove(cookieName);
    navigate("/");
  } catch (error) {
    return toast.error(error.message);
  }
};
