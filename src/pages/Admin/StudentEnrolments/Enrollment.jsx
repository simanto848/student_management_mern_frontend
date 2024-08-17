// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Button, message, Table, Input } from "antd";
import { Link } from "react-router-dom";
import { fetchStudents } from "../../../services/StudentService";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentData = await fetchStudents();
      setStudents(studentData);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch data!");
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.toString().split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const columns = [
    { title: "SL", dataIndex: "index", key: "index" },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
      render: (text) => highlightText(text, searchQuery),
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Registration No",
      dataIndex: "registrationNo",
      key: "registrationNo",
      render: (text) => highlightText(text, searchQuery),
    },
    {
      title: "Phone No",
      dataIndex: "phoneNo",
      key: "phoneNo",
      render: (text) => highlightText(text, searchQuery),
    },
    {
      title: "Batch No",
      dataIndex: "batchNo",
      key: "batchNo",
      render: (text) => highlightText(text, searchQuery),
    },
    {
      title: "Course Fee",
      dataIndex: "courseFee",
      key: "courseFee",
    },
    {
      title: "Scholarship Amount",
      dataIndex: "scholarshipAmount",
      key: "scholarshipAmount",
    },
    {
      title: "Semester Fee",
      dataIndex: "semesterFee",
      key: "semesterFee",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (text) => highlightText(text, searchQuery),
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
      render: (text) => highlightText(text, searchQuery),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Link to={`/admin/student/${record.key}`}>View Details</Link>
      ),
    },
  ];

  const filteredStudents = students.filter((student) =>
    [
      "name",
      "registrationNo",
      "phoneNo",
      "batchNo",
      "department",
      "session",
    ].some((key) =>
      student[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const data = filteredStudents.map((student, index) => ({
    key: student._id,
    index: index + 1,
    name: student.name,
    rollNo: student.rollNo,
    registrationNo: student.registrationNo,
    phoneNo: student.phoneNo,
    batchNo: student.batchId.name,
    courseFee: `${student.courseFee} tk`,
    scholarshipAmount: `${student.scholarship} tk`,
    semesterFee: `${student.semesterFee} tk`,
    department: student.departmentId.shortName,
    session: student.batchId.sessionId.session,
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Student List
          </h1>
          <Input
            placeholder="Search student..."
            onChange={handleSearch}
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
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          className="shadow-lg"
          scroll={{ x: 768 }}
          bordered
          footer={() => `Total Student Enrollment: ${students.length}`}
          style={{ borderRadius: 8 }}
        />
      </div>
    </div>
  );
}
