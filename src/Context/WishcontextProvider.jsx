import axios from 'axios';
import React, { createContext } from 'react';
import toast from 'react-hot-toast';
import { useState } from 'react';
export const wishcontext = createContext();

export default function WishcontextProvider({ children }) { // use 'children' instead of 'Children'
const [wishListCount, setwishListCount] = useState(0);
  function addtowishlist(productId) {
    axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
        "productId": productId
      }, {
        headers: {
          'token': localStorage.getItem('tkn') // ensure you have the token stored properly
        }
      })
      .then((res) => {
        toast.success('Product Added Successfully To Wishlist');
        console.log(res);
        setwishListCount(res.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function removeFromWishlist(productId) {
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,  {
        headers: {
          'token': localStorage.getItem('tkn') // ensure you have the token stored properly
        }
      })
      .then((res) => {
        // toast.success('Product removed Successfully from Wishlist');
        console.log(res);
        console.log(res.data.data.length);
        setwishListCount(res.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <wishcontext.Provider value={{ addtowishlist,removeFromWishlist,wishListCount }}>
      {children} {/* render children */}
    </wishcontext.Provider>
  );
}
// import axios from 'axios';
// import React, { Children } from 'react'
// import { createContext } from 'react'
// import toast from 'react-hot-toast';
// export const wishcontext=createContext();
// export default function WishcontextProvider ({children}) {

//     function addtowishlist(productId){
// axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
//     {
//         "productId": productId
//     }, {
//         headers: {
//           'token': localStorage.getItem('tkn')
//         }}
// ).then((res)=>{
//     toast.success('Product Added Successfuly To wishList');
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

//     }
//   return (
//     <wishcontext.Provider value={{addtowishlist}} >
//         {children}
//     </wishcontext.Provider>
//   )
// }
