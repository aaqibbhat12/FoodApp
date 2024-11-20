import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Signup from './Pages/Auth/Signup';
import Otpgenerate from './Pages/Auth/Otp/Otpgenerate';
import Startpage from './Pages/StartPage/Startpage';
import RegistrationForm1 from './Pages/RegistrationForms/RegistrationForm1/RegistrationForm1.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import Home from './Pages/Home/Home.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import Orders from './Pages/Orders/Orders.jsx';
import Addmenu from './Pages/Addmenu/Addmenu.jsx';
import Addcategory from './Pages/AddCategory/Addcategory.jsx';

// Layout for authenticated pages with Navbar and Sidebar
const AuthenticatedLayout = () => (
  <>
    <Navbar />
    <Sidebar />
    <Outlet />
  </>
);

// Layout for authentication pages without Navbar and Sidebar
const AuthLayout = () => (
  <>
    <Outlet />
  </>
);

const routes = createBrowserRouter([
  // Public routes for authentication pages without Navbar and Sidebar
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/otpgenerate",
        element: <Otpgenerate />
      },
      {
        path: "/startpage",
        element: <Startpage />
      },
      {
        path: "/registrationform1",
        element: <RegistrationForm1 />
      }
    ]
  },
  // Authenticated routes with Navbar and Sidebar
  {
    element: <AuthenticatedLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/orders",
        element: <Orders />
      },
      {
        path: "/addmenu",
        element: <Addmenu />
      },
      {
        path: "/addcategory",
        element: <Addcategory />
      },
      // Additional authenticated routes can be added here
    ]
  }
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
