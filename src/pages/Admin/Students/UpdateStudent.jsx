// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Form, Select, Button, message, Input } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import DashSidebar from "../../../components/DashSidebar";
import {
  fetchStudentById,
  updateStudent,
} from "../../../services/StudentService";
import { fetchDepartments } from "../../../services/DepartmentService";
import { fetchSessions } from "../../../services/SessionService";
import { fetchBatchBySessionId } from "../../../services/BatchService";

export default function UpdateStudent() {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null); // State to store the selected session

  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    fetchData();
    fetchDepartmentsData();
    fetchSessionsData();
  }, [studentId]);

  useEffect(() => {
    if (selectedSession) {
      fetchBatchesBySession(selectedSession);
    }
  }, [selectedSession]);

  const fetchData = async () => {
    try {
      const studentData = await fetchStudentById(studentId);
      form.setFieldsValue({
        name: studentData.name,
        email: studentData.email,
        phoneNo: studentData.phoneNo,
        rollNo: studentData.rollNo,
        departmentId: studentData.departmentId,
        sessionId: studentData.sessionId,
        batchId: studentData.batchId.name,
        courseFee: studentData.courseFee,
      });
    } catch (error) {
      message.error(error.message);
    }
  };

  const fetchDepartmentsData = async () => {
    try {
      const departmentsData = await fetchDepartments();
      setDepartments(departmentsData);
    } catch (error) {
      message.error("Failed to fetch departments");
    }
  };

  const fetchSessionsData = async () => {
    try {
      const sessionsData = await fetchSessions();
      setSessions(sessionsData);
    } catch (error) {
      message.error("Failed to fetch sessions");
    }
  };

  const fetchBatchesBySession = async (sessionId) => {
    try {
      const batchesData = await fetchBatchBySessionId(sessionId);
      setBatches(batchesData);
    } catch (error) {
      message.error("Failed to fetch batches");
    }
  };

  const onFinish = async (values) => {
    try {
      const res = await updateStudent(studentId, values);
      if (res.ok === false) {
        throw new Error("Failed to update student");
      } else {
        message.success("Student updated successfully");
        navigate("/admin/students");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleSessionChange = (value) => {
    setSelectedSession(value); // Update the selected session
    form.setFieldsValue({ batchId: "" }); // Reset batch selection when session changes
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md border-2">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Update Student
          </h1>
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            initialValues={{
              name: "",
              email: "",
              phoneNo: "",
              rollNo: "",
              departmentId: "",
              sessionId: "",
              batchId: "",
              courseFee: "",
            }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Student Name is required" }]}
              label="Name"
            >
              <Input placeholder="Enter Student Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Student email is required" }]}
              label="Email"
            >
              <Input placeholder="Enter student email" />
            </Form.Item>
            <Form.Item
              name="phoneNo"
              rules={[
                { required: true, message: "Student phone number is required" },
              ]}
              label="Phone Number"
            >
              <Input placeholder="Enter student phone number" />
            </Form.Item>
            <Form.Item
              name="rollNo"
              rules={[
                { required: true, message: "Student roll number is required" },
              ]}
              label="Roll Number"
            >
              <Input placeholder="Enter student roll number" />
            </Form.Item>
            <Form.Item
              name="departmentId"
              rules={[
                { required: true, message: "Department selection is required" },
              ]}
              label="Select Department"
            >
              <Select placeholder="Please select Department">
                {departments.map((department) => (
                  <Select.Option key={department._id} value={department._id}>
                    {department.shortName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="sessionId"
              rules={[
                { required: true, message: "Session selection is required" },
              ]}
              label="Select Session"
            >
              <Select
                placeholder="Please select Session"
                onChange={handleSessionChange} // Handle session selection change
              >
                {sessions.map((session) => (
                  <Select.Option key={session._id} value={session._id}>
                    {session.session}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="batchId"
              rules={[
                { required: true, message: "Batch selection is required" },
              ]}
              label="Select Batch"
            >
              <Select placeholder="Please select Batch">
                {batches.map((batch) => (
                  <Select.Option key={batch._id} value={batch._id}>
                    {batch.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="courseFee"
              rules={[{ required: true, message: "Course Fee is required" }]}
              label="Course Fee"
            >
              <Input placeholder="Enter Course Fee" />
            </Form.Item>
            <Form.Item>
              <Button className="w-full" htmlType="submit">
                Update Student
              </Button>
              <Button className="w-full mt-2">
                <Link to="/admin/students">Cancel</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
