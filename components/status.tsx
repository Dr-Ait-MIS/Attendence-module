import { useState, useEffect } from "react";
import { format } from "date-fns";
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

  // Function to handle date change
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Fetch or load attendance data based on the selected date.
    // For now, we're just using the static initial data.
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="block text-lg font-medium mb-1">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd MMM yyyy"
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border">SL No</th>
            <th className="py-2 px-4 border">USN</th>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Classes Held</th>
            <th className="py-2 px-4 border">Classes Attended</th>
            <th className="py-2 px-4 border">Attendance %</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((student, index) => {
            const attendancePercentage = (
              (student.classesAttended / student.classesHeld) *
              100
            ).toFixed(1);

            return (
              <tr key={student.id} className="text-center">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{student.usn}</td>
                <td className="py-2 px-4 border">{student.name}</td>
                <td className="py-2 px-4 border">{student.classesHeld}</td>
                <td className="py-2 px-4 border">{student.classesAttended}</td>
                <td className="py-2 px-4 border">
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
                <td className="py-2 px-4 border">
                  <span
                    className={`inline-block w-6 h-6 rounded-full ${
                      student.status === "P" ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;
