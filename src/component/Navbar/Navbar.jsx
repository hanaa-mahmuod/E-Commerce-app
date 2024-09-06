import React from 'react'
import logo from './../../assets/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { cartcontext } from '../../Context/CartContextProvider';
import { useState,useContext } from 'react'
import { x } from '../../Context/Authentcontext.jsx'
import Login from './../Login/Login';
import Product from './../Products/Product';
import AllCategories from './../allCategories/AllCategories';
import Brands from './../Brands/Brands';
export default function Navbar() {
  const navigate=useNavigate();
  const {token,settoken}=useContext(x);
  const {numOfCartItems}=useContext(cartcontext);
  function logout(){

    localStorage.removeItem('tkn');
    settoken(null);
    navigate('./Login');

  }
  return (
  <>
  <div className='fixed top-0 left-0 right-0 z-50 bg-[#F8F9FA] '>
  <div className='flex justify-between  px-20  '>
  <div className='flex gap-4 p-4'>
    <Link to='/'><img src={logo} alt="logo"  className='w-[200px] '/></Link>
  {token?<ul className='flex gap-6 items-center ms-[270px]  text-[#808080] '>
   
    <li><NavLink to='/' >Home</NavLink></li>
  
    <li><NavLink to='/WishList'>Wish List </NavLink></li>
    <li><NavLink to='/AllCategories'>Categories</NavLink></li>
    <li><NavLink to='/Brands'>Brands</NavLink></li>
    <li><NavLink to='/Cart'>Cart</NavLink></li>
  </ul>:''}
  
    </div>
    <div className=' p-4'>
      <ul className='flex gap-4  items-center '>
      <NavLink to='/cart'>  <div className='relative text-center '>
        <i className=" fa-solid fa-cart-shopping text-[28px] cursor-pointer text-[#545454] hover:text-black" >
    
      </i>
      <span class="absolute top-[-10px] left-[20px]  w-[25px] h-[22px] bg-green-600 text-white text-sm  me-2 px-2.5 py-0.5 rounded text-center dark:bg-green-900 dark:text-green-300">{numOfCartItems}</span>
        </div>
    </NavLink>
     
     {token? <li><span className='cursor-pointer  text-[#808080] hover:text-black ' onClick={logout}>Logout</span></li>:<><li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/signin'>Signup</NavLink></li>
       </>}
       
     
     
      </ul>
      
    </div>

  
  </div>
  
  </div>
  
    
  
  </>
  )
}
