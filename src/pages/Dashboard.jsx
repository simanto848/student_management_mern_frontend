import CardComponent from "../components/CardComponent";
// import { getUserFromCookie } from "../services/Cookies";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-start justify-start">
      <div className="flex flex-wrap justify-start gap-4">
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
}
