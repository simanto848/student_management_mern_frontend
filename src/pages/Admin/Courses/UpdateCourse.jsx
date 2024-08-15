/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchCourseById, updateCourse } from "../../../services/CourseService";
import { fetchFaculties } from "../../../services/FacultyService";
import { fetchDepartmentsByFaculty } from "../../../services/DepartmentService";
import Loading from "../../../components/Loading";

const { Option } = Select;

const UpdateCourse = () => {
  const [form] = Form.useForm();
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [loading, setLoading] = useState(true);

  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await fetchCourseById(courseId);
        const facultiesData = await fetchFaculties();

        if (courseData && facultiesData) {
          setFaculties(facultiesData);
          setSelectedFacultyId(courseData.departmentId.facultyId);

          if (courseData.facultyId) {
            const departmentsData = await fetchDepartmentsByFaculty(
              courseData.facultyId
            );
            setDepartments(departmentsData.data);
          }

          form.setFieldsValue({
            name: courseData.name,
            code: courseData.code,
            creditHours: courseData.creditHours,
            semester: courseData.semester,
            facultyId: courseData.facultyId,
            departmentId: courseData.departmentId,
            maintainable: courseData.maintainable,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error(error.message);
      }
    };
    fetchData();
  }, [courseId]);

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
    setLoading(true);
    try {
      const res = await updateCourse(courseId, values);
      if (res.ok !== undefined && res.ok === false) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update course");
      }
      message.success("Course updated successfully");
      navigate("/courses");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Update Course
          </h1>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            initialValues={{
              name: "",
              code: "",
              creditHours: "",
              semester: "",
              facultyId: selectedFacultyId,
              departmentId: "",
              maintainable: "",
            }}
          >
            <Form.Item
              label="Course Name"
              name="name"
              rules={[{ required: true, message: "Please enter course name" }]}
            >
              <Input placeholder="Course Name" size="large" />
            </Form.Item>
            <Form.Item
              label="Course Code"
              name="code"
              rules={[{ required: true, message: "Please enter course code" }]}
            >
              <Input placeholder="Course Code" size="large" />
            </Form.Item>
            <Form.Item
              label="Credit hour"
              name="creditHours"
              rules={[{ required: true, message: "Please enter credit hour" }]}
            >
              <Input type="number" placeholder="Credit hour" size="large" />
            </Form.Item>
            <Form.Item
              label="Select Semester"
              name="semester"
              rules={[{ required: true, message: "Please select semester" }]}
            >
              <Select placeholder="Select Semester" size="large">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                  <Option key={semester} value={semester}>
                    {semester}
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
                placeholder="Select Faculty"
                onChange={handleFacultyChange}
                size="large"
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
              <Select placeholder="Select Department" size="large">
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
              <Select placeholder="Select Course Status" size="large">
                {[true, false].map((status) => (
                  <Option key={status} value={status}>
                    {status.toString()}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full"
                size="large"
                htmlType="submit"
                loading={loading}
              >
                Update Course
              </Button>
              <Button className="w-full mt-2" size="large">
                <Link to="/admin/courses">Cancel</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
