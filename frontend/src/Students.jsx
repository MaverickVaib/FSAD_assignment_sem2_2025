import { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";


function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", studentId: "", class: "" });
  const [editingId, setEditingId] = useState(null);
  const [csvFile, setCsvFile] = useState(null); 
  const [searchText, setSearchText] = useState("");

  const fetchStudents = async () => {
    const res = await axios.get("http://localhost:5000/api/students");
    setStudents(res.data);
  };
  

  const handleSubmit = async (event) => {
    
    event.preventDefault();
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

const handleCSVUpload = (event) => {
  event.preventDefault();
  if (!csvFile) return alert("Please select a CSV file");

  Papa.parse(csvFile, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      try {
        await axios.post("http://localhost:5000/api/students/bulk", {
          students: results.data,
        });
        alert("CSV upload successful!");
        fetchStudents();
      } catch (err) {
        alert("Upload failed");
        console.error(err);
      }
    },
  });
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
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="border px-3 py-2 rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Student ID"
          value={form.studentId}
          onChange={(event) => setForm({ ...form, studentId: event.target.value })}
          className="border px-3 py-2 rounded w-1/4"
        />
        <input
          type="text"
          placeholder="Class"
          value={form.class}
          onChange={(event) => setForm({ ...form, class: event.target.value })}
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

      <form onSubmit={handleCSVUpload} className="mb-6">
        <input
          type="file"
          accept=".csv"
          onChange={(event) => setCsvFile(event.target.files[0])}
          className="mb-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded ml-2"
        >
          Upload CSV
        </button>
      </form>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, ID, or class"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
      </div>


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
          {students
            .filter((student) => {
              const keyword = searchText.toLowerCase();
              return (
                student.name.toLowerCase().includes(keyword) ||
                student.studentId.toLowerCase().includes(keyword) ||
                student.class.toLowerCase().includes(keyword)
              );
            })
          .map((student) => (
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
