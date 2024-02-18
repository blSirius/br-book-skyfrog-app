import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Book() {
    const [books, setBooks] = useState(null);

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API + 'get_book');
            setBooks(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(import.meta.env.VITE_API + `delete_book/${id}`);
            setBooks(books.filter(book => book.id !== id));
            alert('ลบหนังสือสำเร็จ')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div>
                    <Link to="/add_book" className='inline-block m-4 text-white text-sm bg-green-500 hover:bg-green-600 p-2 rounded-full transition duration-300 ease-in-out'>
                        เพิ่มรายการหนังสือ
                    </Link>
                </div>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books && books.map(book => (
                            <div key={book.id} className='block p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out' style={{ backgroundColor: '#F3F4F6' }}>
                                <h2 className="text-lg font-semibold mb-2" style={{ color: '#111827' }}>{book.book_name}</h2>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-500 font-bold">รหัส: {book.id} </p>
                                        <p className="text-gray-500">หมวดหมู่: {book.category} </p>
                                        <p className="text-gray-500">จำนวน: {book.amount} เล่ม</p>
                                        <p className="text-gray-500">กำลังถูกยืม: {book.borrowing} เล่ม</p>
                                    </div>
                                    <img src={book.file} className='rounded-xl' alt="" />
                                </div>
                                <div className="flex mt-4 space-x-2">
                                    <Link to={`/edit_book?id=${encodeURIComponent(book.id)}`} className='flex-grow bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded transition duration-300 ease-in-out text-center'>
                                        เเก้ไข
                                    </Link>
                                    <button onClick={() => deleteBook(book.id)} className='flex-grow bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition duration-300 ease-in-out'>
                                        ลบ
                                    </button>
                                    <Link to={`/borrowing?id=${encodeURIComponent(book.id)}`} className='flex-grow bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded transition duration-300 ease-in-out text-center'>
                                        ยืมหนังสือ
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Book;