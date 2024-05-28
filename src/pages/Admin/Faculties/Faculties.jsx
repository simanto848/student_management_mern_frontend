import { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  updateFaculty,
  deleteFaculty,
  fetchFaculties,
} from "../../../services/FacultyService";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const facultiesData = await fetchFaculties();
      setFaculties(facultiesData);
    } catch (error) {
      message.error("Failed to fetch faculties");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faculty) => {
    setEditingFaculty(faculty);
    form.setFieldsValue({
      name: faculty.name,
    });
    setEditModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updated = await updateFaculty(editingFaculty._id, values.name);
      if (updated) {
        message.success("Faculty updated successfully");
        setEditModalVisible(false);
        fetchData();
      }
    } catch (error) {
      message.error("Failed to update faculty");
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleDelete = async (facultyId) => {
    try {
      await deleteFaculty(facultyId);
      setFaculties((prevFaculties) =>
        prevFaculties.filter((faculty) => faculty._id !== facultyId)
      );
      message.success("Faculty deleted successfully");
    } catch (error) {
      message.error("Failed to delete faculty");
    }
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "index",
      key: "index",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("MM-DD-YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Faculty List
          </h1>
          <Button className="mr-2" size="large" type="primary" ghost>
            <Link to="/create-faculty">
              <PlusOutlined /> Add Faculty
            </Link>
          </Button>
        </div>
        <Table
          dataSource={faculties}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowKey="_id"
        />
      </div>

      <Modal
        title="Edit Faculty"
        open={editModalVisible}
        onCancel={handleCancelEdit}
        onOk={handleUpdate}
        confirmLoading={loading}
        okButtonProps={{
          style: {
            color: "#000",
            borderColor: "#ccc 1px solid",
          },
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Faculty Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input faculty name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
