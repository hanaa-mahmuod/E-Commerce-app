import axios from 'axios'
import React, { useEffect,useState,link, useContext } from 'react'
import {FallingLines} from 'react-loader-spinner'
import SimpleSlider from '../simpleslider/SimpleSlider.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgblog1 from '../../assets/blog-img-1.jpeg'
import imgblog2 from '../../assets/blog-img-2.jpeg'
import Categories from '../Categories/Categories.jsx'
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import SpeceficProduct from './../speceficproduct/SpeceficProduct';
import { cartcontext } from '../../Context/CartContextProvider.jsx';
import toast, { Toaster } from 'react-hot-toast'
import {wishcontext} from '../../Context/WishcontextProvider.jsx';
export default function Product() {
  // const [allproducts, setallproducts] = useState(null)
  const{cart}=useContext(cartcontext);
  const {addtowishlist}=useContext(wishcontext);
  function handleaddwish(productId){
    addtowishlist(productId);

  }
  async function addproduct(id){
    const res= await cart(id)
    if(res){
     toast.success('Product Added Successfuly',{
       position:'top-right',
       style: {top:100},
       duration:3000,
     });
     
    }
    else{
     toast.error('Failed in Adding Product',{
       position:'top-right',
       duration:3000,
       
     });
    }
    }
   function getallproducts(){
//    const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products');
// setallproducts(data.data);
// console.log('data',data.data);
return(axios.get('https://ecommerce.routemisr.com/api/v1/products'));
   }

    // useEffect(()=>{getallproducts();
      
    // },[])
    const {data,isError,isLoading}=useQuery(
    {
      queryKey: ['allproducts'],
      queryFn:getallproducts
    }
    )
    if(isLoading){
      return(
        <>
        
        <div className=' px-10 pt-5 flex justify-center items-center'>
    <div className='w-[80%] ' >
    <SimpleSlider></SimpleSlider>
    </div>
   
    <div className='w-[20%]   '>
      <div className='mt-[100px]'>
      <div ><img src={imgblog1} alt="" className=' w-full h-40  ' /></div>
      <div> <img src={imgblog2} alt="" className='w-full h-40 ' /></div>
      </div>
    </div>
    </div>
    <div className='h-screen flex justify-center items-center'>
        <FallingLines
       color="var(--main-color)"
       width="100"
       visible={true}
       ariaLabel="falling-circles-loading"
       />
        </div>
        </>
      )
    }
  return (
   <>
   <div className=' px-10 pt-5 flex justify-center items-center'>
    <div className='w-[80%]'>
    <SimpleSlider></SimpleSlider>
    </div>
   
    <div className='w-[20%]'>
      <div><img src={imgblog1} alt="" className='w-full h-40' /></div>
      <div> <img src={imgblog2} alt="" className='w-full h-40' /></div>
    </div>
    </div>
  <Categories/>
    <div className='p-10'>
      <div className='grid md:grid-cols-2  lg:grid-cols-4 gap-y-4 gap-x-4'>
    {data.data.data.map((product) => 
     <div key={product._id} className='product p-3 relative overflow-hidden group'>
       <div onClick={()=>{addproduct(product._id)}}  className='cursor-pointer rounded-xl bg-green-400 absolute top-0 end-0 translate-x-[200%]  group-hover:translate-x-0 transition-[500ms]'>
        <i class="fa-solid fa-plus p-2 text-white"></i>
        </div>
      <Link to={'/SpeceficProduct/'+product._id}> 
      
       
      <img src={product.imageCover} alt="" className='w-full' />
      <div className='ms-[20px]'>
      <h2 className='text-[#4FA74F] text-[16px] mb-[10px]'>{product.category.name}</h2>
      <h2 className='text-[16px] text-[#545454]'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
      <div className='flex justify-between pt-3	'>
       <div> <p>
        
        <span className={product.priceAfterDiscount?'line-through text-red-500':''}>{product.price}EGP</span>
        <span className='ps-2'>{product.priceAfterDiscount}</span>
        </p> </div>
        <div className=''> <i className="fa-solid fa-star rating-color mb-[30px]"></i>{product.ratingsAverage}</div>
      </div>
      
    
      
      </div>
    
      </Link> <i onClick={() => {addtowishlist(product._id)
        className='text-red-300'
      }}   class="fa-solid fa-heart absolute cursor-pointer right-10 bottom-0 text-[30px] mt-[10px] "></i></div> )} </div></div>
  
 
  
    
 
   </>
  )
}
