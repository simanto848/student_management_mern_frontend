import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Faculties from "./Admin/Faculties/Faculties";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFormUrl = searchParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div>
        <h1>Welcome to Dashboard</h1>
        {/* Faculties... */}
        {tab === "faculties" && <Faculties />}
      </div>
    </div>
  );
}
