import React from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { x } from '../../Context/Authentcontext.jsx';
import { cartcontext } from '../../Context/CartContextProvider.jsx';
export default function ResetPassword() {
    const {settoken}=useContext(x);
    const{getcartforlogeduser}=useContext(cartcontext);
    const navigate=useNavigate();
  
    
     const ResetPassForm=useFormik({
      initialValues:{
        email:'',
        newPassword:'',
 
    },
      onSubmit:function(values){
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',values)
        .then(function(X){
            getcartforlogeduser();  
          console.log('true',X)
          settoken(X.data.token);
       
          localStorage.setItem('tkn',X.data.token);
         navigate('/');
           
        })
        .catch(function(X){
          console.log('false',X.response.data.message)
         
        })
        
      },

  
  
  validationSchema:Yup.object({
  newPassword:Yup.string().required('required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'must contain capital letter'),
  email:Yup.string().required('required').matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,'must contain capital letter'),
  
  })
  
  
  
     })
    return (
      <div className='p-[150px]'>
  <h1 className='text-[32px]'>reset your account newPassword</h1>
   <form className="" onSubmit={ResetPassForm.handleSubmit}>
    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email:</label>
      <input type="email" id="email" value={ResetPassForm.values.email} onChange={ResetPassForm.handleChange}  onBlur={ResetPassForm.handleBlur} name="email"   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
    </div>
    {ResetPassForm.errors.email &&ResetPassForm.touched.email?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    <span class="font-medium"> {ResetPassForm.errors.email}</span> 
  </div>:null}
    <div className="mb-5">
      <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your newPassword</label>
      <input type="password" id="newPassword"  value={ResetPassForm.values.newPassword} onChange={ResetPassForm.handleChange}onBlur={ResetPassForm.handleBlur} name="newPassword" className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
     
    </div>
    {ResetPassForm.errors.newPassword && ResetPassForm.touched.newPassword?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
    <span class="font-medium">{ResetPassForm.errors.newPassword}!</span> 
  </div>:null}
  
    <button type="submit" className="text-white bg-[#22db14] hover:bg-[#1FC712] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">reset password</button>
  
  </form>
      </div>
    )
}
