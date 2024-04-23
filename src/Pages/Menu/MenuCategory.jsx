import React from 'react';
import MenuItems from "../Shared/menuItems.jsx";
import Cover from "../Shared/Cover.jsx";
import {Link} from "react-router-dom";


const MenuCategory = ({items, title, coverImg}) => {


    return (
        <div className="py-10">
            {title && <Cover img={coverImg} title={title}></Cover>}
            <div className="mx-auto pt-14 max-w-5xl grid md:grid-cols-2 gap-4">
                {
                    items.map(item =>
                        <MenuItems
                            key={item._id}
                            item={item}
                        ></MenuItems>)
                }
            </div>
            <Link to={`/order/${title}`} className="flex justify-center">
                <button className="btn btn-outline border-0 border-b-4 mt-4">Order Your Favourite Item</button>
            </Link>
        </div>
    );
};

export default MenuCategory;