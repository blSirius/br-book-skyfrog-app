import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Member() {
    const [members, setMembers] = useState(null);

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API+'get_member');
            setMembers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMember = async (id) => {
        try {
            await axios.delete(import.meta.env.VITE_API+`delete_member/${id}`);
            setMembers(members.filter(member => member.id !== id));
            alert('ลบข้อมูสำเร็จ')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div>
                    <Link to="/add_member" className='inline-block m-4 text-white text-sm bg-green-500 hover:bg-green-600 p-2 rounded-full transition duration-300 ease-in-out'>
                        เพิ่มสมาชิก
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-green-800">ID</th>
                                <th className="px-4 py-2 text-left text-green-800">ชื่อจริง</th>
                                <th className="px-4 py-2 text-left text-green-800">นามสกุล</th>
                                <th className="px-4 py-2 text-left text-green-800 hidden sm:flex">ที่อยู่</th>
                                <th className="px-4 py-2 text-left text-green-800">ติดต่อ</th>
                                <th className="px-4 py-2 text-left text-green-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members && members.map(mb => (
                                <tr key={mb.id} className="border-b hover:bg-green-50">
                                    <td className="px-4 py-2 text-green-800">{mb.id}</td>
                                    <td className="px-4 py-2 text-green-800">{mb.name}</td>
                                    <td className="px-4 py-2 text-green-800">{mb.surname}</td>
                                    <td className="px-4 py-2 text-green-800 hidden sm:flex">{mb.address}</td>
                                    <td className="px-4 py-2 text-green-800">{mb.phone_number}</td>
                                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                                        <Link to={`/edit_member?id=${encodeURIComponent(mb.id)}`} className='bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm md:py-2 md:px-4'>
                                            เเก้ไข
                                        </Link>
                                        <button onClick={() => deleteMember(mb.id)} className='bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm md:py-2 md:px-4'>
                                            ลบข้อมูล
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Member;