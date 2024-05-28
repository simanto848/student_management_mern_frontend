/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, message, Select, Table } from "antd";
import { Link } from "react-router-dom";
import { fetchSessions } from "../../../services/SessionService";
import { fetchSessionCoursesBySessionId } from "../../../services/SessionCourseService";

export default function SessionCourse() {
  const [sessionCourses, setSessionCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessionsData();
  }, []);

  const fetchSessionCoursesData = async (sessionId) => {
    try {
      const response = await fetchSessionCoursesBySessionId(sessionId);
      if (response.length > 0) {
        setSessionCourses(response);
      } else {
        setSessionCourses([]);
        message.error(response.message || "No session courses found");
      }
    } catch (error) {
      console.error("Failed to fetch session courses:", error);
      message.error("Failed to fetch session courses");
    }
  };

  const fetchSessionsData = async () => {
    try {
      const response = await fetchSessions();
      if (response.length > 0) {
        setSessions(response);
      } else {
        message.error("No sessions found");
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
      message.error("Failed to fetch sessions");
    }
  };

  const columns = [
    { title: "SL", dataIndex: "index", key: "index" },
    { title: "Session", dataIndex: "session", key: "session" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Course Name", dataIndex: "courseName", key: "courseName" },
    { title: "Course", dataIndex: "course", key: "course" },
  ];

  const data = sessionCourses.map((sessionCourse, index) => ({
    key: sessionCourse._id,
    _id: sessionCourse._id,
    index: index + 1,
    session: sessionCourse.sessionId.session,
    department: sessionCourse.departmentId.shortName,
    courseName: sessionCourse.courseId.name,
    course: sessionCourse.courseId.code,
  }));

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Session Course
          </h1>
          <Button size="large">
            <Link to="/create-session-course">Add Session Course</Link>
          </Button>
        </div>
        <div className="my-2 flex justify-center ">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a session"
            optionFilterProp="children"
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
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  );
}
