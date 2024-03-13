import { Button, FloatingLabel, Label, Select } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function UpdateCourse() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    creditHours: "",
    semester: "",
    facultyId: "",
    departmentId: "",
    maintainable: "",
  });
  const [faculties, setFaculties] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [departments, setDepartments] = useState([]);
  const semesterOptions = ["Spring", "Fall", "Summer"];
  const maintainableOptions = [true, false];
  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course/${courseId}`);
        if (!res.ok) {
          return toast.error("Failed to fetch course!");
        }
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCourse();
    fetchFaculty();
    if (selectedFaculty) {
      fetchDepartments(selectedFaculty);
    }
  }, [courseId, selectedFaculty]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fetchFaculty = async () => {
    try {
      const res = await fetch("/api/faculty");
      if (!res.ok) {
        return toast.error("Failed to fetch faculty!");
      }
      const data = await res.json();
      setFaculties(data.faculties);
    } catch (error) {
      toast.error("Failed to fetch faculty!");
    }
  };

  const fetchDepartments = async (facultyId) => {
    try {
      const res = await fetch(`/api/department/faculty/${facultyId}`);
      if (!res.ok) {
        return toast.error("Failed to fetch departments!");
      }
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      toast.error("Failed to fetch departments!");
    }
  };

  const handleFacultyChange = (e) => {
    const facultyId = e.target.value;
    setSelectedFaculty(facultyId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.code ||
      !formData.creditHours ||
      !formData.semester ||
      !formData.departmentId ||
      !formData.maintainable
    ) {
      return toast.error("All fields are required");
    }
    try {
      const res = await fetch(`/api/course/update/${courseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success(data.message);
    } catch (error) {
      toast.error("Failed to update course!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
          Add Faculty
        </h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <FloatingLabel
              type="text"
              id="name"
              value={formData.name}
              variant="outlined"
              label="Course Name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <FloatingLabel
              type="text"
              id="code"
              value={formData.code}
              variant="outlined"
              label="Course code"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <FloatingLabel
              type="number"
              id="creditHours"
              value={formData.creditHours}
              variant="outlined"
              label="Credit hour"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="semester" value="Select Semester" />
            </div>
            <Select
              id="semester"
              value={formData.semester}
              onChange={(e) =>
                setFormData({ ...formData, semester: e.target.value })
              }
            >
              <option value="">Select Semester</option>
              {semesterOptions.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </Select>
          </div>
          <div className="max-w-md mb-2">
            <div className="mb-2 block">
              <Label htmlFor="faculties" value="Select Faculty" />
            </div>
            <Select id="facultyId" onChange={handleFacultyChange} required>
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty._id} value={faculty._id}>
                  {faculty.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="max-w-md mb-2">
            <div className="mb-2 block">
              <Label htmlFor="departments" value="Select Department" />
            </div>
            <Select
              id="departmentId"
              value={formData.departmentId.shortName}
              onChange={(e) =>
                setFormData({ ...formData, departmentId: e.target.value })
              }
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.shortName}
                </option>
              ))}
            </Select>
          </div>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="maintainable" value="Select Maintainable" />
            </div>
            <Select
              id="maintainable"
              value={formData.maintainable}
              onChange={(e) =>
                setFormData({ ...formData, maintainable: e.target.value })
              }
            >
              <option value="">Select Course Status</option>
              {maintainableOptions.map((maintainable) => (
                <option key={maintainable} value={maintainable}>
                  {maintainable.toString()}
                </option>
              ))}
            </Select>
          </div>
          <Button
            type="submit"
            size="lg"
            outline
            gradientDuoTone="tealToLime"
            className="w-full"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
