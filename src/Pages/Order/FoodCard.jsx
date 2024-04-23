import React, {useContext} from 'react';
import {AuthContext} from "../../AuthProvider/AuthProvider.jsx";
import Swal from "sweetalert2";
import {useLocation, useNavigate} from "react-router-dom";
import useCart from "../../Components/hooks/useCart.jsx";


const FoodCard = ({item}) => {

    const {name, image, price, recipe, _id} =item;
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [, refetch] = useCart();

    const handleAddCart = item =>{
        console.log(item)
        if(user && user.email){
            const cartItem = {
                menuId: _id,
                email: user.email,
                name ,
                image,
                price,
                recipe }
            fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                        const show = refetch();// refetch cart to update the items in the cart
                        console.log("refetch data show " + show)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Food inserted in the cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else{
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33671',
                confirmButtonText: 'Login Now',
            }).then((result) => {
                if (result.isConfirmed){
                    navigate('/', {state: {from : location}});
                }
            })
        }
    }

    return (
        <div>
            <div className="card max-w-86 bg-base-100 shadow-xl">
                <figure><img src={image} alt=""/>
                </figure>
                <p className="absolute right-0 mt-3 mr-4 p-1 bg-slate-900 text-white">${price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleAddCart(item)} className="btn btn-outline border-amber-500
                        shadow-2xl border-0 border-b-4 mt-4">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;