import { useState, useEffect } from "react";
import { Input, Button, Table, message } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { fetchCourses, deleteCourse } from "../../../services/CourseService";
import Loading from "../../../components/Loading";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchCoursesData();
  }, []);

  const fetchCoursesData = async () => {
    try {
      const data = await fetchCourses();

      setCourses(data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch courses!");
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      message.success("Course deleted successfully");
    } catch (error) {
      message.error("Failed to delete course!");
    }
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Course Code",
      dataIndex: "code",
    },
    {
      title: "Credit Hour",
      dataIndex: "creditHours",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      render: (semester) => `Semester ${semester}`,
    },
    {
      title: "Department",
      dataIndex: ["departmentId", "shortName"],
      render: (text, record) => record.departmentId?.shortName || "N/A",
    },
    {
      title: "Maintainable",
      dataIndex: "maintainable",
      render: (text) => (text ? "Yes" : "No"),
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("MM-DD-YYYY"),
    },
    {
      title: "Actions",
      render: (text, record) => (
        <span>
          <Link to={`/admin/update-course/${record._id}`}>
            <Button size="small" className="mr-2">
              <EditOutlined />
            </Button>
          </Link>
          <Button size="small" onClick={() => handleDelete(record._id)} danger>
            <DeleteOutlined />
          </Button>
        </span>
      ),
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText.toLowerCase()) ||
      course.code.toLowerCase().includes(searchText.toLowerCase()) ||
      course.departmentId?.shortName
        .toLowerCase()
        .includes(searchText.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1">
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Course List
          </h1>
          <Input.Search
            placeholder="Search courses by course name, code"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300, marginBottom: 16 }}
          />
          <Button className="mr-2">
            <Link to="/admin/create-course">
              <PlusOutlined />
              Add Course
            </Link>
          </Button>
        </div>
        <Table dataSource={filteredCourses} columns={columns} rowKey="_id" />
      </div>
    </div>
  );
}
