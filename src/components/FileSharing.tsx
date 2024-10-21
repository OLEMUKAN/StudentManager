import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText } from 'lucide-react';

interface SharedFile {
  _id: string;
  name: string;
  type: string;
  size: number;
  uploadedBy: {
    name: string;
  };
  createdAt: string;
}

export const FileSharing: React.FC = () => {
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/files', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setFiles(response.data);
    } catch (err) {
      setError('Failed to fetch files');
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      try {
        const formData = new FormData();
        formData.append('file', uploadedFile);
        await axios.post('http://localhost:5000/api/files', formData, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
          }
        });
        fetchFiles();
      } catch (err) {
        setError('Failed to upload file');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">File Sharing</h2>
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-purple-500 text-white px-4 py-2 rounded cursor-pointer inline-block"
        >
          Upload File
        </label>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {files.map((file) => (
          <div key={file._id} className="bg-white p-4 mb-4 rounded shadow flex items-center">
            <FileText className="w-6 h-6 mr-4 text-purple-600" />
            <div>
              <h3 className="font-semibold">{file.name}</h3>
              <p className="text-sm text-gray-500">
                {file.type} - {(file.size / 1024).toFixed(2)} KB
              </p>
              <p className="text-sm text-gray-500">
                Uploaded by {file.uploadedBy.name} on {new Date(file.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};