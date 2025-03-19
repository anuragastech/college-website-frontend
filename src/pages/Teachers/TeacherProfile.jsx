import { useEffect, useState } from 'react';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        const response = await fetch('/api/teachers/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTeacher(data);
        } else {
          console.error('Failed to load profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Teacher Profile</h2>
      {teacher ? (
        <div>
          <p>
            <span className="font-medium">Name:</span> {teacher.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {teacher.email || 'N/A'}
          </p>
        </div>
      ) : (
        <p>No profile data available</p>
      )}
    </div>
  );
};

export default TeacherProfile;
