/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, message, Select, Input, Form, Space } from "antd";
import DashSidebar from "../../../components/DashSidebar";
import { useParams } from "react-router-dom";
import {
  fetchTeacherById,
  updateTeacher,
} from "../../../services/TeacherService";
import { fetchFaculties } from "../../../services/FacultyService";
import { fetchDepartmentsByFaculty } from "../../../services/DepartmentService";

const { Option } = Select;

const UpdateTeacher = () => {
  const [form] = Form.useForm();
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const { teacherId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherData = await fetchTeacherById(teacherId);
        form.setFieldsValue({
          name: teacherData.name,
          phone: teacherData.phone,
          email: teacherData.email,
          designation: teacherData.designation,
          facultyId: teacherData.facultyId,
          departmentId: teacherData.departmentId,
          status: teacherData.status,
        });

        setSelectedFacultyId(teacherData.facultyId);
        setSelectedDepartmentId(teacherData.departmentId);

        const facultiesData = await fetchFaculties();
        setFaculties(facultiesData);
      } catch (error) {
        message.error(error.message);
      }
    };
    fetchData();
  }, [teacherId]);

  const handleFacultyChange = async (facultyId) => {
    setSelectedFacultyId(facultyId);
    form.setFieldsValue({ departmentId: "" });
    try {
      const departmentsData = await fetchDepartmentsByFaculty(facultyId);
      setDepartments(departmentsData.data);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    try {
      const res = await updateTeacher(teacherId, values);
      if (!res.ok) {
        throw new Error("Failed to update teacher");
      }
      message.success("Teacher updated successfully");

      const updatedTeacherData = await fetchTeacherById(teacherId);

      form.setFieldsValue({
        name: updatedTeacherData.name,
        phone: updatedTeacherData.phone,
        email: updatedTeacherData.email,
        designation: updatedTeacherData.designation,
        facultyId: updatedTeacherData.facultyId,
        departmentId: updatedTeacherData.departmentId,
        status: updatedTeacherData.status,
      });

      setSelectedFacultyId(updatedTeacherData.facultyId);
      setSelectedDepartmentId(updatedTeacherData.departmentId);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Update Teacher
          </h1>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              name: "",
              phone: "",
              email: "",
              designation: "",
              facultyId: selectedFacultyId,
              departmentId: selectedDepartmentId,
              status: "",
            }}
          >
            <Form.Item
              label="Teacher Name"
              name="name"
              rules={[
                { required: true, message: "Please input the teacher's name!" },
              ]}
            >
              <Input placeholder="Teacher full name" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Designation"
              name="designation"
              rules={[
                { required: true, message: "Please input the designation!" },
              ]}
            >
              <Input placeholder="Designation" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please input the status!" }]}
            >
              <Input placeholder="Status" />
            </Form.Item>
            <Form.Item
              label="Select Faculty"
              name="facultyId"
              rules={[
                { required: true, message: "Please select the faculty!" },
              ]}
            >
              <Select
                placeholder="Select Faculty"
                onChange={handleFacultyChange}
              >
                {faculties.map((faculty) => (
                  <Option key={faculty._id} value={faculty._id}>
                    {faculty.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Select Department"
              name="departmentId"
              rules={[
                { required: true, message: "Please select the department!" },
              ]}
            >
              <Select placeholder="Select Department">
                {departments.map((department) => (
                  <Option key={department._id} value={department._id}>
                    {department.shortName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button htmlType="submit">Update</Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacher;
