import { toast } from "react-hot-toast";
import { setUserCookie } from "./Cookies";

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

    setUserCookie("user", data.user);

    navigate("/dashboard");
  } catch (error) {
    toast.error(error.message);
  }
};
