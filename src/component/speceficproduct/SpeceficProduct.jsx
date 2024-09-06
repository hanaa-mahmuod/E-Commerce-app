import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import {FallingLines} from 'react-loader-spinner'
import { cartcontext } from '../../Context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast'

export default function SpeceficProduct() {
  const{cart}=useContext(cartcontext)
   const {id}=useParams();
  async function addproduct(id){
   const res= await cart(id)
   if(res){
    toast.success('Product Added Successfuly',{
      position:'top-right',
      duration:3000,
    });
    
   }
   else{
    toast.error('Failed in Adding Product',{
      position:'top-right',
      duration:3000,
      
    });
   }
   }
    console.log('id',id);
  function getSpecificProduct(){
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  } 
  const {data,isError,isLoading}=useQuery({
    queryKey: ['Productdetail', id],
    queryFn:getSpecificProduct,

  })
  
if(isLoading){
 return( <div className='h-screen flex justify-center items-center'>
  <FallingLines
 color="var(--main-color)"
 width="100"
 visible={true}
 ariaLabel="falling-circles-loading"
 />
  </div>);
}
if(isError){
  return (<h1>not found</h1>
  )
}

  const realdata=data?.data?.data;
  console.log('data',data)
  return (
  <>
  
  <div className='flex justify-center items-center px-[200px] py-[100px]'  >
    <div className='w-1/4'>
    <img src={realdata.imageCover} alt={realdata.title}  className='pe-5'/>
    </div>
    <div className='w-3/4'>
    <h1>{realdata.title}</h1>
    <p>{realdata.description}</p>
    <h1>{realdata.category.name}</h1>
    <div className='flex justify-between pt-3	'>
       <div> 
        <p>
        <span className={realdata.priceAfterDiscount?'line-through text-red-500':''}>{realdata.price} EGP </span>
        <span className='ps-2'>{realdata.priceAfterDiscount}</span>
        </p> </div>
        <div className=''> <i className="fa-solid fa-star rating-color"></i>{realdata.ratingsAverage}  </div>
      </div>
    <button onClick={()=>{addproduct(id)}} className='w-full rounded bg-emerald-400'>+add to cart</button>
  </div>
  </div>
 
  </>
  )
}
