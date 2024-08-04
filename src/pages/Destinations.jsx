/* eslint-disable no-unused-vars */
import { MahdiaImages,TataouineImages,TunisImages,NabeulImages,SousseImages } from "../../utils/images"
import { CiBookmark } from "react-icons/ci";
import {gsapAnimationHandler} from "../../utils/animation"
import { useContext, useEffect, useState } from "react"
import {DialogBox} from "./DialogBox"
import { store } from "../../reducers/store";
import { themeContext } from "../App";
import { IoShareSocialSharp } from "react-icons/io5";
export const Destinations = () => {
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    let [images,setImages] = useState([]);
    let [isShown,setIsShown] = useState(false);
    let [destination,setDestination] = useState("");
    let [description,setDescription] = useState("");
    let [className,setClassName] = useState("played");
    let [targetAction,setTargetAction] = useState("");
    let {isDark,setIsDark} = useContext(themeContext);
    let checkIsAdmin = store.getState().isAdmin;
    let checkIsLoggedIn =store.getState().isLoggedIn;
    useEffect(()=>{
        if(!checkIsLoggedIn && !JSON.parse(localStorage.getItem("isLoggedIn"))){
            setIsShown(true);
        }else{
            setIsShown(false);
        }
    },[])
    useEffect(()=>{
        setDescription(description);
    },[description])
    useEffect(()=>{
        setDestination(destination);
    },[destination])
    useEffect(()=>{
        setImages(TataouineImages)
        gsapAnimationHandler(".item",{opacity:0,y:-100,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
    },[])
    useEffect(()=>{
        setClassName(className)
    },[className])
    return (
        <main className="d-flex flex-column justify-content-center align-items-center main-container" style={{
            backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
        }}>
            <ul className="nav nav-tabs horizontal" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="Tataouine-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Tataouine"
                        type="button"
                        role="tab"
                        aria-controls="Tataouine"
                        aria-selected="true"
                        onClick = {()=>{
                            setImages(TataouineImages);
                            gsapAnimationHandler(".item",{opacity:0,y:-100,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Tataouine
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Mahdia-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Mahdia"
                        type="button"
                        role="tab"
                        aria-controls="Mahdia"
                        aria-selected="false"
                        onClick = {()=>{
                            setImages(MahdiaImages)
                            gsapAnimationHandler(".item",{opacity:0,y:-100,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Mahdia
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Tunis-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Tunis"
                        type="button"
                        role="tab"
                        aria-controls="messages"
                        aria-selected="Tunis"
                        onClick = {()=>{
                            setImages(TunisImages)
                            gsapAnimationHandler(".item",{opacity:0,y:-100,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Tunis
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="Nabeul-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Nabeul"
                        type="button"
                        role="tab"
                        aria-controls="Nabeul"
                        aria-selected="false"
                        onClick = {()=>{
                            setImages(NabeulImages)
                            gsapAnimationHandler(".item",{opacity:0,y:-100,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Nabeul
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="sousse-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#sousse"
                        type="button"
                        role="tab"
                        aria-controls="sousse"
                        aria-selected="false"
                        onClick = {()=>{
                            setImages(SousseImages)
                            gsapAnimationHandler(".item",{opacity:0,y:-100,filter:"blur(15px)",},{opacity:1,y:0,filter:"blur(0px)"},true)
                        }}
                    >
                        Sousse
                    </button>
                </li>
            </ul>
            <section className="images-container">
                {
                    images.map((item,index)=>{
                        return(
                            <div key={index} className="item">
                                <img src={item} alt="image"/>
                                <div className="item-details">
                                    <h3 className="text-info text-primary">Destination</h3>
                                    <p className="text-light">Description</p>
                                    {
                                        ((checkIsLoggedIn.isLoggedIn || checkIsAdmin.isAdmin) || (JSON.parse(localStorage.getItem("isLoggedIn")) || JSON.parse(localStorage.getItem("isAdmin")))) &&(
                                            <>
                                                <button className="btn btn-primary absolute-button"
                                                    onClick={()=>{
                                                        setIsShown(true)
                                                        setTargetAction("participate");
                                                    }}
                                                >
                                                    participate
                                                </button>
                                                <button className="btn btn-primary p-1" onClick={(e)=>{
                                                    console.log(isShown);
                                                        if(!checkIsLoggedIn.isLoggedIn){
                                                            setIsShown(true);
                                                        }else{
                                                            e.target.classList.toggle("active");
                                                            setIsShown(false);
                                                        }
                                                    }}>
                                                    <CiBookmark size={30}/>
                                                </button>
                                                {
                                                    navigator.share && (
                                                        <button  className="btn btn-secondary p-1" onClick={()=>{
                                                            navigator.share({
                                                                title:"destination",
                                                                text:"description",
                                                                files:"file object to be shared",
                                                                url:""
                                                            }).then((obj)=>{
                                                                console.log(obj);
                                                            }).catch((err)=>{
                                                                console.log(err);
                                                            })
                                                        }}>
                                                            <IoShareSocialSharp size={30}/>
                                                        </button>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <DialogBox isShown={isShown} message="you're not logged in please login" setIsShown={setIsShown} targetAction={targetAction}/>
            </section>
        </main>
    )
}