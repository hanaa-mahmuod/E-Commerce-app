import React from 'react'
import axios from "axios";
import {FallingLines} from 'react-loader-spinner'
import { useQuery } from "@tanstack/react-query";


export default function AllCategories() {
    async function getallcategories(){
        return (axios.get('https://ecommerce.routemisr.com/api/v1/categories'));
      }
      const {data,isLoading}=useQuery({
        queryKey:['allcategories'],
        queryFn:getallcategories
      })
      if(isLoading){
        return(<FallingLines
          color="var(--main-color)"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
          />)
      }
  return (
  <div className='p-10'> 
    <div className=' grid md:grid-cols-3  lg:grid-cols-6 gap-5 '>
    { data.data.data.map((category)=><div key={category._id} >
        <img  src={category.image} className="w-full h-[300px]" />
        <h2>{category.name}</h2>
       </div>)}
    </div>
  </div>
  )
}
