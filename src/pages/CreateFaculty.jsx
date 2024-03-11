import { Button, FloatingLabel } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function CreateFaculty() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Name is required");
    }
    try {
      const res = await fetch("/api/faculty/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success(`Faculty ${name} added successfully`);
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    }
    setName("");
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
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}
