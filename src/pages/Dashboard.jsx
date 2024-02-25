import {useCookies} from "react-cookie"
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
import { Suspense, useEffect, useRef, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import {fetchData} from "../../utils/fetchData"
import Loading from './Loading';
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
export default function Dashboard() {
    let [chartType,setChartType] = useState("bar");
    let chartRef = useRef();
    let chartTypes = ["bar","pie","polarArea","line","doughnut","scatter","radar","bubble"];
    let [cookies,setCookie,removeCookie]=useCookies(["json_token"]);
    let [users,setUsers] = useState([]);
    let [isLoggedIn,setIsLoading] = useState(false);
    let [timeBoundary,setTimeBoundary] = useState("days");
    let timeUnits = ["days","weeks","months","years"];
    async function getData(){
        try {
            let data = await fetchData("https://randomuser.me/api/?results=15","GET",null,setIsLoading)
            setUsers(data.results);
            console.log(users);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <main className='d-flex flex-column justify-content-center align-items-center bg-dark-subtle home'>
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
            <div>
                <button className="btn btn-info" onClick={async()=>{
                    try {
                        await getData();
                    } catch (error) {
                        console.log(error);
                    }
                }}>get users</button>
            </div>
            <section className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                <div className="w-50 h-50">
                    <Chart ref={chartRef} type={chartType} datasetIdKey='id' options={{
                    transitions:true,
                    responsive:true,
                    plugins:{
                        tooltip:{
                            enabled:true,
                            backgroundColor:"darkblue",
                            borderColor:"darkgrey",
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
                                callback:(val)=>{return val+" users"}
                            }
                        },
                        y:{
                            min:0,
                            ticks:{
                                callback:(val)=>{return `${val} ${timeBoundary}`}
                            }
                        }
                    },
                    animation:true,
                    animations:true,
                    resizeDelay:0,
                    tension:.5,
                }} data={{
                    labels:users.map((item)=>{return item.registered.age}),
                    datasets:[{
                        label:"colors",
                        circular:true,
                        animation:true,
                        animations:true,
                        hoverBorderWidth:3,
                        hoverBorderColor:"darkblue",
                        fill:.5,
                        hitRadius:5,
                        hoverRadius:5,
                        data:users.map((item)=>{
                            return item.registered.age
                        }),
                        backgroundColor:users.map(()=>{
                            return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
                        }),
                        hoverBackgroundColor:users.map(()=>{
                            return `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
                        }),
                    }]
                }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">time boundary</label>
                    <select
                        className="form-select form-select-lg"
                        name=""
                        id=""
                        onChange={(e)=>{
                            setTimeBoundary(e.target.value);
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
                <section className="cards-container bg-dark-subtle">
                    {
                        users.length!==0 && users.map((item,index)=>{
                            return (
                                <Suspense key={index} fallback={<Loading/>}>
                                    <div className='user-card-item'>
                                        <img src={item.picture.medium} alt="avatar" />
                                        <p>{item.name.title} {item.name.first} {item.name.last}</p>
                                        <p>{item.gender}</p>
                                        <p>{Date(item.dob.date).toString()}</p>
                                        <p>{Date(item.registered.date).toString()}</p>
                                        <p>{item.phone}</p>
                                        <p>{item.location.country}</p>
                                        <p>{item.location.state}</p>
                                    </div>
                                </Suspense>
                            )
                        })
                    }
                </section>
            </section>
        </main>
    )
}
