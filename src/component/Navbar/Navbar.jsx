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
import styles from './Navbar.module.css'
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
    <Link to='/'><img src={logo} alt="logo"  className='w-[200px]  '/></Link>
  {token?<ul className='flex gap-6 items-center ms-[270px]  text-[#808080] '>
   
    <li><NavLink to='/allorders'  className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'} >Home</NavLink></li>
  
    <li className='text-inherit '><NavLink to='/WishList'  className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'} >Wish List </NavLink></li>
    <li><NavLink to='/AllCategories'  className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'}>Categories</NavLink></li>
    <li><NavLink to='/Brands' className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'}>Brands</NavLink></li>
    <li><NavLink to='/Cart'  className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'}>Cart</NavLink></li>
  </ul>:''}
  
    </div>
    <div className=' p-4'>
      <ul className='flex gap-4  items-center '>
    
     
     {token?<><li>  <NavLink to='/cart'  className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'}>  <div className='relative text-center '>
        <i className=" fa-solid fa-cart-shopping text-[28px] cursor-pointer text-[#545454] hover:text-black" >
    
      </i>
      <span class="absolute top-[-10px] left-[20px]  w-[25px] h-[22px] bg-green-600 text-white text-sm  me-2 px-2.5 py-0.5 rounded text-center dark:bg-green-900 dark:text-green-300">{numOfCartItems}</span>
        </div>
    </NavLink></li>
    <li><span className='cursor-pointer  text-[#808080] hover:text-black ' onClick={logout}>Logout</span></li>
    </> :<><li><NavLink to='/login'  className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'}>Login</NavLink></li>
        <li><NavLink to='/signin'  className={({ isActive }) => isActive ? `${styles.active} text-black` : 'text-[#808080]'}>Signup</NavLink></li>
       </>}
       
     
     
      </ul>
      
    </div>

  
  </div>
  
  </div>
  
    
  
  </>
  )
}
