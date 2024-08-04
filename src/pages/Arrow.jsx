/* eslint-disable no-unused-vars */
import { useContext } from "react"
import {themeContext} from "../App"
export default function Arrow() {
    let {isDark,setIsDark} = useContext(themeContext)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 156.94 156.94" color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgba(247, 238, 221, 0.5)":"rgb(33,37,41)"}>
            <g id="Layer_1-2" data-name="Layer 1">
                <g>
                    <path className="cls-1" fill={"transparent"} stroke={!(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"} strokeLinecap="round" strokeMiterlimit={10} strokeWidth={6} d="M129.94,129.94H19.06c-8.87,0-16.06-7.19-16.06-16.06V3"/>
                    <circle className="cls-1" cx="129.94" cy="129.94" r="24" fill={!(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"} stroke={(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"} strokeLinecap="round" strokeMiterlimit={10} strokeWidth={6}/>
                </g>
            </g>
        </svg>
    )
}
