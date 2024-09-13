import React from 'react'
import { Circles } from 'react-loader-spinner'
export default function Reload() {
  return (
   <>
   <div className='w-screen h-screan bg-gray-500 flex justify-center '>
   <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
   </div>
   </>
  )
}
