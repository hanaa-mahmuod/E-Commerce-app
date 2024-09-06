import React from 'react'
import axios from "axios";
import {FallingLines} from 'react-loader-spinner'
import { useQuery } from "@tanstack/react-query";


export default function Brands() {
    async function getallbrands(){
        return (axios.get('https://ecommerce.routemisr.com/api/v1/brands'));
      }
      const {data,isLoading}=useQuery({
        queryKey:['allcategories'],
        queryFn:getallbrands
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
    { data.data.data.map((brand)=><div key={brand._id} >
        <img  src={brand.image} className="w-full h-[300px]" />
        <h2>{brand.name}</h2>
       </div>)}
    </div>
  </div>
  )
}

