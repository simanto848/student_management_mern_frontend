// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, InputNumber, Button, message, Select } from "antd";
import { createEnrollment } from "../../../services/StudentEnrollmentService";

const { Option } = Select;

const CreateEnrolment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const semester = [1, 2, 3, 4, 5, 6, 7, 8];
  const purpose = [
    "Admission",
    "Tuition Fee",
    "Library Fee",
    "Retake Exam Fee",
    "Improvement Exam Fee",
    "Hostel Fee",
    "Transport Fee",
    "Re-Admission Fee",
    "Other",
  ];

  const onFinish = async () => {
    setLoading(true);
    try {
      const data = await createEnrollment(formData, id);
      message.success(data.message);
      navigate(`/admin/student/${id}`);
    } catch (error) {
      message.error(
        error.message || "Failed to create enrollment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterChange = (value) => {
    setFormData((prevData) => ({ ...prevData, semester: value }));
  };

  const handlePurposeChange = (value) => {
    setFormData((prevData) => ({ ...prevData, paymentFor: value }));
  };

  const handlePaidAmountChange = (value) => {
    setFormData((prevData) => ({ ...prevData, paidAmount: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
            Create Enrollment
          </h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="semester" label="Semester">
              <Select
                placeholder="Select semester"
                size="large"
                onChange={handleSemesterChange}
              >
                {semester.map((semester) => (
                  <Option key={semester} value={semester}>
                    Semester {semester}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="paidAmount"
              label="Paid Amount"
              rules={[
                { required: true, message: "Please input the paid amount!" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                size="large"
                placeholder="Enter paid amount"
                onChange={handlePaidAmountChange}
              />
            </Form.Item>

            <Form.Item
              name="paymentFor"
              label="Payment For"
              rules={[
                {
                  required: true,
                  message: "Please select the payment purpose!",
                },
              ]}
            >
              <Select
                placeholder="Select payment purpose"
                size="large"
                onChange={handlePurposeChange}
              >
                {purpose.map((purpose) => (
                  <Option key={purpose} value={purpose}>
                    {purpose}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button size="large" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateEnrolment;
