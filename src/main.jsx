import React from 'react'

//router
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//context
import { UserAuthContextProvider } from './context/UserAuthContext.jsx';

//styles
import './index.css';

//component
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import Register from './component/Register.jsx';
import Login from './component/Login.jsx';

import Book from './component/Book.jsx';
import AddBook from './component/AddBook.jsx';
import EditBook from './component/EditBook.jsx';
import Member from './component/Member.jsx';
import AddMember from './component/AddMember.jsx';
import EditMember from './component/EditMember.jsx';
import Borrowing from './component/Borrowing.jsx';
import BorrowList from './component/BorrowList.jsx';

import Navbar from './component/Navbar.jsx';


//create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/book',
    element: <ProtectedRoute><Book /></ProtectedRoute>
  },
  {
    path: '/add_book',
    element: <ProtectedRoute><AddBook /></ProtectedRoute>
  },
  {
    path: '/edit_book',
    element: <ProtectedRoute><EditBook /></ProtectedRoute>
  },
  {
    path: '/member',
    element: <ProtectedRoute><Member/></ProtectedRoute>
  },
  {
    path: '/add_member',
    element: <ProtectedRoute><AddMember/></ProtectedRoute>
  },
  {
    path: '/edit_member',
    element: <ProtectedRoute><EditMember/></ProtectedRoute>
  },
  {
    path: '/borrowing',
    element: <ProtectedRoute><Borrowing/></ProtectedRoute>
  },
  {
    path: '/borrow_list',
    element: <ProtectedRoute><BorrowList/></ProtectedRoute>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
);