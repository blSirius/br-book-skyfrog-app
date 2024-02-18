import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUserAuth } from '../context/UserAuthContext.jsx';
import logo from '/logo.png'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useUserAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/book');
        } catch (err) {
            console.log(err);
            alert('invalid username or password')
        }
    };


    return (
        <div className="bg-gradient-to-r from-gray-300  to-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
                <div className="flex justify-center">
                    <img className="h-12 w-auto" src={logo} alt="" />
                </div>
                <h2 className="mt-6 text-center text-sm font-semibold text-gray-900">เข้าสู่ระบบให้บริการยืมคืนหนังสือสำหรับบรรณารักษ์</h2>
                <form className="mt-8 space-y-6"  onSubmit={handleLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-emerald-500  to-green-500 hover:to-green-600 ">
                            Login
                        </button>
                        <a href="/register" className=' decoration-2 text-blue-600 text-xs w-full' >ยังไม่เป็นสมาชิกใช่มั้ย? register</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;
