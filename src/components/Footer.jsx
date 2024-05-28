import { Layout, Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  GithubOutlined,
  DribbbleOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Text } = Typography;

const FooterCom = () => {
  return (
    <Footer style={{ backgroundColor: "#2a2a2a", color: "#ffffff" }}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
          <div>
            <Link to="/">
              <Text strong style={{ fontSize: "1.5rem", color: "#ffffff" }}>
                Education.com
              </Text>
            </Link>
          </div>
          <div className="space-y-2 flex flex-col">
            <Text strong style={{ color: "#ffffff" }}>
              About
            </Text>
            <Link
              to="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffffff" }}
            >
              Google
            </Link>
            <Link to="/" style={{ color: "#ffffff" }}>
              Education
            </Link>
          </div>
          <div className="space-y-2 flex flex-col">
            <Text strong style={{ color: "#ffffff" }}>
              Follow us
            </Text>
            <Link
              to="https://github.com/simanto848"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ffffff" }}
            >
              Github
            </Link>
            <Link to="/" style={{ color: "#ffffff" }}>
              Discord
            </Link>
          </div>
          <div className="space-y-2 flex flex-col">
            <Text strong style={{ color: "#ffffff" }}>
              Legal
            </Text>
            <Link to="/" style={{ color: "#ffffff" }}>
              Privacy Policy
            </Link>
            <Link to="/" style={{ color: "#ffffff" }}>
              Terms & Conditions
            </Link>
          </div>
        </div>
        <Divider style={{ backgroundColor: "#ffffff" }} />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Text style={{ color: "#ffffff" }}>
            &copy; {new Date().getFullYear()} Education.com by Simanto Hasan
          </Text>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="#">
              <FacebookOutlined
                style={{ fontSize: "1.5rem", color: "#ffffff" }}
              />
            </Link>
            <Link to="#">
              <InstagramOutlined
                style={{ fontSize: "1.5rem", color: "#ffffff" }}
              />
            </Link>
            <Link to="#">
              <TwitterOutlined
                style={{ fontSize: "1.5rem", color: "#ffffff" }}
              />
            </Link>
            <Link
              to="https://github.com/simanto848"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubOutlined
                style={{ fontSize: "1.5rem", color: "#ffffff" }}
              />
            </Link>
            <Link to="#">
              <DribbbleOutlined
                style={{ fontSize: "1.5rem", color: "#ffffff" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
