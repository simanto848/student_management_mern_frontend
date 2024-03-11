import { Button, FloatingLabel, Label, Select } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function UpdateTeacher() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    designation: "",
    facultyId: "",
    departmentId: "",
  });
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const { teacherId } = useParams();

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
    fetchTeacherDetails();
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
      const res = await fetch(`/api/teacher/update/${teacherId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        return toast.error("Failed to add teacher");
      }
      toast.success("Teacher updated successfully");
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

  const fetchTeacherDetails = async () => {
    try {
      const res = await fetch(`/api/teacher/${teacherId}`);
      if (!res.ok) {
        return toast.error("Failed to fetch teacher details");
      }
      const data = await res.json();
      setTeacherDetails(data.teacher);
      setFormData(data.teacher);
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
      console.log("Data: ", data); // Log the fetched data
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
              value={formData.name}
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
              value={formData.phone}
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
              value={formData.email}
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
              value={formData.designation}
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
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
