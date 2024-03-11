import { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import DashSidebar from "../components/DashSidebar";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch("/api/teacher");
        if (!res.ok) {
          toast.error("Failed to fetch departments");
        }
        const data = await res.json();
        setTeachers(data.teachers);
      } catch (error) {
        toast.error("Failed to fetch departments");
      }
    };
    fetchTeacher();
  }, []);

  const handleDelete = async (teacherId) => {
    try {
      const res = await fetch(`/api/teacher/delete/${teacherId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== teacherId)
      );
      toast.success("Teacher deleted successfully");
    } catch (error) {
      toast.error("Failed to delete teacher");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1">
        <Toaster />
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Teacher List
          </h1>
          <Button
            className="mr-2"
            size="lg"
            outline
            gradientDuoTone="tealToLime"
          >
            <Link to="/create-teacher">Add Teacher</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Teacher Name</Table.HeadCell>
            <Table.HeadCell>Faculty Name</Table.HeadCell>
            <Table.HeadCell>Department Name</Table.HeadCell>
            <Table.HeadCell>Designation</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Join On</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {teachers.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center">
                  No Teacher found
                </Table.Cell>
              </Table.Row>
            )}
            {teachers.map((teacher, index) => (
              <Table.Row
                key={teacher._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{teacher.name}</Table.Cell>
                <Table.Cell>{teacher.facultyId.name}</Table.Cell>
                <Table.Cell>{teacher.departmentId.shortName}</Table.Cell>
                <Table.Cell>{teacher.designation}</Table.Cell>
                <Table.Cell>{teacher.email}</Table.Cell>
                <Table.Cell>{teacher.phone}</Table.Cell>
                <Table.Cell>{teacher.status}</Table.Cell>
                <Table.Cell>
                  {moment(teacher.createdAt).format("MM-DD-YYYY")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-1">
                  <Link to={`/update-teacher/${teacher._id}`}>
                    <Button size="xs">
                      <HiPencil size={18} className="hover:text-orange-500" />
                    </Button>
                  </Link>
                  <Button size="xs" onClick={() => handleDelete(teacher._id)}>
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
