import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../../services/StudentService";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);
        setStudent(response);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Student Details</h2>
      <p>
        <strong>Name:</strong> {student.name}
      </p>
      <p>
        <strong>Batch No:</strong> {student.batchNo}
      </p>
      <p>
        <strong>Registration No:</strong> {student.registrationNo}
      </p>
      <p>
        <strong>Roll No:</strong> {student.rollNo}
      </p>
      <p>
        <strong>Department:</strong> {student.department}
      </p>
      <p>
        <strong>Session:</strong> {student.session}
      </p>
    </div>
  );
};

export default StudentDetails;
