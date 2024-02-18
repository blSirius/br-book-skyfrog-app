import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Borrowing() {
    const searchParams = new URLSearchParams(window.location.search);
    const book_id = searchParams.get("id");
    const navigate = useNavigate();

    const [bookName, setBookName] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [file, setFile] = useState(null);

    const [memberName, setMemberName] = useState('');
    const [memberSurname, setMemberSurname] = useState('');
    const [memberID, setMemberID] = useState(null);

    const [memberValidID, setMemberValidID] = useState(null);

    const [valid, setValid] = useState(false);

    const currentDate = new Date().toLocaleDateString();
    const lastestDate = new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString();


    useEffect(() => {
        getBookById();
    }, []);

    const getBookById = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_API + `get_book_by_id?id=${book_id}`);
            const { book_name, category, amount, file } = response.data;
            setBookName(book_name);
            setCategory(category);
            setAmount(amount);
            setFile(file);
        } catch (error) {
            console.log(error);
        }
    };

    const validation = async () => {
        //check memberId
        try {
            const response = await axios.get(import.meta.env.VITE_API + `get_member_by_id?id=${memberValidID}`);
            setValid(true)
            setMemberName(response.data.name);
            setMemberSurname(response.data.surname);
            setMemberID(response.data.id)
        } catch (error) {
            setValid(false)
            console.log(error);
        }
    };

    const borrow_book = async () => {
        console.log(book_id);
        try {
            const res1 = await axios.get(import.meta.env.VITE_API + `check_book_amount/${book_id}`);
            const res1_status = res1.data;
            if (res1_status == true) {
                const res2 = await axios.put(import.meta.env.VITE_API + `update_book_borrowing/${book_id}`);
                const res2_status = res2.data;
                if (res2_status == true) {
                    try {
                        const res3 = await axios.post(import.meta.env.VITE_API + 'post_borrow', { memberID, book_id, currentDate, lastestDate });
                        alert('ทำการยืมสำเร็จ')
                        navigate('/borrow_list')

                    } catch (error) {
                        const res4 = await axios.put(import.meta.env.VITE_API + `update_book_return/${book_id}`);
                        alert('ไม่สามารถยืมหนังสือซ้ำได้')
                    }
                }
            }
        } catch (error) {
            alert('ไม่สามารถยืมได้เนื่องจากมีหนีงสือไม่เพียงพอ')
        }
    }

    return (
        <>
            <Navbar />

            <div className="container p-4 mx-auto text-gray-800">
                <h2 className="text-xl font-bold text-green-700 mb-2">ทำการยืมหนังสือ</h2>
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p className="font-medium">ชื่อหนังสือ: <span className="text-green-600">{bookName}</span></p>
                    <p className="font-medium">หมวดหมู่: <span className="text-green-600">{category}</span></p>
                    {file && <img src={file} alt="Book" className="mt-2 rounded" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                </div>

                <div className="mb-4">
                    <label htmlFor="memberID" className="font-medium">รหัสสมาชิก: </label>
                    <input
                        type="number"
                        id="memberID"
                        className='bg-gray-50 border border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 text-green-800 rounded-lg shadow-sm p-2'
                        value={memberValidID || ''}
                        onChange={(e) => { setMemberValidID(e.target.value) }}
                    />
                </div>

                <button className='text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={validation}>ตรวจสอบ</button>

                <br />

                {valid ? (
                    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                        <p className="font-medium">รหัสสมาชิก: <span className="text-green-600">{memberID}</span></p>
                        <p className="font-medium">ชื่อสมาชิก: <span className="text-green-600">{memberName} {memberSurname}</span></p>
                        <p className="font-medium">รหัสหนังสือ: <span className="text-green-600">{book_id}</span></p>
                        <p className="font-medium">ชื่อหนังสือ: <span className="text-green-600">{bookName}</span></p>
                        <p className="font-medium">วันที่ยืม: <span className="text-green-600">{currentDate}</span></p>
                        <p className="font-medium">วันครบกำหนด: <span className="text-green-600">{lastestDate}</span></p>

                        <button className='mt-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center' type="button" onClick={borrow_book} >ยืนยันการยืม</button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </>
    );
}

export default Borrowing;