// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useParams } from "react-router-dom";
import StudentDetails from "./StudentDetails";
import PaymentHistory from "./PaymentHistory";

const StudentProfile = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <div className="flex-1 p-6">
        <div className="flex justify-end mb-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
            <Link
              to={`/admin/add/student/${id}/enrolment`}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Add Enrollment
            </Link>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StudentDetails />
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
