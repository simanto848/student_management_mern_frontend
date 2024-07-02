import { Layout, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

export default function Navbar({ toggleDrawer }) {
  return (
    <Header className="bg-gray-200 shadow-md border-b-2 flex justify-between items-center">
      <div className="container mx-auto flex items-center h-full px-4">
        <Link to="/" className="flex items-center justify-center h-full">
          <Title level={4} className="text-black text-xl font-semibold">
            EDUCATION
          </Title>
        </Link>
      </div>

      <Button
        className="lg:hidden"
        icon={<MenuOutlined />}
        onClick={toggleDrawer}
      />
    </Header>
  );
}
