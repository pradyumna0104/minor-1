import React from 'react';
import WeatherAlertForm from './WeatherAlertForm';
import MandiPriceForm from './MandiPriceForm'; // 1. Import
import UserManagement from './UserManagement'; // 2. Import

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create Weather Alert</h2>
          <WeatherAlertForm />
        </div>
        
        {/* 3. Add the MandiPriceForm */}
        <MandiPriceForm /> 
        
        {/* 4. Add the UserManagement component */}
        <UserManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;