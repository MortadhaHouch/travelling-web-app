import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";
import {createBrowserRouter,Route,RouterProvider,createRoutesFromElements} from "react-router-dom"
import {Login} from "./pages/Login"
import {Signup} from "./pages/Signup"
import {Feedback} from "../src/pages/Feedback"
import {Destinations} from "../src/pages/Destinations"
import {Faq} from "../src/pages/Faq"
import "./App.css"
import { Error } from './pages/Error';
import {App} from './App';
import { Home } from './pages/Home';
let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App/>}>
      <Route path='home' element={<Home/>}/>
      <Route path='destinations' element={<Destinations/>}/>
      <Route path='feedback' element={<Feedback/>}/>
      <Route path='faq' element={<Faq/>}/>
      <Route path='user'>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
      </Route>
      <Route path='*' element={<Error/>}/>
    </Route>  
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
