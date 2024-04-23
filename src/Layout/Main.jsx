import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar.jsx";
import Footer from "../Pages/Shared/Footer.jsx";

const Main = () => {

    const location = useLocation();
    console.log(location);
    const onlyLogin = location.pathname.includes('login');

    return (
        <div>
            {onlyLogin || <Navbar></Navbar>}
            <Outlet></Outlet>
            {onlyLogin || <Footer></Footer>}
        </div>
    );
};

export default Main