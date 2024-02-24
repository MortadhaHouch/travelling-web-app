import { MahdiaImages,TataouineImages,TunisImages,NabeulImages } from "../../utils/images"
import { CiBookmark } from "react-icons/ci";
import {gsapAnimationHandler} from "../../utils/animation"
import { useContext, useEffect, useState } from "react"
import { loginState } from "../App"
import { useCookies } from "react-cookie"
import {DialogBox} from "./DialogBox"
export const Destinations = () => {
    let [isLoggedIn,setIsloggedIn] = useState(false);
    let {loginStateContext} = useContext(loginState);
    let [cookies,setCookie,removeCookie]=useCookies(["user_data"]);
    let [images,setImages] = useState([]);
    useEffect(()=>{
        setImages(TataouineImages)
        gsapAnimationHandler(".item",{opacity:0,y:15,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
    },[])
    return (
        <main className="d-flex flex-column justify-content-center align-items-center bg-dark-subtle">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                        onClick = {()=>{
                            setImages(TataouineImages)
                            gsapAnimationHandler(".item",{opacity:0,y:15,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Tataouine
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                        onClick = {()=>{
                            setImages(MahdiaImages)
                            gsapAnimationHandler(".item",{opacity:0,y:15,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Mahdia
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="messages-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#messages"
                        type="button"
                        role="tab"
                        aria-controls="messages"
                        aria-selected="false"
                        onClick = {()=>{
                            setImages(TunisImages)
                            gsapAnimationHandler(".item",{opacity:0,y:15,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Tunis
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="messages-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#messages"
                        type="button"
                        role="tab"
                        aria-controls="messages"
                        aria-selected="false"
                        onClick = {()=>{
                            setImages(NabeulImages)
                            gsapAnimationHandler(".item",{opacity:0,y:15,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Nabeul
                    </button>
                </li>
            </ul>
            <section className="images-container">
                {
                    images.map((item,index)=>{
                        return(
                            <div key={index} className="item">
                                <img src={item} alt="image"/>
                                <CiBookmark size={30} onClick={()=>{
                                    return(
                                        <DialogBox classList="shown" message="error"/>
                                    )
                                }}/>
                            </div>
                        )
                    })
                }
            </section>
        </main>
    )
}