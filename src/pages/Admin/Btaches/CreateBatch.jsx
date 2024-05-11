import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";
import { createBatch } from "../../../services/BatchService";
import { fetchSessions } from "../../../services/SessionService";
import { fetchDepartments } from "../../../services/DepartmentService";

const { Item } = Form;

export default function CreateBatch() {
  const [batch, setBatch] = useState("");
  const [sessions, setSessions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
          Add Session
        </h1>
        <Form
          onFinish={handleSubmit}
          className="max-w-md mx-auto"
          layout="vertical"
        >
          <Item
            label="Session Name"
            name="session"
            rules={[{ required: true, message: "Please enter session name" }]}
          >
            <Input value={batch} onChange={(e) => setSession(e.target.value)} />
          </Item>
          <Item>
            <Button htmlType="submit" className="w-full">
              Add
            </Button>
          </Item>
        </Form>
      </div>
    </div>
  );
}
