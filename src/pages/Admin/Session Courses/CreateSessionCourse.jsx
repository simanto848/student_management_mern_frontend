/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Form, message, Select, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { fetchSessions } from "../../../services/SessionService";
import { fetchFaculties } from "../../../services/FacultyService";
import { fetchDepartmentsByFaculty } from "../../../services/DepartmentService";
import { fetchCoursesByDepartment } from "../../../services/CourseService";
import {
  fetchSessionCoursesByDepartment,
  createSessionCourse,
} from "../../../services/SessionCourseService";
import Loading from "../../../components/Loading";

export default function CreateSessionCourse() {
  const [form] = Form.useForm();
  const [sessions, setSessions] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [departmentDisabled, setDepartmentDisabled] = useState(true);
  const [sessionDisabled, setSessionDisabled] = useState(true);
  const [selectedSessionCourses, setSelectedSessionCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    handleDataFetching();
  }, [selectedFaculty, selectedDepartment, selectedSession]);

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchSessionData();
      await fetchFacultiesData();
    } catch (error) {
      message.error("Failed to fetch initial data");
    } finally {
      setLoading(false);
    }
  };

  const handleDataFetching = async () => {
    if (selectedFaculty) {
      setDepartmentDisabled(false);
      await fetchDepartmentsData(selectedFaculty);
    } else {
      setDepartments([]);
      setSelectedDepartment("");
      setDepartmentDisabled(true);
    }

    if (selectedDepartment) {
      setSessionDisabled(false);
      await fetchCoursesByDepartmentData(selectedDepartment);
    } else {
      setCourses([]);
      setSelectedSession("");
      setSessionDisabled(true);
    }

    if (selectedSession && selectedDepartment) {
      await fetchSessionCoursesData(selectedSession, selectedDepartment);
    }
  };

  const fetchSessionData = async () => {
    try {
      const data = await fetchSessions();
      setSessions(data);
    } catch (error) {
      message.error("Failed to fetch sessions");
    }
  };

  const fetchFacultiesData = async () => {
    try {
      const data = await fetchFaculties();
      setFaculties(data);
    } catch (error) {
      message.error("Failed to fetch faculties");
    }
  };

  const handleFacultyChange = (value) => {
    setSelectedFaculty(value);
    form.setFieldsValue({ departmentId: "" });
  };

  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  const fetchDepartmentsData = async (facultyId) => {
    setLoading(true);
    try {
      const { data } = await fetchDepartmentsByFaculty(facultyId);
      setDepartments(data);
    } catch (error) {
      message.error("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const fetchCoursesByDepartmentData = async (departmentId) => {
    setLoading(true);
    try {
      const data = await fetchCoursesByDepartment(departmentId);
      setCourses(data);
    } catch (error) {
      message.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionCoursesData = async (sessionId, departmentId) => {
    setLoading(true);
    try {
      const data = await fetchSessionCoursesByDepartment(
        sessionId,
        departmentId
      );
      if (data.length === 0) {
        message.info("No session courses found for this session!");
      }
      const selectedCourses = data.map((course) => course.courseId);
      setSelectedSessionCourses(selectedCourses);
      form.setFieldsValue({ courseIds: selectedCourses });
    } catch (error) {
      message.error("Failed to fetch session courses");
    } finally {
      setLoading(false);
    }
  };

  const handleSessionChange = (value) => {
    setSelectedSession(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const { sessionId, departmentId, courseIds } = values;
      await createSessionCourse(sessionId, departmentId, courseIds);
      message.success("Session courses created/updated successfully");
    } catch (error) {
      message.error("Failed to create/update session courses");
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
        <div className="max-w-md mx-auto bg-white rounded-lg p-6">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Add Session Course
          </h1>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            initialValues={{ courseIds: selectedSessionCourses }}
          >
            <Form.Item
              name="facultyId"
              rules={[
                { required: true, message: "Faculty selection is required" },
              ]}
              label="Select Faculty"
            >
              <Select
                placeholder="Please select Faculty"
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
                { required: true, message: "Department selection is required" },
              ]}
              label="Select Department"
            >
              <Select
                placeholder="Please select Department"
                onChange={handleDepartmentChange}
                disabled={departmentDisabled}
              >
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
                onChange={handleSessionChange}
                disabled={sessionDisabled}
              >
                {sessions.map((session) => (
                  <Select.Option key={session._id} value={session._id}>
                    {session.session}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {courses.length > 0 && (
              <Form.Item label="All Courses" name="courseIds">
                <Checkbox.Group initialValues={selectedSessionCourses}>
                  {courses.map((course) => (
                    <Checkbox key={course._id} value={course._id}>
                      {course.name}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            )}
            <Form.Item className="flex flex-row justify-center items-center">
              <Button htmlType="submit" className="mr-4">
                Add Session Course
              </Button>
              <Button>
                <Link to="/session-courses">Back</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
