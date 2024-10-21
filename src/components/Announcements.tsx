import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
  createdAt: string;
}

export const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/announcements', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setAnnouncements(response.data);
    } catch (err) {
      setError('Failed to fetch announcements');
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/announcements', newAnnouncement, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setNewAnnouncement({ title: '', content: '' });
      fetchAnnouncements();
    } catch (err) {
      setError('Failed to post announcement');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={newAnnouncement.title}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
          placeholder="Announcement Title"
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          value={newAnnouncement.content}
          onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
          placeholder="Announcement Content"
          className="border p-2 w-full mb-2"
          rows={3}
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Post Announcement
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {announcements.map((announcement) => (
          <div key={announcement._id} className="bg-white p-4 mb-4 rounded shadow">
            <h3 className="font-semibold">{announcement.title}</h3>
            <p className="mb-2">{announcement.content}</p>
            <p className="text-sm text-gray-500">
              Posted by {announcement.author.name} on {new Date(announcement.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};