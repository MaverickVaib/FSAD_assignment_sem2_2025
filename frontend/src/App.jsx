
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vaccination Portal</h1>
      
      <nav className="flex gap-6 text-blue-600">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/students" className="hover:underline">Add/Edit Students details</Link>
        <Link to="/drives" className="hover:underline">Vaccination Drives</Link>
      </nav>
    </div>
  );
}
