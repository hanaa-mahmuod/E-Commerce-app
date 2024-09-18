import React from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyCode from './../verifyCode/VerifyCode';
export default function ForgetPassword() {
    const navigate=useNavigate();
    
           const forgetpassForm=useFormik({
            initialValues: {
                
                email: ''
              },
            onSubmit:function(values){
              axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
              .then(function(X){
                navigate('/VerifyCode');
                console.log('true',X)   ;     
              })
              .catch(function(X){
                console.log('false',X)
                
              })
              
            },
      
        validationSchema:Yup.object({
        
        email:Yup.string().required('required').matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,'must contain capital letter'),
        
        })
    })
  return (
    <div className='p-[150px]'>
        <h1 className='text-[32px] ' >please enter your email to send verification code</h1>
        <form className="" onSubmit={forgetpassForm.handleSubmit}>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email:</label>
    <input type="email" id="email" value={forgetpassForm.values.email} onChange={forgetpassForm.handleChange}  onBlur={forgetpassForm.handleBlur} name="email"   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  {forgetpassForm.errors.email &&forgetpassForm.touched.email?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium"> {forgetpassForm.errors.email}</span> 
</div>:null}


  <button type="submit" className="text-white bg-[#22db14] hover:bg-[#1FC712] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">verify</button>

</form>
    </div>
  )
}
