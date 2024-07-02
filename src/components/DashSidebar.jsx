import { Menu, Drawer } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserFromCookie } from "../services/Cookies";
import { signOut } from "../services/AuthService";

// eslint-disable-next-line react/prop-types
const DashSidebar = ({ drawerVisible, toggleDrawer }) => {
  const currentUser = getUserFromCookie();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    signOut(navigate);
  };

  const adminMenuItems = [
    {
      label: <Link to="/admin/faculties">Faculties</Link>,
      key: "/admin/faculties",
    },
    {
      label: <Link to="/admin/departments">Departments</Link>,
      key: "/admin/departments",
    },
    {
      label: <Link to="/admin/teachers">Teachers</Link>,
      key: "/admin/teachers",
    },
    {
      label: <Link to="/admin/sessions">Sessions</Link>,
      key: "/admin/sessions",
    },
    { label: <Link to="/admin/batches">Batches</Link>, key: "/admin/batches" },
    { label: <Link to="/admin/courses">Courses</Link>, key: "/admin/courses" },
    {
      label: <Link to="/admin/session-courses">Session Courses</Link>,
      key: "/admin/session-courses",
    },
    {
      label: <Link to="/admin/students">Students</Link>,
      key: "/admin/students",
    },
    {
      label: <Link to="/admin/student-enrolments">Student Enrolments</Link>,
      key: "/admin/student-enrolments",
    },
  ];

  const teacherMenuItems = [
    {
      label: <Link to="/teacher/courses">Courses</Link>,
      key: "/teacher/courses",
    },
    {
      label: <Link to="/teacher/students">Students</Link>,
      key: "/teacher/students",
    },
    {
      label: <Link to="/teacher/attendance">Attendance</Link>,
      key: "/teacher/attendance",
    },
    {
      label: <Link to="/teacher/assignments">Assignments</Link>,
      key: "/teacher/assignments",
    },
    {
      label: <Link to="/teacher/grades">Grades</Link>,
      key: "/teacher/grades",
    },
  ];

  const menuItems = [
    {
      label: <Link to="/">Dashboard</Link>,
      key: "/",
      icon: <PieChartOutlined />,
    },
    ...(currentUser && currentUser.role === "admin"
      ? [
          {
            label: "More",
            key: "sub1",
            icon: <UserOutlined />,
            children: adminMenuItems,
          },
        ]
      : []),
    ...(currentUser && currentUser.role === "Teacher"
      ? [
          {
            label: "More",
            key: "sub2",
            icon: <UserOutlined />,
            children: teacherMenuItems,
          },
        ]
      : []),
    {
      label: <Link to="/inbox">Inbox</Link>,
      key: "/inbox",
      icon: <InboxOutlined />,
    },
    {
      label: "Sign Out",
      key: "signout",
      icon: <UserOutlined />,
      onClick: handleSignOut,
    },
  ];

  return (
    <>
      {currentUser && (
        <Drawer
          title="Menu"
          placement="left"
          onClose={toggleDrawer}
          open={drawerVisible}
          className="lg:hidden"
        >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ height: "100%", borderRight: 0 }}
          />
        </Drawer>
      )}
    </>
  );
};

export default DashSidebar;
