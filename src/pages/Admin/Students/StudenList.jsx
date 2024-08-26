import { useState, useEffect } from "react";
import { Button, Input, message, Table } from "antd";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { EditOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteStudent, fetchStudents } from "../../../services/StudentService";
import DeleteModal from "../../../components/DeleteModal";
import VoiceToTextRecognition from "../../../components/VoiceToTextRecognition";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchText, students]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const studentData = await fetchStudents();
      setStudents(studentData);
    } catch (error) {
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (studentId) => {
    setDeletingStudentId(studentId);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const deleted = await deleteStudent(deletingStudentId);
      if (deleted) {
        message.success("Student deleted successfully");
        fetchData();
        setDeleteModalVisible(false);
      }
    } catch (error) {
      message.error("Failed to delete student");
    }
  };

  const handleCancelDelete = () => {
    setDeletingStudentId(null);
    setDeleteModalVisible(false);
  };

  const handleVoiceInput = (text) => {
    setSearchText(text);
  };

  const filterData = () => {
    const lowercasedSearchText = searchText.toLowerCase();
    const filtered = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(lowercasedSearchText) ||
        student.rollNo
          .toString()
          .toLowerCase()
          .includes(lowercasedSearchText) ||
        student.registrationNo.toLowerCase().includes(lowercasedSearchText) ||
        student.phoneNo
          .toString()
          .toLowerCase()
          .includes(lowercasedSearchText) ||
        student.email.toLowerCase().includes(lowercasedSearchText) ||
        student.batchId.name.toLowerCase().includes(lowercasedSearchText) ||
        student.departmentId.shortName
          .toLowerCase()
          .includes(lowercasedSearchText)
      );
    });
    setFilteredStudents(filtered);
  };

  const columns = [
    { title: "SL", dataIndex: "index", key: "index" },
    { title: "Student Name", dataIndex: "name", key: "name" },
    {
      title: "Registration No",
      dataIndex: "registrationNo",
      key: "registrationNo",
    },
    { title: "Roll No", dataIndex: "rollNo", key: "rollNo" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phoneNo", key: "phoneNo" },
    { title: "Batch", dataIndex: "batchName", key: "batchName" },
    { title: "Semester Fee", dataIndex: "semesterFee", key: "semesterFee" },
    { title: "Course Fee", dataIndex: "courseFee", key: "courseFee" },
    {
      title: "Scholarship",
      dataIndex: "scholarshipAmount",
      key: "scholarshipAmount",
    },
    {
      title: "Department",
      dataIndex: "departmentShortName",
      key: "departmentShortName",
    },
    { title: "Session", dataIndex: "session", key: "session" },
    { title: "Join On", dataIndex: "joinDate", key: "joinDate" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex flex-row gap-1">
          <Link to={`/admin/update/student/${record.key}`}>
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

  const data = filteredStudents.map((student, index) => ({
    key: student._id,
    index: index + 1,
    name: student.name,
    registrationNo: student.registrationNo,
    rollNo: student.rollNo,
    batchNo: student.batchId.name,
    email: student.email,
    phoneNo: student.phoneNo,
    batchName: student.batchId.name,
    semesterFee: `${student.semesterFee} tk`,
    courseFee: `${student.courseFee} tk`,
    scholarshipAmount: `${student.scholarship} tk`,
    departmentShortName: student.departmentId.shortName,
    session: student.batchId.sessionId.session,
    joinDate: moment(student.createdAt).format("MM-DD-YYYY"),
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Student List
          </h1>
          <div className="flex flex-col md:flex-row items-center md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <Input
              placeholder="Search Students"
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
            <Link to="/admin/add/student">Add Student</Link>
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          className="shadow-lg"
          scroll={{ x: 768 }}
          bordered
          footer={() => `Total Students: ${students.length}`}
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
