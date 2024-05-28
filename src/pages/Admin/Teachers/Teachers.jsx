/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, message, Table } from "antd";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteTeacher, fetchTeachers } from "../../../services/TeacherService";
import DeleteModal from "../../../components/DeleteModal";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const teacherData = await fetchTeachers();
      setTeachers(teacherData);
    } catch (error) {
      message.error("Failed to fetch data");
    }
  };

  const handleDelete = (teacherId) => {
    setDeletingTeacherId(teacherId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const deleted = await deleteTeacher(deletingTeacherId);
      if (deleted) {
        message.success("Teacher deleted successfully");
        fetchData();
        setDeleteModalVisible(false);
      }
    } catch (error) {
      message.error("Failed to delete teacher");
    }
  };

  const handleCancelDelete = () => {
    setDeletingTeacherId(null);
    setDeleteModalVisible(false);
  };

  const columns = [
    { title: "SL", dataIndex: "index", key: "index" },
    { title: "Teacher Name", dataIndex: "name", key: "name" },
    { title: "Faculty Name", dataIndex: "facultyName", key: "facultyName" },
    {
      title: "Department Name",
      dataIndex: "departmentName",
      key: "departmentName",
    },
    { title: "Designation", dataIndex: "designation", key: "designation" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Join On", dataIndex: "joinDate", key: "joinDate" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-row gap-1">
          <Link to={`/update-teacher/${record.key}`}>
            <Button
              size="small"
              icon={<EditOutlined />}
              className="hover:text-blue-600"
            />
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

  const data = teachers.map((teacher, index) => ({
    key: teacher._id,
    _id: teacher._id,
    index: index + 1,
    name: teacher.name,
    facultyName: teacher.facultyId.name,
    departmentName: teacher.departmentId.shortName,
    designation: teacher.designation,
    email: teacher.email,
    phone: teacher.phone,
    status: teacher.status,
    joinDate: moment(teacher.createdAt).format("MM-DD-YYYY"),
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Teacher List
          </h1>
          <Button
            className="mr-2 text-blue-600 border-blue-600"
            size="large"
            type="primary"
          >
            <Link to="/create-teacher">Add Teacher</Link>
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
        <DeleteModal
          visible={deleteModalVisible}
          onClose={handleCancelDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}
