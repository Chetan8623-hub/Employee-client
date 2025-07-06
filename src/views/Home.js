import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmploymentCard from '../components/EmploymentCard';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

function Home() {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employment`);
      setEmployees(response.data.data);
    } catch (e) {
      console.error("Error loading employment data:", e);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-4">Employment Records 💼</h1>

      {/* Welcome Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <p className="text-lg text-blue-800 font-medium">
          Welcome to the Employment Management System! Here, you can manage employee records easily — add new employees, update their info, or delete old records.
        </p>
       </div>

      {/* Card Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {employees.length > 0 ? (
          employees.map((emp, i) => (
            <EmploymentCard key={i} {...emp} loadEmployees={loadEmployees} />
          ))
        ) : (
          <p className="text-center text-gray-600">No employment records found.</p>
        )}
      </div>

      <Link to="/add" className="fixed bottom-6 right-6 text-lg bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700">
        ➕ Add Employee
      </Link>
    </div>
  );
}

export default Home;
