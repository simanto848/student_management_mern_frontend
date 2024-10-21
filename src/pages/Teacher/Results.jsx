import { useState, useEffect } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import {
  addOrUpdateResult,
  getResultByStudentId,
} from "../../services/ResultService";

const ResultForm = ({ studentId, courseId, onComplete }) => {
  const [marks, setMarks] = useState({
    attendanceMark: 0,
    assignmentMark: 0,
    presentationMark: 0,
    classTestMark: 0,
    midMark: 0,
    finalMark: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchResult();
  }, [studentId, courseId]);

  const fetchResult = async () => {
    setIsLoading(true);
    try {
      const data = await getResultByStudentId(studentId, courseId);

      if (data) {
        setMarks({
          attendanceMark: data.attendanceMark || 0,
          assignmentMark: data.assignmentMark || 0,
          presentationMark: data.presentationMark || 0,
          classTestMark: data.classTestMark || 0,
          midMark: data.midMark || 0,
          finalMark: data.finalMark || 0,
        });
      }
    } catch (error) {
      message.error("Failed to fetch result");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await addOrUpdateResult({
        studentId,
        courseId,
        ...marks,
      });
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      message.error(error.message || "Failed to update result");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setMarks({ ...marks, [field]: Number(value) });
  };

  return (
    <Spin spinning={isLoading}>
      <Form layout="vertical">
        <Form.Item label="Attendance Mark">
          <Input
            type="number"
            value={marks.attendanceMark}
            onChange={(e) =>
              handleInputChange("attendanceMark", e.target.value)
            }
            placeholder="Enter attendance mark"
          />
        </Form.Item>

        <Form.Item label="Assignment Mark">
          <Input
            type="number"
            value={marks.assignmentMark}
            onChange={(e) =>
              handleInputChange("assignmentMark", e.target.value)
            }
            placeholder="Enter assignment mark"
          />
        </Form.Item>

        <Form.Item label="Presentation Mark">
          <Input
            type="number"
            value={marks.presentationMark}
            onChange={(e) =>
              handleInputChange("presentationMark", e.target.value)
            }
            placeholder="Enter presentation mark"
          />
        </Form.Item>

        <Form.Item label="Class Test Mark">
          <Input
            type="number"
            value={marks.classTestMark}
            onChange={(e) => handleInputChange("classTestMark", e.target.value)}
            placeholder="Enter class test mark"
          />
        </Form.Item>

        <Form.Item label="Mid Mark">
          <Input
            type="number"
            value={marks.midMark}
            onChange={(e) => handleInputChange("midMark", e.target.value)}
            placeholder="Enter mid mark"
          />
        </Form.Item>

        <Form.Item label="Final Mark">
          <Input
            type="number"
            value={marks.finalMark}
            onChange={(e) => handleInputChange("finalMark", e.target.value)}
            placeholder="Enter final mark"
          />
        </Form.Item>

        <Button onClick={handleSubmit} disabled={isLoading}>
          Submit Result
        </Button>
      </Form>
    </Spin>
  );
};

export default ResultForm;
