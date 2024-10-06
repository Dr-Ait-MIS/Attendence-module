'use client'
import { useState } from "react";
import { format, isToday } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Dummy data for attendance
const initialAttendanceData = [
  { id: 1, name: "Newton", usn: "1DA25CS001", classesHeld: 15, classesAttended: 15, status: "P" },
  { id: 2, name: "Bose", usn: "1DA25CS002", classesHeld: 15, classesAttended: 15, status: "P" },
  { id: 3, name: "Einstein", usn: "1DA25CS003", classesHeld: 15, classesAttended: 12, status: "A" },
  { id: 4, name: "Rutherford", usn: "1DA25CS004", classesHeld: 15, classesAttended: 10, status: "A" },
];

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [attendanceData, setAttendanceData] = useState(initialAttendanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAbsentees, setShowAbsentees] = useState(false); // State for filtering absentees

  // Function to handle date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Filter students by name or last 3 digits of the USN
  const filteredStudents = attendanceData.filter((student) => {
    const usnLastThreeDigits = student.usn.slice(-3);
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usnLastThreeDigits.includes(searchTerm)
    );
  });

  // Filter based on absentee status
  const displayedStudents = showAbsentees
    ? filteredStudents.filter(student => student.status === "A")
    : filteredStudents;

  // Determine if today is selected for editing purposes
  const isTodaySelected = isToday(selectedDate || new Date());

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

      <div className="flex justify-between items-end mb-4">
        {/* Date Picker */}
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd MMM yyyy"
            className="border p-2 border-black rounded-md "
          />
        </div>

        {/* Search Filter */}
        <div className="relative">
           <form className="form relative" onSubmit={(e) => e.preventDefault()}>
                <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1" type="button">
                <svg
                    width="17"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                    className="w-5 h-5 text-gray-700"
                >
                    <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    ></path>
                </svg>
                </button>
                <input
                className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="Search..."
                required
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                type="button" // Change to type="button" to prevent form submission
                className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                onClick={() => setSearchTerm("")} // Clear the searchTerm on click
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
                </button>
            </form>
            </div>

      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
  <tr>
    <th colSpan={6} className="text-center py-2 font-bold">
      Math 101 | A Section | CSE
    </th>
    <th className="text-right py-2 px-4 flex items-end justify-end">
      <button
        onClick={() => setShowAbsentees((prev) => !prev)}
        className="flex items-end justify-center gap-2 text-black font-bold py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-200 duration-300"
        style={{ width: '200px' }} // Fixed width for the button
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 8h14M5 12h8m-8 4h4"
          />
        </svg>
        {showAbsentees ? 'Show All' : 'Show Absentees'}
      </button>
    </th>
  </tr>
  <tr>
    <th className="py-2 px-4">SL No</th>
    <th className="py-2 px-4">USN</th>
    <th className="py-2 px-4">Name</th>
    <th className="py-2 px-4">Classes Held</th>
    <th className="py-2 px-4">Classes Attended</th>
    <th className="py-2 px-4">Attendance %</th>
    <th className="py-2 px-4">Status</th>
  </tr>
</thead>

        <tbody>
          {displayedStudents.map((student, index) => {
            const attendancePercentage = (
              (student.classesAttended / student.classesHeld) *
              100
            ).toFixed(1);

            return (
              <tr key={student.id} className="text-center">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{student.usn}</td>
                <td className="py-2 px-4 font-semibold">{student.name}</td>
                <td className="py-2 px-4">{student.classesHeld}</td>
                <td className="py-2 px-4">{student.classesAttended}</td>
                <td className="py-2 px-4">
                  <span
                    className={`${
                      attendancePercentage === "100.0"
                        ? "text-green-500"
                        : attendancePercentage >= "80.0"
                        ? "text-yellow-500"
                        : "text-red-500"
                    } font-bold`}
                  >
                    {attendancePercentage}%
                  </span>
                </td>
                <td className="py-2 px-4">
                  {isTodaySelected ? (
                    // If today's date is selected, make the status editable
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={student.status === "P"}
                        onChange={() => {
                          const updatedStatus = student.status === "P" ? "A" : "P";
                          const updatedData = attendanceData.map((s) =>
                            s.id === student.id
                              ? { ...s, status: updatedStatus }
                              : s
                          );
                          setAttendanceData(updatedData);
                        }}
                        className="sr-only peer"
                      />
                      <div className="group peer ring-0 bg-red-600 text-red-600 rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-['A'] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['P'] peer-checked:after:text-green-400 peer-hover:after:scale-95"></div>
                    </label>
                  ) : (
                    // For past dates, display the status as text (non-editable)
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white ${
                        student.status === "P" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {student.status}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <div className="flex gap-2 bg-white shadow-md rounded-lg p-4 border border-gray-300">
          <div className="flex items-center text-black font-weight-500">
            Present: 
             </div>
          <div className="text-green-600 font-bold text-xl">
            {attendanceData.filter((d) => d.status === "P").length}
          </div>
          <div className="flex items-center text-black font-weight-500">
            Absent:
             </div>
          <div className="text-red-500 font-bold text-xl">
            {attendanceData.filter((d) => d.status === "A").length}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-center">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">Submit</button>
      </div>
    </div>
  );
};

export default Attendance;
