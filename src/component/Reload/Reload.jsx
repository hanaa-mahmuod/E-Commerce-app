import React from 'react'
import { ColorRing } from 'react-loader-spinner';
export default function Reload() {

   return( <div className='h-screen   flex justify-center items-center bg-[#7c7c7d]'>
 <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
  />
  </div>);
  
}
