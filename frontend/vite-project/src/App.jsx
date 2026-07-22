import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyMail from './pages/VerifyMail';
import Verify from './pages/Verify';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOtp from './pages/VerifyOtp';
import ResetPassword from './pages/ResetPassword';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  
   {
    path: "/login",
    element: <Login />,
  },

    {
    path: "/verify-email",
    element: <VerifyMail />,
  },

    {
    path: "/verify/",
    element: <Verify  />,
  },
   {
    path: "/signup",
    element: <Signup />,
  },

   {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
   {
    path: "/verify-otp/:email",
    element: <VerifyOtp />,
  },

  {
    path: "/reset-password/:email",
    element: <ResetPassword />,
  },

]);

const App = () => {
  return (
    <div>
      
      <RouterProvider router={router} />
    </div>
  )
}

export default App
