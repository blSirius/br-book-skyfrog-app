import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function BorrowList() {
    const [borrowList, setBorrowList] = useState(null);

    useEffect(() => {
        getBorrowList();
    }, []);

    const getBorrowList = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API + 'get_borrowlist');
            setBorrowList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const returnBook = async (borrow_id, book_id) => {

        try {
            const response = await axios.put(import.meta.env.VITE_API + `update_book_return/${book_id}`);
        }
        catch (error) {
            console.log(error);
        }

        try {
            const response = await axios.delete(import.meta.env.VITE_API + `delete_borrowlist/${borrow_id}`);
            getBorrowList();
            alert('คืนหนังสือสำเร็จ')

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-green-800">ชื่อจริง</th>
                                <th className="px-4 py-2 text-left text-green-800">นามสกุล</th>
                                <th className="px-4 py-2 text-left text-green-800">ชื่อหนังสือ</th>
                                <th className="px-4 py-2 text-left text-green-800">วันที่ยืม</th>
                                <th className="px-4 py-2 text-left text-green-800">วันครบกำหนด</th>
                                <th className="px-4 py-2 text-left text-green-800">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowList && borrowList.map(list => (
                                <tr key={list.id} className="border-b hover:bg-green-50">
                                    <td className="px-4 py-2 text-green-800">{list.name}</td>
                                    <td className="px-4 py-2 text-green-800">{list.surname}</td>
                                    <td className="px-4 py-2 text-green-800">{list.book_name}</td>
                                    <td className="px-4 py-2 text-green-800">{list.currentdate}</td>
                                    <td className="px-4 py-2 text-green-800">{list.lastestdate}</td>
                                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                                        <button onClick={() => returnBook(list.id, list.book_id)} className='bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm md:py-2 md:px-4'>
                                            คืนหนังสือ
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

export default BorrowList;