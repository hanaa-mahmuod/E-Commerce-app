import React from "react";
import Slider from "react-slick";
import img1 from '../../assets/slider-image-1.jpeg'
import img2 from '../../assets/slider-image-2.jpeg'
import img3 from '../../assets/slider-image-3.jpeg'
import img4 from '../../assets/slider-2.jpeg'

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 2,
    
  };
  return (
    <Slider {...settings} arrows={false} className="mt-[100px]"> 
      <div>
       <img  src={img1} className="w-full h-80" />
      </div>
      <div>
      <img src={img2} alt="" className="w-full h-80"  />

      </div>
      <div>
      <img src={img3} alt="" className="w-full h-80" />

      </div>
      <div>
      <img src={img4} alt="" className="w-full h-80" />

      </div>
      
    </Slider>
  );
}