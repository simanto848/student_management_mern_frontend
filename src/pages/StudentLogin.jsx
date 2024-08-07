import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { studentLogin } from "../services/AuthService";

export default function StudentLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("studentEmail");
    const savedPassword = localStorage.getItem("studentPassword");

    if (savedEmail && savedPassword) {
      setFormData({
        email: savedEmail,
        password: savedPassword,
      });
      setRememberMe(true);
      form.setFieldsValue({ email: savedEmail, password: savedPassword });
    }
  }, [form]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value.trim(),
    });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async () => {
    if (rememberMe) {
      localStorage.setItem("studentEmail", formData.email);
      localStorage.setItem("studentPassword", formData.password);
    } else {
      localStorage.removeItem("studentEmail");
      localStorage.removeItem("studentPassword");
    }
    await studentLogin(formData, navigate);
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
            form={form}
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
              <Checkbox checked={rememberMe} onChange={handleRememberMeChange}>
                Remember me
              </Checkbox>
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
            {/* Additional role options */}
            <div className="flex justify-between">
              <Link to="/admin-login" className="text-blue-500 hover:underline">
                Login as Admin
              </Link>
              <Link
                to="/teacher-login"
                className="text-blue-500 hover:underline"
              >
                Login as Teacher
              </Link>
              <Link to="/staff-login" className="text-blue-500 hover:underline">
                Login as Staff
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
