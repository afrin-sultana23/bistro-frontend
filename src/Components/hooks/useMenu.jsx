import {useQuery} from "@tanstack/react-query";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    //
    // useEffect(() => {
    //     fetch('http://localhost:3000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data)
    //             setLoading(false)
    //         })
    //     }, []);
    //  in different way --->
    const { refetch, data: menu =[], isLoading: loading} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/menu')
            return res.json();
        }
    })
    return [menu, loading, refetch]
};

export default useMenu;