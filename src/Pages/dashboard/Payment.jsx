import React from 'react';
import SectionTitle from "../../Components/SectionTitle.jsx";
import Checkout from "./Checkout.jsx";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import useCart from "../../Components/hooks/useCart.jsx";


const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Payment = () => {

    const [cart] = useCart()
    const total = cart.reduce( (sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))
    console.log(stripePromise)
    return (
        <div className="w-full">
            <SectionTitle heading="Payment"></SectionTitle>

            <Elements stripe={stripePromise}>
                <Checkout cart={cart} price={price}/>
            </Elements>
        </div>
    );
};

export default Payment;