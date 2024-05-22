import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaymentHistoryByStudentId } from "../../../services/PaymentService";

const PaymentHistory = () => {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getPaymentHistoryByStudentId(id);
        setPayments(response);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPayments();
  }, [id]);

  if (!payments.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment._id} className="mb-2">
            <p>
              <strong>Course Fee:</strong> {payment.courseFee}
            </p>
            <p>
              <strong>Scholarship Amount:</strong> {payment.scholarshipAmount}
            </p>
            <p>
              <strong>Semester Fee:</strong> {payment.semesterFee}
            </p>
            <p>
              <strong>Total Paid:</strong> {payment.totalPaid}
            </p>
            <p>
              <strong>Total Due:</strong> {payment.totalDue}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
