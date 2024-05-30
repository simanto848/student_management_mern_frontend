// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentById } from "../../../services/StudentService";
import Loading from "../../../components/Loading";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetchStudentById(id);
        setStudent(response);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!student) {
    return <div className="text-gray-600">No student details found.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Student Details
      </h2>
      <p>
        <strong>Name:</strong> {student.name}
      </p>
      <p>
        <strong>Batch No:</strong> {student.batchId.name}
      </p>
      <p>
        <strong>Registration No:</strong> {student.registrationNo}
      </p>
      <p>
        <strong>Roll No:</strong> {student.rollNo}
      </p>
      <p>
        <strong>Department:</strong> {student.departmentId.shortName}
      </p>
      <p>
        <strong>Session:</strong> {student.batchId.sessionId.session}
      </p>
      <p>
        <strong>Semester Fee:</strong> {student.semesterFee}
      </p>
      <p>
        <strong>Actual Course Fee:</strong> {student.courseFee}
      </p>
      <p>
        <strong>Scholarship:</strong> {student.scholarship}
      </p>
    </div>
  );
};

export default StudentDetails;
