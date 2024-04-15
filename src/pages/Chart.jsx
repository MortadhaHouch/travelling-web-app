/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import { dateConversion } from "../../utils/dateFormatter"
import { themeContext } from "../App";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement,
    PointElement,
    DoughnutController,
    PieController,
    RadarController,
    ScatterController,
    PolarAreaController,
    LineController,
    LineElement,
    ArcElement,
    Filler,
    RadialLinearScale
} from 'chart.js';
import { fetchData } from "../../utils/fetchData";
import moment from "moment";
ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    BarElement,
    PointElement,
    DoughnutController,
    PieController,
    RadarController,
    ScatterController,
    PolarAreaController,
    LineController,
    ArcElement,
    LineElement,
    Filler,
    RadialLinearScale
);
import {Chart as ChartComponent} from "react-chartjs-2"
import { gsapAnimationHandler } from "../../utils/animation";
export default function Chart(props) {
    let chartTypes = ["bar","pie","polarArea","line","doughnut","scatter","radar","bubble"];
    let [timeBoundary,setTimeBoundary] = useState("days");
    let [previousTimeBoundary,setPreviousTimeBoundary] = useState("");
    let timeUnits = ["days","weeks","months","years"];
    let [chartType,setChartType] = useState("bar");
    let chartRef = useRef();
    let {isDark,setIsDark} = useContext(themeContext);
    let [isLoading,setIsLoading] = useState(false);
    let [users,setUsers] = useState([]);
    useEffect(()=>{
        setUsers(users);
        return ()=> setUsers([]);
    },[users])
    useEffect(()=>{
        getData();
    },[])
    useEffect(()=>{
        gsapAnimationHandler("p.p-indicator",{x:-20,filter:"blur(10px)",opacity:0},{x:0,filter:"blur(0px)",opacity:1},true)
    },[])
    async function getData(){
        try {
            let data = await fetchData("/user/users","GET",null,setIsLoading);
            setUsers(data.response);
            console.log(users);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section
            className={props.className}
            role={props.role}
            aria-labelledby={props.ariaLabelledby}
            id={props.id}
        >
            <div className="w-50 h-50">
                {
                    users && users.length !== 0 ? (
                        <>
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <select className="form-select form-select-lg" onChange={(e)=>{
                                    setChartType(e.target.value);
                                    chartRef?.current?.update();
                                }}>
                                {
                                    chartTypes.map((item,index)=>{
                                        return(
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                            <ChartComponent type={chartType} datasetIdKey='id' ref={chartRef} options={{
                                transitions:true,
                                responsive:true,
                                plugins:{
                                    tooltip:{
                                        enabled:true,
                                        backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                        borderColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                                        borderWidth:3
                                    },
                                    legend:{
                                        display:true,
                                    },
                                    title:{
                                        color:"red",
                                        display:true,
                                        padding:{
                                            top:10,
                                            bottom:10
                                        },
                                    },
                                    filler:{
                                        propagate:false
                                    }
                                },
                                scales:{
                                    x:{
                                        min:0,
                                        ticks:{
                                            callback:(val)=>{return Math.floor(val)+" users"}
                                        }
                                    },
                                    y:{
                                        min:0,
                                        ticks:{
                                            callback:(val)=>{
                                                return `${dateConversion(val,previousTimeBoundary,timeBoundary)} ${timeBoundary}`
                                            }
                                        }
                                    }
                                },
                                animation:true,
                                animations:true,
                                resizeDelay:0,
                                tension:.5,
                            }} data={{
                                labels:users.map((item)=>{return item.addedOn}),
                                datasets:[{
                                    label:"users",
                                    circular:true,
                                    animation:true,
                                    animations:true,
                                    hoverBorderWidth:3,
                                    hoverBorderColor:"darkblue",
                                    fill:.5,
                                    hitRadius:5,
                                    hoverRadius:5,
                                    data:users.map((item)=>{
                                        return item.addedOn
                                    }),
                                    backgroundColor:users.map(()=>{
                                        return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
                                    }),
                                    hoverBackgroundColor:users.map(()=>{
                                        return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
                                    }),
                                }]
                            }} 
                        />
                            <div className="mb-3">
                                <label htmlFor="" className="form-label" style={{
                                    color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
                                }}>time boundary</label>
                                <select
                                    className="form-select form-select-lg"
                                    name=""
                                    id=""
                                    onChange={(e)=>{
                                        setTimeBoundary((prev)=>{
                                            setPreviousTimeBoundary(prev);
                                            return e.target.value;
                                        });
                                        chartRef?.current?.update();
                                    }}
                                >
                                    {
                                        timeUnits.map((item,index)=>{
                                            return(
                                                <option value={item} key={index}>{item}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </>
                    ):(
                        <p className="p-indicator" style={{
                            color:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#F2F1EB":"#070F2B",
                            width:"100%",
                            textAlign:"center"
                        }}>No graph to be shown while no visitors are registered yet</p>
                    )
                }
            </div>
        </section>
    )
}