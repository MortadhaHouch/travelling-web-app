/* eslint-disable no-unused-vars */
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram,FaTiktok,FaReddit,FaFacebook,FaWhatsapp } from "react-icons/fa";
import {themeContext} from "../App"
import { useContext } from "react";
export const Footer = () => {
    let {isDark,setIsDark} = useContext(themeContext);
    return (
        <footer className="container-fluid text-primary d-flex justify-content-evenly align-items-start" style={{
                backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(33,37,41,.6)":"rgba(247, 238, 221, 0.6)"
            }}>
            <div className="d-flex justify-content-center align-items-center p-1 w-auto">
                <button className="btn">
                    <FaFacebook size={30} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"} className="m-1"/>
                </button>
                <button className="btn">
                    <FaReddit size={30} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"} className="m-1"/>
                </button>
                <button className="btn">
                    <FaXTwitter size={30} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"} className="m-1"/>
                </button>
                <button className="btn">
                    <FaInstagram size={30} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"} className="m-1"/>
                </button>
                <button className="btn">
                    <FaTiktok size={30} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"} className="m-1"/>
                </button>
                <button className="btn">
                    <FaWhatsapp size={30} color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"} className="m-1"/>
                </button>
            </div>
        </footer>
    )
}
