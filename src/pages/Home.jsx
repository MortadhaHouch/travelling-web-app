/* eslint-disable no-unused-vars */
import SwiperElement from "./SwiperElement"
import VideoLink from "../assets/WhatsApp Video 2024-02-17 at 22.58.04_0ff061f6.mp4"
import {MahdiaImages,TataouineImages,TunisImages,NabeulImages} from "../../utils/images"
import {NavLink} from "react-router-dom"
import { store } from "../../reducers/store"
import { useContext } from "react"
import { themeContext } from "../App"
export const Home = () => {
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    let {isDark,setIsDark} = useContext(themeContext);
    return (
        <main className="d-flex flex-column justify-content-center align-items-center home" style={{
            backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
        }}>
            <section className="d-flex flex-column justify-content-center align-items-center">
                <video src={VideoLink} loop autoPlay muted></video>
                <div>
                    <p>Visit the untouched parts of the world with our cruise service.</p>
                    <div>
                        <button className="bg-info">
                            <NavLink to="/destinations" className="nav-link">
                                get inspired
                            </NavLink>
                        </button>
                    </div>
                </div>
            </section>
            <section className="d-flex flex-column justify-content-center align-items-center">
                <SwiperElement images={TataouineImages.slice(0,3)} stateName="Tataouine" fill="#0d6efd"/>
            </section>
            <section className="d-flex flex-column justify-content-center align-items-center">
                <SwiperElement images={MahdiaImages.slice(0,3)} stateName="Mahdia" fill="#0d6efd"/>
            </section>
            <section className="d-flex flex-column justify-content-center align-items-center">
                <SwiperElement images={NabeulImages.slice(0,3)} stateName="Nabeul" fill="#0d6efd"/>
            </section>
            <section className="d-flex flex-column justify-content-center align-items-center">
                <SwiperElement images={TunisImages.slice(0,3)} stateName="Tunis" fill="#0d6efd"/>
            </section>
        </main>
    )
}
