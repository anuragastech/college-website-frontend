import { useEffect, useState } from 'react';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/students/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setStudent(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Failed to fetch student profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
      <div className="mb-2">
        <strong>Name:</strong> {student.name}
      </div>
      <div className="mb-2">
        <strong>Roll Number:</strong> {student.rollNumber}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {student.email}
      </div>
      <div className="mb-2">
        <strong>Phone:</strong> {student.phone}
      </div>
      <div className="mb-2">
        <strong>Parent Name:</strong> {student.parentDetails?.name}
      </div>
      <div className="mb-2">
        <strong>Parent Email:</strong> {student.parentDetails?.email}
      </div>
      <div className="mb-2">
        <strong>Parent Phone:</strong> {student.parentDetails?.phone}
      </div>
    </div>
  );
};

export default StudentProfile;
