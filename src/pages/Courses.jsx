import { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiPencil, HiTrash } from "react-icons/hi";
import DashSidebar from "../components/DashSidebar";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await fetch("/api/course");
        if (!res.ok) {
          return toast.error("Failed to fetch courses!");
        }
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        toast.error("Failed to fetch courses!");
      }
    };
    fetchDepartment();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      const res = await fetch(`/api/course/delete/${courseId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <DashSidebar />
      <div className="overflow-x-auto flex-1">
        <Toaster />
        <div className="my-2 flex justify-between flex-wrap">
          <h1 className="text-slate-600 text-center text-3xl font-bold">
            Course List
          </h1>
          <Button
            className="mr-2"
            size="lg"
            outline
            gradientDuoTone="tealToLime"
          >
            <Link to="/create-course">Add Course</Link>
          </Button>
        </div>
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>SL</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Course Code</Table.HeadCell>
            <Table.HeadCell>Credit Hour</Table.HeadCell>
            <Table.HeadCell>Semester</Table.HeadCell>
            <Table.HeadCell>Department</Table.HeadCell>
            <Table.HeadCell>Maintainable</Table.HeadCell>
            <Table.HeadCell>Created at</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {courses.length === 0 && (
              <Table.Row>
                <Table.Cell colSpan={4} className="text-center">
                  No courses found
                </Table.Cell>
              </Table.Row>
            )}
            {courses.map((course, index) => (
              <Table.Row
                key={course._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>{course.name}</Table.Cell>
                <Table.Cell>{course.code}</Table.Cell>
                <Table.Cell>{course.creditHours}</Table.Cell>
                <Table.Cell>{course.semester}</Table.Cell>
                <Table.Cell>{course.departmentId.shortName}</Table.Cell>
                <Table.Cell>{course.maintainable}</Table.Cell>
                <Table.Cell>
                  {moment(course.createdAt).format("MM-DD-YYYY")}
                </Table.Cell>
                <Table.Cell className="flex flex-row gap-1">
                  <Link to={`/update-course/${course._id}`}>
                    <Button size="xs">
                      <HiPencil size={18} className="hover:text-orange-500" />
                    </Button>
                  </Link>
                  <Button size="xs" onClick={() => handleDelete(course._id)}>
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
