import { Button, Input, message } from "antd";
import { useState } from "react";
import { addFaculty } from "../../../services/FacultyService";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

export default function CreateFaculty() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return message.error("Faculty name is required");
    }
    try {
      setLoading(true);
      await addFaculty(name);
      setLoading(false);
      setName("");
      navigate("/faculties");
    } catch (error) {
      message.error("Failed to add faculty");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="overflow-x-auto flex-1 p-4">
        <h1 className="text-slate-600 text-center text-3xl font-bold mb-4">
          Add Faculty
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto border shadow-md p-4 rounded-md"
        >
          <div className="mb-4">
            <Input
              type="text"
              id="name"
              placeholder="Faculty Name"
              value={name}
              size="large"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="flex flex-col justify-center gap-4">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="text-black border-gray-200"
              >
                Add
              </Button>
              <Button
                type="primary"
                htmlType="button"
                size="large"
                className="text-black border-gray-200"
              >
                <Link to="/admin/faculties">Cancel</Link>
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
