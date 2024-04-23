import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../Components/hooks/useAuth.jsx";
import useAdmin from "../../Components/hooks/useAdmin.jsx";

const AdminRoute = ({children}) => {

    const {user, loading} = useAuth();
    const [ isAdmin, isAdminLoading ] = useAdmin();
    const location = useLocation()

    if(loading || isAdminLoading) {
        return <progress className="progress w-80 absolute top-1/2 left-1/3"></progress>
    }

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/" state={{from: location}} replace ></Navigate>
};

export default AdminRoute;