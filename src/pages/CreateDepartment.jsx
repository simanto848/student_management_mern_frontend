import { Button, FloatingLabel, Label, Select } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateDepartment() {
  const [shortName, setShortName] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shortName) {
      return toast.error("Short Name is required");
    }
    try {
      const res = await fetch("/api/department/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facultyId: e.target.facultyId.value,
          shortName,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success(`Department ${shortName} added successfully`);
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    }
    setShortName("");
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
      console.error(error);
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
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
