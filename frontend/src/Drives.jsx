import { useEffect, useState } from "react";
import axios from "axios";

export default function Drives() {
  const [drives, setDrives] = useState([]);
  const [form, setForm] = useState({
    vaccineName: "",
    date: "",
    availableDoses: "",
    applicableClasses: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDrives = async () => {
    const res = await axios.get("http://localhost:5000/api/drives");
    setDrives(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      vaccineName: form.vaccineName,
      date: form.date,
      availableDoses: parseInt(form.availableDoses),
      applicableClasses: form.applicableClasses
        .split(",")
        .map((c) => c.trim()),
    };

    if (editingId) {
      await axios.put(`http://localhost:5000/api/drives/${editingId}`, payload);
    } else {
      await axios.post("http://localhost:5000/api/drives", payload);
    }

    setForm({ vaccineName: "", date: "", availableDoses: "", applicableClasses: "" });
    setEditingId(null);
    fetchDrives();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/drives/${id}`);
    fetchDrives();
  };

  const handleEdit = (drive) => {
    setEditingId(drive._id);
    setForm({
      vaccineName: drive.vaccineName,
      date: drive.date.split("T")[0],
      availableDoses: drive.availableDoses,
      applicableClasses: drive.applicableClasses.join(", "),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ vaccineName: "", date: "", availableDoses: "", applicableClasses: "" });
  };

  useEffect(() => {
    fetchDrives();
  }, []);

  const isPastDrive = (dateStr) => new Date(dateStr) < new Date();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Vaccination Drives</h1>

      <form className="flex flex-wrap gap-4 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Vaccine Name"
          value={form.vaccineName}
          onChange={(e) => setForm({ ...form, vaccineName: e.target.value })}
          className="border px-3 py-2 rounded w-56"
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border px-3 py-2 rounded w-48"
          required
        />
        <input
          type="number"
          placeholder="Available Doses"
          value={form.availableDoses}
          onChange={(e) => setForm({ ...form, availableDoses: e.target.value })}
          className="border px-3 py-2 rounded w-40"
          required
        />
        <input
          type="text"
          placeholder="Applicable Classes (e.g., 6,7)"
          value={form.applicableClasses}
          onChange={(e) => setForm({ ...form, applicableClasses: e.target.value })}
          className="border px-3 py-2 rounded w-64"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Drive" : "Add Drive"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={cancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full border shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Vaccine</th>
            <th className="p-2">Date</th>
            <th className="p-2">Doses</th>
            <th className="p-2">Classes</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((d) => (
            <tr key={d._id} className="border-t">
              <td className="p-2">{d.vaccineName}</td>
              <td className="p-2">{new Date(d.date).toLocaleDateString()}</td>
              <td className="p-2">{d.availableDoses}</td>
              <td className="p-2">{d.applicableClasses.join(", ")}</td>
              <td className="p-2 space-x-2">
                <button
                  className={`text-green-600 hover:underline ${
                    isPastDrive(d.date) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => !isPastDrive(d.date) && handleEdit(d)}
                  disabled={isPastDrive(d.date)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(d._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
