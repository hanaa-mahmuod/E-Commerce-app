import axios from 'axios';
import React, { createContext,useEffect,useState } from 'react'
export const cartcontext=createContext(null);
export default function CartContextProvider({children}) {
const [numOfCartItems, setnumOfCartItems] = useState(0);
const [totalCartPrice, settotalCartPrice] = useState(0);
const [loading, setLoading] = useState(false);
const [cartID, setcartID] = useState(null);
const [products, setproducts] = useState(null);

  function getcartforlogeduser(){
    setLoading(true); // Set loading to true when the request starts

   axios.get('https://ecommerce.routemisr.com/api/v1/cart',
       {
            headers: {
              'token': localStorage.getItem('tkn')
            }
          }
      
).then((response)=>{
    setnumOfCartItems(response.data.numOfCartItems);
    setproducts(response.data.data.products);
    settotalCartPrice(response.data.data.totalCartPrice);
    console.log('products',products);
    console.log(response)
    

})
.catch((error)=>{
  
  console.log('err',error);
}).finally(() => {
  setLoading(false); // Set loading to false when the request is done
});
   }
   function clearcart(){
    setnumOfCartItems(response.data.numOfCartItems);
    setproducts(response.data.data.products);
    settotalCartPrice(response.data.data.totalCartPrice);
   }
   function clearUserCart(){
    setLoading(true);
    axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      headers: {
        'token': localStorage.getItem('tkn')
      }
    }).then((res)=>{clearcart()})
    .catch((err)=>{console.log(err)}).finally(() => {
      setLoading(false); // Set loading to false when the request is done
    });
   }
  async function cart(productID){
    setLoading(true);
  return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            "productId": productID
        }, {
            headers: {
              'token': localStorage.getItem('tkn')
            }
          }
          
          
      
).then((response)=>{
  
    setnumOfCartItems(response.data.numOfCartItems);
    setproducts(response.data.data.products);
    settotalCartPrice(response.data.data.totalCartPrice);
    setcartID(response.data.data._id);
    // getcartforlogeduser();
    console.log(cartID);
   console.log(response);
    return true;

})
.catch((error)=>{
 
return false;
})
.finally(() => {
  setLoading(false); // Set loading to false when the request is done
});

   }

function updateCart(productID,count){
  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
    {"count":count},
    {
      headers:{"token":localStorage.getItem('tkn')}

  }).then((res)=>{
    setnumOfCartItems(response.data.numOfCartItems);
    setproducts(response.data.data.products);
    settotalCartPrice(response.data.data.totalCartPrice);
  })
  .catch((error)=>{console.log('error',error)})

}
function RemoveSpecificCartItem(productID){
  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
  {headers:{'token':localStorage.getItem('tkn')}},)
  .then((response)=>{ setnumOfCartItems(response.data.numOfCartItems);
    setproducts(response.data.data.products);
    settotalCartPrice(response.data.data.totalCartPrice);})
  .catch((err)=>{console.log('error',err)})
}
   useEffect(()=>{getcartforlogeduser()},[]);
  return (
  <cartcontext.Provider value={{cart,totalCartPrice,products,loading,numOfCartItems,clearUserCart,getcartforlogeduser,updateCart,RemoveSpecificCartItem,cartID,clearcart}}>
    {children}
  </cartcontext.Provider>
  )
}
