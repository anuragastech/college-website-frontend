import { useEffect, useState } from 'react';
import { getClasses } from '../../services/classService';

const ClassList = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error('Failed to load classes:', error.message);
      }
    };

    fetchData();
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
