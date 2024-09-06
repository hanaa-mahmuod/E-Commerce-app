import React, { useContext } from 'react'
import Product from './../Products/Product';
import { cartcontext } from '../../Context/CartContextProvider';
import { Link } from 'react-router-dom';
import Payment from './../payment/Payment';
export default function Cart() {
  
 const {products,getcartforlogeduser,totalCartPrice,numOfCartItems,updateCart,RemoveSpecificCartItem}= useContext(cartcontext);
 getcartforlogeduser();
 function handleupdateproduct(Productid,count){
updateCart(Productid,count);
 }
  function handledeleteitemfromcart(productID){
RemoveSpecificCartItem(productID);
  }
 
  return (
   

<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[100px] px-[100px]">
      <div className='text-center'>
        <h1>Total Price{totalCartPrice}</h1>
        <h1>Total items{numOfCartItems}</h1>
              </div>
              <Link to='/Payment'><div><button className='bg-blue-200 w-[200px] rounded-lg'>check out</button></div></Link>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
   
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {products?products.map((Product)=> <tr key={Product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={Product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {Product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>handleupdateproduct(Product.product._id,Product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
             <h1>{Product.count}</h1>
            </div>
            <button onClick={()=>handleupdateproduct(Product.product._id,Product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {Product.price}
        </td>
        <td className="px-6 py-4">
          <a href="#" onClick={()=>handledeleteitemfromcart(Product.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>):''}
     
     
    </tbody>
  </table>
</div>


  )
}
