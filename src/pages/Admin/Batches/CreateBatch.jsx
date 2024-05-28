// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { createBatch } from "../../../services/BatchService";
import { fetchSessions } from "../../../services/SessionService";
import { fetchDepartments } from "../../../services/DepartmentService";

const { Option } = Select;

export default function CreateBatch() {
  const [form] = Form.useForm();
  const [batch, setBatch] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [sessions, setSessions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessionData();
    fetchDepartmentData();
  }, []);

  const fetchDepartmentData = async () => {
    try {
      const data = await fetchDepartments();
      setDepartments(data);
    } catch (error) {
      message.error("Failed to fetch departments!");
    }
  };

  const fetchSessionData = async () => {
    try {
      const data = await fetchSessions();
      setSessions(data);
    } catch (error) {
      message.error("Failed to fetch sessions!");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!batch || !departmentId || !sessionId) {
      message.error("Please fill in all fields");
      setLoading(false);
      return;
    }
    try {
      await createBatch({ name: batch, departmentId, sessionId });
      message.success(`Batch "${batch}" added successfully`);
      navigate("/batches");
    } catch (error) {
      console.error(error);
      message.error("Failed to add batch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md border-2">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Add Batch
          </h1>
          <Form
            layout="vertical"
            className="max-w-md mx-auto"
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Batch name is required" }]}
              label="Batch Name"
            >
              <Input
                placeholder="Enter batch name..."
                onChange={(e) => setBatch(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="sessionId"
              rules={[{ required: true, message: "Session is required" }]}
              label="Select Session"
            >
              <Select
                placeholder="Please select session..."
                onChange={(value) => setSessionId(value)}
              >
                {sessions.map((session) => (
                  <Select.Option key={session._id} value={session._id}>
                    {session.session}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="departmentId"
              rules={[{ required: true, message: "Department is required" }]}
              label="Select Department"
            >
              <Select
                placeholder="Please select department..."
                onChange={(value) => setDepartmentId(value)}
              >
                {departments.map((department) => (
                  <Option key={department._id} value={department._id}>
                    {department.shortName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button className="w-full" htmlType="submit" loading={loading}>
                Add Batch
              </Button>
              <Button className="w-full mt-2">
                <Link to="/batches">Cancel</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
