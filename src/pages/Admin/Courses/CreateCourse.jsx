import { Button, Form, Input, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DashSidebar from "../../../components/DashSidebar";
import { useEffect, useState } from "react";
import { createCourse } from "../../../services/CourseService";
import { fetchFaculties } from "../../../services/FacultyService";
import { fetchDepartmentsByFaculty } from "../../../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select;

export default function CreateCourse() {
  const [formData, setFormData] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const semesterOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  const maintainableOptions = [true, false];

  const navigate = useNavigate();

  useEffect(() => {
    fetchFaculty();
  }, []);

  useEffect(() => {
    if (selectedFaculty) {
      fetchDepartmentsBySelectedFaculty();
    }
  }, [selectedFaculty]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await createCourse(formData);
      if (res.ok === false) {
        return message.error(res.message);
      }

      message.success(res.message);
      navigate("/courses");
    } catch (error) {
      message.error("Failed to create course!");
    }
  };

  const fetchFaculty = async () => {
    try {
      const data = await fetchFaculties();
      setFaculties(data);
    } catch (error) {
      message.error("Failed to fetch faculty!");
    }
  };

  const fetchDepartmentsBySelectedFaculty = async () => {
    try {
      const data = await fetchDepartmentsByFaculty(selectedFaculty);
      setDepartments(data.data);
    } catch (error) {
      message.error("Failed to fetch departments!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Add Course
          </h1>
          <Form
            onFinish={handleSubmit}
            className="max-w-md mx-auto"
            layout="vertical"
          >
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true, message: "Please enter course name" }]}
            >
              <Input
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Course Code"
              name="code"
              rules={[{ required: true, message: "Please enter course code" }]}
            >
              <Input
                value={formData.code || ""}
                onChange={(e) => handleChange("code", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Credit hour"
              name="creditHours"
              rules={[{ required: true, message: "Please enter credit hour" }]}
            >
              <Input
                type="number"
                value={formData.creditHours || ""}
                onChange={(e) => handleChange("creditHours", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Select Semester"
              name="semester"
              rules={[{ required: true, message: "Please select semester" }]}
            >
              <Select
                value={formData.semester || ""}
                onChange={(value) => handleChange("semester", value)}
              >
                {semesterOptions.map((semester) => (
                  <Option key={semester} value={semester}>
                    {`Semester ${semester}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Faculty"
              name="facultyId"
              rules={[{ required: true, message: "Please select faculty" }]}
            >
              <Select
                value={formData.facultyId || ""}
                onChange={(value) => {
                  handleChange("facultyId", value);
                  setSelectedFaculty(value);
                }}
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
              rules={[{ required: true, message: "Please select department" }]}
            >
              <Select
                value={formData.departmentId || ""}
                onChange={(value) => handleChange("departmentId", value)}
              >
                {departments.map((department) => (
                  <Option key={department._id} value={department._id}>
                    {department.shortName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Select Course Status"
              name="maintainable"
              rules={[
                { required: true, message: "Please select course status" },
              ]}
            >
              <Select
                value={formData.maintainable || ""}
                onChange={(value) => handleChange("maintainable", value)}
              >
                {maintainableOptions.map((maintainable) => (
                  <Option key={maintainable} value={maintainable}>
                    {maintainable.toString()}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full"
                htmlType="submit"
                icon={<PlusOutlined />}
                block
              >
                Add
              </Button>
              <Button className="w-full mt-2">
                <Link to="/courses">Cancel</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
