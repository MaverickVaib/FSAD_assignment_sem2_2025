import { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", studentId: "", class: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.studentId || !form.class) return;

    if (editingId) {
      await axios.put(`http://localhost:5000/api/students/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/students", form);
    }

    setForm({ name: "", studentId: "", class: "" });
    setEditingId(null);
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`http://localhost:5000/api/students/${id}`);
    fetchStudents();
  };

  const editStudent = (student) => {
    setForm({ name: student.name, studentId: student.studentId, class: student.class });
    setEditingId(student._id);
  };

  const cancelEdit = () => {
    setForm({ name: "", studentId: "", class: "" });
    setEditingId(null);
  };

  const handleVaccinate = async (id) => {
  const vaccineName = prompt("Enter vaccine name:");
  const date = prompt("Enter vaccination date (YYYY-MM-DD):");
  if (!vaccineName || !date) return;

    const Result = await axios.put(`http://localhost:5000/api/students/${id}/vaccinate`, {
      vaccineName,
      date,
    });
    alert("Vaccination recorded!");
    fetchStudents(); // refresh data
};


  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Manage Students</h1>

      <form className="flex gap-4 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-3 py-2 rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Student ID"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          className="border px-3 py-2 rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Class"
          value={form.class}
          onChange={(e) => setForm({ ...form, class: e.target.value })}
          className="border px-3 py-2 rounded w-1/4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update" : "Add"}
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
            <th className="p-2">Name</th>
            <th className="p-2">Student ID</th>
            <th className="p-2">Class</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-t">
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.studentId}</td>
              <td className="p-2">{student.class}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => editStudent(student)}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(student._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                    className="text-blue-600 underline mr-2"
                    onClick={() => handleVaccinate(student._id)}
                >
                  Vaccinate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
