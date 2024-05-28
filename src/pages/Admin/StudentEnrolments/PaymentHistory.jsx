// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Form, InputNumber, Button, message, Input } from "antd";
import {
  fetchPaymentDetailsByStudentId,
  updatePaymentDetails,
  deletePaymentDetails,
} from "../../../services/PaymentDetailsService";
import DeleteModal from "../../../components/DeleteModal";

const PaymentHistory = () => {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetchPaymentDetailsByStudentId(id);
        setPayments(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPayments();
  }, [id]);

  const showModal = (payment) => {
    setSelectedPayment(payment);
    form.setFieldsValue({
      paymentAmount: payment.paymentAmount,
      paymentFor: payment.paymentFor,
      receipt: payment.receipt,
      currentDue: payment.currentDue,
    });
    setIsModalVisible(true);
  };

  const handleUpdatePayment = async (values) => {
    try {
      const updatedPayment = await updatePaymentDetails(
        selectedPayment._id,
        values
      );
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === selectedPayment._id ? updatedPayment : payment
        )
      );
      setIsModalVisible(false);
      message.success("Payment updated successfully");
    } catch (error) {
      console.error("Error updating payment:", error);
      message.error("Failed to update payment");
    }
  };

  const showDeleteModal = (payment) => {
    setSelectedPayment(payment);
    setIsDeleteModalVisible(true);
  };

  const handleDeletePayment = async () => {
    try {
      await deletePaymentDetails(selectedPayment._id);
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment._id !== selectedPayment._id)
      );
      setIsDeleteModalVisible(false);
      message.success("Payment deleted successfully");
    } catch (error) {
      console.error("Error deleting payment:", error);
      message.error("Failed to delete payment");
    }
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
              <strong>Current Due:</strong> {payment.currentDue.toFixed(2)} tk
            </p>
            <p>
              <strong>Receipt:</strong> {payment.receipt}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(payment.createdAt).toLocaleDateString()}
            </p>
            <div className="flex space-x-4 mt-2">
              <Button
                className="px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => showModal(payment)}
              >
                Update
              </Button>
              <Button
                className="px-4 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={() => showDeleteModal(payment)}
              >
                Delete
              </Button>
            </div>
            <hr className="my-4" />
          </li>
        ))}
      </ul>

      <Modal
        title="Update Payment"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="update" onClick={() => form.submit()}>
            Update
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleUpdatePayment}>
          <Form.Item
            name="paymentFor"
            label="Payment For"
            rules={[
              { required: true, message: "Please input the payment purpose!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="paymentAmount"
            label="Payment Amount"
            rules={[
              { required: true, message: "Please input the payment amount!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item
            name="currentDue"
            label="Current Due"
            rules={[
              { required: true, message: "Please input the current due!" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={0} />
          </Form.Item>
          <Form.Item name="receipt" label="Receipt">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <DeleteModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirm={handleDeletePayment}
      />
    </div>
  );
};

export default PaymentHistory;
