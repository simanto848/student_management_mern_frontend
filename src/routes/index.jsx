import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import StudentLogin from "../pages/StudentLogin";
import AdminLogin from "../pages/AdminLogin";
import TeacherLogin from "../pages/TeacherLogin";
import StaffLogin from "../pages/StaffLogin";
import NotFound from "../pages/NotFound";
import OnlyAdminRoutes from "../components/OnlyAdminRoutes";
import Dashboard from "../pages/Dashboard";
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
import StudentProfile from "../pages/Admin/StudentEnrolments/StudentProfile";
import CreateEnrolment from "../pages/Admin/StudentEnrolments/CreateEnrolment";

const adminRoutes = [
  { path: "faculties", element: <Faculties /> },
  { path: "create-faculty", element: <CreateFaculty /> },
  { path: "departments", element: <Departments /> },
  { path: "create-department", element: <CreateDepartment /> },
  { path: "teachers", element: <Teachers /> },
  { path: "create-teacher", element: <CreateTeacher /> },
  { path: "update-teacher/:teacherId", element: <UpdateTeacher /> },
  { path: "sessions", element: <Sessions /> },
  { path: "create-session", element: <CreateSession /> },
  { path: "batches", element: <Batches /> },
  { path: "batch/add", element: <CreateBatch /> },
  { path: "courses", element: <Courses /> },
  { path: "create-course", element: <CreateCourse /> },
  { path: "update-course/:courseId", element: <UpdateCourse /> },
  { path: "session-courses", element: <SessionCourse /> },
  { path: "create-session-course", element: <CreateSessionCourse /> },
  { path: "students", element: <StudentList /> },
  { path: "add/student", element: <AddStudent /> },
  { path: "update/student/:studentId", element: <UpdateStudent /> },
  { path: "student-enrolments", element: <Enrollment /> },
  { path: "student/:id", element: <StudentProfile /> },
  { path: "add/student/:id/enrolment", element: <CreateEnrolment /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <StudentLogin /> },
      { path: "admin-login", element: <AdminLogin /> },
      { path: "teacher-login", element: <TeacherLogin /> },
      { path: "staff-login", element: <StaffLogin /> },
      {
        path: "admin",
        element: <OnlyAdminRoutes element={<Dashboard />} />,
        children: adminRoutes.map((route) => ({
          path: `/admin/${route.path}`,
          element: route.element,
        })),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
