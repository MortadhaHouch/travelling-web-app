import "../App.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";
export const Animation = () => {
    let [progress,setProgress] = useState(0);
    let paths = document.querySelectorAll("path")
    let main = document.querySelector("main.loading")
    let timeInterval = setInterval(()=>{
        paths.forEach((path)=>{
            if(document.readyState !== "complete" && progress<100){
                path.style.strokeDasharray = path.getTotalLength()*progress;
                path.style.strokeDashoffset = path.getTotalLength()*progress;
                setProgress((percent)=>percent+=0.1);
                main.classList.add("played");
            }else if(document.readyState === "complete"){
                path.style.strokeDasharray = path.getTotalLength();
                path.style.strokeDashoffset = 0;
                main.classList.add("paused");
                return ()=> clearInterval(timeInterval);
            }
        },10)
    })
    return (
        <main className="loading played bg-dark-subtle">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 199.49 185.78">
        <defs>
            <linearGradient id="Degradado_sin_nombre_38" data-name="Degradado sin nombre 38" x1="122.45" y1="30.27" x2="72.77" y2="149.41" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9f1efb"/>
            <stop offset="1" stopColor="#7a17bf"/>
            </linearGradient>
            <linearGradient id="Degradado_sin_nombre_16" data-name="Degradado sin nombre 16" x1="161.11" y1="17.53" x2="163.52" y2="33.92" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#9f1efb"/>
            <stop offset="1" stopColor="#541085"/>
            </linearGradient>
            <linearGradient id="Degradado_sin_nombre_23" data-name="Degradado sin nombre 23" x1="78.53" y1="160.77" x2="124.07" y2="60.03" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#e974fc"/>
            <stop offset="1" stopColor="#e974fc" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="Degradado_sin_nombre_23-2" data-name="Degradado sin nombre 23" x1="171.34" y1="46.06" x2="197.39" y2="36.4" xmlnsXlink="#Degradado_sin_nombre_23"/>
            <linearGradient id="Degradado_sin_nombre_16-2" data-name="Degradado sin nombre 16" x1="163.05" y1="62.45" x2="163.05" y2="44.01" xmlnsXlink="#Degradado_sin_nombre_16"/>
            <linearGradient id="Degradado_sin_nombre_23-3" data-name="Degradado sin nombre 23" x1="11.78" y1="148.62" x2="118.39" y2="51.67" xmlnsXlink="#Degradado_sin_nombre_23"/>
            <linearGradient id="Degradado_sin_nombre_18" data-name="Degradado sin nombre 18" x1="101.19" y1="92.53" x2="100.27" y2="147.28" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f9532c"/>
            <stop offset="1" stopColor="#ff9948"/>
            </linearGradient>
            <linearGradient id="Degradado_sin_nombre_18-2" data-name="Degradado sin nombre 18" x1="77.47" y1="45.7" x2="17.66" y2="102.28" xmlnsXlink="#Degradado_sin_nombre_18"/>
        </defs>
        <g className="cls-1">
            <g id="Layer_2" data-name="Layer 2">
            <g id="OBJECTS">
                <g>
                <g>
                    <path className="cls-5" d="M199.49,38.32c0,5.53-8.27,9.37-17.08,8.67l-10.07-.79-8.8,25.27c-.87,2.5-3.22,4.18-5.87,4.22l-3.53.03-.34-30.06c-46.62,10.97-79.12,57.4-81.63,90.97-2.76,36.92,34.85,36.92,34.85,36.92-32.43,30.36-90.74,2.42-52.1-64.31,25.83-44.62,66.57-61.23,89.11-66.88h.01s.03,0,.04-.01c.37-.1.62-.48.54-.87-.08-.4-.46-.65-.86-.58h-.04s-.03,0-.04.01c-16.06,2.9-31.75,8.14-46.67,15.03,14.57-7.56,30.08-13.58,46.2-17.28.03,0,.06-.01.07-.01.33-.07.57-.39.52-.73-.04-.37-.37-.63-.75-.59-.03,0-.06.01-.07.01-48.58,7.31-104.47,34.93-121.91,70.84-19.68,40.53,8.65,68.75,8.65,68.75C2.46,159.27-14.45,105.59,46.96,65.11c44.34-29.23,79.14-31.78,103.08-33.27l3.59.07-.36-31.87L156.8,0c2.65-.03,5.02,1.6,5.96,4.08l9.84,26.33,9.8-.77c.69-.06,1.38-.08,2.06-.08,8,0,15.03,3.66,15.03,8.76Z"/>
                    <path className="cls-3" d="M172.6,30.42l-9.84-26.33C161.82,1.6,159.45-.03,156.8,0l-3.53.04.36,31.87s8.69-1.1,18.98-1.49Z"/>
                    <path className="cls-6" d="M72.15,136.64c2.51-33.58,35.01-80,81.63-90.97,0,0-62.96,7.11-91.48,75.41-11.06,26.49-3.26,49.37,22.47,63.98,7.79-1.48,15.56-5.25,22.23-11.5,0,0-37.61,0-34.85-36.92Z"/>
                    <path className="cls-2" d="M199.49,38.32c0,5.53-8.27,9.37-17.08,8.67l-10.07-.79c-5.41-.06-13.97-.36-17.22-.48-.07,0-.14-.01-.19-.01-.36-.04-.73-.06-1.13-.04,10.7-.59,45.55-3.48,38.42-14.86,4.29,1.49,7.29,4.2,7.29,7.52Z"/>
                    <path className="cls-9" d="M153.78,45.67l.34,30.06,3.53-.03c2.65-.04,5-1.73,5.87-4.22l8.8-25.27c-6.79-.07-18.55-.54-18.55-.54Z"/>
                    <path className="cls-7" d="M29.71,176.94s-28.33-28.22-8.65-68.75c17.44-35.91,73.34-63.52,121.91-70.84.01,0,.04-.01.07-.01,0,0-57.18,4.58-93.15,32.72C13.93,98.19,11.08,118.7,11.6,143.19c.26,12.27,8.95,24.36,17.57,33.38.18.12.36.25.54.37Z"/>
                </g>
                <g>
                    <path className="cls-4" d="M114.13,73.16s-34.39,26.57-35.08,63.48c-.69,36.92,32.43,35.19,42.44,22.08,0,0-28.59-1.43-26.91-34.16,1.68-32.72,19.55-51.41,19.55-51.41Z"/>
                    <path className="cls-8" d="M112.68,74.84c-7.37,8.8-39.73,50.67-22.87,88.64,10.41,7.11,25.48,3.37,31.68-4.76,0,0-28.59-1.43-26.91-34.16,1.39-27.03,13.82-44.47,18.1-49.72Z"/>
                </g>
                <g>
                    <path className="cls-10" d="M.66,127.32S-2.03,54.61,124.59,29.55c0,0-73.37,6.61-102.81,40.84C-5.82,102.48.66,127.32.66,127.32Z"/>
                    <path className="cls-8" d="M.66,127.32S-1.4,71.51,83.23,40.83c-24.92,6.33-43.81,15.8-58.03,25.9-1.2,1.18-2.34,2.4-3.43,3.66C-5.82,102.48.66,127.32.66,127.32Z"/>
                </g>
                </g>
            </g>
            </g>
        </g>
</svg>   
        </main>
    )
}
