import axios from "axios";
import React, { useEffect,useState } from "react";
import Slider from "react-slick";
import {FallingLines} from 'react-loader-spinner'
import { useQuery } from "@tanstack/react-query";
import { ColorRing } from "react-loader-spinner";
export default function Categories() {
    // const [allcategories, setallcategories] = useState(null)
   async function getallcategories(){
      // const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      // setallcategories(data.data);
      return (axios.get('https://ecommerce.routemisr.com/api/v1/categories'));
    }
    // useEffect(()=>{
    //     getallcategories();
    // },[])
    const {data,isLoading}=useQuery({
      queryKey:['allcategories'],
      queryFn:getallcategories
    })
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 5,
  };
  if(isLoading){
   
 return('')
  }
  return (
    <Slider {...settings} arrows={false} className="px-10 mt-[30px]">
        
        
        
       { data.data.data.map((category)=><div key={category._id}>
        <img  src={category.image} className="w-full h-30 h-full object-cover object-center " />
        <h2 className="text-[28px] text-black text-bold">{category.name}</h2>
       </div>)}
        
        
     
       
      
     
      
    </Slider>
  );
}