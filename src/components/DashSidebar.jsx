import { Menu, Drawer } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserFromCookie } from "../services/Cookies";
import { signOut } from "../services/AuthService";

const { SubMenu } = Menu;

// eslint-disable-next-line react/prop-types
const DashSidebar = ({ drawerVisible, toggleDrawer }) => {
  const currentUser = getUserFromCookie();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    signOut(navigate);
  };

  return (
    <>
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
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="/" icon={<PieChartOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>

          {currentUser && currentUser.role === "admin" && (
            <SubMenu key="sub1" icon={<UserOutlined />} title="Details">
              <Menu.Item key="/admin/faculties">
                <Link to="/admin/faculties">Faculties</Link>
              </Menu.Item>
              <Menu.Item key="/admin/departments">
                <Link to="/admin/departments">Departments</Link>
              </Menu.Item>
              <Menu.Item key="/admin/teachers">
                <Link to="/admin/teachers">Teachers</Link>
              </Menu.Item>
              <Menu.Item key="/admin/sessions">
                <Link to="/admin/sessions">Sessions</Link>
              </Menu.Item>
              <Menu.Item key="/admin/batches">
                <Link to="/admin/batches">Batches</Link>
              </Menu.Item>
              <Menu.Item key="/admin/courses">
                <Link to="/admin/courses">Courses</Link>
              </Menu.Item>
              <Menu.Item key="/admin/session-courses">
                <Link to="/admin/session-courses">Session Courses</Link>
              </Menu.Item>
              <Menu.Item key="/admin/students">
                <Link to="/admin/students">Students</Link>
              </Menu.Item>
              <Menu.Item key="/admin/student-enrolments">
                <Link to="/admin/student-enrolments">Student Enrolments</Link>
              </Menu.Item>
            </SubMenu>
          )}

          <Menu.Item key="/inbox" icon={<InboxOutlined />}>
            <Link to="/inbox">Inbox</Link>
          </Menu.Item>

          <Menu.Item
            key="signout"
            icon={<UserOutlined />}
            onClick={handleSignOut}
          >
            Sign Out
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  );
};

export default DashSidebar;
