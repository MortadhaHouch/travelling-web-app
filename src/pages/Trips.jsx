/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  { Suspense, useContext, useEffect, useState } from 'react'
import Loading from './Loading';
import { FaRegUser } from 'react-icons/fa6';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { BsCalendar2Date } from 'react-icons/bs';
import { loginState, themeContext } from "../App";
import { fetchData } from '../../utils/fetchData';
import { DialogBox } from './DialogBox';
import SwiperElement from './SwiperElement';
import moment from 'moment';
import { gsapAnimationHandler } from '../../utils/animation';
import { AiFillLike } from 'react-icons/ai';
export default function Trips(props) {
    let [isLoading,setIsLoading] = useState(false);
    let {isDark,setIsDark} = useContext(themeContext);
    let [trips,setTrips] = useState([]);
    let [isShown,setIsShown] = useState(false);
    let [itemToRemove,setItemToRemove]= useState(null);
    let [entity,setEntity] = useState("");
    let {isLoggedIn} = useContext(loginState)
    useEffect(()=>{
        setTrips(trips);
        return ()=> setTrips([]); 
    },[trips])
    useEffect(()=>{
        getData();
    },[])
    useEffect(()=>{
        if(isShown == false){
            getData();
        }
    },[isShown]);
    useEffect(()=>{
        gsapAnimationHandler("p.p-indicator",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
    },[])
    async function getData(){
        try {
            let data = await fetchData("/trips","GET",null,setIsLoading);
            setTrips(data.response);
            console.log(trips);
            console.log(data);
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
                trips.length!==0 ? trips.map((item,index)=>{
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
                                    ><AiFillLike size={20} className={(isLoggedIn || localStorage.getItem("isLoggedIn") && item.isTripSaved) && `active`}/> {item.numberOfSaves}</button>
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
            {
                (isShown && itemToRemove) && <DialogBox isShown={isShown} message="remove-item" callback={fetchData} setIsLoading={setIsLoading} setIsShown={setIsShown} entity={entity} data={itemToRemove}/>
            }
        </section>
    )
}
