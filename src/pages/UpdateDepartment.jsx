import { Button, FloatingLabel, Label, Select } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function UpdateDepartment() {
  const [shortName, setShortName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [faculties, setFaculties] = useState([]);
  const { departmentId } = useParams();

  useEffect(() => {
    fetchDepartmentDetails();
    fetchFaculties();
  }, [departmentId]);

  const fetchDepartmentDetails = async () => {
    try {
      const res = await fetch(`/api/department/${departmentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setShortName(data.shortName);
      setFacultyId(data.facultyId);
    } catch (error) {
      toast.error("Failed to fetch department details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shortName || !facultyId) {
      return toast.error("All fields are required");
    }
    try {
      const res = await fetch(`/api/department/update/${departmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facultyId,
          shortName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success(`Department ${shortName} updated successfully`);
    } catch (error) {
      return toast.error("Something went wrong");
    }
  };

  const fetchFaculties = async () => {
    try {
      const res = await fetch("/api/faculty");
      if (!res.ok) {
        toast.error("Failed to fetch faculties");
      }
      const data = await res.json();
      setFaculties(data.faculties);
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
          Update Department
        </h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <FloatingLabel
              type="text"
              id="name"
              variant="outlined"
              label="Department Short Name"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="faculties" value="Select Faculty" />
            </div>
            <Select id="facultyId" required>
              {faculties.map((faculty) => (
                <option key={faculty._id} value={faculty._id}>
                  {faculty.name}
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
