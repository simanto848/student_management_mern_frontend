import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import Faculties from "./Faculties";

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
  console.log("From Dashboard Tab = ", tab);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        <DashSidebar />
      </div>
      <div>
        <h1>Dashboard</h1>
        {/* Faculties... */}
        {tab === "faculties" && <Faculties />}
      </div>
    </div>
  );
}
