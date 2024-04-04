import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {
  return (
    <Header className="bg-gray-200 shadow-md border-b-2">
      <div className="container mx-auto flex items-center h-full px-4">
        <Link to="/" className="flex items-center justify-center h-full">
          <Title level={4} className="text-white text-xl font-semibold">
            EDUCATION
          </Title>
        </Link>
      </div>
    </Header>
  );
}
