// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, Table, message, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";
import moment from "moment";
import {
  fetchBatches,
  updateBatch,
  deleteBatch,
} from "../../../services/BatchService";

const { Column } = Table;
const { Item } = Form;

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [visible, setVisible] = useState(false);
  const [batchToUpdate, setBatchToUpdate] = useState({});
  const [form] = Form.useForm();

  const fetchBatchData = async () => {
    try {
      const data = await fetchBatches();
      setBatches(data);
    } catch (error) {
      message.error("Failed to fetch batches!");
    }
  };

  const handleEdit = (record) => {
    setBatchToUpdate(record);
    setVisible(true);
    form.setFieldsValue({ batch: record.batch });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await updateBatch(batchToUpdate._id, values.batch);
      message.success(`Batch "${values.batch}" updated successfully`);
      setVisible(false);
      form.resetFields();
      fetchBatchData();
    } catch (error) {
      message.error("Failed to update batch");
    }
  };

  const handleDelete = async (batchId) => {
    try {
      await deleteBatch(batchId);
      setBatches((prevBatch) =>
        prevBatch.filter((batch) => batch._id !== batchId)
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
            Batch List
          </h1>
          <Button className="mr-2">
            <Link to="/create-session">Add Batch</Link>
          </Button>
        </div>
        <Table dataSource={batches} rowKey="_id">
          <Column
            title="SL"
            dataIndex="index"
            key="index"
            render={(text, record, index) => index + 1}
          />
          <Column title="Batch" dataIndex="batch" key="batch" />
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
          title="Edit Batch"
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
              label="Batch"
              name="bacth"
              rules={[{ required: true, message: "Please enter batch" }]}
            >
              <Input />
            </Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
