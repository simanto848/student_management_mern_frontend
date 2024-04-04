import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getUserFromCookie } from "../services/Cookies";
import { signOut } from "../services/AuthService";

export default function DashSidebar() {
  const currentUser = getUserFromCookie();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    signOut(navigate);
  };

  return (
    <Sidebar aria-label="Default sidebar example">
      <Toaster position="top-right" />
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiChartPie}
            label={currentUser && currentUser.role}
            labelColor="dark"
          >
            <Link to="/dashboard">Dashboard</Link>
          </Sidebar.Item>
          {currentUser && currentUser.role === "admin" && (
            <Sidebar.Collapse icon={HiShoppingBag} label="Details">
              <Sidebar.Item>
                <Link to="/faculties">Faculties</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/departments">Departments</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/teachers">Teachers</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/sessions">Sessions</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link to="/courses">Courses</Link>
              </Sidebar.Item>
              <Sidebar.Item>Session Courses</Sidebar.Item>
              <Sidebar.Item>Students</Sidebar.Item>
              <Sidebar.Item>Student Enrolments</Sidebar.Item>
            </Sidebar.Collapse>
          )}
          <Sidebar.Item href="#" icon={HiInbox} label="3">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item icon={HiTable} onClick={handleSignOut}>
            <span className="cursor-pointer">Sign Out</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
