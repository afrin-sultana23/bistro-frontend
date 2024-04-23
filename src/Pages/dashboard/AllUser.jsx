import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Helmet} from "react-helmet-async";
import {FaTrashAlt, FaUserShield} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Components/hooks/useAxiosSecure.jsx";

const AllUser = () => {

    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn:  async() => {

            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        fetch(`http://localhost:3000/users/admin/${user._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} in an Admin now!!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDelete = user => {

    }

    return (
        <div className="w-full px-14">
            <Helmet>
                <title>Bistro boss | All User</title>
            </Helmet>
            <div className="py-3">
                <h1 className="font-bold">TOTAL USER : {users.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr className="text-white bg-fuchsia-500">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, index) => <tr
                            key={user._id}
                           >
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                    user.role === 'admin' ? <h1 className="text-slate-900 btn btn-sm">
                                            Admin
                                        </h1> : <button
                                        onClick={() => handleMakeAdmin(user)} className="bg-[#ff7600] text-white
                                    btn btn-ghost btn-sm"><FaUserShield /></button>

                                }
                            </td>
                            <td>
                                <button onClick={() => handleDelete(user)} className="bg-[#ff3C00] text-white
                                    btn btn-ghost btn-sm"><FaTrashAlt/></button>
                            </td>
                        </tr>)
                    }


                    </tbody>
                </table>
            </div>
        </div>
    )


};

export default AllUser;