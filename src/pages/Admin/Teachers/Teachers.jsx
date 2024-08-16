import { useState, useEffect } from "react";
import { Button, Input, message, Table } from "antd";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteTeacher, fetchTeachers } from "../../../services/TeacherService";
import DeleteModal from "../../../components/DeleteModal";
import VoiceToTextRecognition from "../../../components/VoiceToTextRecognition";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingTeacherId, setDeletingTeacherId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText, teachers]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const teacherData = await fetchTeachers();
      setTeachers(teacherData);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
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

  const handleVoiceInput = (text) => {
    setSearchText(text);
  };

  const filterData = () => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filtered = teachers.filter((teacher) => {
      return (
        teacher.name.toLowerCase().includes(lowercasedSearchText) ||
        teacher.facultyId.name.toLowerCase().includes(lowercasedSearchText) ||
        teacher.departmentId.shortName
          .toLowerCase()
          .includes(lowercasedSearchText) ||
        teacher.phone.toLowerCase().includes(lowercasedSearchText) ||
        teacher.email.toLowerCase().includes(lowercasedSearchText) ||
        teacher.designation.toLowerCase().includes(lowercasedSearchText) ||
        teacher.status.toLowerCase().includes(lowercasedSearchText)
      );
    });
    setFilteredTeachers(filtered);
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
          <Link to={`/admin/update-teacher/${record.key}`}>
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

  const data = filteredTeachers.map((teacher, index) => ({
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
            className="mr-2 text-blue-600 border-blue-600"
            size="large"
            type="primary"
          >
            <Link to="/admin/create-teacher">Add Teacher</Link>
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          className="shadow-lg"
          scroll={{ x: 768 }}
          bordered
          footer={() => `Total Teachers: ${teachers.length}`}
          style={{ borderRadius: 8 }}
        />
        <DeleteModal
          visible={deleteModalVisible}
          onClose={handleCancelDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}
