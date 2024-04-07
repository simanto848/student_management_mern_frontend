/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";
import { createSession } from "../../../services/SessionService";

const { Item } = Form;

export default function CreateSession() {
  const [session, setSession] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!session) {
      return message.error("Session is required");
    }
    try {
      await createSession(session);
      message.success(`Session "${session}" added successfully`);
      navigate("/sessions");
      setSession("");
    } catch (error) {
      console.error(error);
      message.error("Failed to add session");
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
            <Input
              value={session}
              onChange={(e) => setSession(e.target.value)}
            />
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
