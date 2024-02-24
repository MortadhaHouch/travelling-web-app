import {NavLink, redirect} from "react-router-dom"
import Logo from "../assets/4202194-removebg-preview.png"
import {gsapAnimationHandler} from "../../utils/animation"
import { useContext } from "react"
import { loginState } from "../App"
import { useCookies } from "react-cookie"
export const Header = () => {
    let {isLoggedIn,setIsloggedIn} = useContext(loginState);
    let [cookies,setCookie,removeCookie]=useCookies(["json_token"]);
    return (
        <header className="container-fluid bg-dark text-primary d-flex justify-content-evenly align-items-start">
            <div className='d-flex justify-content-between align-items-center g-1 w-auto'>
                <img src={Logo} alt="logo" className="logo"/>
                <h1><NavLink to="/home" className="navbar-brand">TravelAdvisor</NavLink></h1>
            </div>
            <nav className="navbar navbar-expand-sm navbar-dark">
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    onClick={()=>{
                        gsapAnimationHandler(".nav-item",{opacity:0,stagger:0.25,x:-20},{opacity:1,stagger:0.25,x:0},true)
                    }}
                ><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/destinations">destinations</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/feedback">feedback</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/faq">faq</NavLink>
                        </li>
                        {
                            cookies.json_token?(
                                <button className="btn btn-danger" onClick={()=>{
                                    setIsloggedIn(false);
                                    removeCookie("json_token",{
                                        maxAge:0,
                                        path:"/"
                                    })
                                    location.assign("/home")
                                }}>logout</button>
                            ):(
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/user/login">login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/user/signup">signup</NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </header>
    )
}
