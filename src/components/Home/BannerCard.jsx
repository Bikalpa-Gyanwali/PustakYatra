import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import book1 from '../../assets/Books/book1.jpg';
import book2 from '../../assets/Books/book2.jpg';
import book3 from '../../assets/Books/book3.jpg';
import book4 from '../../assets/Books/book1.jpg';
import book5 from '../../assets/Books/book2.jpg';
import book6 from '../../assets/Books/book3.jpg';

import './BannerCard.css';


const BannerCard = () => {
  return (
    <div>
        <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide><img src={book1}/></SwiperSlide>
        <SwiperSlide><img src={book2}/></SwiperSlide>
        <SwiperSlide><img src={book3}/></SwiperSlide>
        <SwiperSlide><img src={book4}/></SwiperSlide>
        <SwiperSlide><img src={book5}/></SwiperSlide>
        <SwiperSlide><img src={book6}/></SwiperSlide>
      </Swiper>
    </div>
  )
}

export default BannerCard
