import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const BASE_URL = process.env.REACT_APP_API_URL;

function Add() {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    email: '',
    mobile: '',
    position: '',
    company: '',
    salary: '',
    joining: ''
  });

  const addEmployee = async () => {
    const { id, name, email, mobile, position, company, salary, joining } = employee;

    // Validate required fields
    if (!id || !name || !email || !mobile || !position || !company || !salary || !joining) {
      toast.error("Please fill all fields");
      return;
    }

    // Convert id to number
    const newEmployee = {
      id: parseInt(id),
      name,
      email,
      mobile,
      position,
      company,
      salary,
      joining
    };

    try {
      console.log("🔼 Sending employee:", newEmployee); // debug
      const response = await axios.post(`${BASE_URL}/employment`, newEmployee);
      console.log("✅ Server response:", response.data); // debug

      if (response.data.success) {
        setEmployee({ id: '', name: '', email: '', mobile: '', position: '', company: '', salary: '', joining: '' });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      console.error("❌ Error:", e);
      toast.error(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-8">
        Add Employment Record 💼
      </h1>

      <div className="flex flex-col items-center gap-6 bg-white p-8 rounded-3xl shadow-lg w-[420px] mx-auto">
        {Object.entries(employee).map(([key, val], index) => (
          <input
            key={index}
            type={key === "joining" ? "date" : "text"}
            placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            value={employee[key]}
            onChange={(e) => setEmployee({ ...employee, [key]: e.target.value })}
            className="w-full px-5 py-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ))}

        <button
          className="mt-3 w-full bg-indigo-600 text-white py-3 rounded-xl shadow-md hover:bg-indigo-700 hover:scale-105 transition-all"
          onClick={addEmployee}
        >
          Add Employee
        </button>
      </div>

      <Link to="/" className="absolute top-6 left-20 text-lg bg-indigo-200 px-5 py-2 rounded-full hover:bg-indigo-300">
        ⬅ Back
      </Link>

      <Toaster />
    </div>
  );
}

export default Add;
