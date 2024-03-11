import { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import DashSidebar from "../components/DashSidebar";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

export default function Faculties() {
  const [faculties, setFaculties] = useState([]);
  console.log(faculties);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await fetch("/api/faculty");
        if (!res.ok) {
          throw new Error("Failed to fetch faculties");
        }
        const data = await res.json();
        setFaculties(data.faculties);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch faculties");
      }
    };
    fetchFaculties();
  }, []);

  const handleDelete = async (facultyId) => {
    try {
      const res = await fetch(`/api/faculty/delete/${facultyId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setFaculties((prevFaculties) =>
        prevFaculties.filter((faculty) => faculty._id !== facultyId)
      );
      toast.success("Faculty deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete faculty");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1">
        <Toaster />
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Faculty List
          </h1>
          <Button
            className="mr-2"
            size="lg"
            outline
            gradientDuoTone="tealToLime"
          >
            <Link to="/create-faculty">Add Faculty</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Created at</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {faculties.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center">
                  No faculties found
                </Table.Cell>
              </Table.Row>
            )}
            {faculties.map((faculty, index) => (
              <Table.Row
                key={faculty._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{faculty.name}</Table.Cell>
                <Table.Cell>
                  {moment(faculty.createdAt).format("MM-DD-YYYY")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-1">
                  <Link to={`/update-faculty/${faculty._id}`}>
                    <Button size="xs">
                      <HiPencil size={18} className="hover:text-orange-500" />
                    </Button>
                  </Link>
                  <Button size="xs" onClick={() => handleDelete(faculty._id)}>
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
