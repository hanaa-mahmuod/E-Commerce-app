
import { useState,createContext, useEffect } from 'react';

export const x= createContext(null);

export default function Authentcontext({children}) {
  
const [token, settoken] = useState(localStorage.getItem('tkn'));
// useEffect(()=>{settoken(localStorage.getItem('tkn'));},[]);
  return (
    <x.Provider value={{token,settoken}}>
        {children}
    </x.Provider>
 
  )
}
