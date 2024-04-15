import React from "react";
import { Form, Select, Button, message, Input } from "antd";
import { Link } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";

export default function AddStudent() {
  const [form] = Form.useForm();
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md border-2">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Add Student
          </h1>
          <Form layout="vertical" form={form}>
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
              name="roll"
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
                <Select.Option value="1">Computer Science</Select.Option>
                <Select.Option value="2">Electrical Engineering</Select.Option>
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
                <Select.Option value="1">2021</Select.Option>
                <Select.Option value="2">2022</Select.Option>
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
