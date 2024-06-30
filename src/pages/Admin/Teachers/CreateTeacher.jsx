import { Button, Form, Input, Select, message } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTeacher } from "../../../services/TeacherService";
import { fetchDepartmentsByFaculty } from "../../../services/DepartmentService";
import { fetchFaculties } from "../../../services/FacultyService";

export default function CreateTeacher() {
  const [form] = Form.useForm();
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFacultiesData();
  }, []);

  useEffect(() => {
    if (selectedFaculty) {
      fetchDepartmentsData(selectedFaculty);
    }
  }, [selectedFaculty]);

  const onFinish = async (formData) => {
    try {
      const res = await createTeacher(formData);
      if (res.ok) {
        message.success("Teacher added successfully");
        form.resetFields();
        navigate("/teachers");
      } else {
        message.error(res.message || "Failed to add teacher");
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const handleFacultyChange = (value) => {
    setSelectedFaculty(value);
    form.setFieldsValue({ departmentId: "" });
  };

  const fetchFacultiesData = async () => {
    try {
      const data = await fetchFaculties();
      setFaculties(data);
    } catch (error) {
      message.error("Failed to fetch faculties");
    }
  };

  const fetchDepartmentsData = async (facultyId) => {
    try {
      const { data } = await fetchDepartmentsByFaculty(facultyId);
      setDepartments(data);
    } catch (error) {
      message.error("Failed to fetch departments");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Add Teacher
          </h1>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Teacher full name is required" },
              ]}
              label="Teacher Name"
            >
              <Input placeholder="Teacher full name" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Phone number is required" }]}
              label="Phone Number"
            >
              <Input placeholder="Phone number" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
              label="Email"
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="designation"
              rules={[{ required: true, message: "Designation is required" }]}
              label="Designation"
            >
              <Input placeholder="Designation" />
            </Form.Item>
            <Form.Item
              name="facultyId"
              rules={[
                { required: true, message: "Faculty selection is required" },
              ]}
              label="Select Faculty"
            >
              <Select
                placeholder="Select Faculty"
                onChange={handleFacultyChange}
              >
                {faculties.map((faculty) => (
                  <Select.Option key={faculty._id} value={faculty._id}>
                    {faculty.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="departmentId"
              rules={[
                {
                  required: true,
                  message: "Department selection is required",
                },
              ]}
              label="Select Department"
            >
              <Select placeholder="Select Department">
                {departments.map((department) => (
                  <Select.Option key={department._id} value={department._id}>
                    {department.shortName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" size="large" block>
                Add Teacher
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
