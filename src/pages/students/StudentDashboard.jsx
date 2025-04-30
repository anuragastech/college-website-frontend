import { useState } from 'react';
import Sidebar from './sidebar';
import DashboardContent from './DashboardContent';

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('home');

  return (
    <div className="flex h-screen">
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <DashboardContent 
          selectedMenu={selectedMenu} 
          setSelectedMenu={setSelectedMenu} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
