import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import {
    FaCalendarAlt,
    FaShoppingCart,
    FaWallet, FaEnvelope,
    FaClipboardList,
    FaFileSignature,
    FaBook, FaUsers, FaList, FaHome,
} from "react-icons/fa";
import {FaShop, FaUtensils} from "react-icons/fa6";
import {GiHamburgerMenu} from "react-icons/gi";
import useCart from "../Components/hooks/useCart.jsx";
import useAdmin from "../Components/hooks/useAdmin.jsx";



const Dashboard = () => {

    const [cart] = useCart();

    // TODO: load data from the server to have dynamic isAdmin based on the data
    // const isAdmin = true;

    const [isAdmin] = useAdmin();

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content py-14 flex flex-col items-center justify-center">
                    {/* Page content here */}

                    <Outlet></Outlet>

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-[#D1A054]">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] ">
                        {/* Sidebar content here */}

                        {
                            isAdmin ? <>
                                <li><NavLink to="/dashboard/adminhome"><FaHome/> Admin Home</NavLink></li>
                                <li><NavLink to="/dashboard/addItem"><FaUtensils/> Add Items</NavLink></li>
                                <li><NavLink to="/dashboard/manageItem"><FaList/> Manage Items</NavLink></li>
                                <li><NavLink to="/dashboard/mycart"><FaBook/> Manage Bookings</NavLink></li>
                                <li><NavLink to="/dashboard/alluser"><FaUsers/> All Users</NavLink></li>

                            </> : <>
                                <li><NavLink to="/dashboard/userhome"><FaHome/> User Home</NavLink></li>
                                <li><NavLink to="/dashboard/reservation"><FaCalendarAlt/> Reservations</NavLink></li>
                                <li><NavLink to="/dashboard/payment"><FaWallet/> Payment History</NavLink></li>
                                <li><NavLink to="/dashboard/mycart"><FaShoppingCart/> My Cart
                                    <span className=" badge badge-secondary">
                                +{cart?.length || 0}</span>
                                </NavLink></li>
                                <li><Link><FaFileSignature/> My Reviews</Link></li>
                                <li><Link><FaClipboardList/> My Bookings</Link></li>
                            </>
                        }


                        <div className="divider"></div>

                        <li><Link to="/"><FaHome/> Home</Link></li>
                        <li><Link to="/menu"><GiHamburgerMenu/> Menu</Link></li>
                        <li><Link to="/order/salad"><FaShop/> Shop</Link></li>
                        <li><Link to="/contact"><FaEnvelope/> Contact</Link></li>

                    </ul>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;