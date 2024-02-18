import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function EditMember() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    useEffect(() => {
        getMemberById();
    }, []);

    const getMemberById = async () => {
        if (!id) {
            setErrorMessage('Invalid member ID.');
            return;
        }

        try {
            const response = await axios.get(import.meta.env.VITE_API+`get_member_by_id?id=${id}`);
            setName(response.data.name);
            setSurname(response.data.surname);
            setAddress(response.data.address);
            setPhoneNumber(response.data.phone_number);
        } catch (error) {
            console.log(error);
            setErrorMessage('fail');
        }
    };

    const updateMember = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(import.meta.env.VITE_API+`update_member/${id}`, {
                name,
                surname,
                address,
                phone_number
            });
            alert('เเก้ไขข้อมูลสำเร็จ!');
        } catch (error) {
            console.error('Error updating book:', error);
            alert('เเก้ไขข้อมูลล้มเหลว.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-gray-300 to-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-lg w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <div className="flex justify-center">
                        <div className='font-semibold text-lg text-gray-400'>
                            แก้ไขข้อมูลสมาชิก
                        </div>
                    </div>
                    <form onSubmit={updateMember} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">ชื่อจริง:</label>
                                <input id="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm" placeholder="ชื่อจริง" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="surname" className="sr-only">นามสกุล:</label>
                                <input id="surname" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm" placeholder="นามสกุล" value={surname} onChange={(e) => setSurname(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="address" className="sr-only">ที่อยู่:</label>
                                <input id="address" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm" placeholder="ที่อยู่" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="phone_number" className="sr-only">ติดต่อ:</label>
                                <input id="phone_number" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm" placeholder="ติดต่อ" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <button type='submit' disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default EditMember;