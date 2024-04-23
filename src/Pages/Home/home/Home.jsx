import React from 'react';
import Banner from "./Banner.jsx";
import Category from "./Category.jsx";
import PopularMenu from "./PopularMenu.jsx";
import Featured from "../Featured/Featured.jsx";
import Testimonial from "../testimonials/Testimonial.jsx";
import {Helmet} from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
                <Banner></Banner>
            <div className="container mx-auto ">
                <Category></Category>
                <PopularMenu></PopularMenu>
                <Featured></Featured>
                <Testimonial></Testimonial>
            </div>

        </div>
    );
};

export default Home;