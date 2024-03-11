import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import OnlyAdminRoute from "./components/OnlyAdminRoute";
import Faculties from "./pages/Faculties";
import CreateFaculty from "./pages/CreateFaculty";
import UpdateFaculty from "./pages/UpdateFaculty";
import Departments from "./pages/Departments";
import CreateDepartment from "./pages/CreateDepartment";
import UpdateDepartment from "./pages/UpdateDepartment";
import Teachers from "./pages/Teachers";
import CreateTeacher from "./pages/CreateTeacher";
import UpdateTeacher from "./pages/UpdateTeacher";
import Sessions from "./pages/Sessions";
import CreateSession from "./pages/CreateSession";
import UpdateSession from "./pages/UpdateSession";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminRoute />}>
          {/* FACULTIES ROUTES */}
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/create-faculty" element={<CreateFaculty />} />
          <Route
            path="/update-faculty/:facultyId"
            element={<UpdateFaculty />}
          />
          {/* DEPARTMENT ROUTES */}
          <Route path="/departments" element={<Departments />} />
          <Route path="/create-department" element={<CreateDepartment />} />
          <Route
            path="/update-department/:departmentId"
            element={<UpdateDepartment />}
          />
          {/* Teacher Routes */}
          <Route path="/teachers" element={<Teachers />} />
          <Route path="create-teacher" element={<CreateTeacher />} />
          <Route path="/update/:teacherId" element={<UpdateTeacher />} />
          {/* Session Routes */}
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/create-session" element={<CreateSession />} />
          <Route path="/update/:sessionId" element={<UpdateSession />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
