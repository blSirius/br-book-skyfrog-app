import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.png';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const validateInput = () => {

        if (!/^[a-zA-Z0-9]+$/.test(username) || username.length <= 5) {
            return 'Username must contain only letters and numbers and be more than 6 characters.';
        }

        if (!/^[a-zA-Z0-9]+$/.test(password) || password.length <= 7) {
            return 'Password must contain only letters and numbers and be more than 8 characters.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateInput();
        if (validationError) {
            setErrorMessage(validationError);
            return; 
        }

        try {
            const response = await axios.post(import.meta.env.VITE_API + 'register', {
                username,
                password
            });
            console.log('User registered:', response.data);
            navigate('/login'); 
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
                <div className="flex justify-center">
                    <img className="h-12 w-auto" src={logo} alt="Logo" />
                </div>
                <h2 className="mt-6 text-center text-sm font-semibold text-gray-900">ลงทะเบียนระบบให้บริการยืมคืนหนังสือสำหรับบรรณารักษ์</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {errorMessage && <div className="text-red-600 text-sm text-center mb-4">{errorMessage}</div>}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-emerald-500 to-green-500 hover:to-green-600">
                            Register
                        </button>
                        <a href="/login" className=" text-blue-600 text-xs">มีบัญชีอยู่เเล้วใช่หรือไม่? Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
