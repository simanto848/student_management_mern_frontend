import { useState, useEffect } from "react";
import { Button, Table, message, Input, Spin, Modal } from "antd";
import { fetchCourses, fetchBatches } from "../../services/TeacherCourse";
import { fetchStudentsByBatch } from "../../services/StudentService";
import Loading from "../../components/Loading";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batchLoading, setBatchLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewingStudents, setViewingStudents] = useState(false);

  useEffect(() => {
    fetchCourseIds();
  }, []);

  const fetchCourseIds = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch courses!");
      setLoading(false);
    }
  };

  const fetchBatchesForCourse = async (courseId) => {
    try {
      setBatchLoading(true);
      const data = await fetchBatches(courseId);
      setBatches(data);
      setBatchLoading(false);
    } catch (error) {
      message.error("Failed to fetch batches for the course");
      setBatchLoading(false);
    }
  };

  const handleBatchViewToggle = (courseId) => {
    fetchBatchesForCourse(courseId);
    setIsModalVisible(true);
    setViewingStudents(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleBatchClick = async (batchId) => {
    try {
      setStudentLoading(true);
      const data = await fetchStudentsByBatch(batchId);
      setStudents(data);
      setStudentLoading(false);
      setViewingStudents(true);
    } catch (error) {
      message.error("Failed to fetch students for the batch");
      setStudentLoading(false);
    }
  };

  const handleBackToBatches = () => {
    setViewingStudents(false);
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
      title: "Actions",
      render: (text, record) => (
        <Button onClick={() => handleBatchViewToggle(record._id)}>
          View Batches
        </Button>
      ),
    },
  ];

  const batchColumns = [
    {
      title: "Batch Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <Button onClick={() => handleBatchClick(record._id)}>
          View Students
        </Button>
      ),
    },
  ];

  const studentColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Registration No",
      dataIndex: "registrationNo",
    },
    {
      title: "Roll No",
      dataIndex: "rollNo",
    },
    {
      title: "Phone",
      dataIndex: "phoneNo",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="overflow-x-auto">
        <div className="my-2 flex justify-between">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Teacher&apos;s Course List
          </h1>
          <div className="flex space-x-4">
            <Input placeholder="Search Courses" className="lg:w-72 h-auto" />
          </div>
        </div>
        <Table
          dataSource={courses}
          columns={columns}
          rowKey="_id"
          className="shadow-lg"
          bordered
        />
      </div>

      <Modal
        title={viewingStudents ? "Students" : "Batches"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {viewingStudents ? (
          <>
            <Button onClick={handleBackToBatches}>Back to Batches</Button>
            {studentLoading ? (
              <Spin />
            ) : students.length === 0 ? (
              <p>No students assigned to this batch.</p>
            ) : (
              <Table
                dataSource={students}
                columns={studentColumns}
                rowKey="_id"
                pagination={false}
                bordered
              />
            )}
          </>
        ) : batchLoading ? (
          <Spin />
        ) : batches.length === 0 ? (
          <p>No batches assigned to this course.</p>
        ) : (
          <Table
            dataSource={batches}
            columns={batchColumns}
            rowKey="_id"
            pagination={false}
            bordered
          />
        )}
      </Modal>
    </div>
  );
}
