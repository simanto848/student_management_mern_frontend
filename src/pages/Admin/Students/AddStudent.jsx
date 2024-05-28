// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Form, Select, Button, message, Input, InputNumber } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../../services/DepartmentService";
import { fetchSessions } from "../../../services/SessionService";
import { createStudent } from "../../../services/StudentService";
import { fetchBatchBySessionId } from "../../../services/BatchService";

export default function AddStudent() {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentsData();
    fetchSessionsData();
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      fetchSessionBatches(selectedSessionId);
    }
  }, [selectedSessionId]);

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

  const fetchSessionBatches = async (sessionId) => {
    try {
      const data = await fetchBatchBySessionId(sessionId);
      console.log(data);
      setBatches(data);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch batches");
    }
  };

  const onFinish = async (formData) => {
    setLoading(true);
    try {
      const { departmentId } = formData;
      const selectedDepartment = departments.find(
        (department) => department._id === departmentId
      );
      if (!selectedDepartment) {
        message.error("Department not found");
        setLoading(false);
        return;
      }

      const { shortName } = selectedDepartment;
      const requestData = {
        ...formData,
        departmentShortName: shortName,
      };

      const res = await createStudent(requestData);
      if (res) {
        message.success("Student added successfully");
        form.resetFields();
        navigate("/admin/students");
      } else {
        message.error("Failed to add student");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSessionChange = (value) => {
    setSelectedSessionId(value);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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
              <Select
                placeholder="Please select Session"
                onChange={handleSessionChange}
              >
                {sessions.map((session) => (
                  <Select.Option key={session._id} value={session._id}>
                    {session.session}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="batchId"
              rules={[
                { required: true, message: "Batch selection is required" },
              ]}
              label="Select Batch"
            >
              <Select placeholder="Please select Batch">
                {batches.map((batch) => (
                  <Select.Option key={batch._id} value={batch._id}>
                    {batch.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="courseFee"
              rules={[{ required: true, message: "Course Fee is required" }]}
              label="Course Fee"
            >
              <InputNumber
                placeholder="Enter Course Fee"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="scholarship"
              rules={[
                {
                  required: true,
                  message: "Scholarship percentage is required",
                },
              ]}
              label="Scholarship Percentage"
            >
              <InputNumber
                placeholder="Enter Scholarship Percentage"
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <Button className="w-full" htmlType="submit" loading={loading}>
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
