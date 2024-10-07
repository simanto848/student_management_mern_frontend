// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CheckTeacher from "../components/OnlyTeacherRoutes";
import Courses from "../pages/Teacher/Courses";

const TeacherRoutes = () => {
  return (
    <Route element={<CheckTeacher />}>
      <Route path="/teacher/course-list" element={<Dashboard />} />
      <Route path="/teacher/courses" element={<Courses />} />
    </Route>
  );
};

export default TeacherRoutes;
