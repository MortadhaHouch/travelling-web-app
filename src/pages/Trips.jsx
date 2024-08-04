/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  { Suspense, useContext, useEffect, useRef, useState,useTransition } from 'react'
import Loading from './Loading';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import { BsCalendar2Date, BsCheck } from 'react-icons/bs';
import { loginState, themeContext } from "../App";
import { fetchData } from '../../utils/fetchData';
import { DialogBox } from './DialogBox';
import SwiperElement from './SwiperElement';
import moment from 'moment';
import { gsapAnimationHandler } from '../../utils/animation';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FaBookmark, FaDirections, FaEdit } from "react-icons/fa";
import { MdCancel, MdDescription, MdEventSeat } from 'react-icons/md';
import { IoTimeOutline } from 'react-icons/io5';
import { jwtDecode } from 'jwt-decode';
export default function Trips(props) {
    let [isLoading,setIsLoading] = useState(false);
    let {isDark,setIsDark} = useContext(themeContext);
    let [trips,setTrips] = useState([]);
    let [isShown,setIsShown] = useState(false);
    let [itemToRemove,setItemToRemove]= useState(null);
    let [isPending,startTransition] = useTransition();
    let [entity,setEntity] = useState("");
    let {isLoggedIn} = useContext(loginState)
    let savedTripsRef = useRef([]);
    let likedTripsRef = useRef([]);
    let disLikedTripsRef = useRef([]);
    useEffect(()=>{
        setTrips(trips);
        return ()=> setTrips([]); 
    },[trips])
    useEffect(()=>{
        if(isShown == false){
            startTransition(getData);
        }
    },[isShown]);
    useEffect(()=>{
        startTransition(getData);
        gsapAnimationHandler("p.p-indicator",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
        gsapAnimationHandler("div.trip-details-container",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
    },[])
    async function getData(){
        try {
            let data = await fetchData("/trips","GET",null,setIsLoading);
            setTrips(jwtDecode(data.token).response);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className={`d-flex flex-column justify-content-center align-items-center w-100 h-100 ${props.className} cards-container`}
            role={props.role}
            aria-labelledby={props.ariaLabelledby}
            style={{
            backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
        }}>
            {
                isPending ?(
                    <Loading/>
                ):(
                trips.length!==0 ? trips.map((item,index)=>{
                    const formattedDate = moment(new Date(Number(item.date))).format('MMMM Do YYYY, h:mm:ss a');
                    return(
                        <Suspense key={index} fallback={<Loading/>}>
                            <div className="trip-details-container" style={{
                                backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB",
                                boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                padding:15,
                                borderRadius:15
                            }}>
                                <button className="btn btn-close" title="remove trip" onClick={()=>{
                                    setEntity("trip-trip");
                                    setIsShown(true);
                                    setItemToRemove(item);
                                }}></button>
                                <div>
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                        {
                                            item.links && item.links.length == 1?(
                                                <img src={item.links[0]} width={100} height={100} alt="" style={{borderRadius:20}}/>
                                            ):(
                                                <SwiperElement images={item.links}/>
                                            )
                                        }
                                    </div>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}>{item.price} <FaMoneyBill1Wave/> per person</p>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}>{item.isCancelled?<><MdCancel color="red"size={20}/> cancelled</>:(<><BsCheck color="green"size={20}/> still planned</>)}</p>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}>{item.isCancelled}</p>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}><FaDirections size={20}/> {item.destination}</p>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}><MdDescription size={20}/> {item.description}</p>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}><IoTimeOutline size={20}/> {item.period} days</p>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}><MdEventSeat size={20}/> {item.numberOfParticipators}/{item.maxNumberOfParticipators} are registered</p>
                                    <p style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}><BsCalendar2Date size={20}/> added on {formattedDate}</p>
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                        <button className="btn btn-primary mx-2" style={{
                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                        }}
                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                            onClick={async()=>{
                                                try {
                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                    likedTripsRef.current[index].textContent = jwtDecode(request.token).responseObject.numberOfLikes;
                                                    disLikedTripsRef.current[index].textContent = jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}
                                        ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/>
                                            <span ref={(el)=>likedTripsRef.current.push(el)}>{item.numberOfLikes}</span>
                                        </button>
                                        <button className="btn btn-primary mx-2" style={{
                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                        }}
                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                            onClick={async()=>{
                                                try {
                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                    likedTripsRef.current[index].textContent = jwtDecode(request.token).responseObject.numberOfLikes;
                                                    disLikedTripsRef.current[index].textContent = jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}
                                        ><AiFillDislike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/> 
                                            <span ref={(el)=>disLikedTripsRef.current.push(el)}>{item.numberOfDisLikes}</span>
                                        </button>
                                        <button className="btn btn-primary mx-2" style={{
                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                        }}
                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                            onClick={async()=>{
                                                try {
                                                    let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                    savedTripsRef.current[index].textContent = jwtDecode(request.token).responseObject.numberOfSaves;
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}
                                        >
                                            <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/>
                                            <span ref={(el)=>savedTripsRef.current.push(el)}>{item.numberOfSaves}</span>
                                        </button>
                                        <button className="btn btn-secondary">
                                            <FaEdit size={20}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Suspense>
                    )
                }):(
                    <p className='p-indicator' style={{
                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                    }}>No trips are saved yet</p>
                ))
            }
            {
                (isShown && itemToRemove) && <DialogBox isShown={isShown} message="remove-item" callback={fetchData} setIsLoading={setIsLoading} setIsShown={setIsShown} entity={entity} data={itemToRemove}/>
            }
        </section>
    )
}
