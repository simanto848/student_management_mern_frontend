import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPaymentDetailsByStudentId } from "../../../services/PaymentDetailsService";

const PaymentHistory = () => {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetchPaymentDetailsByStudentId(id);
        console.log(response);
        setPayments(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPayments();
  }, [id]);

  const handleUpdatePayment = (paymentId) => {
    console.log(`Update payment with ID: ${paymentId}`);
    // Implement the update payment logic here
  };

  const handleDeletePayment = (paymentId) => {
    console.log(`Delete payment with ID: ${paymentId}`);
    // Implement the delete payment logic here
  };

  if (loading) {
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

  if (!payments.length) {
    return <div className="text-gray-600">No payment history found.</div>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Payment History
      </h2>
      <ul>
        {payments.map((payment) => (
          <li key={payment._id} className="mb-4">
            <p>
              <strong>Payment For:</strong> {payment.paymentFor}
            </p>
            <p>
              <strong>Payment Amount: </strong>
              {payment.paymentAmount.toFixed(2)} tk
            </p>
            <p>
              <strong>Current Due:</strong>
            </p>
            <p>
              <strong>Total Due:</strong> {payment.currentDue.toFixed(2)} tk
            </p>
            <p>
              <strong>Receipt:</strong> {payment.receipt}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-4 mt-2">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => handleUpdatePayment(payment._id)}
              >
                Update
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => handleDeletePayment(payment._id)}
              >
                Delete
              </button>
            </div>
            <hr className="my-4" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentHistory;
