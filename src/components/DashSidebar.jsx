import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  UserOutlined,
  InboxOutlined,
  ShoppingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserFromCookie } from "../services/Cookies";
import { signOut } from "../services/AuthService";

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  const currentUser = getUserFromCookie();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    signOut(navigate);
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="/" icon={<PieChartOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>

        {currentUser && currentUser.role === "admin" && (
          <SubMenu key="sub1" icon={<UserOutlined />} title="Details">
            <Menu.Item key="/faculties">
              <Link to="/faculties">Faculties</Link>
            </Menu.Item>
            <Menu.Item key="/departments">
              <Link to="/departments">Departments</Link>
            </Menu.Item>
            <Menu.Item key="/teachers">
              <Link to="/teachers">Teachers</Link>
            </Menu.Item>
            <Menu.Item key="/sessions">
              <Link to="/sessions">Sessions</Link>
            </Menu.Item>
            <Menu.Item key="/batches">
              <Link to="/batches">Batches</Link>
            </Menu.Item>
            <Menu.Item key="/courses">
              <Link to="/courses">Courses</Link>
            </Menu.Item>
            <Menu.Item key="/session-courses">
              <Link to="/session-courses">Session Courses</Link>
            </Menu.Item>
            <Menu.Item key="/admin/students">
              <Link to="/admin/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="10">Student Enrolments</Menu.Item>
          </SubMenu>
        )}

        <Menu.Item key="/inbox" icon={<InboxOutlined />}>
          <Link to="/inbox">Inbox</Link>
        </Menu.Item>

        <Menu.Item key="/users" icon={<ShoppingOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>

        <Menu.Item key="/products" icon={<TableOutlined />}>
          <Link to="/products">Products</Link>
        </Menu.Item>

        <Menu.Item
          key="signout"
          icon={<UserOutlined />}
          onClick={handleSignOut}
        >
          Sign Out
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
