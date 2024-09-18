import React, { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {FallingLines} from 'react-loader-spinner'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ColorRing } from 'react-loader-spinner'
import { cartcontext } from './../../Context/CartContextProvider';
import { wishcontext } from '../../Context/WishcontextProvider'
export default function WishList() {
  const {addtowishlist,removeFromWishlist,wishListCount}=useContext(wishcontext);
    const{cart}=useContext(cartcontext);
    function handleRemovewish(productId){
   
      
        removeFromWishlist(productId)
   
  
    }
    async function addproduct(id){
        const res= await cart(id)
        if(res){
          removeFromWishlist(id);
          getwishlist();
         toast.success('Product Added Successfuly',{
           position:'top-right',
           style: {top:100},
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
    function getwishlist(){
      return ( axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {headers:{'token':localStorage.getItem('tkn')}}
        ))
            
            
    }
    const {data,isError,isLoading}=useQuery(
        {
          queryKey: ['allwishlist'],
          queryFn:getwishlist
        }
        )
        
        console.log(data);
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
             </div>);}
        if(isError){
          console.log(data.message);
           
                  }
  return (
  <>


<div className=" relative overflow-x-auto shadow-md sm:rounded-lg mt-[150px] m-[100px] bg-[#F8F9FA]">
    <div><h1 className='text-[25px] font-bold'>My Wish List</h1></div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 " >
   
    <tbody>
        {data.data.data.map((product)=> <tr className=" border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4" key={product._id}>
          <img src={product.imageCover} className="w-[200px] max-w-full max-h-full"  />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          <h1 className='text-[20px] mb-3'>{product.title}</h1>
          <h1 className='text-[#4FA74F] mb-3'>{product.price} EGP</h1>
          <button onClick={()=>{handleRemovewish(product._id)} }className='text-red-500'><i class="fa-solid fa-trash"></i>remove</button>
        </td>
        <td className="px-6 py-4">
        <button onClick={()=>{addproduct(product._id)}} className="text-white bg-[#4FA74F] hover:bg-[#479647]    font-medium rounded-lg text-[20px]  me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 p-5" >add to cart</button>
        </td>
      </tr>)}
     
    
     
    </tbody>
  </table>
</div>

</>
  )
}
