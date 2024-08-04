/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import Logo from "../assets/WhatsApp_Image_2024-02-24_at_20.46.19_a0be8a11-removebg-preview (1).png"
import { themeContext } from "../App";
import {fetchData} from "../../utils/fetchData"
import paymentGateWays from "../../utils/paymentGateWays"
import {jwtDecode} from "jwt-decode"
import { AiFillDislike, AiFillEyeInvisible, AiFillLike, AiOutlineComment, AiOutlineSend } from "react-icons/ai";
import { FaArrowRight, FaEdit, FaEye, FaFemale, FaMale, FaRegUser } from "react-icons/fa";
import { MdAddComment, MdOutlineAlternateEmail } from "react-icons/md";
import { BsArrowDownRight, BsArrowDownRightCircleFill, BsCalendar2Date, BsFillArrowDownRightCircleFill, BsSend } from "react-icons/bs";
import moment from "moment";
import Arrow from "./Arrow";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
function DialogBox(props) {
    let {isDark,setIsDark} = useContext(themeContext);
    let [isLoading,setIsLoading] = useState(false);
    let [date,setDate] = useState("");
    let [numberOfPeople,setNumberOfPeople] = useState(1);
    let [cardID,setCardID] = useState("");
    let [period,setPeriod] = useState("");
    let [totalPrice,setTotalPrice] = useState();
    let [paymentGateway,setPaymentGateway] = useState("Arab Tunisian Bank (ATB)");
    let textareaRef = useRef();
    let numberOfDislikesRef = useRef();
    let numberOfLikesRef = useRef();
    let numberOfCommentRef = useRef();
    let [comment,setComment] = useState("");
    let numberOfDislikesForFaqRef = useRef();
    let numberOfLikesForFaqRef = useRef();
    let ref = useRef();
    async function handleSubmit(){
        try {
            let response = await fetchData("/trips/participate","POST",{
                date,
                cinNumber,
                numberOfPeople,
                period,
                paymentGateway
            },setIsLoading)
            console.log(jwtDecode(response));
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        setCardID(cardID)
    },[cardID])
    useEffect(()=>{
        setNumberOfPeople(numberOfPeople)
    },[numberOfPeople])
    useEffect(()=>{
        setDate(date)
    },[date])
    useEffect(()=>{
        setTotalPrice(totalPrice)
    },[totalPrice])
    useEffect(()=>{
        setPeriod(period)
    },[period])
    useEffect(()=>{
        setPaymentGateway(paymentGateway);
        return ()=>setPaymentGateway("");
    },[paymentGateway])
    useEffect(()=>{
        setComment(comment);
        return ()=>setComment("");
    },[comment])
    return (
        // eslint-disable-next-line react/prop-types
        <section className={"dialog "+(props.isShown?"shown":"hidden")} ref={ref} style={{
            boxShadow:" 0px 0px 80px -30px rgba(0,0,0,0.75)",
            backgroundColor: (isDark || JSON.parse(localStorage.getItem("isDark")))? "rgba(25,25,25,0.75)" : "rgba(242, 241, 235, 0.25)",
        }}>
            <div style={{
                backgroundColor: (isDark || JSON.parse(localStorage.getItem("isDark")))? "rgba(25,25,25,0.75)" : "#F2F1EB",
                overflowX:"hidden",
                overflowY:"scroll"
            }}>
                <img src={Logo} alt="" width={100} height={100}/>
                {
                    props.data && (
                        <>
                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>
                            {
                                props.data.destination
                            }
                            </p>
                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>
                                {
                                    props.data.description
                                }
                            </p>
                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>
                                {
                                    props.data.period
                                }
                            </p>
                            <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>
                                {
                                    Date(props.data.date).toString()
                                }
                            </p>
                        </>
                    )
                }
                <br/>
                {
                    props.message && props.message.includes("hidden") && (
                        <button className="btn btn-info" onClick={()=>{
                            ref.current?.classList.add("hidden");
                            setTimeout(()=>{
                                location.assign("/user/login")
                            },250)
                        }}>login</button>
                    )
                }
                {
                    props.message && props.message.includes("remove-item") && (
                        <button className="btn btn-danger remove-button" onClick={()=>{
                            let [entity1,entity2] = props.entity.split("-");
                            if(entity1==entity2){
                                if (entity1=="user") {
                                    props.callback("/user/users/"+props.itemToRemove.email,"DELETE",null,props.setIsLoading);
                                } else if (entity1=="trip"){
                                    props.callback("/trips/remove/"+props.data.destination,"DELETE",null,props.setIsLoading);
                                }
                            }else{
                                if (entity1=="trip" && entity2 == "user") {
                                    props.callback("/trips/users/remove/"+props.itemToRemove.email,"DELETE",null,props.setIsLoading);
                                }
                            }
                        }}>remove</button>
                    )
                }
                {
                    props.targetAction && props.targetAction == "participate" && (
                        <form action="" onSubmit={handleSubmit} className="w-100 d-flex flex-column justify-content-center align-items-center">
                            <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                                <div className="w-50">
                                    <label htmlFor="date" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        id="date"
                                        aria-describedby="date"
                                        value={date}
                                        onChange={(e)=>{setDate(e.target.value)}}
                                    />
                                </div>
                                <div className="w-50">
                                    <label htmlFor="period" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>period</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="period"
                                        id="period"
                                        aria-describedby="period"
                                        value={period}
                                        onChange={(e)=>{setPeriod(Number(e.target.value))}}
                                    />
                                </div>
                            </div>
                            <div className="w-100 d-flex flex-row justify-content-center align-items-center">
                                <div className="w-50">
                                    <label htmlFor="number_of_people" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>number of people</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="number_of_people"
                                        id="number_of_people"
                                        aria-describedby="number of people"
                                        placeholder="number_of_people"
                                        value={numberOfPeople}
                                        onChange={(e)=>{setNumberOfPeople(Number(e.target.value))}}
                                    />
                                </div>
                                <div className="w-50">
                                    <label htmlFor="cardID" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>card ID</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name=""
                                        id="cardID"
                                        minLength={14}
                                        maxLength={14}
                                        placeholder="cardID"
                                        aria-describedby="emailHelpId"
                                        value={cardID}
                                        onChange={(e)=>{setCardID(Number(e.target.value))}}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 w-100">
                                <select
                                    className="form-select form-select-lg w-100"
                                    name=""
                                    id=""
                                    onChange={(e)=>{
                                        setPaymentGateway(e.target.value);
                                    }}
                                >
                                    {
                                        paymentGateWays.map((item,index)=>{
                                            return(
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <p className="text-bg-info">{totalPrice}</p>
                            <button className="btn btn-success" type="submit">confirm participation</button>
                        </form>
                    )
                }
                {
                    (props.comments && props.feedbackObject) && (
                        <section className="feedback-cards-container w-100 h-auto d-flex flex-column justify-content-start align-items-center overflow-y-scroll">
                            <div className="feedback-card w-75 m-2 p-2" style={{
                                    boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                }}>
                                    <div>
                                        <img src={props.feedbackObject.userAvatar} alt=""/>
                                        <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{props.feedbackObject.userFirstName} {props.feedbackObject.userLastName}</h4>
                                        <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}><MdOutlineAlternateEmail /> {props.feedbackObject.userEmail}</h5>
                                    </div>
                                    <>
                                        {
                                            props.feedbackObject.isVisibleByOthers?(
                                                <div className="w-100 d-flex flex-row justify-content-center align-items-center w-100 h-auto p-1">
                                                    <FaEye className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                    <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {props.feedbackObject.formattedDate}</span>
                                                </div>
                                            ):(
                                                <div className="w-100 d-flex flex-row justify-content-center align-items-center w-100 h-auto p-1">
                                                    <AiFillEyeInvisible className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                    <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {props.feedbackObject.formattedDate}</span>
                                                </div>
                                            )
                                        }
                                    </>
                                    <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{props.feedbackObject.content}</p>
                                    <div className="w-100 d-flex flex-row justify-content-between align-items-center p-1">
                                        <button 
                                            className={`btn ${props.feedbackObject.isLiked?'btn-primary':'btn-outline-primary'} flex-grow-1`} disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}>
                                            <AiFillLike className="mx-1"/> <span ref={numberOfLikesRef}>{props.feedbackObject.numberOfLikes}</span>
                                        </button>
                                        <button 
                                            className="btn btn-outline-primary d-flex flex-row justify-content-center align-items-center flex-grow-1" 
                                            disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                            onClick={async()=>{
                                                try {
                                                    let request = await fetchData("/feedbacks/react","PUT",{id:props.feedbackObject.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                    numberOfDislikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfDislikes;
                                                    numberOfLikesRef.current.textContent=jwtDecode(request.token).feedback.numberOfLikes;
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}>
                                            <AiFillDislike className="mx-1"/> <span ref={numberOfDislikesRef}>{props.feedbackObject.numberOfDislikes}</span>
                                        </button>
                                        <button 
                                            className="btn btn-outline-primary d-flex flex-row justify-content-center align-items-center flex-grow-1"
                                            onClick={()=>{
                                                textareaRef.current?.classList.toggle("shown")
                                            }}
                                            >
                                            <MdAddComment className="mx-1"/>
                                            <span ref={numberOfCommentRef}>{props.feedbackObject.numberOfComments}</span>
                                        </button>
                                        <button 
                                            className={`btn btn-outline-primary d-flex flex-row justify-content-center align-items-center flex-grow-1 ${(JSON.parse(localStorage.getItem("isLoggedIn")) && props.feedbackObject.feedbackIsMine) ? "" : "disabled"}`} 
                                            disabled={!(JSON.parse(localStorage.getItem("isLoggedIn")) && props.feedbackObject.feedbackIsMine)}>
                                            <FaEdit className="mx-1"/>
                                        </button>
                                    </div>
                                    <div className="d-flex flex-row justify-content-start align-items-center text-box" ref={textareaRef}>
                                        <textarea 
                                            name="comment" 
                                            id="comment" 
                                            cols="30"
                                            style={{resize:"none"}} 
                                            className="w-100 form-control" 
                                            value={comment} 
                                            onChange={(e)=>setComment(e.target.value)}
                                        ></textarea>
                                        <button 
                                            className={`btn btn-primary ${!(JSON.parse(localStorage.getItem("isLoggedIn") && comment.length > 0))?"disabled":""}`}
                                            disabled={!(JSON.parse(localStorage.getItem("isLoggedIn") && comment.length !== 0))}
                                            onClick={async()=>{
                                            try {
                                                let request = await fetchData("/comments/feedback/add","POST",{
                                                    content:comment.trim(),
                                                    from:localStorage.getItem("email"),
                                                    to:props.feedbackObject.userEmail,
                                                    id:props.feedbackObject.id
                                                },setIsLoading);
                                                setComment("");
                                                console.log(jwtDecode(request.token).responseObject);
                                                props.setComments((data)=>[...data,jwtDecode(request.token).responseObject])
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}>
                                            <BsSend size={20}/>
                                        </button>
                                    </div>
                                </div>
                                {
                                    props.comments.map((item,index)=>{
                                        let formattedDate = moment(new Date(Number(item.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                        return(
                                            <Suspense key={index} fallback="loading...">
                                                <div className="feedback-card w-75 m-2 p-4" style={{
                                                        boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                                        padding:"20px"
                                                    }}>
                                                    <div className="w-100 position-relative">
                                                        <img src={item.senderAvatar} alt="" style={{border:`3px solid ${item.senderIsLoggedIn?"green":"red"}`}}/>
                                                        <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}>{item.senderEmail}</h4>
                                                        <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}>{item.senderName}</h5>
                                                    </div>
                                                        <div>
                                                            <Arrow/>
                                                            <div>
                                                                <img src={item.receiverAvatar} alt="" style={{border:`3px solid ${item.receiverIsLoggedIn?"green":"red"}`}}/>
                                                                <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}>{item.receiverName}</h4>
                                                                <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}>{item.receiverEmail}</h5>
                                                            </div>
                                                        </div>
                                                    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                                                        <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50 w-100`}><BsCalendar2Date/>{formattedDate}</span>
                                                        <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-100 w-100`}>{item.content}</p>
                                                    </div>
                                                </div>
                                            </Suspense>
                                        )
                                    })
                                }
                        </section>
                    )
                }
                {
                    (props.comments && props.faqObject) && (
                        <section className="feedback-cards-container w-100 h-auto d-flex flex-column justify-content-start align-items-center overflow-y-scroll">
                            <div className="feedback-card w-75 m-2 p-2" style={{
                                    boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                }}>
                                    <div>
                                        <img src={props.faqObject.userAvatar} alt="" />
                                        <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{props.faqObject.userFirstName} {props.faqObject.userLastName}</h4>
                                        <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}><MdOutlineAlternateEmail /> {props.faqObject.userEmail}</h5>
                                    </div>
                                    <>
                                        {
                                            props.faqObject.isVisibleByOthers?(
                                                <div className="w-100 d-flex flex-row justify-content-center align-items-center w-100 h-auto p-1">
                                                    <FaEye className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                    <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {props.faqObject.formattedDate}</span>
                                                </div>
                                            ):(
                                                <div className="w-100 d-flex flex-row justify-content-center align-items-center w-100 h-auto p-1">
                                                    <AiFillEyeInvisible className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}/>
                                                    <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> {props.faqObject.formattedDate}</span>
                                                </div>
                                            )
                                        }
                                    </>
                                    <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{props.faqObject.content}</p>
                                    <div className="w-100 d-flex flex-row justify-content-between align-items-center p-1">
                                        <button 
                                            className={`btn ${props.faqObject.isLiked?'btn-primary':'btn-outline-primary'} flex-grow-1`} 
                                            disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                            onClick={async()=>{
                                                try {
                                                    let request = await fetchData("/feedbacks/react","PUT",{id:props.faqObject.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                    numberOfDislikesForFaqRef.current.textContent=jwtDecode(request.token).feedback.numberOfDislikes;
                                                    numberOfLikesForFaqRef.current.textContent=jwtDecode(request.token).feedback.numberOfLikes;
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}
                                            >
                                            <AiFillLike className="mx-1"/> <span ref={numberOfLikesForFaqRef}>{props.faqObject.numberOfLikes}</span>
                                        </button>
                                        <button 
                                            className="btn btn-outline-primary d-flex flex-row justify-content-center align-items-center flex-grow-1" 
                                            disabled={!JSON.parse(localStorage.getItem("isLoggedIn"))}
                                            onClick={async()=>{
                                                try {
                                                    let request = await fetchData("/feedbacks/react","PUT",{id:props.faqObject.id,email:localStorage.getItem("email"),reaction:"dislike"},setIsLoading);
                                                    numberOfDislikesForFaqRef.current.textContent=jwtDecode(request.token).feedback.numberOfDislikes;
                                                    numberOfLikesForFaqRef.current.textContent=jwtDecode(request.token).feedback.numberOfLikes;
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            }}>
                                            <AiFillDislike className="mx-1"/> <span ref={numberOfDislikesForFaqRef}>{props.faqObject.numberOfDislikes}</span>
                                        </button>
                                        <button 
                                            className="btn btn-outline-primary d-flex flex-row justify-content-center align-items-center flex-grow-1"
                                            onClick={()=>{
                                                textareaRef.current?.classList.toggle("shown")
                                            }}
                                            >
                                            <MdAddComment className="mx-1"/>
                                            <span ref={numberOfCommentRef}>{props.faqObject.numberOfComments}</span>
                                        </button>
                                        <button 
                                            className={`btn btn-outline-primary d-flex flex-row justify-content-center align-items-center flex-grow-1 ${(JSON.parse(localStorage.getItem("isLoggedIn")) && props.faqObject.feedbackIsMine) ? "" : "disabled"}`} 
                                            disabled={!(JSON.parse(localStorage.getItem("isLoggedIn")) && props.faqObject.feedbackIsMine)}>
                                            <FaEdit className="mx-1"/>
                                        </button>
                                    </div>
                                    <div className="d-flex flex-row justify-content-start align-items-center text-box" ref={textareaRef}>
                                        <textarea 
                                            name="comment" 
                                            id="comment" 
                                            cols="30"
                                            style={{resize:"none"}} 
                                            className="w-100 form-control" 
                                            value={comment} 
                                            onChange={(e)=>setComment(e.target.value)}
                                        ></textarea>
                                        <button 
                                            className={`btn btn-primary ${!(JSON.parse(localStorage.getItem("isLoggedIn") && comment.length > 0))?"disabled":""}`}
                                            disabled={!(JSON.parse(localStorage.getItem("isLoggedIn") && comment.length !== 0))}
                                            onClick={async()=>{
                                            try {
                                                let request = await fetchData("/comments/faq/add","POST",{
                                                    content:comment.trim(),
                                                    from:localStorage.getItem("email"),
                                                    to:props.faqObject.userEmail,
                                                    id:props.faqObject.id
                                                },setIsLoading);
                                                setComment("");
                                                console.log(jwtDecode(request.token).responseObject);
                                                props.setComments((data)=>[...data,jwtDecode(request.token).responseObject])
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}>
                                            <BsSend size={20}/>
                                        </button>
                                    </div>
                                </div>
                                {
                                    props.comments.map((item,index)=>{
                                        let formattedDate = moment(new Date(Number(item.addedOn))).format('MMMM Do YYYY, h:mm:ss a');
                                        return(
                                            <Suspense key={index} fallback="loading...">
                                                <div className="feedback-card w-75 m-2 p-4" style={{
                                                        boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                                        padding:"20px"
                                                    }}>
                                                    <div className="w-100 position-relative">
                                                        <img src={item.senderAvatar} alt="" style={{border:`3px solid ${item.senderIsLoggedIn?"green":"red"}`}}/>
                                                        <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}>{item.senderEmail}</h4>
                                                        <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}>{item.senderName}</h5>
                                                    </div>
                                                        <div>
                                                            <Arrow/>
                                                            <div>
                                                                <img src={item.receiverAvatar} alt="" style={{border:`3px solid ${item.receiverIsLoggedIn?"green":"red"}`}}/>
                                                                <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}>{item.receiverEmail}</h5>
                                                                <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-75`}>{item.receiverName}</h4>
                                                            </div>
                                                        </div>
                                                    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                                                        <span className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50 w-100`}><BsCalendar2Date/>   {formattedDate}</span>
                                                        <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-100 w-100`}>{item.content}</p>
                                                    </div>
                                                </div>
                                            </Suspense>
                                        )
                                    })
                                }
                        </section>
                    )
                }
                {
                    props.userObject && !props.userObject.isMyProfile && (
                        <section className="cards-container w-100 h-auto d-flex flex-column justify-content-start align-items-center overflow-y-scroll">
                            <Suspense>
                                <div className="user-card-item w-75 m-2 p-4">
                                    <img src={props.userObject.userAvatar} alt="image" style={{
                                        border:`3px solid ${props.userObject.isLoggedIn?"green":"red"}`,
                                        borderRadius:"10%",
                                        width:"150px",
                                        height:"150px"
                                    }}/>
                                    <p 
                                        title="click to copy"
                                        className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}
                                        onClick={(e)=>{
                                        navigator.clipboard.writeText(e.target.textContent)
                                    }}><MdOutlineAlternateEmail /> {props.userObject.email}</p>
                                    {
                                        props.userObject.isMale ? (
                                            <FaMale/>
                                        ):(
                                            <FaFemale/>
                                        )
                                    }
                                    <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><FaRegUser />first name {props.userObject.firstName}</p>
                                    <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><FaRegUser />last name {props.userObject.lastName}</p>
                                    <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><LiaBirthdayCakeSolid /> {props.userObject.dateOfBirth}</p>
                                    <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><BsCalendar2Date /> added on {props.userObject.addedOn}</p>
                                </div>
                            </Suspense>
                        </section>
                    )
                }
                <br/>
                <button className="btn btn-close btn-danger close-button" onClick={()=>{
                    ref.current?.classList.add("hidden");
                    if(props.setFaqObject){
                        props.setFaqObject(null);
                        props.setComments([]);
                    }
                    if(props.setFeedbackObject){
                        props.setFeedbackObject(null);
                        props.setComments([]);
                    }
                    if(props.userObject){
                        props.setUserObject(null);
                    }
                    setTimeout(()=>{
                        props.setIsShown(false);
                    },300)
                }}></button>
            </div>
        </section>
    );
}

export {DialogBox};