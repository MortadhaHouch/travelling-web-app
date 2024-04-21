/* eslint-disable no-unused-vars */
import { Suspense, useContext, useEffect, useState } from "react";
import { store } from "../../reducers/store"
import { themeContext } from "../App";
import {fetchData} from "../../utils/fetchData"
import { MdCollectionsBookmark, MdOutlineAlternateEmail, MdSchedule } from "react-icons/md";
import { AiFillDislike, AiFillEyeInvisible, AiFillLike, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineComment, AiOutlineSend } from "react-icons/ai";
import { VscFeedback } from "react-icons/vsc";
import { jwtDecode } from "jwt-decode";
import { FaBookmark, FaEdit, FaEye, FaRegUser } from "react-icons/fa";
import { BsCalendar2Date } from "react-icons/bs";
import moment from "moment";
import Loading from "./Loading";
import SwiperElement from "./SwiperElement";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoNotifications } from "react-icons/io5";
export default function Profile(){
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    let [userObjects,setUserObjects] = useState(null);
    let [componentName,setComponentName] = useState("planned-trips");
    let [tripsFilter,setTripsFilter] = useState("saved");
    let [isShown,setIsShown] = useState(true);
    let [savedTrips,setSavedTrips] = useState([]);
    let [plannedTrips,setPlannedTrips] = useState([]);
    let [likedTrips,setLikedTrips] = useState([]);
    let [dislikedTrips,setDislikedTrips] = useState([]);
    let [postedFeedbacks,setPostedFeedbacks] = useState([]);
    let [postedFaqs,setPostedFaqs] = useState([]);
    let [notifications,setNotifications] = useState([]);
    let [isLoading,setIsLoading] = useState(false);
    useEffect(()=>{
        setUserObjects(userObjects);
    },[userObjects])
    useEffect(()=>{
        setPlannedTrips(plannedTrips);
        console.log(plannedTrips)
        return ()=> setPlannedTrips([])
    },[plannedTrips])
    useEffect(()=>{
        setSavedTrips(savedTrips);
        console.log(savedTrips)
        return ()=> setSavedTrips([])
    },[savedTrips])
    useEffect(()=>{
        setLikedTrips(likedTrips)
        console.log(likedTrips)
        return ()=> setLikedTrips([])
    },[likedTrips])
    useEffect(()=>{
        setDislikedTrips(dislikedTrips)
        console.log(dislikedTrips)
        return ()=> setDislikedTrips([])
    },[dislikedTrips])
    useEffect(()=>{
        setPostedFeedbacks(postedFeedbacks)
        console.log(postedFeedbacks)
        return ()=> setPostedFeedbacks([])
    },[postedFeedbacks])
    useEffect(()=>{
        setPostedFaqs(postedFaqs)
        console.log(postedFaqs)
        return ()=> setPostedFaqs([])
    },[postedFaqs])
    useEffect(()=>{
        setComponentName(componentName);
        return ()=>setComponentName(componentName);
    },[componentName])
    useEffect(()=>{
        setTripsFilter(tripsFilter)
    },[tripsFilter])
    useEffect(()=>{
        setIsShown(isShown);
    },[isShown])
    useEffect(()=>{
        setNotifications(notifications);
        console.log(notifications);
        return ()=>setNotifications([]);
    },[notifications]);
    let {isDark,setIsDark} = useContext(themeContext);
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
                case "/notifications":
                    request = await fetchData(url,"GET",null,setIsLoading);
                    setNotifications(jwtDecode(request.token).notifications);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className="d-flex flex-column justify-content-center align-items-center" style={{
            backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
        }}>
            <ul className={`nav nav-tabs aside ${isShown?"shown":""}`} id="myTab" role="tablist">
                <button className="btn btn-primary tooltip-arrow" onClick={()=>setIsShown(!isShown)}>
                    {
                        isShown?(
                            <AiOutlineArrowLeft color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"}/>
                        ):(
                            <AiOutlineArrowRight color={(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"}/>
                        )
                    }
                </button>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link active"
                        id="planned-trips-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#planned-trips"
                        type="button"
                        role="tab"
                        aria-controls="planned-trips"
                        aria-selected="true"
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
                            getData("/notifications");
                        }}
                    >
                        <IoNotifications/><span className="mx-1">notifications</span>
                    </button>
                </li>
            </ul>
            <section className="tab-content">
                {
                    componentName == "planned-trips" && (
                        <section
                            className="tab-pane d-flex flex-column justify-content-start align-items-center p-3 feedback-cards-container active"
                            id="planned-trips"
                            role="tabpanel"
                            aria-labelledby="planned-trips"
                        >
                            {
                                plannedTrips.length!==0 ? plannedTrips.map((item,index)=>{
                                    const formattedDate = moment(new Date(Number(item.date))).format('MMMM Do YYYY, h:mm:ss a');
                                    return(
                                        <Suspense key={index} fallback={<Loading/>}>
                                            <div className="trip-details-container" style={{
                                                backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
                                            }}>
                                                <button className="btn btn-close" title="remove trip" onClick={()=>{
                                                    setEntity("trip-trip");
                                                    setIsShown(true);
                                                    setItemToRemove(item);
                                                }}></button>
                                                <div>
                                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                                        {
                                                            <SwiperElement images={item.links}/>
                                                        }
                                                    </div>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.destination}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.description}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.period} days</p>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripLiked) && `active`}/> {item.numberOfLikes}</button>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    >
                                                        <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripSaved) && `active`}/> {item.numberOfSaves}</button>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.maxNumberOfParticipators}/{item.numberOfParticipators}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>added on {formattedDate}</p>
                                                </div>
                                                <div>
                                                    {
                                                        item.users.length!==0 ? item.users.map((el,i)=>{
                                                            const formattedDate = moment(new Date(Number(el.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                                            return(
                                                                <Suspense key={i}>
                                                                    <div className="user-card-item">
                                                                        <img src={el.userAvatar} alt="image" />
                                                                        <button className="btn btn-close btn-danger" onClick={()=>{
                                                                            setIsShown(true);
                                                                            setEntity("user-trip");
                                                                            setItemToRemove(el);
                                                                        }}></button>
                                                                        <p title="click to copy"
                                                                            style={{
                                                                                color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                                                                cursor:"pointer",
                                                                                scale:.5,
                                                                                textAlign:"center"
                                                                            }} onClick={(e)=>{
                                                                                navigator.clipboard.writeText(e.target.textContent)
                                                                            }}>{el.email}</p>
                                                                        <p style={{
                                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                                        }}><FaRegUser /> {el.firstName} {el.lastName}</p>
                                                                        <p style={{
                                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                                        }}><LiaBirthdayCakeSolid /> {el.dateOfBirth}</p>
                                                                        <p style={{
                                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                                        }}>added on <BsCalendar2Date /> {formattedDate}</p>
                                                                    </div>
                                                                </Suspense>
                                                            )
                                                        }):(
                                                            <p style={{
                                                                color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                            }}>No users are registered to this trip</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </Suspense>
                                    )
                                }):(
                                    <p className='p-indicator' style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}>No trips are scheduled yet</p>
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "saved-trips" && (
                        <section
                            className="tab-pane d-flex flex-column justify-content-start align-items-center p-3 feedback-cards-container active"
                            id="saved-trips"
                            role="tabpanel"
                            aria-labelledby="saved-trips"
                        >
                            {
                                savedTrips.length!==0 ? savedTrips.map((item,index)=>{
                                    const formattedDate = moment(new Date(Number(item.date))).format('MMMM Do YYYY, h:mm:ss a');
                                    return(
                                        <Suspense key={index} fallback={<Loading/>}>
                                            <div className="trip-details-container" style={{
                                                backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
                                            }}>
                                                <button className="btn btn-close" title="remove trip" onClick={()=>{
                                                    setEntity("trip-trip");
                                                    setIsShown(true);
                                                    setItemToRemove(item);
                                                }}></button>
                                                <div>
                                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                                        {
                                                            <SwiperElement images={item.links}/>
                                                        }
                                                    </div>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.destination}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.description}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.period} days</p>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripLiked) && `active`}/> {item.numberOfLikes}</button>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    >
                                                        <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripSaved) && `active`}/> {item.numberOfSaves}</button>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.maxNumberOfParticipators}/{item.numberOfParticipators}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>added on {formattedDate}</p>
                                                </div>
                                                <div>
                                                    {
                                                        item.users.length!==0 ? item.users.map((el,i)=>{
                                                            const formattedDate = moment(new Date(Number(el.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                                            return(
                                                                <Suspense key={i}>
                                                                    <div className="user-card-item">
                                                                        <img src={el.userAvatar} alt="image" />
                                                                        <button className="btn btn-close btn-danger" onClick={()=>{
                                                                            setIsShown(true);
                                                                            setEntity("user-trip");
                                                                            setItemToRemove(el);
                                                                        }}></button>
                                                                        <p title="click to copy"
                                                                            style={{
                                                                                color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                                                                cursor:"pointer",
                                                                                scale:.5,
                                                                                textAlign:"center"
                                                                            }} onClick={(e)=>{
                                                                                navigator.clipboard.writeText(e.target.textContent)
                                                                            }}>{el.email}</p>
                                                                        <p style={{
                                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                                        }}><FaRegUser /> {el.firstName} {el.lastName}</p>
                                                                        <p style={{
                                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                                        }}><LiaBirthdayCakeSolid /> {el.dateOfBirth}</p>
                                                                        <p style={{
                                                                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                                        }}>added on <BsCalendar2Date /> {formattedDate}</p>
                                                                    </div>
                                                                </Suspense>
                                                            )
                                                        }):(
                                                            <p style={{
                                                                color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                            }}>No trips are saved</p>
                                                        )
                                                    }
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
                            className="tab-pane d-flex flex-column justify-content-start align-items-center p-3 feedback-cards-container active"
                            id="liked-trips"
                            role="tabpanel"
                            aria-labelledby="liked-trips"
                        >
                            {
                                likedTrips.length!==0 ? likedTrips.map((item,index)=>{
                                    const formattedDate = moment(new Date(Number(item.date))).format('MMMM Do YYYY, h:mm:ss a');
                                    return(
                                        <Suspense key={index} fallback={<Loading/>}>
                                            <div className="trip-details-container" style={{
                                                backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
                                            }}>
                                                <button className="btn btn-close" title="remove trip" onClick={()=>{
                                                    setEntity("trip-trip");
                                                    setIsShown(true);
                                                    setItemToRemove(item);
                                                }}></button>
                                                <div>
                                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                                        {
                                                            <SwiperElement images={item.links}/>
                                                        }
                                                    </div>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.destination}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.description}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.period} days</p>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripLiked) && `active`}/> {item.numberOfLikes}</button>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    >
                                                        <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripSaved) && `active`}/> {item.numberOfSaves}</button>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.maxNumberOfParticipators}/{item.numberOfParticipators}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>added on {formattedDate}</p>
                                                </div>
                                            </div>
                                        </Suspense>
                                    )
                                }):(
                                    <p className='p-indicator' style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}>No trips you have rated yet</p>
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "disliked-trips" && (
                        <section
                            className="tab-pane d-flex flex-column justify-content-start align-items-center p-3 feedback-cards-container active"
                            id="disliked-trips"
                            role="tabpanel"
                            aria-labelledby="disliked-trips"
                        >
                            {
                                dislikedTrips.length!==0 ? dislikedTrips.map((item,index)=>{
                                    const formattedDate = moment(new Date(Number(item.date))).format('MMMM Do YYYY, h:mm:ss a');
                                    return(
                                        <Suspense key={index} fallback={<Loading/>}>
                                            <div className="trip-details-container" style={{
                                                backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
                                            }}>
                                                <button className="btn btn-close" title="remove trip" onClick={()=>{
                                                    setEntity("trip-trip");
                                                    setIsShown(true);
                                                    setItemToRemove(item);
                                                }}></button>
                                                <div>
                                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                                        {
                                                            <SwiperElement images={item.links}/>
                                                        }
                                                    </div>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.destination}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.description}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.period} days</p>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/react","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripLiked) && `active`}/> {item.numberOfLikes}</button>
                                                    <button style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}
                                                        disabled={!(isLoggedIn || localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/trips/save","PUT",{id:item.id,email:localStorage.getItem("email")},setIsLoading);
                                                                getData();
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                    >
                                                        <FaBookmark size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripSaved) && `active`}/> {item.numberOfSaves}</button>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>{item.maxNumberOfParticipators}/{item.numberOfParticipators}</p>
                                                    <p style={{
                                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                                    }}>added on {formattedDate}</p>
                                                </div>
                                            </div>
                                        </Suspense>
                                    )
                                }):(
                                    <p className='p-indicator' style={{
                                        color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B"
                                    }}>No trips you have rated yet</p>
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "posted-feedbacks" && (
                        <section
                            className="tab-pane d-flex flex-column justify-content-start align-items-center p-3 feedback-cards-container active"
                            id="posted-feedbacks"
                            role="tabpanel"
                            aria-labelledby="posted-feedbacks"
                        >
                            {
                                componentName == "feedbacks" && (
                                    postedFeedbacks && postedFeedbacks.length !== 0 ? postedFeedbacks.map((item,index)=>{
                                        const formattedDate = moment(new Date(Number(item.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                        return(
                                            <Suspense key={index} fallback={"loading..."}>
                                                <div className="feedback-card m-2" style={{
                                                    boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                                }}>
                                                    <div>
                                                        <img src={item.avatar} alt="" />
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
                                                        <button className="btn btn-outline-primary" disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/feedbacks/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                                    numberOfDislikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfDislikes;
                                                                    numberOfLikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        >
                                                            <AiFillLike size={20}/> <span ref={numberOfLikesRef}>{item.numberOfLikes}</span>
                                                        </button>
                                                        <button className="btn btn-outline-primary" disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                            onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/feedbacks/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                    numberOfDislikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfDislikes;
                                                                    numberOfLikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}>
                                                            <AiFillDislike size={20}/> <span ref={numberOfDislikesRef}>{item.numberOfDislikes}</span>
                                                        </button>
                                                        <button className="btn btn-outline-primary"
                                                                onClick={()=>{
                                                                    textBoxRef.current[index]?.classList.toggle("shown");
                                                                }}
                                                            >
                                                            <AiOutlineComment/> <span ref={numberOfCommentRef}>{item.numberOfComments}</span>
                                                        </button>
                                                        <button className={`btn btn-outline-primary ${!(JSON.parse(localStorage.getItem("isLoggedIn")) || item.feedbackIsMine)?"disabled":""}`} disabled={!(JSON.parse(localStorage.getItem("isLoggedIn")) && item.feedbackIsMine)}>
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                    <div ref={(el)=>textBoxRef.current.push(el)} className="w-100 d-flex justify-content-center align-items-center text-box">
                                                        <textarea name="" id="" className="form-control w-100" style={{resize:"none"}}></textarea>
                                                        <button className="btn btn-info" disabled={!(JSON.parse(localStorage.getItem("isLoggedIn")) || comment.length == 0)}>
                                                            <AiOutlineSend/>
                                                        </button>
                                                    </div>
                                                    {
                                                        item.reactors.length !== 0 ?(
                                                            <div className="w-100 d-flex justify-content-center align-items-center">
                                                                {
                                                                    item.reactors.map((el,i)=>{
                                                                    return(
                                                                        <div key={i} className="d-flex justify-content-center align-items-center">
                                                                            <img src={el.reactorAvatar} alt="" />
                                                                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.reactorFirstName}</p>
                                                                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.reactorLastName}</p>
                                                                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.content}</p>
                                                                            <input type="checkbox" name="" id="" className="form-control" checked={el.isLiked}/>
                                                                        </div>
                                                                    )
                                                                    })
                                                                }
                                                            </div>
                                                        ):(
                                                            <></>
                                                        )
                                                    }
                                                </div>
                                            </Suspense>
                                        )
                                    }):(
                                        <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>No feedbacks are posted yet</p>
                                    )
                                )
                            }
                        </section>
                    )
                }
                {
                    componentName == "posted-faqs" && (
                        <section
                            className="tab-pane d-flex flex-column justify-content-start align-items-center p-3 feedback-cards-container active"
                            id="posted-faqs"
                            role="tabpanel"
                            aria-labelledby="posted-faqs"
                        >
                            {
                                componentName == "see-faqs-tab" && (
                                    postedFaqs && postedFaqs.length !== 0 ? postedFaqs.map((item,index)=>{
                                        let formattedDate = moment(new Date(Number(item.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                        return(
                                            <Suspense key={index} fallback="loading...">
                                                <div className="feedback-card" style={{
                                                    boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                                }}>
                                                    <div>
                                                        <img src={item.avatar} alt="" className="avatar"/>
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
                                                    <button className="btn btn-outline-secondary" disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                                try {
                                                                    let request = await fetchData("/feedbacks/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"like"},setIsLoading);
                                                                    numberOfDislikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfDislikes;
                                                                    numberOfLikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfLikes;
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }}
                                                        >
                                                            <AiFillLike size={20}/> <span ref={numberOfLikesRef}>{item.numberOfLikes}</span>
                                                        </button>
                                                        <button className="btn btn-outline-secondary" disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                                        onClick={async()=>{
                                                            try {
                                                                let request = await fetchData("/feedbacks/react","PUT",{id:item.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                                numberOfDislikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfDislikes;
                                                                numberOfLikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfLikes;
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}>
                                                            <AiFillDislike size={20}/> <span ref={numberOfDislikesRef}>{item.numberOfDislikes}</span>
                                                        </button>
                                                    <button className={`btn btn-outline-primary ${!(JSON.parse(localStorage.getItem("isLoggedIn")) || item.faqIsMine)?"disabled":""}`} disabled={!(JSON.parse(localStorage.getItem("isLoggedIn")) || item.feedbackIsMine)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="btn btn-outline-secondary"
                                                        onClick={async()=>{
                                                            textBoxRef.current[index]?.classList.toggle("shown");
                                                        }}>
                                                        <AiOutlineComment/> <span ref={numberOfCommentRef}>{item.numberOfComments}</span>
                                                    </button>
                                                </div>
                                                <div ref={(el)=>textBoxRef.current.push(el)} className="w-100 d-flex justify-content-center align-items-center text-box">
                                                    <textarea name="" id="" className="form-control w-100" style={{resize:"none"}} value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
                                                    <button className="btn btn-info" disabled={!JSON.parse(localStorage.getItem("isLoggedIn")) || comment.length == 0}
                                                        onClick={async()=>{
                                                            try {
                                                            let request = await fetchData("/faqs/comment","POST",{
                                                                email:localStorage.getItem("email").trim(),
                                                                comment:comment.trim(),
                                                            })
                                                            } catch (error) {
                                                                console.log(error);
                                                            }
                                                        }}
                                                        >
                                                        <AiOutlineSend/>
                                                    </button>
                                                </div>
                                                {
                                                    item.reactors.length !== 0 ?(
                                                        <div className="w-100 d-flex justify-content-center align-items-center">
                                                            {
                                                                item.reactors.map((el,i)=>{
                                                                    return(
                                                                        <div key={i} className="d-flex justify-content-center align-items-center">
                                                                            <img src={el.reactorAvatar} alt="" />
                                                                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.reactorFirstName}</p>
                                                                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.reactorLastName}</p>
                                                                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{el.content}</p>
                                                                            <input type="checkbox" name="" id="" className="form-control" checked={el.isLiked}/>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    ):(
                                                        <></>
                                                    )
                                                }
                                            </div>
                                            </Suspense>
                                        )
                                    }):(
                                        <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>No faqs are posted yet</p>
                                    )
                                )
                            }
                        </section>
                    )
                }
            </section>
        </main>
    )
}
