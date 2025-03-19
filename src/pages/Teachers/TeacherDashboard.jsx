import { useState } from 'react';
import Sidebar from '../Teachers/sidebar';
import DashboardContent from '../Teachers/DashboardContent';

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('home');

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <DashboardContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export default Dashboard;
