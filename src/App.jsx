import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Faculties from "./pages/Admin/Faculties/Faculties";
import CreateFaculty from "./pages/Admin/Faculties/CreateFaculty";
import Departments from "./pages/Admin/Departments/Departments";
import CreateDepartment from "./pages/Admin/Departments/CreateDepartment";
import Teachers from "./pages/Admin/Teachers/Teachers";
import CreateTeacher from "./pages/Admin/Teachers/CreateTeacher";
import UpdateTeacher from "./pages/Admin/Teachers/UpdateTeacher";
import Sessions from "./pages/Admin/Sessions/Sessions";
import CreateSession from "./pages/Admin/Sessions/CreateSession";
import Courses from "./pages/Admin/Courses/Courses";
import CreateCourse from "./pages/Admin/Courses/CreateCourse";
import UpdateCourse from "./pages/Admin/Courses/UpdateCourse";
import PrivateRoutes from "./components/PrivateRoutes";
import OnlyAdminRoutes from "./components/OnlyAdminRoutes";
import CheckLoginStatus from "./components/CheckLoginStatus";
import NotFound from "./pages/NotFound";
import SessionCourse from "./pages/Admin/Session Courses/SessionCourse";
import CreateSessionCourse from "./pages/Admin/Session Courses/CreateSessionCourse";
import StudenList from "./pages/Admin/Students/StudenList";
import AddStudent from "./pages/Admin/Students/AddStudent";
import UpdateStudent from "./pages/Admin/Students/UpdateStudent";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<CheckLoginStatus />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<OnlyAdminRoutes />}>
          {/* FACULTIES ROUTES */}
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/create-faculty" element={<CreateFaculty />} />

          {/* DEPARTMENT ROUTES */}
          <Route path="/departments" element={<Departments />} />
          <Route path="/create-department" element={<CreateDepartment />} />

          {/* Teacher Routes */}
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/create-teacher" element={<CreateTeacher />} />
          <Route
            path="/update-teacher/:teacherId"
            element={<UpdateTeacher />}
          />

          {/* Session Routes */}
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/create-session" element={<CreateSession />} />

          {/* Course Routes */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/update-course/:courseId" element={<UpdateCourse />} />

          {/* Session Course */}
          <Route path="/session-courses" element={<SessionCourse />} />
          <Route
            path="/create-session-course"
            element={<CreateSessionCourse />}
          />

          {/* Student Routes */}
          <Route path="/admin/students" element={<StudenList />} />
          <Route path="/admin/add/student" element={<AddStudent />} />
          <Route
            path="/admin/update/student/:studentId"
            element={<UpdateStudent />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
