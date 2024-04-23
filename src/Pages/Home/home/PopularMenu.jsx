import React from 'react';
import SectionTitle from "../../../Components/SectionTitle.jsx";
import MenuItems from "../../Shared/menuItems.jsx";
import useMenu from "../../../Components/hooks/useMenu.jsx";



const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');



    return (
        <div className='my-12'>
            <SectionTitle
                subheading={"From our menu"}
                heading={"popular items"}
            ></SectionTitle>
            <div className=" my-10 max-w-5xl grid md:grid-cols-2 gap-4">
                {
                    popular.map(item =>
                    <MenuItems
                        key={item._id}
                        item={item}
                    ></MenuItems>)
                }
            </div>
            <div className="flex justify-center">
                <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
            </div>

        </div>
    );
};

export default PopularMenu;