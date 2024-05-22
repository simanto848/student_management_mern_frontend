// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Input, Button, Table } from "antd";
import { Link } from "react-router-dom";
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
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "batch",
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
      title: "Total Paid",
      dataIndex: "totalPaid",
      key: "totalPaid",
    },
    {
      title: "Total Due",
      dataIndex: "totalDue",
      key: "totalDue",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Link to={`/student/${record._id}`}>View Details</Link>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="flex justify-center items-center mb-4">
          <Input
            placeholder="Search by registration no or batch no"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-4 p-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 w-80"
          />
          <Button
            onClick={handleSearch}
            className="bg-blue-500 text-white text-center font-semibold px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Search
          </Button>
        </div>
        <Table columns={columns} dataSource={students} rowKey="_id" />
      </div>
    </div>
  );
};

export default Enrollment;
