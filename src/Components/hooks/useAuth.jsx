import {useContext} from "react";
import {AuthContext} from "../../AuthProvider/AuthProvider.jsx";


const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
}

export  default useAuth;