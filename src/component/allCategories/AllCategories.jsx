import React from 'react'
import axios from "axios";
import {FallingLines} from 'react-loader-spinner'
import { useQuery } from "@tanstack/react-query";
import { ColorRing } from 'react-loader-spinner';

export default function AllCategories() {
    async function getallcategories(){
        return (axios.get('https://ecommerce.routemisr.com/api/v1/categories'));
      }
      const {data,isLoading}=useQuery({
        queryKey:['allcategories'],
        queryFn:getallcategories
      })
      if(isLoading){
        return( <div className='h-screen   flex justify-center items-center bg-[#7c7c7d]'>
          <ColorRing
           visible={true}
           height="80"
           width="80"
           ariaLabel="color-ring-loading"
           wrapperStyle={{}}
           wrapperClass="color-ring-wrapper"
           colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
           />
           </div>);
      }
  return (
  <div className='p-[150px]'> 
    <div className=' grid md:grid-cols-2  lg:grid-cols-3 gap-5 '>
    { data.data.data.map((category)=><div key={category._id} className=' bg-white border border-gray-200 rounded-lg hover:shadow-green-500 shadow-lg ' >
       
         <a href="#">
    <img className="rounded-t-lg h-[300px] w-full " src={category.image} alt />
  </a>
  <div className="p-5 text-center">
    <a href="#">
      <h5 className="mb-2 text-[28px]  font-bold tracking-tight text-gray-900 dark:text-white text-[#198754]">{category.name}</h5>
    </a>
  
  </div>
       </div>)}
    </div>
    



  </div>
  )
}
