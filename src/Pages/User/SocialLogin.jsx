import React, {useContext} from 'react';
import {FaGoogle} from "react-icons/fa";
import {AuthContext} from "../../AuthProvider/AuthProvider.jsx";
import {useLocation, useNavigate} from "react-router-dom";

const SocialLogin = () => {

    const {googleSignIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/';

    const handleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            const loggedUser = result.user
            console.log(loggedUser);
            const savedUser = {
                name: loggedUser.displayName,
                email: loggedUser.email}
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(savedUser)
            })
                .then(res => res.json())
                .then(() => {
                    navigate(from, { replace: true });

                })

        })
    }

    return (
        <div>
            <div className="divider">Or</div>
            <div className="w-full text-center py-2">
                <button onClick={handleGoogleLogin} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;