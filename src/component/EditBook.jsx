import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Book() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    useEffect(() => {
        getBookById();
        get_category();
    }, []);

    const get_category = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API + 'get_category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setErrorMessage('Failed to fetch categories. Please try again later.');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) {
            setErrorMessage('No file selected.');
            return;
        }

        const reader = new FileReader();
        const image = new Image();

        reader.onload = () => {
            image.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = 100;
                    canvas.height = 120;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    const resizedBase64 = canvas.toDataURL('image/jpeg');
                    setFile(resizedBase64);
                } catch (error) {
                    console.error('Error resizing image:', error);
                    setErrorMessage('Error processing the image. Please try a different file.');
                }
            };
            image.src = reader.result;
        };

        reader.readAsDataURL(selectedFile);
    };

    const getBookById = async () => {
        if (!id) {
            setErrorMessage('Invalid book ID.');
            return;
        }

        try {
            const response = await axios.get(import.meta.env.VITE_API + `get_book_by_id?id=${id}`);
            setName(response.data.book_name);
            setCategory(response.data.category);
            setAmount(response.data.amount);
            setFile(response.data.file);
        } catch (error) {
            console.log(error);
            setErrorMessage('Failed to fetch book details. Please try again later.');
        }
    };

    const updateBook = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(import.meta.env.VITE_API + `update_book/${id}`, {
                name,
                category,
                amount,
                file
            });
            alert('เเก้ไขข้อมูลสำเร็จ');
        } catch (error) {
            console.error('Error updating book:', error);
            setErrorMessage('Failed to update book. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-gray-300  to-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-lg w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
                    <div className="flex justify-center">
                        <div className='font-semibold text-lg text-gray-400'>
                            แก้ไขหนังสือ
                        </div>
                    </div>
                    <form onSubmit={updateBook} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">ชื่อหนังสือ:</label>
                                <input id="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm" placeholder="ชื่อหนังสือ" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="category" className="sr-only">หมวดหมู่:</label>
                                <select id="category" name="category" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">เลือกหมวดหมู่</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="amount" className="sr-only">จำนวน:</label>
                                <input
                                    id="amount"
                                    type="number"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                                    placeholder="จำนวน"
                                    value={amount}
                                    onChange={(e) => {
                                        const newValue = parseInt(e.target.value, 10);
                                        if (newValue > 0) {
                                            setAmount(newValue);
                                        } else {
                                            setAmount(1);
                                        }
                                    }}
                                    min="1"
                                />
                            </div>
                            <div>
                                <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-emerald-400 hover:file:bg-violet-100" />
                            </div>
                        </div>

                        <div>
                            <button type='submit' disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                {isLoading ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                            </button>
                        </div>
                        {file && <img src={file} className="mt-4 w-24 h-32 rounded-xl" alt="Preview" />}
                    </form>
                </div>
            </div>
        </>
    );
}

export default Book;