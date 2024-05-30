// eslint-disable-next-line no-unused-vars
import React from "react";
import { Route } from "react-router-dom";
import Faculties from "../pages/Admin/Faculties/Faculties";
import CreateFaculty from "../pages/Admin/Faculties/CreateFaculty";
import Departments from "../pages/Admin/Departments/Departments";
import CreateDepartment from "../pages/Admin/Departments/CreateDepartment";
import Teachers from "../pages/Admin/Teachers/Teachers";
import CreateTeacher from "../pages/Admin/Teachers/CreateTeacher";
import UpdateTeacher from "../pages/Admin/Teachers/UpdateTeacher";
import Sessions from "../pages/Admin/Sessions/Sessions";
import CreateSession from "../pages/Admin/Sessions/CreateSession";
import Courses from "../pages/Admin/Courses/Courses";
import CreateCourse from "../pages/Admin/Courses/CreateCourse";
import UpdateCourse from "../pages/Admin/Courses/UpdateCourse";
import SessionCourse from "../pages/Admin/Session Courses/SessionCourse";
import CreateSessionCourse from "../pages/Admin/Session Courses/CreateSessionCourse";
import StudentList from "../pages/Admin/Students/StudenList";
import AddStudent from "../pages/Admin/Students/AddStudent";
import UpdateStudent from "../pages/Admin/Students/UpdateStudent";
import Batches from "../pages/Admin/Batches/Batches";
import CreateBatch from "../pages/Admin/Batches/CreateBatch";
import Enrollment from "../pages/Admin/StudentEnrolments/Enrollment";
import StudentProfile from "../pages/Admin/StudentEnrolments/StudentProfile ";
import CreateEnrolment from "../pages/Admin/StudentEnrolments/CreateEnrolment";
import OnlyAdminRoutes from "../components/OnlyAdminRoutes";

const AdminRoutes = () => {
  return (
    <Route element={<OnlyAdminRoutes />}>
      <Route path="/faculties" element={<Faculties />} />
      <Route path="/create-faculty" element={<CreateFaculty />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/create-department" element={<CreateDepartment />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/create-teacher" element={<CreateTeacher />} />
      <Route path="/update-teacher/:teacherId" element={<UpdateTeacher />} />
      <Route path="/sessions" element={<Sessions />} />
      <Route path="/create-session" element={<CreateSession />} />
      <Route path="/batches" element={<Batches />} />
      <Route path="/batch/add" element={<CreateBatch />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/create-course" element={<CreateCourse />} />
      <Route path="/update-course/:courseId" element={<UpdateCourse />} />
      <Route path="/session-courses" element={<SessionCourse />} />
      <Route path="/create-session-course" element={<CreateSessionCourse />} />
      <Route path="/admin/students" element={<StudentList />} />
      <Route path="/admin/add/student" element={<AddStudent />} />
      <Route
        path="/admin/update/student/:studentId"
        element={<UpdateStudent />}
      />
      <Route path="/admin/student-enrolments" element={<Enrollment />} />
      <Route path="/admin/student/:id" element={<StudentProfile />} />
      <Route
        path="/admin/add/student/:id/enrolment"
        element={<CreateEnrolment />}
      />
    </Route>
  );
};

export default AdminRoutes;
