import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "./useAxiosSecure.jsx";
import useAuth from "./useAuth.jsx";

const useCart = () => {

    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure()

   // const token = localStorage.getItem('access-token')

    const { refetch, data: cart=[]} = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !loading,

        queryFn: async () => {
            const res = await axiosSecure(`/cart?email=${user?.email}`)
            //console.log('axios', res)
            return res.data
        }
        // queryFn: async () => {
        //     const res = await fetch(`http://localhost:3000/cart?email=${user?.email}`, {
        //         headers: {
        //             authorization: `Bearer ${token}`
        //         }
        //     })
        //     return res.json()
        // },


    })

    return [cart, refetch]
};

export default useCart;