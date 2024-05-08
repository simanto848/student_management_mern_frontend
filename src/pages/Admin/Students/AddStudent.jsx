// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Form, Select, Button, message, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";
import { fetchDepartments } from "../../../services/DepartmentService";
import { fetchSessions } from "../../../services/SessionService";
import { createStudent } from "../../../services/StudentService";

export default function AddStudent() {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentsData();
    fetchSessionsData();
  });

  const fetchDepartmentsData = async () => {
    try {
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (error) {
      message.error("Failed to fetch departments");
    }
  };

  const fetchSessionsData = async () => {
    try {
      const data = await fetchSessions();
      setSessions(data);
    } catch (error) {
      message.error("Failed to fetch sessions");
    }
  };

  const onFinish = async (formData) => {
    try {
      console.log("Form Data: ", formData);
      const res = await createStudent(formData);
      if (res.ok) {
        message.success("Student added successfully");
        form.resetFields();
        navigate("/admin/students");
      } else {
        message.error(res.message || "Failed to add student");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md border-2">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Add Student
          </h1>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Student Name is required" }]}
              label="Name"
            >
              <Input placeholder="Enter Student Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Student email is required" }]}
              label="Email"
            >
              <Input placeholder="Enter student email" />
            </Form.Item>
            <Form.Item
              name="phoneNo"
              rules={[
                { required: true, message: "Student phone number is required" },
              ]}
              label="Phone Number"
            >
              <Input placeholder="Enter student phone number" />
            </Form.Item>
            <Form.Item
              name="registrationNo"
              rules={[
                {
                  required: true,
                  message: "Student registration number is required",
                },
              ]}
              label="Registration Number"
            >
              <Input placeholder="Enter student registration number" />
            </Form.Item>
            <Form.Item
              name="rollNo"
              rules={[
                { required: true, message: "Student roll number is required" },
              ]}
              label="Roll Number"
            >
              <Input placeholder="Enter student roll number" />
            </Form.Item>
            <Form.Item
              name="departmentId"
              rules={[
                { required: true, message: "Department selection is required" },
              ]}
              label="Select Department"
            >
              <Select placeholder="Please select Department">
                {departments.map((department) => (
                  <Select.Option key={department._id} value={department._id}>
                    {department.shortName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="sessionId"
              rules={[
                { required: true, message: "Session selection is required" },
              ]}
              label="Select Session"
            >
              <Select placeholder="Please select Session">
                {sessions.map((session) => (
                  <Select.Option key={session._id} value={session._id}>
                    {session.session}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="semester"
              rules={[
                { required: true, message: "Semester selection is required" },
              ]}
              label="Select Semester"
            >
              <Select placeholder="Please select Semester">
                <Select.Option value="1">1st</Select.Option>
                <Select.Option value="2">2nd</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="courseFee"
              rules={[{ required: true, message: "Course Fee is required" }]}
              label="Course Fee"
            >
              <Input placeholder="Enter Course Fee" />
            </Form.Item>
            <Form.Item>
              <Button className="w-full" htmlType="submit">
                Add Student
              </Button>
              <Button className="w-full mt-2">
                <Link to="/admin/students">Cancel</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
