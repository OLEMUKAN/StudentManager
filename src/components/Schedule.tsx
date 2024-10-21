import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ClassSession {
  _id: string;
  title: string;
  date: string;
  time: string;
  lecturer: {
    name: string;
  };
}

export const Schedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ClassSession[]>([]);
  const [newSession, setNewSession] = useState({
    title: '',
    date: '',
    time: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/schedule', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setSchedule(response.data);
    } catch (err) {
      setError('Failed to fetch schedule');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/schedule', newSession, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setNewSession({ title: '', date: '', time: '' });
      fetchSchedule();
    } catch (err) {
      setError('Failed to add class session');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Class Schedule</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newSession.title}
          onChange={(e) => setNewSession({ ...newSession, title: e.target.value })}
          placeholder="Class Title"
          className="border p-2 mr-2 mb-2"
          required
        />
        <input
          type="date"
          value={newSession.date}
          onChange={(e) => setNewSession({ ...newSession, date: e.target.value })}
          className="border p-2 mr-2 mb-2"
          required
        />
        <input
          type="time"
          value={newSession.time}
          onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
          className="border p-2 mr-2 mb-2"
          required
        />
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
          Add Class Session
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {schedule.map((session) => (
          <div key={session._id} className="bg-white p-4 mb-4 rounded shadow">
            <h3 className="font-semibold">{session.title}</h3>
            <p>{new Date(session.date).toLocaleDateString()} at {session.time}</p>
            <p className="text-sm text-gray-500">Lecturer: {session.lecturer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};