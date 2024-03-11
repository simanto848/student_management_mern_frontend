import { Button, FloatingLabel } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function UpdateFaculty() {
  const [name, setName] = useState("");
  const { facultyId } = useParams();
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch(`/api/faculty/${facultyId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch faculty");
        }
        const data = await res.json();
        setName(data.faculty.name);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch faculty");
      }
    };
    fetchFaculty();
  }, [facultyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Name is required");
    }
    try {
      const res = await fetch(`/api/faculty/update/${facultyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      setName(name);
      toast.success(`Faculty ${name} added successfully`);
    } catch (error) {
      return toast.error("Something went wrong");
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
              variant="outlined"
              label="Faculty Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
