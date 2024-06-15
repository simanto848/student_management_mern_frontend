// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value.trim(),
    });
  };

  const handleSubmit = async () => {
    await login(formData, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex p-6 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-8 mb-24">
        {/* left */}
        <div className="flex-1 text-center md:text-left">
          <Link to="/" className="font-bold text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              EDUCATION
            </span>
          </Link>
          <p className="text-sm mt-5">
            This is my first full MERN stack project. You can sign in with your
            email and password or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1 bg-white ml-10 p-8 shadow-lg rounded-lg">
          <Form
            className="flex flex-col gap-4"
            onFinish={handleSubmit}
            layout="vertical"
            initialValues={formData}
          >
            <Form.Item
              name="email"
              label="Your email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input
                type="email"
                placeholder="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Your password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input
                type="password"
                placeholder="************"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Link to="/forgot-password" className="text-blue-500">
                Forgot password?
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="w-full bg-indigo-500 text-white rounded-md"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
