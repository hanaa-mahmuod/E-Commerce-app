import React, { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {FallingLines} from 'react-loader-spinner'
import axios from 'axios'
import toast from 'react-hot-toast'
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
          return(
            <>
<div className='h-screen flex justify-center items-center'>
        <FallingLines
       color="var(--main-color)"
       width="100"
       visible={true}
       ariaLabel="falling-circles-loading"
       />
        </div>
        </>)}
        if(isError){
          console.log(data.message);
           
            return( <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                  <p className="text-base font-semibold text-indigo-600">404</p>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                  <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                  <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a
                      href="#"
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Go back home
                    </a>
                    <a href="#" className="text-sm font-semibold text-gray-900">
                      Contact support <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                 </div>
               </main>)         }
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
