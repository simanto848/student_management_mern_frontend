/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Table, message, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";
import moment from "moment";
import {
  fetchSessions,
  deleteSession,
  updateSession,
} from "../../../services/SessionService";

const { Column } = Table;
const { Item } = Form;

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sessionToUpdate, setSessionToUpdate] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchSessions();
      setSessions(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch sessions!");
    }
  };

  const handleEdit = (record) => {
    setSessionToUpdate(record);
    setVisible(true);
    form.setFieldsValue({ session: record.session });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await updateSession(sessionToUpdate._id, values.session); // Call the updateSession function
      message.success(`Session "${values.session}" updated successfully`);
      setVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
      console.error(error);
      message.error("Failed to update session");
    }
  };

  const handleDelete = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== sessionId)
      );
      message.success("Session deleted successfully");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete session!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Session List
          </h1>
          <Button className="mr-2">
            <Link to="/create-session">Add Session</Link>
          </Button>
        </div>
        <Table dataSource={sessions} rowKey="_id">
          <Column
            title="SL"
            dataIndex="index"
            key="index"
            render={(text, record, index) => index + 1}
          />
          <Column title="Session" dataIndex="session" key="session" />
          <Column
            title="Created at"
            dataIndex="createdAt"
            key="createdAt"
            render={(text) => moment(text).format("MM-DD-YYYY")}
          />
          <Column
            title="Actions"
            key="actions"
            render={(text, record) => (
              <span>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(record)}
                />
                <Button
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record._id)}
                />
              </span>
            )}
          />
        </Table>
        <Modal
          title="Edit Session"
          open={visible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="update" onClick={handleUpdate}>
              Update
            </Button>,
          ]}
        >
          <Form form={form}>
            <Item
              label="Session Name"
              name="session"
              rules={[{ required: true, message: "Please enter session name" }]}
            >
              <Input />
            </Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
