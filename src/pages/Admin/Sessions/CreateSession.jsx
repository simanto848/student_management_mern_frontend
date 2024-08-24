// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { createSession } from "../../../services/SessionService";
import Loading from "../../../components/Loading";

const { Item } = Form;

export default function CreateSession() {
  const [session, setSession] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!session) {
      return message.error("Session is required");
    }
    setLoading(true);
    try {
      await createSession(session);
      message.success(`Session "${session}" added successfully`);
      navigate("/admin/sessions");
      setSession("");
    } catch (error) {
      console.error(error);
      message.error("Failed to add session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
          Add Session
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <Form
            onFinish={handleSubmit}
            className="max-w-md mx-auto border p-4 shadow-md rounded-md"
            layout="vertical"
          >
            <Item
              label="Session Name"
              name="session"
              rules={[{ required: true, message: "Please enter session name" }]}
            >
              <Input
                value={session}
                size="large"
                onChange={(e) => setSession(e.target.value)}
              />
            </Item>
            <Item>
              <Button size="large" htmlType="submit" className="w-full">
                Add
              </Button>
            </Item>
            <Item>
              <Button size="large" className="w-full">
                <Link to="/admin/sessions">Cancel</Link>
              </Button>
            </Item>
          </Form>
        )}
      </div>
    </div>
  );
}
