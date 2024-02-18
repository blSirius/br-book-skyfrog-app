import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function AddMember() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    const post_member = async (e) => {
        e.preventDefault();
        
        if (!/^\d{5}$/.test(id)) {
            alert('รหัสสมาชิกต้องเป็นตัวเลข 5 หลักเท่านั้น');
            return;
        }

        try {
            const response = await axios.post(import.meta.env.VITE_API + 'post_member', { id, name, surname, address, phone_number });
            console.log('Member added successfully:', response.data);
            
            setId('');
            setName('');
            setSurname('');
            setAddress('');
            setPhoneNumber('');
            alert('เพิ่มสมาชิกสำเร็จ');
            navigate('/member');
        } catch (error) {
            console.error(error);
            alert('ล้มเหลว: รหัสมาชิกห้ามซ้ำกัน');
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-gray-300 to-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-lg w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
                    <div className="flex justify-center">
                        <div className='font-semibold text-lg text-gray-600'>
                            เพิ่มสมาชิกห้องสมุด
                        </div>
                    </div>
                    <form onSubmit={post_member} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="id" className="sr-only">รหัสสมาชิก:</label>
                                <input id="id" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 sm:text-sm" placeholder="รหัสสมาชิก" value={id} onChange={(e) => setId(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="name" className="sr-only">ชื่อจริง:</label>
                                <input id="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 sm:text-sm" placeholder="ชื่อจริง" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="surname" className="sr-only">นามสกุล:</label>
                                <input id="surname" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 sm:text-sm" placeholder="นามสกุล" value={surname} onChange={(e) => setSurname(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="address" className="sr-only">ที่อยู่:</label>
                                <input id="address" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 sm:text-sm" placeholder="ที่อยู่" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="phone_number" className="sr-only">เบอร์ติดต่อ:</label>
                                <input id="phone_number" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 sm:text-sm" placeholder="เบอร์ติดต่อ" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button type='submit' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddMember;