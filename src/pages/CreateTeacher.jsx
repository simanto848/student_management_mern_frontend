import { Button, FloatingLabel, Label, Select } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateTeacher() {
  const [formData, setFormData] = useState({});
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
      facultyId: selectedFaculty,
    }));
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  useEffect(() => {
    if (selectedFaculty) {
      fetchDepartments(selectedFaculty);
    }
  }, [selectedFaculty]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.phone ||
        !formData.email ||
        !formData.designation ||
        !formData.facultyId ||
        !formData.departmentId
      ) {
        return toast.error("All fields are required");
      }
      const res = await fetch("/api/teacher/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        return toast.error("Failed to add teacher");
      }
      toast.success("Teacher added successfully");
      setFormData({});
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleFacultyChange = (e) => {
    const selectedFacultyId = e.target.value;
    setSelectedFaculty(selectedFacultyId);
    setFormData((prevData) => ({
      ...prevData,
      facultyId: selectedFacultyId,
      departmentId: "",
    }));
  };

  const fetchFaculties = async () => {
    try {
      const res = await fetch("/api/faculty");
      if (!res.ok) {
        toast.error("Failed to fetch faculties");
        return;
      }
      const data = await res.json();
      setFaculties(data.faculties);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchDepartments = async (facultyId) => {
    try {
      const res = await fetch(`/api/department/faculty/${facultyId}`);
      if (!res.ok) {
        toast.error("Failed to fetch departments");
        return;
      }
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
          Add Department
        </h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <FloatingLabel
              type="text"
              id="name"
              name="name"
              variant="outlined"
              label="Teacher full name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <FloatingLabel
              type="text"
              id="phone"
              name="phone"
              variant="outlined"
              label="Phone number"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <FloatingLabel
              type="email"
              id="email"
              name="email"
              variant="outlined"
              label="Email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2">
            <FloatingLabel
              type="text"
              id="designation"
              name="designation"
              variant="outlined"
              label="Designation"
              onChange={handleChange}
            />
          </div>
          <div className="max-w-md mb-2">
            <div className="mb-2 block">
              <Label htmlFor="faculties" value="Select Faculty" />
            </div>
            <Select
              id="facultyId"
              required
              onChange={handleFacultyChange}
              value={selectedFaculty}
            >
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
              required
              value={formData.departmentId}
              onChange={(e) =>
                setFormData({ ...formData, departmentId: e.target.value })
              }
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.shortName}
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
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
