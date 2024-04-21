/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import Logo from "../assets/WhatsApp_Image_2024-02-24_at_20.46.19_a0be8a11-removebg-preview (1).png"
import { themeContext } from "../App";
import {fetchData} from "../../utils/fetchData"
import paymentGateWays from "../../utils/paymentGateWays"
import {jwtDecode} from "jwt-decode"
function DialogBox(props) {
    let {isDark,setIsDark} = useContext(themeContext);
    let [isLoading,setIsLoading] = useState(false);
    let [date,setDate] = useState("");
    let [numberOfPeople,setNumberOfPeople] = useState(1);
    let [cardID,setCardID] = useState("");
    let [period,setPeriod] = useState("");
    let [totalPrice,setTotalPrice] = useState();
    let [paymentGateway,setPaymentGateway] = useState("Arab Tunisian Bank (ATB)");
    let dropdownRef = useRef();
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
    return (
        // eslint-disable-next-line react/prop-types
        <section className={"dialog "+(props.isShown?"shown":"hidden")} ref={ref} style={{
            boxShadow:" 0px 0px 80px -30px rgba(0,0,0,0.75)",
            backgroundColor: (isDark || JSON.parse(localStorage.getItem("isDark")))? "rgba(25,25,25,0.75)" : "rgba(242, 241, 235, 0.25)",
        }}>
            <div style={{
                backgroundColor: (isDark || JSON.parse(localStorage.getItem("isDark")))? "rgba(25,25,25,0.75)" : "#F2F1EB",
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
                    props.message.includes("hidden") && (
                        <button className="btn btn-info" onClick={()=>{
                            ref.current?.classList.add("hidden");
                            setTimeout(()=>{
                                location.assign("/user/login")
                            },250)
                        }}>login</button>
                    )
                }
                {
                    props.message.includes("remove-item") && (
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
                <br/>
                <button className="btn btn-close btn-danger close-button" onClick={()=>{
                    ref.current?.classList.add("hidden");
                    setTimeout(()=>{
                        props.setIsShown(false);
                    },300)
                }}></button>
            </div>
        </section>
    );
}

export {DialogBox};