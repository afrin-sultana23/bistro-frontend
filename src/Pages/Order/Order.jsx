import React, {useState} from 'react';
import Cover from "../Shared/Cover.jsx";
import coverImg from "../../assets/shop/banner2.jpg"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../Components/hooks/useMenu.jsx";
import OrderTab from "./OrderTab.jsx";
import {Helmet} from "react-helmet-async";
import {useParams} from "react-router-dom";



const Order = () => {

    const categories = ["salad", "pizza", "drinks", "soup", "dessert"]
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);


    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const drinks = menu.filter(item => item.category === 'drinks');


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Order</title>
            </Helmet>
            <Cover img={coverImg} title="Order Now"></Cover>
            <div className="mx-auto max-w-5xl my-6">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Drinks</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Dessert</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salad}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizza}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={dessert}></OrderTab>
                    </TabPanel>
                </Tabs>
            </div>

        </div>
    );
};

export default Order;