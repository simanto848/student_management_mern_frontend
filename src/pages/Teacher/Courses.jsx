import { useState, useEffect } from "react";
import { Button, Table, message, Input, Spin, Modal } from "antd";
import { fetchCourses, fetchBatches } from "../../services/TeacherCourse";
import { fetchStudentsByBatch } from "../../services/StudentService";
import { submitForApproval } from "../../services/ResultService";
import ResultForm from "./Results";
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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

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
      setSelectedCourseId(courseId);
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
    setSelectedStudent(null);
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

  const handleAddResultClick = (student) => {
    setSelectedStudent(student);
  };

  const handleSubmitForApproval = (batchId) => async () => {
    try {
      await submitForApproval(batchId);
      message.success("Results submitted for approval successfully");
    } catch (error) {
      message.error(error.message || "Failed to submit results for approval");
    }
  };

  const handleResultFormComplete = () => {
    // Refresh data or close the modal after result submission
    setSelectedStudent(null);
    message.success("Result successfully added for the student.");
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
        <div className="flex gap-2">
          <Button onClick={() => handleBatchClick(record._id)}>
            View Students / Add Results
          </Button>
          <Button onClick={handleSubmitForApproval(record._id)}>
            Submit Results for Approval
          </Button>
        </div>
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
    {
      title: "Actions",
      render: (text, record) => (
        <Button onClick={() => handleAddResultClick(record)}>Add Result</Button>
      ),
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
          <Input
            placeholder="Search Courses"
            className="w-80 h-10 justify-self-center self-center"
          />
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
            <Button onClick={handleBackToBatches} className="mb-2">
              Back to Batches
            </Button>
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

      <Modal
        title="Add Result"
        open={!!selectedStudent}
        onCancel={() => setSelectedStudent(null)}
        footer={null}
        width={600}
      >
        {selectedStudent && selectedCourseId && (
          <ResultForm
            studentId={selectedStudent._id}
            courseId={selectedCourseId}
            onComplete={handleResultFormComplete}
          />
        )}
      </Modal>
    </div>
  );
}
