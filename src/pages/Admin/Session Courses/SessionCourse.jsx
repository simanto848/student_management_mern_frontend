/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, message, Select, Table } from "antd";
import { Link } from "react-router-dom";
import { fetchSessions } from "../../../services/SessionService";
import {
  fetchSessionCoursesBySessionId,
  updateSessionCourse,
} from "../../../services/SessionCourseService";
import { fetchTeachers } from "../../../services/TeacherService";

export default function SessionCourse() {
  const [sessionCourses, setSessionCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSessionsData();
    fetchTeachersData();
  }, []);

  const fetchSessionCoursesData = async (sessionId) => {
    setLoading(true);
    try {
      const response = await fetchSessionCoursesBySessionId(sessionId);
      if (response.length === 0) {
        message.info("No session courses found for this session!");
      }
      setSessionCourses(response);
    } catch (error) {
      message.error("Failed to fetch session courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionsData = async () => {
    setLoading(true);
    try {
      const response = await fetchSessions();
      setSessions(response);
    } catch (error) {
      message.error("Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  const fetchTeachersData = async () => {
    setLoading(true);
    try {
      const response = await fetchTeachers();
      setTeachers(response);
    } catch (error) {
      message.error("Failed to fetch teachers");
    } finally {
      setLoading(false);
    }
  };

  const handleTeacherAssign = async (sessionCourseId, teacherId) => {
    try {
      const response = await updateSessionCourse(sessionCourseId, teacherId);
      if (response.message) {
        message.success(response.message);
      } else {
        throw new Error("Failed to update session course");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    { title: "SL", dataIndex: "index", key: "index" },
    { title: "Session", dataIndex: "session", key: "session" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Course Code", dataIndex: "course", key: "course" },
    {
      title: "Assign Teacher",
      dataIndex: "assignTeacher",
      key: "assignTeacher",
      render: (text, record) => (
        <Select
          style={{ width: 200 }}
          placeholder="Please assign teacher"
          value={record.teacherId || undefined}
          onChange={(value) => handleTeacherAssign(record._id, value)}
        >
          {teachers.map((teacher) => (
            <Select.Option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  const data = sessionCourses.map((sessionCourse, index) => ({
    key: sessionCourse._id,
    _id: sessionCourse._id,
    index: index + 1,
    session: sessionCourse.sessionId.session,
    department: sessionCourse.departmentId.shortName,
    courseName: sessionCourse.courseId.name,
    course: sessionCourse.courseId.code,
    teacherId: sessionCourse.teacherId ? sessionCourse.teacherId : null,
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Session Course
          </h1>
          <Button size="large">
            <Link to="/admin/create-session-course">Add Session Course</Link>
          </Button>
        </div>
        <div className="my-2 flex justify-center">
          <Select
            style={{ width: 200 }}
            placeholder="Select a session"
            onChange={(value) => {
              fetchSessionCoursesData(value);
            }}
          >
            {sessions.map((session) => (
              <Select.Option key={session._id} value={session._id}>
                {session.session}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="my-2">
          <Table columns={columns} dataSource={data} loading={loading} />
        </div>
      </div>
    </div>
  );
}
