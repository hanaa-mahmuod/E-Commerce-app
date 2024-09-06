import React from 'react'
import Login from './component/Login/Login.jsx'
import Signin from './component/Signin/Signin.jsx'
import ErrorPage  from './component/errorpage/ErrorPage.jsx';
import Layout from './component/Layout/Layout.jsx';
import Product from './component/Products/Product.jsx';
import Authentcontext from './Context/Authentcontext.jsx';
import Protectedcomp from './component/Protectedcomp.jsx';
import SpeceficProduct from './component/speceficproduct/SpeceficProduct';
import WishList from './component/WishList/WishList.jsx';
import CartContextProvider from './Context/CartContextProvider.jsx'
import toast, { Toaster } from 'react-hot-toast'
import Cart from './component/cart/Cart.jsx';
import Payment from './component/payment/Payment.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Brands from './component/Brands/Brands.jsx';
import AllCategories from './component/allCategories/AllCategories.jsx';
import WishcontextProvider from './Context/WishcontextProvider.jsx';
import {


  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
   
    path: "",
   element: <Layout></Layout>,children:[ 
    { path: "login",  element:<Login/>
      
   },
    { path: "*",  element: <ErrorPage></ErrorPage>},
    { path: "signin",  element: <Signin/>
    },
    { path: "",  element: <Protectedcomp>
      <Product/>
    </Protectedcomp>},
    { path: "Brands",  element: <Protectedcomp>
      <Brands/>
    </Protectedcomp>},
    { path: "AllCategories",  element: <Protectedcomp>
      <AllCategories/>
    </Protectedcomp>},
    { path: "SpeceficProduct/:id",  element: <Protectedcomp>
      <SpeceficProduct/>
    </Protectedcomp>},
    { path: "cart",  element: <Protectedcomp>
      <Cart/>
    </Protectedcomp>},
    { path: "/Payment",  element: <Protectedcomp>
   <Payment></Payment>
    </Protectedcomp>},
   
    { path: "/wishlist",  element: <Protectedcomp>
   <WishList></WishList>
    </Protectedcomp>},
   
   ],
   
  },
]);
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <WishcontextProvider>
      <Authentcontext>
   
    <Toaster></Toaster>
    <RouterProvider router={router} />
   </Authentcontext>
    </WishcontextProvider>
      </CartContextProvider>
     
    </QueryClientProvider>
   
    
  )
}
