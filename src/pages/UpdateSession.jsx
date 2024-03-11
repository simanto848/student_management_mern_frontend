import { Button, FloatingLabel } from "flowbite-react";
import DashSidebar from "../components/DashSidebar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function UpdateSession() {
  const [session, setSession] = useState("");
  const { sessionId } = useParams();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/session/${sessionId}`);
        if (!res.ok) {
          return toast.error("Failed to fetch session");
        }
        const data = await res.json();
        setSession(data.session);
      } catch (error) {
        return toast.error("Failed to fetch session");
      }
    };
    fetchSession();
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      return toast.error("Session is required");
    }
    try {
      const res = await fetch(`/api/session/update/${sessionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session }),
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      toast.success(`Session ${session} added successfully`);
    } catch (error) {
      return toast.error("Something went wrong");
    }
    setSession("");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1 p-4">
        <Toaster position="top-right" reverseOrder={false} />
        <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
          Add Session
        </h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <FloatingLabel
              type="text"
              id="session"
              variant="outlined"
              label="Session Name"
              value={session}
              onChange={(e) => setSession(e.target.value)}
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
