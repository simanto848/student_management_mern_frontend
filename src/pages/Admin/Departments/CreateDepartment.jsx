import { useState, useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { createDepartment } from "../../../services/DepartmentService";
import { fetchFaculties } from "../../../services/FacultyService";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function CreateDepartment() {
  const [shortName, setShortName] = useState("");
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaculties()
      .then((data) => setFaculties(data))
      .catch((error) => message.error(error.message));
  }, []);

  const handleSubmit = async (values) => {
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
          Add Department
        </h1>
        <Form
          onFinish={handleSubmit}
          initialValues={{ facultyId: "" }}
          layout="vertical"
          className="max-w-md mx-auto"
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
              onChange={(e) => setShortName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Select Faculty"
            name="facultyId"
            rules={[{ required: true, message: "Please select faculty!" }]}
          >
            <Select>
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
        </Form>
      </div>
    </div>
  );
}
