import React, { useContext } from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner';
import Product from '../Products/Product.jsx';
import { x } from '../../Context/Authentcontext.jsx';
import { cartcontext } from '../../Context/CartContextProvider.jsx';
import { NavLink } from 'react-router-dom';
export default function Login() {
  const [loading, setLoading] = useState(false);
  const {settoken}=useContext(x);
  const{getcartforlogeduser}=useContext(cartcontext);
  const [iserror, seterror] = useState(null);
  const[isAccept,setAaccept]=useState(false);
  const navigate=useNavigate();
  
  let user={
password:'',
email:'',
  }
   const registerForm=useFormik({
    initialValues:user,
    onSubmit:function(values){
      setLoading(true);
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
      .then(function(X){
        getcartforlogeduser();  
        console.log('true',X)
        settoken(X.data.token);
     
        localStorage.setItem('tkn',X.data.token);
        setAaccept(true);
        
        navigate('/allorders')
         
         
      })
      .catch(function(X){
        console.log('false',X.response.data.message)
        seterror(X.response.data.message);
        // setInterval(() => {
        //   seterror(null);
        // }, 2000);
      }).finally(() => {
        setLoading(false); // Set loading to false when the request is done
      });
      
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
password:Yup.string().required('required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,'must contain capital letter'),
email:Yup.string().required('required').matches(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,'must contain capital letter'),

})



   })
 
  return (
    <>
    {loading?<div className='h-screen   flex justify-center items-center bg-[#7c7c7d]'>
 <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
  </div>:''}
    <div className='p-[150px]'>

{iserror?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">{iserror}</span>
</div>:''}
{isAccept?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">Welcome Back!</span>
</div>:''}

  <h1 className='text-[32px]  '> login now </h1>
    <form className="" onSubmit={registerForm.handleSubmit}>
     
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email:</label>
    <input type="email" id="email" value={registerForm.values.email} onChange={registerForm.handleChange}  onBlur={registerForm.handleBlur} name="email"   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  {registerForm.errors.email &&registerForm.touched.email?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium"> {registerForm.errors.email}</span> 
</div>:null}
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password"  value={registerForm.values.password} onChange={registerForm.handleChange}onBlur={registerForm.handleBlur} name="password" className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    <NavLink to='/forgetPassword'><div  className=' text-lg hover:text-[#1FC712]'>Forget Password?</div></NavLink>
  </div>
  {registerForm.errors.password && registerForm.touched.password?<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span class="font-medium">{registerForm.errors.password}!</span> 
</div>:null}

  <button type="submit" className="text-white bg-[#22db14] hover:bg-[#1FC712] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

</form>
    </div>
    </>
  )
}
