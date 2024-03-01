import './App.css'
import {HomeLayout} from "../src/pages/HomeLayout"
import {CookiesProvider} from "react-cookie"
import { createContext, useState } from 'react';
import { Provider } from "react-redux";
import {store} from "../reducers/store"
let loginState = createContext();
function App() {
  let [isLoggedIn,setIsLoggedIn] = useState(false);
  let [isAdmin,setIsAdmin] = useState(false);
  return (
    <>
      <Provider store={store}>
        <CookiesProvider>
            <loginState.Provider value={{isLoggedIn,setIsLoggedIn,isAdmin,setIsAdmin}}>
              <HomeLayout/>
            </loginState.Provider>
        </CookiesProvider>
      </Provider>
    </>
  )
}
export {App,loginState}