import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token, logout } = useAuth();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/students', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Failed to fetch students`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);

  return (
    <div className="students-page">
      <header className="students-header">
        <h1>Student Directory</h1>
        <button onClick={logout} className="btn-logout">Logout</button>
      </header>

      {loading && <p className="status-message">Loading students...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && students.length === 0 && (
        <div className="empty-state">
          <p>No students found</p>
          <p>← Login to view student directory</p>
        </div>
      )}

      {!loading && !error && students.length > 0 && (
        <ul className="students-list">
          {students.map((student) => (
            <li key={student.id} className="student-card">
              <h3>{student.name}</h3>
              <p><strong>Course:</strong> {student.course || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};