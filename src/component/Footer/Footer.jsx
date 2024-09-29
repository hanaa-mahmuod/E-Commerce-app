import React from 'react'
import paypal from '../../assets/PayPal_logo.svg.png'
import mastercard from '../../assets/Mastercard-Logo-2016-2020.png'
import amazonpayment from '../../assets/amazon-payments4.jpg'
import goegleapp from '../../assets/67006-app-play-google-android-store-free-clipart-hd.png'
import apple from '../../assets/app-store-logo.png'
export default function Footer() {
  return (
    <div className='bg-gray-200 mt-[50px] '>

      <div className="content p-10">
<h1 className='text-[30px]'>Get the FreshCart app</h1>
<h1 className='text-gray-500 text-[20px] py-2'>we will send you a link,open it in your phone to download the app.</h1>
  
<div className='flex'>
<input type="text " className='rounded-lg p-2 w-3/4 border border-gray-300' placeholder='Email..' />
<button className='bg-green-600 hover:bg-green-700 text-white rounded-lg ms-10 w-1/4'>Share App Link</button>
</div>
<hr className='bg-black' />
<div className='flex justify-between border border-gray-300 mt-5 items-center '>
  <div>
   <div className='flex mt-5 '>
   <h1 className='me-2'>Payment Parteners</h1>
    <div className='flex'><img src={amazonpayment} alt="" className='w-[50px] me-2' />
    <img src={paypal} alt="" className='w-[50px]' />
    <img src={mastercard} alt="" className='w-[50px]' /></div>
   </div>
  </div>
<div className='flex'>
  <h1 className='me-2'>Get Delievers With FreshCart</h1>
<img src={goegleapp} alt="" className='w-[70px] me-2' />
<img src={apple} alt="" className='w-[70px]' />
</div>
  
</div>
<hr />
      </div>

    </div>
  )
}
