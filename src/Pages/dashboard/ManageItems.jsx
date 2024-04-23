import React from 'react';
import SectionTitle from "../../Components/SectionTitle.jsx";
import useMenu from "../../Components/hooks/useMenu.jsx";
import { FaEdit, FaTrashAlt} from "react-icons/fa";
import useAxiosSecure from "../../Components/hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";

const ManageItems = () => {

    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();

    // const handleUpdate = item => {
    //
    // }

    const handleDelete = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        console.log('deleted res ' ,res.data);
                        //refetch()
                        if(res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                            });

                        }
                    })
            }
        });
    }

    return (
        <div className="w-full">
            <SectionTitle
                subheading="Hurry Up!!"
                heading="Manage All Items">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        menu.map((item, index) => <tr
                                key={item._id}
                                className="hover"
                            >
                                <th>{index+1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.category}</td>
                                <td className="text-right">${item.price}</td>
                            <td>
                                <button  className="bg-[#ff7600] text-white
                                    btn btn-ghost btn-sm"><FaEdit /></button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item)} className="bg-[#ff3C00] text-white
                                    btn btn-ghost btn-sm"><FaTrashAlt/></button>
                                </td>
                            </tr>
                        )
                    }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageItems;