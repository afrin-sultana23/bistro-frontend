import React from 'react';
import {Helmet} from "react-helmet-async";
import Cover from "../Shared/Cover.jsx";
import menuImg from "../../assets/menu/banner3.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg"
import soupImg from "../../assets/menu/soup-bg.jpg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import useMenu from "../../Components/hooks/useMenu.jsx";
import SectionTitle from "../../Components/SectionTitle.jsx";
import MenuCategory from "./MenuCategory.jsx";


const Menu = () => {

    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our Menu"></Cover>
            {/* main cover */}
            <SectionTitle
                heading="Today's Offer"
                subheading="Don't miss"
            ></SectionTitle>
            {/* offer menu item */}
            <MenuCategory items={offered}></MenuCategory>
            {/*  dessert menu item  */}
            <MenuCategory
                items={dessert}
                title="Dessert"
                coverImg={dessertImg}></MenuCategory>
            {/*  soup menu item  */}
            <MenuCategory
                items={soup}
                title="Soup"
                coverImg={soupImg}></MenuCategory>
            {/*  salad menu item  */}
            <MenuCategory
                items={salad}
                title="Salad"
                coverImg={saladImg}></MenuCategory>
            {/*  pizza menu item  */}
            <MenuCategory
                items={pizza}
                title="Pizza"
                coverImg={pizzaImg}></MenuCategory>
        </div>
    );
};

export default Menu;