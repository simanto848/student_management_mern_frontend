import React from "react";
import StudentDetails from "./StudentDetails";
import PaymentHistory from "./PaymentHistory";
import DashSidebar from "../../../components/DashSidebar";

const StudentProfile = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <DashSidebar />
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StudentDetails />
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
