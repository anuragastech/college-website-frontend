import { useState, useEffect } from "react";
import axios from "../services/axios";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CreateMonthlyTimetable() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    classId: "",
    month: "",
    year: new Date().getFullYear(),
    timetable: daysOfWeek.map(() =>
      Array.from({ length: 7 }, (_, i) => ({
        periodNumber: i + 1, // Auto-fill period number 1-7
        subjectId: "",
      }))
    ),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classRes = await axios.get("/api/classes/get-classes");
        setClasses(classRes.data.classes || []);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
        setClasses([]);
      }

      try {
        const subjectRes = await axios.get("/api/subject/getsubjects");
        console.log("Subject Response:", subjectRes.data);  // Log the response to inspect it
        setSubjects(subjectRes.data || []);  // Assuming the response is the array of subjects
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
        setSubjects([]);
      }
    };

    fetchData();
  }, []);

  const handleChange = (dayIndex, periodIndex, value) => {
    const updatedTimetable = [...form.timetable];
    updatedTimetable[dayIndex][periodIndex] = {
      ...updatedTimetable[dayIndex][periodIndex],
      subjectId: value,
    };
    setForm({ ...form, timetable: updatedTimetable });
  };

  const handleSubmit = async () => {
    if (!form.classId || !form.month || !form.year) {
      alert("Please fill in all required fields!");
      return;
    }

    const timetableValid = form.timetable.every((day) =>
      day.every((period) => period.subjectId)
    );

    if (!timetableValid) {
      alert("Please select a subject for each period!");
      return;
    }

    try {
      // Formatting the timetable to match backend expectations
      const formattedTimetable = daysOfWeek.map((day, dayIndex) => ({
        day,
        periods: form.timetable[dayIndex].map((period) => ({
          periodNumber: period.periodNumber,
          subjectId: period.subjectId,
        })),
      }));

      const payload = {
        classId: form.classId,
        month: form.month,
        year: form.year,
        timetable: formattedTimetable, // Corrected: sending timetable instead of periods
      };

      console.log("Payload:", payload);

      await axios.post("/api/timetable/create-monthly", payload);
      alert("Monthly timetable created successfully!");
    } catch (err) {
      console.error("Failed to create timetable:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        alert(err.response.data.message || "Failed to create timetable");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto border rounded-lg shadow-lg">
      <div className="space-y-4">
        {/* Class and Month selection */}
        <select
          value={form.classId}
          onChange={(e) => setForm({ ...form, classId: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name} - {cls.section}
            </option>
          ))}
        </select>

        <select
          value={form.month || ""}
          onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Month</option>
          {Array.from({ length: 12 }, (_, m) => (
            <option key={m + 1} value={m + 1}>
              {new Date(2000, m).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        {/* Periods */}
        {daysOfWeek.map((day, dayIndex) => (
          <div key={dayIndex} className="border p-2 rounded-md shadow">
            <h3 className="font-semibold">{day}</h3>
            {form.timetable[dayIndex].map((period, periodIndex) => (
              <div key={periodIndex} className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="number"
                  value={period.periodNumber}
                  disabled
                  className="w-full p-2 border rounded bg-gray-100"
                />
                <select
                  value={period.subjectId}
                  onChange={(e) => handleChange(dayIndex, periodIndex, e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((sub) => (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Monthly Timetable
        </button>
      </div>
    </div>
  );
}
