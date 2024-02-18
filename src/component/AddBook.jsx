import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function AddBook() {
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(null);
    const [fileBase64, setFileBase64] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        get_category();
    }, []);

    const get_category = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API + 'get_category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();
        const image = new Image();

        reader.onload = () => {
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 100;
                canvas.height = 120;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                const resizedBase64 = canvas.toDataURL('image/jpeg'); // Convert canvas to base64
                setFileBase64(resizedBase64);
                console.log(resizedBase64.length);
            };
            image.src = reader.result;
        };

        reader.readAsDataURL(selectedFile);
    };

    const post_book = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_API + 'post_book', { id, name, category, amount, file: fileBase64 });
            console.log('Book added successfully:', response.data);
            setId('');
            setName('');
            setCategory('');
            setAmount(null);
            setFileBase64(null);
            alert('เพิ่มหนังสือสำเร็จ')
            navigate('/book');
        } catch (error) {
            alert('รหัสหนังสือซ้ำ ')
        }
    };

    return (
        <>
            <Navbar />
            <div className="bg-gradient-to-r from-gray-300  to-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-lg w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
                    <div className="flex justify-center">
                        <div className='font-semibold text-lg text-gray-400' >
                            เพิ่มหนังสือ
                        </div>
                    </div>
                    <form onSubmit={post_book} className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="id" className="sr-only">ID:</label>
                                <input id="id" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 sm:text-sm" placeholder="รหัสหนังสือ" value={id} onChange={(e) => setId(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="name" className="sr-only">ชื่อหนังสือ:</label>
                                <input id="name" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300   sm:text-sm" placeholder="ชื่อหนังสือ" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="category" className="sr-only">หมวดหมู่:</label>
                                <select id="category" name="category" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300  sm:text-sm" value={category} onChange={(e) => setCategory(e.target.value)}>
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
                                <input type="file" onChange={handleFileChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-emerald-400 hover:file:bg-violet-100" />
                            </div>
                        </div>

                        <div>
                            <button type='submit' className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 ">submit</button>
                        </div>
                        {fileBase64 && <img src={fileBase64} className="mt-4 w-40 rounded-xl" alt="Selected" />}
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBook;