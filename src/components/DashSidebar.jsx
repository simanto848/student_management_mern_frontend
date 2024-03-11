import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar aria-label="Default sidebar example">
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
