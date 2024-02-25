import {NavLink} from "react-router-dom"
import Logo from "../assets/WhatsApp_Image_2024-02-24_at_20.46.19_a0be8a11-removebg-preview (1).png"
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
                <NavLink to="/home" className="navbar-brand d-flex justify-content-between align-items-center">
                    <img src={Logo} alt="logo" className="logo m-1"/>
                    <h1>
                        TravelAdvisor
                    </h1>
                </NavLink>
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
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard">dashboard</NavLink>
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
