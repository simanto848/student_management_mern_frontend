// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, message, Table, Modal, Input } from "antd";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { EditOutlined } from "@ant-design/icons";
import DashSidebar from "../../../components/DashSidebar";
import { fetchStudents, deleteStudent } from "../../../services/StudentService";

export default function StudenList() {
  const [students, setStudents] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentData = await fetchStudents();
      setStudents(studentData);
    } catch (error) {
      message.error("Failed to fetch data!");
    }
  };

  const handleDelete = async (studentId) => {
    try {
      setDeletingStudentId(studentId);
      setDeleteModalVisible(true);
    } catch (error) {
      message.error("Failed to delete student!");
    }
  };

  const confirmDelete = async () => {
    try {
      const deleted = await deleteStudent(deletingStudentId);
      if (deleted) {
        message.success("Student deleted successfully!");
        fetchData();
        setDeleteModalVisible(false);
      }
    } catch (error) {
      message.error("Failed to delete student!");
    }
  };

  const handleCancelDelete = () => {
    setDeletingStudentId(null);
    setDeleteModalVisible(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const columns = [
    { title: "SL", dataIndex: "index", key: "index" },
    { title: "Student Name", dataIndex: "name", key: "name" },
    { title: "Roll No", dataIndex: "rollNo", key: "rollNo" },
    {
      title: "Registration No",
      dataIndex: "registrationNo",
      key: "registrationNo",
    },
    { title: "Phone No", dataIndex: "phoneNo", key: "phoneNo" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Batch No", dataIndex: "batchNo", key: "batchNo" },
    { title: "Course Fee", dataIndex: "courseFee", key: "courseFee" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Session", dataIndex: "session", key: "session" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex flex-row gap-1">
          <Link to={`/admin/update/student/${record.key}`}>
            <Button size="small" icon={<EditOutlined />} />
          </Link>
          <Button
            size="small"
            icon={<HiTrash />}
            onClick={() => handleDelete(record.key)}
            className="hover:text-red-700"
          />
        </div>
      ),
    },
  ];

  const data = students.map((student, index) => ({
    key: student._id,
    index: index + 1,
    name: student.name,
    rollNo: student.rollNo,
    registrationNo: student.registrationNo,
    phoneNo: student.phoneNo,
    email: student.email,
    batchNo: student.batchNo,
    courseFee: student.courseFee,
    department: student.departmentId.shortName,
    session: student.sessionId.session,
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Student List
          </h1>
          <Input
            placeholder="Search student..."
            onChange={(e) => handleSearch(e.target.value)}
            value={searchQuery}
            className="w-80 rounded-lg outline-none border-1 border-blue-500 p-2"
          />

          <Button
            className="mr-2 text-blue-600 border-blue-600"
            size="large"
            type="primary"
          >
            <Link to="/admin/add/student">Add Student</Link>
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
        <Modal
          title="Confirm Delete"
          open={deleteModalVisible}
          onOk={confirmDelete}
          onCancel={handleCancelDelete}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this teacher?</p>
        </Modal>
      </div>
    </div>
  );
}
