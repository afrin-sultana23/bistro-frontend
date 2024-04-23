import React from 'react';
import SectionTitle from "../../../Components/SectionTitle.jsx";
import featuredimg from "../../../assets/home/featured.jpg";
import './featured.css';

const Featured = () => {
    return (
        <div className="bg-image bg-fixed pt-6">
            <SectionTitle
                subheading="check it out"
                heading="Featured Item"></SectionTitle>
            <div className="max-w-4xl md:flex justify-center items-center text-white py-16 px-16">
                <div>
                    <img src={featuredimg} alt="" />
                </div>
                <div className="md:ml-8 space-y-4 ">
                    <p>AUG 20, 2020</p>
                    <p className="uppercase font-medium">where can i get some?</p>
                    <p>We take pride in sourcing ingredients directly from local farms and markets. Our farm-to-table section features dishes that highlight the best produce of the region. Expect vibrant salads, artisanal cheeses, and succulent grilled vegetables.</p>
                    <button className="btn btn-outline text-white border-0 border-b-4">Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;