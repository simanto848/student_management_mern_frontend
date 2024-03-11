import { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import DashSidebar from "../components/DashSidebar";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) {
          throw new Error("Failed to fetch session!");
        }
        const data = await res.json();
        setSessions(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch session!");
      }
    };
    fetchSessions();
  }, []);

  const handleDelete = async (sessionId) => {
    try {
      const res = await fetch(`/api/session/delete/${sessionId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setSessions((prevSession) =>
        prevSession.filter((session) => session._id !== sessionId)
      );
      toast.success("Session deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete session!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1">
        <Toaster />
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Session List
          </h1>
          <Button
            className="mr-2"
            size="lg"
            outline
            gradientDuoTone="tealToLime"
          >
            <Link to="/create-session">Add Session</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Session</Table.HeadCell>
            <Table.HeadCell>Created at</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {sessions.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center">
                  No faculties found
                </Table.Cell>
              </Table.Row>
            )}
            {sessions.map((session, index) => (
              <Table.Row
                key={session._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{session.session}</Table.Cell>
                <Table.Cell>
                  {moment(session.createdAt).format("MM-DD-YYYY")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-1">
                  <Link to={`/update-session/${session._id}`}>
                    <Button size="xs">
                      <HiPencil size={18} className="hover:text-orange-500" />
                    </Button>
                  </Link>
                  <Button size="xs" onClick={() => handleDelete(session._id)}>
                    <HiTrash size={18} className="hover:text-red-700" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
