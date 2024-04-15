/* eslint-disable no-unused-vars */
import Chart from "./Chart";
import Trips from "./Trips";
import Users from "./Users";
import FileUpload from "./FileUpload"
import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { SiYourtraveldottv } from "react-icons/si";
import { IoIosAddCircle } from "react-icons/io";
import { GoGraph } from "react-icons/go";
export default function Aside(props) {
    let [componentName,setComponentName] = useState("users");
    return (
        <main className="d-flex flex-column justify-content-start align-items-center">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
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
                            setComponentName("users");
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
                            setComponentName("trips");
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
            </ul>
            <div className="tab-content w-100 h-100">
                {
                    componentName =="users" && 
                    <Users 
                        className="tab-pane d-flex flex-column justify-content-start align-items-center p-3 active" 
                        id="users" 
                        role="tabpanel"
                        ariaLabelledby="users-tab"
                    />
                }
                {
                    componentName == "trips" && 
                    <Trips
                        className="tab-pane d-flex flex-column justify-content-start align-items-center p-3"
                        id="trips"
                        role="tabpanel"
                        ariaLabelledby="trips-tab"
                    />
                }
                {
                    componentName == "chart" && 
                    <Chart
                        className="tab-pane d-flex flex-column justify-content-start align-items-center p-3"
                        id="chart"
                        role="tabpanel"
                        ariaLabelledby="chart-tab"
                    />  
                }
                {
                    componentName == "fileUpload" && 
                    <FileUpload
                        className="tab-pane d-flex flex-column justify-content-start align-items-center p-3"
                        id="upload"
                        role="tabpanel"
                        ariaLabelledby="upload-tab"
                    />
                }
            </div>
        </main>
    )
}
