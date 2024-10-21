import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AttendanceRecord {
  _id: string;
  student: {
    _id: string;
    name: string;
  };
  class: {
    _id: string;
    title: string;
    date: string;
    time: string;
  };
  date: string;
}

export const Attendance: React.FC = () => {
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [classId, setClassId] = useState('');

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/attendance', {
        headers: {
          'x-auth-token': token
        }
      });
      setAttendanceList(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/attendance', { classId }, {
        headers: {
          'x-auth-token': token
        }
      });
      setClassId('');
      fetchAttendance();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          placeholder="Enter Class ID"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Mark Attendance
        </button>
      </form>
      <h3 className="text-xl font-semibold mb-2">Attendance List:</h3>
      <ul className="list-disc pl-5">
        {attendanceList.map((record) => (
          <li key={record._id}>
            {record.student.name} - {record.class.title} ({new Date(record.date).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
};