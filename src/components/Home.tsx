import React from 'react';
import { ClipboardList, MessageSquare, Calendar, FileText } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Class Coordination System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ClipboardList className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h2 className="text-xl font-semibold mb-2">Attendance</h2>
          <p>Manage and track student attendance for lectures.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h2 className="text-xl font-semibold mb-2">Announcements</h2>
          <p>Communicate important information to students.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-red-600" />
          <h2 className="text-xl font-semibold mb-2">Schedule</h2>
          <p>Manage class schedules and notify of any changes.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FileText className="w-12 h-12 mx-auto mb-4 text-purple-600" />
          <h2 className="text-xl font-semibold mb-2">File Sharing</h2>
          <p>Share notes, assignments, and other materials with students.</p>
        </div>
      </div>
    </div>
  );
};