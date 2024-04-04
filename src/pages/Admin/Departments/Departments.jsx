import { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import DashSidebar from "../../../components/DashSidebar";
import moment from "moment";
import {
  fetchDepartments,
  deleteDepartment,
  updateDepartment,
} from "../../../services/DepartmentService";
import { fetchFaculties } from "../../../services/FacultyService";

const { Option } = Select;

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDepartments().then((data) => setDepartments(data));
    fetchFaculties().then((data) => setFaculties(data));
  }, []);

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setEditModalVisible(true);
    form.setFieldsValue({
      shortName: department.shortName,
      facultyId: department.facultyId._id,
    });
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    form.resetFields();
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updated = await updateDepartment(editingDepartment._id, values);
      if (updated) {
        message.success("Department updated successfully");
        fetchDepartments().then((data) => setDepartments(data));
        handleCancelEdit();
      }
    } catch (error) {
      message.error("Failed to update department");
    }
  };

  const handleDelete = async () => {
    try {
      if (!departmentToDelete) return;
      const deleted = await deleteDepartment(departmentToDelete._id);
      if (deleted) {
        message.success("Department deleted successfully");
        setDepartments(
          departments.filter((dep) => dep._id !== departmentToDelete._id)
        );
      }
    } catch (error) {
      message.error("Failed to delete department");
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Department Name",
      dataIndex: "shortName",
      key: "shortName",
    },
    {
      title: "Faculty Name",
      dataIndex: "facultyId",
      key: "facultyName",
      render: (facultyId) => facultyId.name,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => moment(text).format("MM-DD-YYYY"),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-1">
          <Button
            size="small"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          />
          <Button
            size="small"
            onClick={() => {
              setDepartmentToDelete(record);
              setDeleteModalVisible(true);
            }}
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Faculty List
          </h1>
          <Button
            className="mr-2 text-blue-600 border-blue-600"
            size="large"
            type="primary"
          >
            <Link to="/create-department">
              <PlusOutlined /> Add Department
            </Link>
          </Button>
        </div>
        <Table
          dataSource={departments}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No departments found" }}
        />
        <Modal
          title="Edit Department"
          visible={editModalVisible}
          onCancel={handleCancelEdit}
          onOk={handleUpdate}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{ remember: true }}
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Select Faculty"
              name="facultyId"
              rules={[{ required: true, message: "Please select faculty!" }]}
            >
              <Select>
                {faculties.map((faculty) => (
                  <Option key={faculty._id} value={faculty._id}>
                    {faculty.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Confirm Delete"
          visible={deleteModalVisible}
          onOk={handleDelete}
          onCancel={() => setDeleteModalVisible(false)}
          okText="Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this department?</p>
        </Modal>
      </div>
    </div>
  );
}
