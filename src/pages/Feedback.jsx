/* eslint-disable no-unused-vars */
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { store } from "../../reducers/store";
import { themeContext } from "../App";
import { fetchData } from "../../utils/fetchData";
import {jwtDecode} from "jwt-decode"
import { AiFillLike } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
export const Feedback = () => {
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    let {isDark,setIsDark} = useContext(themeContext);
    let [feedback,setFeedback] = useState("");
    let [isLoading,setIsLoading] = useState(false);
    let [componentName,setComponentName] = useState("feedback");
    let [numberOfWords,setNumberOfWords] = useState(0);
    let [responseMessage,setResponseMessage]= useState("");
    let notificationRef = useRef();
    let [feedbacks,setFeedbacks] = useState([]);
    let [isShown,setIsShown] = useState(false);
    async function handleSubmit(e){
        e.preventDefault();
        try {
            let request = await fetchData("/feedbacks/add","POST",{
                feedback:feedback.trim(),
                email:localStorage.getItem("email").trim()
            },setIsLoading)
            if(jwtDecode(request.message).message){
                setResponseMessage(jwtDecode(request.message).message);
                setFeedback("");
                notificationRef?.current?.classList.remove("hidden");
                setTimeout(()=>{
                    notificationRef?.current?.classList.add("hidden");
                },4000)
            }
        } catch (error) {
            console.log(error);
        }
    }
    function getNumberOfWords(text){
        let words = []
        text.split(" ").forEach(element => {
            words.push(element.trim())
        });
        return words.filter(Boolean).length;
    }
    async function getData(){
        try {
            let request = await fetchData("/feedbacks","GET",null,setIsLoading);
            setFeedbacks(jwtDecode(request.response).feedbacks)
            console.log(jwtDecode(request.response).feedbacks)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        setComponentName(componentName)
    },[componentName])
    useEffect(()=>{
        getData()
    },[])
    return (
        <>
            <main className="d-flex flex-column justify-content-start align-items-center" style={{
                backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
            }}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="feedback-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#feedback"
                            type="button"
                            role="tab"
                            aria-controls="feedback"
                            aria-selected="true"
                            onClick={()=>setComponentName("feedback")}
                        >
                            feedback
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            id="feedbacks-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#feedbacks"
                            type="button"
                            role="tab"
                            aria-controls="feedbacks"
                            aria-selected="false"
                            onClick={()=>setComponentName("feedbacks")}
                        >
                            feedbacks
                        </button>
                    </li>
                </ul>
                <div className="tab-content w-100 h-100">
                    <section
                        className="tab-pane w-100 h-100 d-flex justify-content-center align-items-center flex-wrap active"
                        id="feedback-tab"
                        role="tabpanel"
                        aria-labelledby="feedback-tab"
                    >
                        {
                            componentName == "feedback" && (
                                <form action="" method="post" className="d-flex flex-column justify-content-center align-items-center w-50 h-100" onSubmit={handleSubmit}>
                                    <div className="mb-3 w-100 h-75 d-flex flex-column justify-content-start align-items-center">
                                        <label htmlFor="feedback" className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>feedback</label>
                                        <textarea 
                                            name="feedback" 
                                            id="feedback" 
                                            cols="30" 
                                            rows="10" 
                                            required
                                            className="form-control w-75 h-100" 
                                            value={feedback} 
                                            onChange={(e)=>{
                                                setNumberOfWords(getNumberOfWords(feedback));
                                                setFeedback(e.target.value);
                                            }}
                                            onBlur={(e)=>{
                                                setNumberOfWords(getNumberOfWords(feedback));
                                            }}
                                        ></textarea>
                                        <p>{numberOfWords} words</p>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        post feedback
                                    </button>
                                </form>
                            )
                        }
                    </section>
                    <section
                        className="tab-pane w-100 h-100 feedback-cards-container d-flex justify-content-center align-items-center flex-wrap"
                        id="feedbacks"
                        role="tabpanel"
                        aria-labelledby="feedbacks-tab"
                    >
                        {
                            componentName == "feedbacks" && (
                                feedbacks.length !== 0 ? feedbacks.map((item,index)=>{
                                    return(
                                        <Suspense key={index}>
                                            <div className="feedback-card" style={{
                                                    boxShadow:(isDark || JSON.parse(localStorage.getItem("isDark")))?"2px 2px 4px 1px rgba(0,0,100,0.2),-2px -2px 4px 1px rgba(0,0,0,.2)":"2px 2px 4px 1px rgba(0,0,0,.2),-2px -2px 4px 1px rgba(255,255,255,0.2)",
                                                }}>
                                                <div>
                                                    <img src={item.userAvatar} alt="" />
                                                    <h4 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.userFirstName} {item.userLastName}</h4>
                                                    <h5 className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"} opacity-50`}><MdOutlineAlternateEmail /> {item.userEmail}</h5>
                                                </div>
                                                <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>{item.content}</p>
                                                <p className={`${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}><AiFillLike size={20}/> {item.numberOfLikes}</p>
                                            </div>
                                        </Suspense>
                                    )
                                }):(
                                    <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>No feedbacks are posted yet</p>
                                )
                            )
                        } 
                    </section>
                </div>
                {
                    responseMessage && responseMessage.trim()!=="" && 
                    (
                        <div className={`notification`} ref={notificationRef} style={{
                            backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"rgb(59, 89, 152)":"rgb(0, 211, 63)"
                        }}>
                            <p className={`form-label ${(isDark || JSON.parse(localStorage.getItem("isDark")))?"text-light":"text-dark"}`}>
                                {
                                    responseMessage
                                }
                            </p>
                        </div>
                    )
                }
            </main>
        </>
    )
}
