/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Checkbox } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedCredentials = localStorage.getItem("credentials");
    if (savedCredentials) {
      const parsedCredentials = JSON.parse(savedCredentials);
      setFormData({
        ...formData,
        email: parsedCredentials.email,
        password: parsedCredentials.password,
        rememberMe: true,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rememberMe) {
      localStorage.setItem(
        "credentials",
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      );
    } else {
      localStorage.removeItem("credentials");
    }
    login(formData, navigate);
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              EDUCATION
            </span>
          </Link>
          <p className="text-sm mt-5">
            This is my first react full react mern project. You can sign in with
            your email and password or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="************"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <Label htmlFor="rememberMe">Remember Me</Label>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
