import axios from 'axios';
import React, { createContext,useEffect,useState } from 'react'
export const cartcontext=createContext(null);
export default function CartContextProvider({children}) {
const [numOfCartItems, setnumOfCartItems] = useState(0);
const [totalCartPrice, settotalCartPrice] = useState(0);
const [cartID, setcartID] = useState(null);
const [products, setproducts] = useState(null);
  function getcartforlogeduser(){
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
    

})
.catch((error)=>{
  console.log('err',error);
})
   }
   function clearcart(){
    setnumOfCartItems(response.data.numOfCartItems);
    setproducts(response.data.data.products);
    settotalCartPrice(response.data.data.totalCartPrice);
   }
  async function cart(productID){
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
    return true;

})
.catch((error)=>{
return false;
})
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
  .then(()=>{ setnumOfCartItems(response.data.numOfCartItems);
    setproducts(response.data.data.products);
    settotalCartPrice(response.data.data.totalCartPrice);})
  .catch(()=>{console.log('error',error)})
}
   useEffect(()=>{getcartforlogeduser()},[]);
  return (
  <cartcontext.Provider value={{cart,totalCartPrice,products,numOfCartItems,getcartforlogeduser,updateCart,RemoveSpecificCartItem,cartID,clearcart}}>
    {children}
  </cartcontext.Provider>
  )
}
