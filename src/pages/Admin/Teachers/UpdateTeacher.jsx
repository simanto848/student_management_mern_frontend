/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, message, Select, Input, Form, Space } from "antd";
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
          facultyId: teacherData.facultyId._id,
          departmentId: teacherData.departmentId._id,
          status: teacherData.status,
        });

        setSelectedFacultyId(teacherData.facultyId._id);
        const facultiesData = await fetchFaculties();
        setFaculties(facultiesData);

        const departmentsData = await fetchDepartmentsByFaculty(
          teacherData.facultyId._id
        );
        setDepartments(departmentsData.data);
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
      const res = await updateTeacher(teacherId, {
        ...values,
        facultyId: values.facultyId,
        departmentId: values.departmentId,
      });
      if (!res.ok) {
        throw new Error("Failed to update teacher");
      }
      message.success("Teacher updated successfully");
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Update Teacher
          </h1>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Teacher Name"
              name="name"
              rules={[
                { required: true, message: "Please input the teacher's name!" },
              ]}
            >
              <Input placeholder="Teacher full name" size="large" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <Input placeholder="Phone number" size="large" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input the email!" }]}
            >
              <Input type="email" placeholder="Email" size="large" />
            </Form.Item>
            <Form.Item
              label="Designation"
              name="designation"
              rules={[
                { required: true, message: "Please input the designation!" },
              ]}
            >
              <Input placeholder="Designation" size="large" />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please input the status!" }]}
            >
              <Input placeholder="Status" size="large" />
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
                size="large"
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
              <Select placeholder="Select Department" size="large">
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
