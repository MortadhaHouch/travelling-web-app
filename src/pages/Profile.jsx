/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { store } from "../../reducers/store"
import { themeContext } from "../App";

export default function Profile() {
    store.subscribe(()=>{
        console.log("local data store is connected");
    })
    let {isDark,setIsDark} = useContext(themeContext);
    return (
        <main className="d-flex flex-column justify-content-center align-items-center home" style={{
            backgroundColor:(isDark || JSON.parse(localStorage.getItem("isDark")))?"#070F2B":"#F2F1EB"
        }}>
            <section>
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </section>
            <section>
                <div>

                </div>
            </section>
        </main>
    )
}
