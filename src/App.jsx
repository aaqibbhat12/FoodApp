import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./Store/index.jsx";
import socket from "../src/Socket/Socket.jsx";
import { addNewOrder } from "../src/Store/Slices/OrderSlice.jsx";
import Signup from "./Pages/Auth/Signup";
import Otpgenerate from "./Pages/Auth/Otp/Otpgenerate";
import Startpage from "./Pages/StartPage/Startpage";
import RegistrationForm1 from "./Pages/RegistrationForms/RegistrationForm1/RegistrationForm1.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Orders from "./Pages/Orders/Orders.jsx";
import Addcategory from "./Pages/AddCategory/Addcategory.jsx";
import Addcategoryitems from "./Pages/AddCategoryItems/Addcategoryitems.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import Reports from "./Pages/Reports/Reports.jsx";
import Discount from "./Pages/Discount/Discount.jsx";
import SocketOrdersModal from "./Components/Modals/SocketOrdersModal/SocketOrdersModal.jsx";



const AuthenticatedLayout = () => {
  const location = useLocation();
  const isRegistrationForm1 = location.pathname === "/registrationform1";
  const dispatch = useDispatch();
  useEffect(() => {
    const handleConnect = () => {
      console.log("Socket connected successfully");
      socket.emit("restaurantConnect"); // Emit the event
    };
  
    const handleDisconnect = () => {
      console.log("Socket disconnected");
    };
    socket.on("newOrder",(orderData)=>{
      console.log(orderData)
      dispatch(addNewOrder(orderData));
    })

  
    // Register event listeners
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
  
    // Cleanup listeners on unmount
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [dispatch]);
  

  return (
    <>
      {!isRegistrationForm1 && <Navbar />}
      {!isRegistrationForm1 && <Sidebar />}
      <SocketOrdersModal />
      <Outlet />
    </>
  );
};

// Layout for authentication pages without Navbar and Sidebar
const AuthLayout = () => <Outlet />;

const routes = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/otpgenerate", element: <Otpgenerate /> },
      { path: "/startpage", element: <Startpage /> },
    ],
  },
  {
    element: <AuthenticatedLayout />,
    children: [
      { path: "/registrationform1", element: <RegistrationForm1 /> },
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
      { path: "/discount", element: <Discount /> },
      { path: "/addcategory", element: <Addcategory /> },
      { path: "/addcategoryitems/:id", element: <Addcategoryitems /> },
      { path: "/settings", element: <Settings /> },
      { path: "/reports", element: <Reports /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
