import './App.css'
import {HomeLayout} from "../src/pages/HomeLayout"
import {CookiesProvider} from "react-cookie"
import { createContext, useState } from 'react'
let loginState = createContext();
function App() {
  let [isLoggedIn,setIsloggedIn] = useState(false);
  return (
    <>
      <CookiesProvider>
        <loginState.Provider value={{isLoggedIn,setIsloggedIn}}>
          <HomeLayout/>
        </loginState.Provider>
      </CookiesProvider>
    </>
  )
}
export {App,loginState}