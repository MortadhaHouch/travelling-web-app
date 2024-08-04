/* eslint-disable no-unused-vars */
import Chart from "./Chart";
import Trips from "./Trips";
import Users from "./Users";
import FileUpload from "./FileUpload"
import { Suspense, useContext, useEffect, useRef, useState, useTransition } from "react";
import { FaMoneyBill1Wave, FaUsers } from "react-icons/fa6";
import { SiYourtraveldottv } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { AiFillDislike, AiFillEyeInvisible, AiFillLike, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineComment } from "react-icons/ai";
import { themeContext,loginState } from "../App";
import { VscFeedback } from "react-icons/vsc";
import { MdCancel, MdCollectionsBookmark, MdDescription, MdEventSeat, MdOutlineAlternateEmail, MdOutlineCancel, MdSchedule, MdUpdate, MdVisibility, MdVisibilityOff } from "react-icons/md";
import {jwtDecode} from "jwt-decode"
import { fetchData } from "../../utils/fetchData";
import { FaBookmark, FaDirections, FaEdit, FaEye, FaUser } from "react-icons/fa";
import { BsCalendar2Date, BsCheck, BsPin, BsPinFill } from "react-icons/bs";
import Loading from "./Loading";
import SwiperElement from "./SwiperElement";
import { IoNotifications, IoTimeOutline } from "react-icons/io5";
import moment from "moment"
import { DialogBox } from "./DialogBox";
import { gsapAnimationHandler } from "../../utils/animation";
import { LuUpload } from "react-icons/lu";
import fileReading from "../../utils/fileReading";
export default function Aside(props) {
    let [componentName,setComponentName] = useState("users");
    let {isDark,setIsDark} = useContext(themeContext);
    let [isShown,setIsShown] = useState(false);
    let [isAsideShown,setIsAsideShown] = useState(false);
    let [plannedTrips,setPlannedTrips] = useState([]);
    let [savedTrips,setSavedTrips] = useState([]);
    let [likedTrips,setLikedTrips] = useState([]);
    let [dislikedTrips,setDislikedTrips] = useState([]);
    let [postedFeedbacks,setPostedFeedbacks] = useState([]);
    let [postedFaqs,setPostedFaqs] = useState([]);
    let [isLoading,setIsLoading] = useState(false);
    let [notifications,setNotifications] = useState([]);
    let [comments,setComments] = useState([]);
    let {isLoggedIn,setIsLogged} = useContext(loginState);
    let [faqObject, setFaqObject] = useState(null);
    let [feedbackObject,setFeedbackObject] = useState(null);
    let [userObject,setUserObject] = useState(null);
    let [numberOfPages,setNumberOfPages] = useState(0);
    let [numberOfNotifications,setNumberOfNotifications]=useState(0);
    let [unseenNotifications,setUnseenNotifications]=useState(0);
    let [pinnedNotifications,setPinnedNotifications]=useState([]);
    let [isPasswordVisible,setIsPasswordVisible]=useState(false);
    let [firstName,setFirstName] = useState("");
    let [lastName,setLastName] = useState("");
    let [password,setPassword] = useState("");
    let [avatar,setAvatar] = useState("");
    let [editing,setEditing] = useState(false);
    let [isPending,startTransition] = useTransition();
    let numberOfLikesPlannedTripsRef = useRef([]);
    let numberOfDisLikesPlannedTripsRef = useRef([]);
    let numberOfLikesSavedTripsRef = useRef([]);
    let numberOfDisLikesSavedTripsRef = useRef([]);
    let numberOfLikesLikedTripsRef = useRef([]);
    let numberOfDisLikesLikedTripsRef = useRef([]);
    let numberOfDisLikesDislikedTripsRef = useRef([]);
    let numberOfDisLikesFeedbacksRef = useRef([]);
    let numberOfLikesFeedbacksRef = useRef([]);
    let numberOfDisLikesFaqsRef = useRef([]);
    let numberOfLikesFaqsRef = useRef([]);
    let numberOfCommentsFaqRef = useRef([]);
    let numberOfCommentFeedbacksRef = useRef([]);
    let numberOfSavesPlannedTripsRef = useRef([]);
    let numberOfSavesSavedTripsRef = useRef([]);
    let numberOfSavesDislikedTripsRef = useRef([]);
    let numberOfSavesLikedTripsRef = useRef([]);
    let numberOfLikesDislikesTripsRef = useRef([]);
    let allNotificationsButtonsRef = useRef([]);
    let firstNameInputRef = useRef(null);
    let lastNameInputRef = useRef(null);
    let passwordInputRef = useRef(null);
    async function getData(url){
        try {
            let request;
            switch (url){
                case "/trips/registered":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setPlannedTrips(jwtDecode(request.token).savedTrips);
                    break;
                case "/trips/saved":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setSavedTrips(jwtDecode(request.token).savedTrips);
                    break;
                case "/trips/liked":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setLikedTrips(jwtDecode(request.token).likedTrips);
                    break;
                case "/trips/disliked":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setDislikedTrips(jwtDecode(request.token).dislikedTrips);
                    break;
                case "/feedbacks/posted":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setPostedFeedbacks(jwtDecode(request.token).response);
                    break;
                case "/faqs/posted":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setPostedFaqs(jwtDecode(request.token).response);
                    break;
                case "/user/profile":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setUserObject(jwtDecode(request.token).responseObject);
                    break;
                case "/notifications":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setNotifications(jwtDecode(request.token).myNotifications);
                    setNumberOfPages(jwtDecode(request.token).numberOfPages);
                    setNumberOfNotifications(jwtDecode(request.token).numberOfNotifications);
                    setUnseenNotifications(jwtDecode(request.token).unseenNotifications);
                    setPinnedNotifications(jwtDecode(request.token).pinnedNotificationsArray);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getData("/notifications");
    },[])
    useEffect(()=>{
        setPlannedTrips(plannedTrips);
        console.log(plannedTrips);
        return ()=> setPlannedTrips([])
    },[plannedTrips])
    useEffect(()=>{
        setSavedTrips(savedTrips);
        console.log(savedTrips);
        return ()=> setSavedTrips([])
    },[savedTrips])
    useEffect(()=>{
        setLikedTrips(likedTrips);
        console.log(likedTrips);
        return ()=> setLikedTrips([])
    },[likedTrips]);
    useEffect(()=>{
        setDislikedTrips(dislikedTrips);
        console.log(dislikedTrips);
        return ()=> setDislikedTrips([])
    },[dislikedTrips])
    useEffect(()=>{
        setPostedFeedbacks(postedFeedbacks);
        console.log(postedFeedbacks);
        return ()=> setPostedFeedbacks([])
    },[postedFeedbacks])
    useEffect(()=>{
        setPostedFaqs(postedFaqs);
        console.log(postedFaqs);
        return ()=> setPostedFaqs([])
    },[postedFaqs])
    useEffect(()=>{
        setNotifications(notifications);
        console.log(notifications);
        return ()=>setNotifications([]);
    },[notifications]);
    useEffect(()=>{
        setIsAsideShown(isAsideShown);
        return ()=>setIsAsideShown(false);
    },[isAsideShown])
    useEffect(()=>{
        setIsShown(isShown);
        return ()=>setIsShown(false);
    },[isShown])
    useEffect(()=>{
        setComments(comments);
        return ()=>setComments([]);
    },[comments])
    useEffect(()=>{
        setFeedbackObject(feedbackObject);
        return ()=>setFeedbackObject(null);
    },[feedbackObject])
    useEffect(()=>{
        setFaqObject(faqObject);
        return ()=>setFaqObject(null);
    },[faqObject])
    useEffect(()=>{
        for(let i; i<numberOfPages; i++){
            allNotificationsButtonsRef.current.push(i);
        }
        console.log(numberOfPages);
        return ()=> allNotificationsButtonsRef.current = []
    },[numberOfPages]);
    useEffect(()=>{
        setFirstName(firstName);
        return ()=>setFirstName("");
    },[firstName])
    useEffect(()=>{
        setLastName(lastName);
        return ()=>setLastName("");
    },[lastName])
    useEffect(()=>{
        setPassword(password);
        return ()=>setPassword("");
    },[password]);
    useEffect(()=>{
        setComponentName(componentName);
        startTransition(getData);
        if(componentName.includes("trips")){
            gsapAnimationHandler("div.trip-details-container",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
        }else{
            gsapAnimationHandler("div.feedback-card",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
        }
        return ()=>setComponentName("");
    },[componentName]);
    return (
        <main className="d-flex flex-column justify-content-start align-items-center">
            <ul className={`nav nav-tabs aside vertical ${isAsideShown?"shown":""}`} role="tablist">
                <button className="btn btn-info tooltip-arrow" onClick={()=>setIsAsideShown(!isAsideShown)}>
                    {
                        isAsideShown?(
                            <AiOutlineArrowLeft color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"}/>
                        ):(
                            <AiOutlineArrowRight color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"}/>
                        )
                    }
                </button>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="users-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#users"
                        type="button"
                        role="tab"
                        aria-controls="users"
                        aria-selected="true"
                        onClick={()=>{
                            setComponentName("all-users");
                        }}
                    >
                        <FaUsers /> <span>users</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="trips-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#trips"
                        type="button"
                        role="tab"
                        aria-controls="trips"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("all-trips");
                        }}
                    >
                        <SiYourtraveldottv /> <span>trips</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="chart-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#chart"
                        type="button"
                        role="tab"
                        aria-controls="chart"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("chart");
                        }}
                    >
                        <GoGraph /> <span>chart</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="upload-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#upload"
                        type="button"
                        role="tab"
                        aria-controls="upload"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("fileUpload");
                        }}
                    >
                        <IoIosAddCircle /> <span>add trip</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="planned-trips-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#planned-trips"
                        type="button"
                        role="tab"
                        aria-controls="planned-trips"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("planned-trips");
                            getData("/trips/registered");
                        }}
                    >
                        <MdSchedule/><span className="mx-1">planned trips</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="saved-trips-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#saved-trips"
                        type="button"
                        role="tab"
                        aria-controls="saved-trips"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("saved-trips");
                            getData("/trips/saved");
                        }}
                    >
                        <MdCollectionsBookmark/><span className="mx-1">saved trips</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="liked-trips-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#liked-trips"
                        type="button"
                        role="tab"
                        aria-controls="liked-trips"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("liked-trips");
                            getData("/trips/liked");
                        }}
                    >
                        <AiFillLike/><span className="mx-1">liked trips</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="disliked-trips-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#disliked-trips"
                        type="button"
                        role="tab"
                        aria-controls="disliked-trips"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("disliked-trips");
                            getData("/trips/disliked");
                        }}
                    >
                        <AiFillDislike/><span className="mx-1">disliked trips</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="posted-feedbacks-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#posted-feedbacks"
                        type="button"
                        role="tab"
                        aria-controls="posted-feedbacks"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("posted-feedbacks");
                            getData("/feedbacks/posted");
                        }}
                    >
                        <VscFeedback /><span className="mx-1">posted feedbacks</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link"
                        id="posted-faqs-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#posted-faqs"
                        type="button"
                        role="tab"
                        aria-controls="posted-faqs"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("posted-faqs");
                            getData("/faqs/posted");
                        }}
                    >
                        <VscFeedback /><span className="mx-1">posted faqs</span>
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link position-relative"
                        id="notifications-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#notifications"
                        type="button"
                        role="tab"
                        aria-controls="notifications"
                        aria-selected="false"
                        onClick={()=>{
                            setComponentName("notifications");
                            getData("/notifications");
                        }}
                    >
                        <>
                            <IoNotifications/><span className="mx-1">notifications</span>
                            {
                                unseenNotifications!==0 && (
                                    <span 
                                    className="mx-1 bg-danger text-light text-center" 
                                    style={{
                                        borderRadius:"50%",
                                        width:"20px",
                                        height:"20px",
                                        position:"absolute",
                                        right:10,
                                        top:"auto",
                                        bottom:"auto"
                                    }}>{Intl.NumberFormat().format(unseenNotifications)}</span>
                                )
                            }
                        </>
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
                        aria-controls="profile-tab"
                        aria-selected="false"
                        onClick={()=>{
                            getData("/user/profile");
                            setComponentName("profile");
                        }}
                    >
                        <FaUser/><span className="mx-1">profile</span>
                    </button>
                </li>
            </ul>
            <section className="tab-content w-100 h-100 d-flex flex-row justify-content-center align-items-center">
                {
                    componentName =="all-users" && 
                    <Users 
                        className="tab-pane d-flex flex-row justify-content-center align-items-center p-3 active" 
                        id="users" 
                        role="tabpanel"
                        ariaLabelledby="users-tab"
                    />
                }
                {
                    componentName == "all-trips" && 
                    <Trips
                        className="tab-pane d-flex flex-row justify-content-center align-items-center p-3"
                        id="trips"
                        role="tabpanel"
                        ariaLabelledby="trips-tab"
                    />
                }
                {
                    componentName == "chart" && 
                    <Chart
                        className="tab-pane d-flex flex-row justify-content-center align-items-center p-3"
                        id="chart"
                        role="tabpanel"
                        ariaLabelledby="chart-tab"
                    />  
                }
                {
                    componentName == "fileUpload" && 
                    <FileUpload
                        className="tab-pane d-flex flex-row justify-content-center align-items-center p-3"
                        id="upload"
                        role="tabpanel"
                        ariaLabelledby="upload-tab"
                    />
                }
                {
                    componentName == "planned-trips" && (
                        <section
                            className="tab-pane d-flex flex-row justify-content-center align-items-center p-3 feedback-cards-container"
                            id="planned-trips"
                            role="tabpanel"
                            aria-labelledby="planned-trips"
                        >
                            {
                                plannedTrips && plannedTrips.length!==0 ? plannedTrips.map((item,index)=>{
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
                                                        <button className={`btn ${item.isLiked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                                    numberOfLikesPlannedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesPlannedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/> 
                                                            <span ref={(el)=>numberOfLikesPlannedTripsRef.current.push(el)}>{item.numberOfLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isDisliked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                    numberOfLikesPlannedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesPlannedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillDislike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/> 
                                                            <span ref={(el)=>numberOfDisLikesPlannedTripsRef.current.push(el)}>{item.numberOfDisLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isTripSaved?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                    numberOfSavesPlannedTripsRef.current[index].textContent = jwtDecode(request.token).responseObject.numberOfSaves;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        >
                                                            <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/> 
                                                            <span ref={(el)=>numberOfSavesPlannedTripsRef.current.push(el)}>{item.numberOfSaves}</span>
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
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "saved-trips" && (
                        <section
                            className="tab-pane d-flex flex-row justify-content-center align-items-center flex-wrap p-3 feedback-cards-container"
                            id="saved-trips"
                            role="tabpanel"
                            aria-labelledby="saved-trips"
                        >
                            {
                                savedTrips && savedTrips.length!==0 ? savedTrips.map((item,index)=>{
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
                                                        <button className={`btn ${item.isLiked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                                    numberOfLikesSavedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesSavedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isLiked) && `active`}/>
                                                            <span ref={(el)=>numberOfLikesSavedTripsRef.current.push(el)}>{item.numberOfLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isDisliked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                    numberOfLikesSavedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesSavedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillDislike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/>
                                                            <span ref={(el)=>numberOfDisLikesSavedTripsRef.current.push(el)}>{item.numberOfDisLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isTripSaved?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                    numberOfSavesSavedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfSaves;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        >
                                                            <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/> 
                                                            <span ref={(el)=>numberOfSavesSavedTripsRef.current.push(el)}>{item.numberOfSaves}</span>
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
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "liked-trips" && (
                        <section
                            className="tab-pane d-flex flex-row justify-content-center align-items-center flex-wrap p-3 feedback-cards-container"
                            id="liked-trips"
                            role="tabpanel"
                            aria-labelledby="liked-trips"
                        >
                            {
                                likedTrips && likedTrips.length!==0 ? likedTrips.map((item,index)=>{
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
                                                        <button className={`btn ${item.isLiked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                                    numberOfLikesLikedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesLikedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/>
                                                            <span ref={(el)=>numberOfLikesLikedTripsRef.current.push(el)}>{item.numberOfLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isDisliked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                    numberOfLikesLikedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesLikedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillDislike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/>
                                                            <span ref={(el)=>numberOfDisLikesLikedTripsRef.current.push(el)}>{item.numberOfDisLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isTripSaved?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                    numberOfSavesLikedTripsRef.current[index].textContent =jwtDecode(request.token).responseObject.numberOfSaves;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        >
                                                            <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/> 
                                                            <span ref={(el)=>numberOfSavesLikedTripsRef.current.push(el)}>{item.numberOfSaves}</span>
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
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "disliked-trips" && (
                        <section
                            className="tab-pane d-flex flex-row justify-content-center align-items-center flex-wrap p-3 feedback-cards-container"
                            id="disliked-trips"
                            role="tabpanel"
                            aria-labelledby="disliked-trips"
                        >
                            {
                                dislikedTrips && dislikedTrips.length!==0 ? dislikedTrips.map((item,index)=>{
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
                                                        <button className={`btn ${item.isLiked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                                    numberOfLikesDislikesTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesDislikedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripLiked) && `active`}/>
                                                            <span ref={(el)=>numberOfLikesDislikesTripsRef.current.push(el)}>{item.numberOfLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isDisliked?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                    numberOfLikesDislikesTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                                    numberOfDisLikesDislikedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        ><AiFillDislike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/>
                                                            <span ref={(el)=>numberOfDisLikesDislikedTripsRef.current.push(el)}>{item.numberOfDisLikes}</span>
                                                        </button>
                                                        <button className={`btn ${item.isTripSaved?'btn-primary':'btn-outline-primary'}`} style={{
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                        }}
                                                            disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                    numberOfSavesDislikedTripsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfSaves;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        >
                                                            <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn")) && `active`}/> 
                                                            <span ref={(el)=>numberOfSavesDislikedTripsRef.current.push(el)}>{item.numberOfSaves}</span>
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
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "posted-feedbacks" && (
                        <section
                            className="tab-pane d-flex flex-row justify-content-center align-items-center flex-wrap feedback-cards-container p-3"
                            id="posted-feedbacks"
                            role="tabpanel"
                            aria-labelledby="posted-feedbacks"
                        >
                            {
                                postedFeedbacks && postedFeedbacks.length !== 0 ? postedFeedbacks.map((item,index)=>{
                                    const formattedDate = moment(new Date(Number(item.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                    return(
                                        <Suspense key={index} fallback={<Loading/>}>
                                            <div className="feedback-card m-2" style={{
                                                boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                            }}>
                                                <div>
                                                    <img src={item.userAvatar} alt="" />
                                                    <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.userFirstName} {item.userLastName}</h4>
                                                    <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}><MdOutlineAlternateEmail /> {item.userEmail}</h5>
                                                </div>
                                                <>
                                                    {
                                                        item.isVisibleByOthers?(
                                                            <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                                                                <FaEye className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                                <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {formattedDate}</span>
                                                            </div>
                                                        ):(
                                                            <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                                                                <AiFillEyeInvisible className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                                <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {formattedDate}</span>
                                                            </div>
                                                        )
                                                    }
                                                </>
                                                <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.content}</p>
                                                <div className="w-100 d-flex justify-content-center align-items-center">
                                                    <button className={`btn ${item.isLiked?'btn-primary':'btn-outline-primary'}`} disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                        onClick={async(e)=>{
                                                            try {
                                                                let request = await fetchData("/feedbacks/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                                numberOfDisLikesFeedbacksRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                numberOfLikesFeedbacksRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    >
                                                        <AiFillLike size={20}/> <span ref={(el)=>numberOfLikesFeedbacksRef.current.push(el)}>{item.numberOfLikes}</span>
                                                    </button>
                                                    <button className={`btn ${item.isDisliked?'btn-primary':'btn-outline-primary'}`} disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                        onClick={async(e)=>{
                                                            try {
                                                                let request = await fetchData("/feedbacks/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                numberOfDisLikesFeedbacksRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDislikes;
                                                                numberOfLikesFeedbacksRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}>
                                                        <AiFillDislike size={20}/> <span ref={(el)=>numberOfDisLikesFeedbacksRef.current.push(el)}>{item.numberOfDislikes}</span>
                                                    </button>
                                                    <button className="btn btn-outline-primary"
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/comments/feedback/"+item.id,"GET",null,setIsLoading);
                                                                    console.log(jwtDecode(request.token).response);
                                                                    setComments(jwtDecode(request.token).response);
                                                                    setIsShown(true);
                                                                    setFeedbackObject({...item,formattedDate});
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        >
                                                        <AiOutlineComment/> <span ref={(el)=>numberOfCommentFeedbacksRef.current.push(el)}>{item.numberOfComments}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </Suspense>
                                    )
                                }):(
                                    <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>No feedbacks are posted yet</p>
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "posted-faqs" && (
                        <section
                            className="tab-pane d-flex flex-row justify-content-center align-items-center flex-wrap feedback-cards-container p-3"
                            id="posted-faqs"
                            role="tabpanel"
                            aria-labelledby="posted-faqs"
                        >
                            {
                                postedFaqs && postedFaqs.length !== 0 ? postedFaqs.map((item,index)=>{
                                let formattedDate = moment(new Date(Number(item.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                    return(
                                        <Suspense key={index} fallback={<Loading/>}>
                                            <div className="feedback-card" style={{
                                                boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                            }}>
                                                <div>
                                                    <img src={item.userAvatar} alt="" className="avatar"/>
                                                    <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.userFirstName} {item.userLastName}</h4>
                                                    <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}><MdOutlineAlternateEmail /> {item.userEmail}</h5>
                                                </div>
                                            <>
                                                {
                                                    item.isVisibleByOthers?(
                                                        <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                                                            <FaEye className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                            <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {formattedDate}</span>
                                                        </div>
                                                        ):(
                                                        <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                                                            <AiFillEyeInvisible className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                            <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {formattedDate}</span>
                                                        </div>
                                                    )
                                                }
                                            </>
                                                <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.content}</p>
                                            <div className="w-100 d-flex justify-content-center align-items-center">
                                                <button className={`btn ${item.isLiked?'btn-primary':'btn-outline-primary'}`} disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                    onClick={async(e)=>{
                                                        try {
                                                            let request = await fetchData("/faqs/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                            numberOfDisLikesFaqsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDislikes;
                                                            numberOfLikesFaqsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }}
                                                    >
                                                        <AiFillLike size={20}/> <span ref={(el)=>numberOfLikesFaqsRef.current.push(el)}>{item.numberOfLikes}</span>
                                                    </button>
                                                    <button className={`btn ${item.isDisliked?'btn-primary':'btn-outline-primary'}`} disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                        onClick={async(e)=>{
                                                            try {
                                                                let request = await fetchData("/faqs/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                numberOfDisLikesFaqsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfDisLikes;
                                                                numberOfLikesFaqsRef.current[index].textContent=jwtDecode(request.token).responseObject.numberOfLikes;
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}>
                                                        <AiFillDislike size={20}/> <span ref={(el)=>numberOfDisLikesFaqsRef.current.push(el)}>{item.numberOfDislikes}</span>
                                                    </button>
                                                <button className="btn btn-outline-primary"
                                                    onClick={async()=>{
                                                        try {
                                                            let request = await fetchData("/comments/faq/"+item.id,"GET",null,setIsLoading);
                                                            console.log(jwtDecode(request.token).response);
                                                            setComments(jwtDecode(request.token).response);
                                                            setIsShown(true);
                                                            setFaqObject({...item,formattedDate});
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }}>
                                                    <AiOutlineComment/> <span ref={(el)=>numberOfCommentsFaqRef.current.push(el)}>{item.numberOfComments}</span>
                                                </button>
                                            </div>
                                        </div>
                                        </Suspense>
                                    )
                                }):(
                                    <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>No faqs are posted yet</p>
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "notifications" && (
                        <section
                            className="tab-pane d-flex flex-row justify-content-center align-items-center flex-wrap feedback-cards-container p-3 position-relative"
                            id="notifications-tab"
                            role="tabpanel"
                            aria-labelledby="notifications"
                        >
                            <span 
                                className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}
                                style={{
                                    position:"absolute",
                                    top: -20,
                                    left:"auto",
                                    right:"auto",
                                }}
                            >{numberOfNotifications} notifications total</span>
                            {
                                notifications && notifications.length!==0 ?(
                                    notifications.map((item,index)=>{
                                        let formattedDate = moment(new Date(Number(item.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                        return(
                                            <Suspense key={index} fallback="loading...">
                                                <div className="feedback-card" style={{
                                                    boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                                    backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgb(7, 15, 43)":"rgb(242, 241, 235)",
                                                    opacity:item.isSeen?"1":".75"
                                                }}>
                                                    <span
                                                        style={{
                                                            position:"absolute",
                                                            top: 10,
                                                            right:10,
                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgb(255,255,255)":"rgb(0,0,0)",
                                                        }}
                                                        onClick={async()=>{
                                                            request = await fetchData("/notifications/pin","PUT",{
                                                                email:localStorage.getItem("email"),
                                                                pin:item.id
                                                            },setIsLoading);
                                                        }}
                                                    >
                                                    {
                                                        item.isPinned?(
                                                            <BsPinFill/>
                                                        ):(
                                                            <BsPin/>
                                                        )
                                                    }
                                                    </span>
                                                    <div>
                                                        <img src={item.userAvatar} alt="" className="avatar"/>
                                                        <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.firstName} {item.lastName}</h4>
                                                        <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}><MdOutlineAlternateEmail /> {item.userEmail}</h5>
                                                    </div>
                                                    <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} w-100 text-start`}><BsCalendar2Date /> {formattedDate}</span>
                                                    <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.content}</p>
                                                    <button className={`btn btn-info ${item.isPrivate?"disabled":""}`} disabled={item.isPrivate} title={item.isPrivate?"this profile is private":"view profile"} 
                                                        onClick={async()=>{
                                                        try {
                                                            let request = await fetchData("/user/users/"+item.userId,"GET",null,setIsLoading);
                                                            if(jwtDecode(request.token).responseObject){
                                                                setUserObject({...jwtDecode(request.token).responseObject,isMyProfile:item.isMyProfile,addedOn:formattedDate});
                                                                if(item.isMyProfile){
                                                                    setComponentName("profile");
                                                                    setIsShown(false);
                                                                }else{
                                                                    setIsShown(true);
                                                                }
                                                            }else{
                                                                setUserObject(null);
                                                            }
                                                        } catch (error) {
                                                            console.log(error);
                                                        }
                                                    }}>{item.isMyProfile?"view my profile":"view user profile"}</button>
                                                </div>
                                            </Suspense>
                                        )
                                    })
                                ):(
                                    <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>
                                        no notifications to be shown
                                    </p>
                                )
                            }
                            {
                                allNotificationsButtonsRef.current.map((_,index)=>{
                                    return(
                                        <button key={index} className="btn btn-info" onClick={async()=>{
                                            try{
                                                let request = await fetchData("/notifications","GET",null,setIsLoading);
                                                setNotifications(jwtDecode(request.token).myNotifications);
                                                setNumberOfPages(jwtDecode(request.token).numberOfPages);
                                                setNumberOfNotifications(jwtDecode(request.token).numberOfNotifications);
                                                setUnseenNotifications(jwtDecode(request.token).unseenNotifications);
                                            } catch (error){
                                                console.log(error);
                                            }
                                        }}>{index+1}</button>
                                    )
                                })
                            }
                        </section>
                    )
                }
                {
                    componentName == "profile" && userObject && userObject.isMyProfile && (
                        <section id="profile" className="tab-pane d-flex flex-row justify-content-center align-items-center flex-wrap feedback-cards-container w-75 p-3">
                            {
                                editing ?(
                                    <div className="mb-3 w-50 d-flex flex-column justify-content-start align-items-center position-relative">
                                        <MdOutlineCancel style={{
                                            position:"absolute",
                                            top:-20,
                                            right:-20,
                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                            cursor:"pointer",
                                            transform:"scale(1.5)"
                                        }}
                                            onClick={()=>{
                                                setEditing(!editing);
                                            }}
                                        />
                                        <div className="mb-3 w-100 d-flex flex-column justify-content-center align-items-center position-relative">
                                            <label 
                                            htmlFor="firstName" 
                                            className={`text-dark w-auto`}
                                            ref={firstNameInputRef}
                                            style={{
                                                position:"absolute",
                                                top:0,
                                                left:0,
                                            }}
                                            >change first name</label>
                                            <input 
                                                type="text" 
                                                name="" 
                                                id="firstName"
                                                onChange={(e)=>setFirstName(e.target.value)}
                                                onFocus={()=>{
                                                    firstNameInputRef.current.classList.add("active")
                                                }}
                                                onBlur={()=>{
                                                    if(firstName.trim().length ===0){
                                                        firstNameInputRef.current.classList.remove("active")
                                                    }
                                                }}
                                                className="form-control w-100"
                                            />
                                        </div>
                                        <div className="mb-3 w-100 d-flex flex-column justify-content-center align-items-center position-relative">
                                            <label 
                                                htmlFor="lastName"
                                                className={`text-dark w-auto`}
                                                ref={lastNameInputRef}
                                                style={{
                                                    position:"absolute",
                                                    top:0,
                                                    left:0,
                                                }}>change last name</label>
                                            <input 
                                                type="text" 
                                                name="" 
                                                id="lastName" 
                                                onChange={(e)=>setLastName(e.target.value)}
                                                onFocus={()=>{
                                                    lastNameInputRef.current.classList.add("active")
                                                }}
                                                onBlur={()=>{
                                                    if(lastName.trim().length ===0){
                                                        lastNameInputRef.current.classList.remove("active")
                                                    }
                                                }}
                                                className="form-control w-100"
                                        />
                                        </div>
                                        <div className="mb-3 w-100 d-flex flex-column justify-content-center align-items-center position-relative">
                                            <label 
                                                htmlFor="password"
                                                ref={passwordInputRef}
                                                className={`text-dark w-auto`}
                                                style={{
                                                    position:"absolute",
                                                    top:0,
                                                    left:0,
                                                }}
                                            >change password</label>
                                            <input 
                                                type={isPasswordVisible?"text":"password"} 
                                                name="" 
                                                id="password"
                                                onChange={(e)=>setPassword(e.target.value)}
                                                onFocus={()=>{
                                                    passwordInputRef.current.classList.add("active")
                                                }}
                                                onBlur={()=>{
                                                    if(password.trim().length ===0){
                                                        passwordInputRef.current.classList.remove("active")
                                                    }
                                                }}
                                                className="form-control w-100"
                                            />
                                            {
                                                isPasswordVisible?(
                                                    <MdVisibility style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                                        position:"absolute",
                                                        right:-20,
                                                        transform:"scale(1.5)",
                                                        cursor:"pointer"
                                                    }}
                                                        onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
                                                    />
                                                ):(
                                                    <MdVisibilityOff style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                                        position:"absolute",
                                                        right:-20,
                                                        transform:"scale(1.5)",
                                                        cursor:"pointer"
                                                    }}
                                                        onClick={()=>setIsPasswordVisible(!isPasswordVisible)}
                                                    />
                                                )
                                            }
                                        </div>
                                        <div className="mb-3 w-100 d-flex flex-column justify-content-start align-items-center">
                                        <div className="mb-3 file-upload-container">
                                            <input
                                                title="add new destination"
                                                type="file"
                                                className="form-control"
                                                name="files"
                                                id=""
                                                placeholder=""
                                                aria-describedby="fileHelpId"
                                                accept="image/jpg, image/png, image/jpeg"
                                                required
                                                onChange={async (e)=>{
                                                    let file = e.target.files[0];
                                                    try {
                                                        let dataURL = await fileReading(file);
                                                        setAvatar(dataURL);
                                                    } catch (error) {
                                                        console.log(error);
                                                    }
                                                }}
                                            />
                                            <LuUpload />
                                        </div>
                                        <div className="image-slide images-container">
                                            {
                                                avatar && (<img src={avatar} alt="avatar" width={200} height={150} style={{borderRadius:15}}/>)
                                            }
                                        </div>
                                    </div>
                                        <div className="mb-3 w-100 d-flex flex-column justify-content-start align-items-center">
                                            <button 
                                                className={`btn btn-info
                                                    ${(
                                                        firstName.trim().length == 0 ||
                                                        lastName.trim().length == 0 ||
                                                        password.trim().length == 0 ||
                                                        avatar.trim().length == 0
                                                    )
                                                    ?"disabled":""}`
                                                }
                                                disabled={
                                                    firstName.trim().length == 0 ||
                                                    lastName.trim().length == 0 ||
                                                    password.trim().length == 0 ||
                                                    avatar.trim().length == 0
                                                }
                                                onClick={async()=>{
                                                try {
                                                    let response = await fetchData("/user/profile/update","PUT",{
                                                        firstName,
                                                        lastName,
                                                        password,
                                                        avatar,
                                                        email:localStorage.getItem("email"),
                                                    },setIsLoading);
                                                    if(jwtDecode(response.token).message){
                                                        setResponseMessage(jwtDecode(response.token).message);
                                                        notificationRef?.current?.classList.remove("hidden");
                                                        localStorage.setItem("firstName",jwtDecode(response.token).firstName);
                                                        localStorage.setItem("lastName",jwtDecode(response.token).lastName);
                                                        localStorage.setItem("email",jwtDecode(response.token).email);
                                                        localStorage.setItem("avatar",jwtDecode(response.token).path);
                                                        setTimeout(()=>{
                                                            notificationRef?.current?.classList.add("hidden");
                                                        },4000)
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}><MdUpdate/> <span>update data</span></button>
                                        </div>
                                    </div>
                                ):(
                                <div 
                                    className="feedback-card w-50 h-100" 
                                    style={{
                                    boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                    backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgb(7, 15, 43)":"rgb(242, 241, 235)",
                                }}>
                                    <FaEdit 
                                        style={{
                                            position:"absolute",
                                            top:10,
                                            right:10,
                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgb(255,255,255)":"rgb(0,0,0)",
                                            cursor:"pointer"
                                        }}
                                            onClick={()=>{
                                                setEditing(!editing);
                                            }}
                                        />
                                    <div>
                                        <img src={userObject.userAvatar} alt="" className="avatar"/>
                                        <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{userObject.firstName} {userObject.lastName}</h4>
                                        <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}><MdOutlineAlternateEmail /> {userObject.email}</h5>
                                    </div>
                                </div>
                                )
                            }
                        </section>
                    )
                }
            </section>
        {
            (isShown && faqObject) && (
                <DialogBox comments={comments} setFaqObject={setFaqObject} setComments={setComments} faqObject={faqObject} isShown={isShown} setIsShown={setIsShown}/>
            )
        }
        {
            (isShown && feedbackObject) && (
                <DialogBox feedbackObject={feedbackObject} setFeedbackObject={setFeedbackObject} comments={comments} setComments={setComments} isShown={isShown} setIsShown={setIsShown}/>
            )
        }
        {
            (isShown && userObject && !userObject.isMyProfile) && (
                <DialogBox userObject={userObject} isShown={isShown} setIsShown={setIsShown} setUserObject={setUserObject}/>
            )
        }
        {
            isPending && (
                <Loading/>
            )
        }
        </main>
    )
}
