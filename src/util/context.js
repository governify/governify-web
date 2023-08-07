'use client';

import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function useAppContext(){
   return useContext(Context);
}

export default function ContextProvider({ children }) {
  const [memberLogged, setMemberLogged] = useState(false);
    
  return (
    <Context.Provider value={{memberLogged, setMemberLogged}}>
      {children}
    </Context.Provider>
  );
}