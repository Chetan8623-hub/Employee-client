import React from 'react';
import TrashIcon from './../assets/delete.png';
import EditIcon from './../assets/edit.png';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

function EmploymentCard({ id, name, position, loadEmployees }) {
    const deleteEmployee = async () => {
        try {
            const response = await axios.delete(`${BASE_URL}/employment/${id}`);
            if (response.data.success) {
                toast.success(response.data.message);
                loadEmployees();
            } else {
                toast.error(response.data.message);
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to delete employee");
        }
    };

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 m-4 w-96 shadow-xl hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{name}</h2>
            <p className="text-sm font-medium text-blue-600">Employee ID: {id}</p>
            <p className="mt-2 text-base font-semibold text-blue-700">Position: {position}</p>

            <div className="flex items-center justify-around mt-6">
                <img src={TrashIcon} alt="Delete" className='h-[30px] cursor-pointer hover:scale-110 transition-transform' onClick={deleteEmployee} />
                <Link to={`/edit/${id}`}>
                    <img src={EditIcon} alt="Edit" className='h-[30px] cursor-pointer hover:scale-110 transition-transform' />
                </Link>
            </div>

            <Toaster />
        </div>
    );
}

export default EmploymentCard;