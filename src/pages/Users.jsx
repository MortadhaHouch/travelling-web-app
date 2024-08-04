/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Suspense, useContext, useEffect, useState,useTransition } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { themeContext } from "../App";
import { fetchData } from "../../utils/fetchData";
import { DialogBox } from "./DialogBox";
import moment from "moment";
import { gsapAnimationHandler } from "../../utils/animation";
import { jwtDecode } from "jwt-decode";
import Loading from "./Loading";
export default function Users(props) {
    let [users,setUsers] = useState([]);
    let [isLoading,setIsLoading] = useState(false);
    let {isDark,setIsDark} = useContext(themeContext);
    let [isShown,setIsShown] = useState(false);
    let [itemToRemove,setItemToRemove]= useState(null);
    let [entity,setEntity] = useState("");
    let [isPending,startTransaction] = useTransition()
    useEffect(()=>{
        setUsers(users);
        return ()=> setUsers([]);
    },[users])
    useEffect(()=>{
        if(isShown == false){
            getData();
        }
    },[isShown]);
    async function getData(){
        try {
            let data = await fetchData("/user/users","GET",null,setIsLoading);
            setUsers(jwtDecode(data.token).response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        startTransaction(getData);
        gsapAnimationHandler("p.p-indicator",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
        gsapAnimationHandler("div.user-card-item",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
    },[])
    return (
        <section
            className={`cards-container ${props.className}`}
            role={props.role}
            aria-labelledby={props.ariaLabelledby}
            style={{
            backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
        }}>
            {
                isPending ?(
                    <Loading/>
                ):(
                users && users.length!==0 ? users.map((el,i)=>{
                    const formattedDate = moment(new Date(Number(el.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                    return(
                        <Suspense key={i}>
                            <div className="user-card-item">
                                <button className="btn btn-close btn-danger" title="remove trip" onClick={()=>{
                                    setEntity("user-user");
                                    setIsShown(true);
                                    setItemToRemove(el);
                                }}></button>
                                <img src={el.userAvatar} alt="image" style={{border:`3px solid ${el.isLoggedIn?"green":"red"}`}}/>
                                <p 
                                    title="click to copy"
                                style={{
                                    color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                    cursor:"pointer",
                                    scale:.5,
                                    textAlign:"center"
                                }} onClick={(e)=>{
                                    navigator.clipboard.writeText(e.target.textContent)
                                }}><MdOutlineAlternateEmail /> {el.email}</p>
                                <p style={{
                                    color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                }}><FaRegUser /> {el.firstName} {el.lastName}</p>
                                <p style={{
                                    color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                }}><LiaBirthdayCakeSolid /> {el.dateOfBirth}</p>
                                <p style={{
                                    color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                }}><BsCalendar2Date /> added on {formattedDate}</p>
                            </div>
                        </Suspense>
                    )
                }):(
                    <p className="p-indicator" style={{
                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                    }}>no users are registered yet</p>
                ))
            }
            {
                (isShown && itemToRemove) && <DialogBox isShown={isShown} message="remove-item" callback={fetchData} setIsLoading={setIsLoading} setIsShown={setIsShown} entity={entity} itemToRemove={itemToRemove}/>
            }
        </section>
    )
}
