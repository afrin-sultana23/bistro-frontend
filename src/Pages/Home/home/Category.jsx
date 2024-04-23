import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from '../../../assets/home/slide1.jpg';
import img2 from '../../../assets/home/slide2.jpg';
import img3 from '../../../assets/home/slide3.jpg';
import img4 from '../../../assets/home/slide4.jpg';
import img5 from '../../../assets/home/slide5.jpg';

import { Pagination } from 'swiper/modules';
import SectionTitle from "../../../Components/SectionTitle.jsx";
const Category = () => {
    return (
        <div>
            <SectionTitle
            subheading={"From 11.am to 10pm"}
            heading={"Order Online"}></SectionTitle>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper my-12"
            >
                <SwiperSlide>
                    <img src={img1} alt="image"/>
                    <h3 className="text-3xl text-center -mt-16 text-white">SALADS</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="image"/>
                    <h3 className="text-3xl text-center -mt-16 text-white">SOUPS</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="image"/>
                    <h3 className="text-3xl text-center -mt-16 text-white">PIZZAS</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="image"/>
                    <h3 className="text-3xl text-center -mt-16 text-white">DESSERTS</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} alt="image"/>
                    <h3 className="text-3xl text-center -mt-16 text-white">SALADS</h3>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Category;