// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Input, Button, Table, notification } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import DashSidebar from "../../../components/DashSidebar";
import { fetchStudents } from "../../../services/StudentService";

const Enrollment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetchStudents(searchTerm);
      setStudents(response);
    } catch (error) {
      console.error("Error fetching students:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while fetching students.",
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Batch",
      dataIndex: "batchNo",
      key: "batchNo",
    },
    {
      title: "Registration No",
      dataIndex: "registrationNo",
      key: "registrationNo",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
      key: "rollNo",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Course Fee",
      dataIndex: "courseFee",
      key: "courseFee",
    },
    {
      title: "Semester Fee",
      dataIndex: "semesterFee",
      key: "semesterFee",
    },
    {
      title: "Scholarship",
      dataIndex: "scholarship",
      key: "scholarship",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Link to={`/admin/student/${record._id}`}>View Details</Link>
      ),
    },
  ];

  const data = students.map((student, index) => ({
    key: student._id,
    _id: student._id,
    index: index + 1,
    name: student.name,
    registrationNo: student.registrationNo,
    rollNo: student.rollNo,
    batchNo: student.batchId.name,
    department: student.departmentId.shortName,
    session: student.batchId.sessionId.session,
    semesterFee: student.semesterFee,
    courseFee: student.courseFee,
    scholarship: student.scholarship,
    joinDate: moment(student.createdAt).format("MM-DD-YYYY"),
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="flex justify-center items-center mb-4">
          <Input
            placeholder="Search by registration no or batch"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-4 p-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 w-80"
            autoComplete="on"
          />
          <Button
            onClick={handleSearch}
            className="bg-blue-500 text-white text-center font-semibold px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Search
          </Button>
        </div>
        <Table columns={columns} dataSource={data} rowKey="_id" />
      </div>
    </div>
  );
};

export default Enrollment;
