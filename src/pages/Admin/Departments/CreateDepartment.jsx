import { useState, useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { createDepartment } from "../../../services/DepartmentService";
import { fetchFaculties } from "../../../services/FacultyService";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const { Option } = Select;

export default function CreateDepartment() {
  const [shortName, setShortName] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchFaculties()
      .then((data) => setFaculties(data))
      .catch((error) => message.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await createDepartment(values);
      if (res.ok) {
        message.success(`Department ${values.shortName} added successfully`);
        navigate("/departments");
        setShortName("");
      } else {
        message.error(res.message || "Failed to add department");
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto flex-1 p-4">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Add Department
          </h1>
          <Form
            onFinish={handleSubmit}
            initialValues={{ facultyId: "" }}
            layout="vertical"
            className="max-w-md mx-auto border shadow-md p-4 rounded-md"
          >
            <Form.Item
              label="Department Short Name"
              name="shortName"
              rules={[
                {
                  required: true,
                  message: "Please input department short name!",
                },
              ]}
            >
              <Input
                value={shortName}
                size="large"
                onChange={(e) => setShortName(e.target.value)}
                autoComplete="on"
              />
            </Form.Item>
            <Form.Item
              label="Select Faculty"
              name="facultyId"
              rules={[{ required: true, message: "Please select faculty!" }]}
            >
              <Select size="large">
                <Option value="">Please select faculty</Option>
                {faculties.map((faculty) => (
                  <Option key={faculty._id} value={faculty._id}>
                    {faculty.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full text-blue-600 border-blue-600"
              >
                Add
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full text-blue-600 border-blue-600"
              >
                <Link to="/admin/departments">Cancel</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
