import React, {useEffect, useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Components/hooks/useAxiosSecure.jsx";
import useAuth from "../../Components/hooks/useAuth.jsx";

const Checkout = ({cart,price}) => {

    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('');
    const [processing , setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if( price > 0 ) {
            console.log(price)
            axiosSecure.post('/create-payment-intent', {price})
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){
            return ;
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return ;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
             type: "card",
            card
        })

        if(error){
            console.log(error)
            setCardError(error.message)
        }else{
            setCardError('')
            console.log('payment method' ,paymentMethod)
        }

        setProcessing(true)

        const {paymentIntent , error: confirmError } = await stripe.createPaymentMethod(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.name || 'Anonymous'
                    }
                }
            }
        )
        if (error){
            console.log(confirmError);
        }
        console.log('payment intent',paymentIntent);

        setProcessing(false)
        if(paymentIntent.status === 'succeeded'){
             setTransactionId(paymentIntent.id)
             // save payment information to the server
             const payment = {
                 email: user?.email,
                 transactionId: paymentIntent.id,
                 price,
                 date: new Date(),
                 quantity: cart.length,
                 cartItems: cart.map(item => item._id),
                 menuItems: cart.map(item => item.menuItemId),
                 orderStatus: 'service pending',
                 itemName: cart.map(item => item.name)
             }
             axiosSecure.post('/payments', payment)
                 .then(res => {
                     console.log(res.data);
                     if(res.data.result.insertedId){
                         // display confirm swal
                     }
                 })
        }

    }

    return (
        <>
            <form className="mx-20 pt-10" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-warning btn-sm mt-5"
                        type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            { cardError && <p className="text-[#ff3C00] text-lg ml-20 py-5">{cardError}</p> }
            { transactionId && <p className="text-green-600" >Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default Checkout;