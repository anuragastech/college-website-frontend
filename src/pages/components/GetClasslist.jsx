import { useEffect, useState } from 'react';
import axios from '../../services/axios';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('/api/classes/get-classes');
        setClasses(res.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Class List</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id}>
            {cls.name} - {cls.section}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
