// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentById } from "../../../services/StudentService";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetchStudentById(id);
        setStudent(response);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-4 border-green-500 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-4 border-red-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
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
