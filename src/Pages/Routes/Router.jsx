import {createBrowserRouter} from "react-router-dom";
import Main from "../../Layout/Main.jsx";
import Home from "../Home/home/Home.jsx";
import Menu from "../Menu/Menu.jsx";
import Order from "../Order/Order.jsx";
import Login from "../User/Login.jsx";
import Register from "../User/Register.jsx";
import Dashboard from "../../Layout/Dashboard.jsx";
import MyCart from "../dashboard/MyCart.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AllUser from "../dashboard/AllUser.jsx";
import AddItem from "../dashboard/AddItem.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ManageItems from "../dashboard/ManageItems.jsx";
import Payment from "../dashboard/Payment.jsx";
import UserHome from "../dashboard/UserHome.jsx";
import AdminHome from "../dashboard/AdminHome.jsx";


const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: 'menu',
                element: <Menu></Menu>
            },
            {
                path: 'order/:category',
                element: <Order></Order>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }

        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute> ,
        children: [
            {
                path: 'userhome',
                element: <UserHome></UserHome>
            },
            {
                path: 'mycart',
                element: <MyCart></MyCart>
            },
            {
               path: 'payment',
               element: <Payment></Payment>
            },
            {
                path: 'adminhome',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: 'alluser',
                element: <AdminRoute><AllUser /></AdminRoute>
            },
            {
                path: 'addItem',
                element: <AdminRoute><AddItem /></AdminRoute>
            },
            {
                path: 'manageItem',
                element: <AdminRoute><ManageItems /></AdminRoute>
            }

        ]
    }

])


export default Router;