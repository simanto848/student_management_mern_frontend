/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Table, message, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  fetchSessions,
  deleteSession,
  updateSession,
  fetchSessionBatches,
} from "../../../services/SessionService";
import Loading from "../../../components/Loading";
import VoiceToTextRecognition from "../../../components/VoiceToTextRecognition";

const { Column } = Table;
const { Item } = Form;

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [sessionToUpdate, setSessionToUpdate] = useState({});
  const [batches, setBatches] = useState([]);
  const [batchesModalVisible, setBatchesModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredSessions(
      sessions.filter((session) =>
        session.session.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, sessions]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchSessions();
      setSessions(data);
    } catch (error) {
      message.error("Failed to fetch sessions!");
    } finally {
      setLoading(false);
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
      await updateSession(sessionToUpdate._id, values.session);
      message.success(`Session "${values.session}" updated successfully`);
      setVisible(false);
      form.resetFields();
      fetchData();
    } catch (error) {
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

  const handleViewBatches = async (sessionId) => {
    try {
      const data = await fetchSessionBatches(sessionId);
      setBatches(data);
      setBatchesModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch batches!");
    }
  };

  const closeBatchesModal = () => {
    setBatchesModalVisible(false);
    setBatches([]);
  };

  const handleVoiceInput = (transcript) => {
    setSearchText(transcript);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Session List
          </h1>
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0">
            <Input
              placeholder="Search Sessions"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginRight: 8 }}
              className="w-full md:w-auto"
            />
            <VoiceToTextRecognition onTranscript={handleVoiceInput} />
          </div>
          <Button className="mr-2">
            <Link to="/admin/create-session">Add Session</Link>
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Table
            dataSource={filteredSessions}
            rowKey="_id"
            className="shadow-lg"
            scroll={{ x: 768 }}
            bordered
            footer={() => `Total Session: ${filteredSessions.length}`}
            style={{ borderRadius: 8 }}
          >
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
                <span className="flex items-center gap-2">
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
                  <Button
                    size="small"
                    onClick={() => handleViewBatches(record._id)}
                  >
                    View Batches
                  </Button>
                </span>
              )}
            />
          </Table>
        )}
        {/* Modal for editing session */}
        <Modal
          title="Edit Session"
          open={visible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="update" type="default" onClick={handleUpdate}>
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
        {/* Modal for viewing batches */}
        <Modal
          title="Batches"
          open={batchesModalVisible}
          onCancel={closeBatchesModal}
          footer={[
            <Button key="close" onClick={closeBatchesModal}>
              Close
            </Button>,
          ]}
        >
          <Table dataSource={batches} rowKey="_id" bordered>
            <Column title="Batch Name" dataIndex="name" key="name" />
          </Table>
        </Modal>
      </div>
    </div>
  );
}
