import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Vaccination Dashboard
      </h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow p-4 rounded-lg">
              <p className="text-gray-700">Total Students</p>
              <p className="text-2xl font-bold">{stats.totalStudents}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <p className="text-gray-700">Vaccinated</p>
              <p className="text-2xl font-bold">{stats.vaccinated}</p>
            </div>
            <div className="bg-white shadow p-4 rounded-lg">
              <p className="text-gray-700">Vaccinated %</p>
              <p className="text-2xl font-bold">{stats.vaccinatedPercentage}%</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Upcoming Drives (Next 30 Days)
          </h2>

          {Array.isArray(stats.upcomingDrives) && stats.upcomingDrives.length === 0 ? (
            <p className="text-gray-500 italic">No drives scheduled.</p>
        ) : (
        <ul className="space-y-2">
            {stats.upcomingDrives?.map((d) => (
            <li key={d._id} className="bg-white p-4 rounded shadow">
                <div className="font-bold">{d.vaccineName}</div>
                <div>Date: {new Date(d.date).toLocaleDateString()}</div>
                <div>Doses: {d.availableDoses}</div>
                <div>Classes: {d.applicableClasses.join(", ")}</div>
            </li>
            ))}
         </ul>

          )}
        </>
      )}
    </div>
  );
}
