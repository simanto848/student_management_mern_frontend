import { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  updateFaculty,
  deleteFaculty,
  fetchFaculties,
} from "../../../services/FacultyService";
import Loading from "../../../components/Loading";
import VoiceToTextRecognition from "../../../components/VoiceToTextRecognition";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredFaculties(
      faculties.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, faculties]);

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

  const handleVoiceInput = (transcript) => {
    setSearchText(transcript);
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
        <div className="flex gap-2">
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
    <div className="min-h-screen flex flex-col">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4">
          <h1 className="text-slate-600 text-center text-2xl md:text-3xl font-bold mb-4 md:mb-0">
            Faculty List
          </h1>
          <div className="flex flex-col md:flex-row items-center md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <Input
              placeholder="Search Faculties"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ marginRight: 8 }}
              className="w-full md:w-auto"
            />
            <VoiceToTextRecognition onTranscript={handleVoiceInput} />
          </div>
          <Button
            className="text-blue-600 border-blue-600"
            size="large"
            type="primary"
            ghost
            style={{ marginTop: 8, width: "100%", maxWidth: "200px" }}
          >
            <Link to="/admin/create-faculty">
              <PlusOutlined /> Add Faculty
            </Link>
          </Button>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Table
            dataSource={filteredFaculties}
            columns={columns}
            loading={loading}
            pagination={{ pageSize: 10 }}
            rowKey="_id"
          />
        )}
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
