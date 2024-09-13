import React from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [iserror, seterror] = useState(null);
  const[isAccept,setAaccept]=useState(false);
  const navigate=useNavigate();
  
  let user={
name:'',
phone:'',
password:'',
rePassword:'',
  }
   const registerForm=useFormik({
    initialValues:user,
    onSubmit:function(values){
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
      .then(function(X){
        console.log('true',X)
        setAaccept(true);
        setInterval(() => {
         navigate('/login')
        }, 2000);
      })
      .catch(function(X){
        console.log('false',X.response.data.message)
        seterror(X.response.data.message);
        setInterval(() => {
          seterror(null);
        }, 2000);
      })
      
    },
//     validate:function(values){
//       const errors={};
// const nameregex=/^[a-z][-a-z0-9_]*\$?$/;
// const phoneregex=/^01[0125][0-9]{8}$/;
// const emailregex=/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
// const passwordregex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
// if(!nameregex.test(values.name))
// {
//   errors.name='name must start with capital letter ';
// }
// if(!phoneregex.test(values.phone))
// {
//   errors.phone='name must start with capital letter ';
// }
// if(!emailregex.test(values.email))
// {
//   errors.email='name must start with capital letter ';
// }
// if(!passwordregex.test(values.password))
// {
//   errors.password='name must start with capital letter ';
// }
// if(values.password!==values.repassword)
// {
//   errors.repassword='name must start with capital letter ';
// }


// console.log(errors);

// return errors;

//     }
validationSchema:Yup.object({
name:Yup.string().required('required').matches(/^[a-z][-a-z0-9_]*\$?$/,'must contain capital letter'),
phone:Yup.string().required('required').matches(/^01[0125][0-9]{8}$/,'must contain capital letter'),
password:Yup.string().required('required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'must contain capital letter'),
email:Yup.string().required('required').matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,'must contain capital letter'),
rePassword:Yup.string().required('required').oneOf([Yup.ref('password')],'repassword does not match with password'),
})



   })
  return (
    <div className='p-[200px]'>

{iserror?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">{iserror}</span>
</div>:''}
{isAccept?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">Congratiolation!</span>
</div>:''}
    <form className="m" onSubmit={registerForm.handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
          <input type="text" value={registerForm.values.name} onBlur={registerForm.handleBlur} onChange={registerForm.handleChange} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="name"  className="peer-focus:font-medium absolute  text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus::text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">name:</label>
      </div>
      {registerForm.errors.name &&registerForm.touched.name?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium"> {registerForm.errors.name}!</span>
</div>:null}
      <div className="relative z-0 w-full mb-5 group">
          <input type="email"value={registerForm.values.email} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="email"  className="peer-focus:font-medium absolute  text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus::text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">email:</label>
      </div>
      {registerForm.errors.email &&registerForm.touched.email?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium"> {registerForm.errors.email}</span> 
</div>:null}
      <div className="relative z-0 w-full mb-5 group">
          <input type="password"  value={registerForm.values.password} onChange={registerForm.handleChange}onBlur={registerForm.handleBlur} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="password" className="peer-focus:font-medium absolute  text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus::text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5" >Password</label>
      </div>
      {registerForm.errors.password && registerForm.touched.password?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">{registerForm.errors.password}!</span> 
</div>:null}
      <div className="relative z-0 w-full mb-5 group">
          <input type="password" value={registerForm.values.rePassword} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="rePassword"  className="peer-focus:font-medium absolute  text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus::text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">rePassword</label>
      </div>
      {registerForm.errors.repassword&&registerForm.touched.repassword?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium"> {registerForm.errors.repassword}!</span> 
</div>:null}
      
    
        <div className="relative z-0 w-full mb-5 group">
            <input type="tel"value={registerForm.values.phone} onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="phone" className="peer-focus:font-medium absolute  text-lg text-black dark:text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus::text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5">Phone</label>
        </div>
        {registerForm.errors.phone&&registerForm.touched.phone?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">{registerForm.errors.phone}!</span> 
</div>:null}
      
      <button type="submit" className="text-white bg-[#22db14] hover:bg-[#1FC712] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
    </div>
  )
}
