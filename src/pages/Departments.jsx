import { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import DashSidebar from "../components/DashSidebar";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

export default function Departments() {
  const [departments, setDpartments] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await fetch("/api/department");
        if (!res.ok) {
          toast.error("Failed to fetch departments");
        }
        const data = await res.json();
        setDpartments(data);
      } catch (error) {
        toast.error("Failed to fetch departments");
      }
    };
    fetchDepartment();
  }, []);

  const handleDelete = async (departmentId) => {
    try {
      const res = await fetch(`/api/department/delete/${departmentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      }
      setDpartments((prevDepartments) =>
        prevDepartments.filter((department) => department._id !== departmentId)
      );
      toast.success("Department deleted successfully");
    } catch (error) {
      toast.error("Failed to delete department");
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
            <Link to="/create-department">Add Department</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Faculty Name</Table.HeadCell>
            <Table.HeadCell>Department Name</Table.HeadCell>
            <Table.HeadCell>Created at</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {departments.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center">
                  No departments found
                </Table.Cell>
              </Table.Row>
            )}
            {departments.map((department, index) => (
              <Table.Row
                key={department._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{department.shortName}</Table.Cell>
                <Table.Cell>{department.facultyId.name}</Table.Cell>
                <Table.Cell>
                  {moment(department.createdAt).format("MM-DD-YYYY")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-1">
                  <Link to={`/update-department/${department._id}`}>
                    <Button size="xs">
                      <HiPencil size={18} className="hover:text-orange-500" />
                    </Button>
                  </Link>
                  <Button
                    size="xs"
                    onClick={() => handleDelete(department._id)}
                  >
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
