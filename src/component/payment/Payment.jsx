import React, { useContext } from 'react'

import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { cartcontext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
import { useState } from 'react';
export default function Payment() {
    
    const {cartID,setnumOfCartItems,settotalCartPrice}=useContext(cartcontext);
    const [isonline, setisonline] = useState(false);
    function cashoronline(){
      if(isonline){
        onlinepayment();
      }
      else{
        cashorder();
      }
    }
    
    function onlinepayment(values){
      const backbody={
        shippingAddress:values,
      }
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,backbody,
        {headers:{'token':localStorage.getItem('tkn')}
        ,params:{
          url:'http://localhost:5173'}
     } )
      .then((res)=>{
      console.log('res',res);
      // toast.success('congrats');
      const url=res.data.session.url;
      window.open(url,'_self');
      
    
      })
      .catch((error)=>{
        console.log('err',error);
        toast.error('your cart is empty');
        
      })
      
    }

    function cashorder(values,){
      const backbody={
        shippingAddress:values,
      }
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,backbody,
        {headers:{'token':localStorage.getItem('tkn')}})
      .then((res)=>{
      console.log('res',res.data.data.user);
      toast.success('congrats');
    
      })
      .catch((error)=>{
        console.log('err',error);
        toast.error('your cart is empty');
        
      })
      
    }
    const paymentformik=useFormik({
        initialValues:{
          details:'',
          phone:'',
          city:'',
         
            },
        onSubmit:cashoronline
     ,
    
    validationSchema:Yup.object({
        details:Yup.string().required('required').matches(/^[a-z][-a-z0-9_]*\$?$/,'must contain capital letter'),
    phone:Yup.string().required('required').matches(/^01[0125][0-9]{8}$/,'must contain capital letter'),
    // city:Yup.string().required('required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'must contain capital letter'),
    
    })
    
    
    
       })
  return (
    
        <form className="  p-[200px]" onSubmit={paymentformik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" value={paymentformik.values.details} onBlur={paymentformik.handleBlur} onChange={paymentformik.handleChange} name="details" id="details" className="block py-2.5 px-0 w-full text-lg text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="details" className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:dark:text-[#0AAD0A] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details:</label>
          </div>
          {paymentformik.errors.details &&paymentformik.touched.details?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      <span class="font-medium"> {paymentformik.errors.details}!</span>
    </div>:null}
       
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" value={paymentformik.values.city} onBlur={paymentformik.handleBlur} onChange={paymentformik.handleChange} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="city" className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city:</label>
          </div>
          {paymentformik.errors.city &&paymentformik.touched.city?<div className=" p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      <span className="font-medium"> {paymentformik.errors.city}!</span>
    </div>:null}
       
       
          
        
            <div className="relative z-0 w-full mb-5 group">
                <input type="tel"value={paymentformik.values.phone} onChange={paymentformik.handleChange} onBlur={paymentformik.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="phone" className="peer-focus:font-medium absolute text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            </div>
            {paymentformik.errors.phone&&paymentformik.touched.phone?<div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
      <span className="font-medium">{paymentformik.errors.phone}!</span> 
    </div>:null}
          
          <button type="submit" onClick={()=>{setisonline(false)}} className="  pe-5 text-white bg-[var(--main-color)] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  me-5">Cash Order</button>
          <button type="submit"onClick={()=>{setisonline(true)}} className="text-white bg-[var(--main-color)] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay Now</button>
        </form>
        
  )
}
