import { useState } from 'react';
import Sidebar from './components/sidebar';
import DashboardContent from './components/DashboardContent';

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
