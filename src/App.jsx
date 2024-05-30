import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashSidebar from "./components/DashSidebar";
import PrivateRoutes from "./components/PrivateRoutes";
import CheckLoginStatus from "./components/CheckLoginStatus";
import NotFound from "./pages/NotFound";
import AdminRoutes from "./routes/AdminRoutes";
import { useState } from "react";

const { Content } = Layout;

export const App = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Navbar toggleDrawer={toggleDrawer} />
        <Layout>
          <DashSidebar
            drawerVisible={drawerVisible}
            toggleDrawer={toggleDrawer}
          />
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
              <Routes>
                <Route element={<CheckLoginStatus />}>
                  <Route path="/" element={<Login />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                {AdminRoutes()}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
