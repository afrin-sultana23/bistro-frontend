import React from 'react';
import {Helmet} from "react-helmet-async";
import useCart from "../../Components/hooks/useCart.jsx";
import {FaTrashAlt} from "react-icons/fa";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

const MyCart = () => {

    const [cart, refetch] = useCart();
    console.log(cart);
    //here cart is an array, each food have price, using reduce function to calculate the payment amount
    const total = cart.reduce((sum, item) => item.price + sum , 0)
    const totalSum = total.toFixed(2)

    const handleDelete = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/cart/${item._id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire (
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                            )
                        }

                    })
            }
        })
    }

    return (
        <div className="w-3/4">
            <Helmet>
                <title>Bistro Boss | Cart</title>
            </Helmet>

            <div className="flex justify-evenly font-semibold h-[60px]">
                <h1>TOTAL ITEM: {cart.length}</h1>
                <h1>TOTAL PRICE: ${totalSum}</h1>
                <Link to="/dashboard/payment" className="btn btn-warning btn-sm">Pay</Link>
            </div>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className="bg-fuchsia-500 text-white">
                        <th>#</th>
                        <th>Food</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr
                                    key={item._id}
                                    className="hover"
                                >
                                <td> {index+1} </td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image}
                                                     alt="Avatar Tailwind CSS Component"/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td className="text-end">${item.price}</td>
                                    <td>
                                    <button onClick={() => handleDelete(item)} className="bg-[#ff2400] text-white
                                    btn btn-ghost btn-sm"><FaTrashAlt /></button>
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

export default MyCart;