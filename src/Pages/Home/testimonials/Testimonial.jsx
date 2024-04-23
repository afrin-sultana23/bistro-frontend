import React, {useEffect, useState} from 'react';
import SectionTitle from "../../../Components/SectionTitle.jsx";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
import {Rating} from "@smastrom/react-rating";

import '@smastrom/react-rating/style.css'

const Testimonial = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    return (
        <div className="my-8">
            <SectionTitle
                subheading="What Our Client Say"
                heading={'Testimonials'}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                   reviews.map(review => <SwiperSlide
                        key={review._id}
                   >
                       <div className="flex flex-col items-center space-y-4 m-24">
                           <Rating
                               style={{maxWidth: 180}}
                               value={review.rating}
                               readOnly
                           />
                           <p>{review.details}</p>
                           <p className="text-2xl text-orange-400">{review.name}</p>
                       </div>
                   </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;