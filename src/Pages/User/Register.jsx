import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {AuthContext} from "../../AuthProvider/AuthProvider.jsx";
import {Helmet} from "react-helmet-async";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";



const Register = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

   const {createUser, updateUserProfile} = useContext(AuthContext);
    const navigate = useNavigate()

    const onSubmit = data => {
        console.log("user data " + data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {

                        const savedUser = {name: data.name, email: data.email}
                        console.log(savedUser)
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if(data.insertedId) {
                                    reset();
                                    console.log(data.insertedId)
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    }

   //console.log(watch()) // watch input value by passing the name of it

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="max-w-4xl hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SIGN UP!!!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", {required: true})} placeholder="name"
                                       className="input input-bordered"
                                       required/>
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", {required: true})} placeholder="email"
                                       className="input input-bordered"
                                       required/>
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL")} placeholder="Photo Url"
                                       className="input input-bordered"
                                       required/>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 18,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password"
                                       className="input input-bordered"
                                       required/>
                                {errors.password?.type === "required" &&
                                    <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' &&
                                    <span className="text-red-600">Password must be 6 characters</span>}
                                {errors.password?.type === "maxLength" &&
                                    <span className="text-red-600">Password must be less than 18 characters</span>}
                                {errors.password?.type === "pattern" &&
                                    <span className="text-red-600">Password must have one uppercase, one lowercase and one special character </span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;