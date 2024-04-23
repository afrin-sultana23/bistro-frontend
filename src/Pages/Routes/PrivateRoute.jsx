import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../Components/hooks/useAuth.jsx";

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation()

    if(loading) {
        return <progress className="progress w-80 absolute left-1/3 top-1/2"></progress>
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={{from: location}} replace ></Navigate>
};

export default PrivateRoute;