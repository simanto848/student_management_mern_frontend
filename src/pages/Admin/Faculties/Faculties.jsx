import { useState, useEffect } from "react";
import { Button, Table, Modal, Typography } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";
import moment from "moment";
import {
  fetchFaculties,
  deleteFaculty,
} from "../../../services/FacultyService";
import toast, { Toaster } from "react-hot-toast";

const { Text } = Typography;

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const facultiesData = await fetchFaculties();
        setFaculties(facultiesData);
      } catch (error) {
        toast.error("Failed to fetch faculties");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!facultyToDelete) return;
    try {
      await deleteFaculty(facultyToDelete._id);
      setFaculties((prevFaculties) =>
        prevFaculties.filter((faculty) => faculty._id !== facultyToDelete._id)
      );
      toast.success("Faculty deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete faculty");
    } finally {
      setDeleteModalVisible(false);
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
          <Link to={`/update-faculty/${record._id}`}>
            <Button icon={<EditOutlined />} size="small" />
          </Link>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => {
              setFacultyToDelete(record);
              setDeleteModalVisible(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1">
        <Toaster position="top-right" />
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
        title="Delete Faculty"
        open={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDelete}
        okText="Confirm"
        cancelText="Cancel"
      >
        <Text>
          Are you sure you want to delete faculty &quot;{facultyToDelete?.name}
          &quot;?
        </Text>
      </Modal>
    </div>
  );
}
