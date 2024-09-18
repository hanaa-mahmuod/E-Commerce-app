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
import { ColorRing } from 'react-loader-spinner';
export default function Product() {
  // const [allproducts, setallproducts] = useState(null)
  const{cart,loading}=useContext(cartcontext);
  const {addtowishlist,removeFromWishlist}=useContext(wishcontext);
  const [iswish, setiswish] = useState(false);
  function handleaddwish(productId){
   
    if(iswish){
      setiswish(false);
      removeFromWishlist(productId)
    }
    else
    {setiswish(true);
      addtowishlist(productId);
    }
    console.log(iswish);

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
            
      return( <div className='h-screen  w-screen  flex justify-center items-center bg-[#7c7c7d]'>
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
  return (
   <>
   <div className=' px-10 pt-5 flex justify-center items-center mb-[30px]'>
    <div className='w-[80%]'>
    <SimpleSlider></SimpleSlider>
    </div>
   
    <div className='w-[20%] mt-12'>
      <div><img src={imgblog1} alt="" className='w-full h-40' /></div>
      <div> <img src={imgblog2} alt="" className='w-full h-40' /></div>
    </div>
    </div>
  <Categories/>
    <div className='px-[100px] mt-[50px]'>
      <div className='grid md:grid-cols-2  lg:grid-cols-4 gap-y-4 gap-x-4'>
    {data.data.data.map((product) => 
     <div key={product._id} className='product   relative overflow-hidden group py-10 px-3 rounded-lg  hover:shadow-green-500 shadow-lg   '>
       <button onClick={()=>{addproduct(product._id)}}  className=' mb-5 hover:bg-[#479647]  text-white cursor-pointer rounded-xl bg-green-400  absolute bottom-0 e translate-y-[200%] w-[200px] h-[40px]  group-hover:translate-y-0 transition-[500ms]'>
       <i class="fa-solid fa-cart-shopping me-2"></i>add to cart
        </button>
      <Link to={'/SpeceficProduct/'+product._id}> 
      
       
      <img src={product.imageCover} alt="" className='w-[300px]' />
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
    
      </Link> <i onClick={() => {handleaddwish(product._id)}}   className={iswish? "mb-5 fa-solid fa-heart absolute cursor-pointer right-10 bottom-0 text-[30px] mt-[10px] text-red-500 " :"mb-5 fa-solid fa-heart absolute cursor-pointer right-10 bottom-0 text-[30px] mt-[10px]  "}></i></div> )} 
      </div></div>
  
 
  
    
 
   </>
  )
}
